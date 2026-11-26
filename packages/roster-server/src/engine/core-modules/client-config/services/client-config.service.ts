import { Injectable } from '@nestjs/common';

import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';

import { readIsCompanyEnrichmentEnabled } from 'src/engine/core-modules/company-enrichment/utils/read-is-company-enrichment-enabled.util';
import { readBookCallStepMinEmployeeCount } from 'src/engine/core-modules/onboarding/utils/read-book-call-step-min-employee-count.util';
import { NodeEnvironment } from 'src/engine/core-modules/roster-config/interfaces/node-environment.interface';
import { SupportDriver } from 'src/engine/core-modules/roster-config/interfaces/support.interface';

import { MaintenanceModeService } from 'src/engine/core-modules/admin-panel/maintenance-mode.service';
import {
  type ClientAiEvaluationModelConfig,
  type ClientAiModelConfig,
  type ClientConfig,
} from 'src/engine/core-modules/client-config/client-config.entity';
import { DomainServerConfigService } from 'src/engine/core-modules/domain/domain-server-config/services/domain-server-config.service';
import { EmailingDomainDriver } from 'src/engine/core-modules/emailing-domain/drivers/types/emailing-domain-driver.type';
import { PUBLIC_FEATURE_FLAGS } from 'src/engine/core-modules/feature-flag/constants/public-feature-flag.const';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { toDisplayCredits } from 'src/engine/core-modules/usage/utils/to-display-credits.util';
import { deriveWebPushVapidKeyPair } from 'src/engine/core-modules/web-push/utils/derive-web-push-vapid-key-pair.util';
import { AI_MODEL_TIERS, parseAiModelVariantId } from 'roster-shared/ai';
import { ENTERPRISE_INSTANCE_TYPE } from 'roster-shared/constants';
import { MODEL_FAMILY_LABELS } from 'src/engine/metadata-modules/ai/ai-models/constants/model-family-labels.constant';
import { getAvailableEfforts } from 'src/engine/metadata-modules/ai/ai-models/utils/get-available-efforts.util';
import { getNativeModelCapabilities } from 'src/engine/metadata-modules/ai/ai-models/utils/get-native-model-capabilities.util';
import { AI_DATA_POLICIES } from 'src/engine/metadata-modules/ai/ai-models/constants/ai-data-policies.constant';
import { AiModelRegistryService } from 'src/engine/metadata-modules/ai/ai-models/services/ai-model-registry.service';
import { type AiModelBenchmark } from 'src/engine/metadata-modules/ai/ai-models/types/ai-model-benchmark.type';
import { type AiModelConfig } from 'src/engine/metadata-modules/ai/ai-models/types/ai-model-config.type';

@Injectable()
export class ClientConfigService {
  constructor(
    private rosterConfigService: rosterConfigService,
    private domainServerConfigService: DomainServerConfigService,
    private aiModelRegistryService: AiModelRegistryService,
    private maintenanceModeService: MaintenanceModeService,
  ) {}

  private resolveBenchmark(modelConfig: AiModelConfig | undefined): {
    benchmark?: AiModelBenchmark;
    isInherited: boolean;
  } {
    if (isDefined(modelConfig?.benchmark)) {
      return { benchmark: modelConfig.benchmark, isInherited: false };
    }

    const { modelId: baseModelId, effort } = parseAiModelVariantId(
      modelConfig?.modelId ?? '',
    );
    const baseBenchmark = isDefined(effort)
      ? this.aiModelRegistryService.getModelConfig(baseModelId)?.benchmark
      : undefined;

    return { benchmark: baseBenchmark, isInherited: isDefined(baseBenchmark) };
  }

  private isCloudflareIntegrationEnabled(): boolean {
    return (
      !!this.rosterConfigService.get('CLOUDFLARE_API_KEY') &&
      !!this.rosterConfigService.get('CLOUDFLARE_ZONE_ID')
    );
  }

  async getClientConfig(): Promise<ClientConfig> {
    const captchaProvider = this.rosterConfigService.get('CAPTCHA_DRIVER');
    const supportDriver = this.rosterConfigService.get('SUPPORT_DRIVER');
    const calendarBookingPageId = this.rosterConfigService.get(
      'CALENDAR_BOOKING_PAGE_ID',
    );
    const isBookCallOnboardingStepEnabled = isDefined(
      readBookCallStepMinEmployeeCount(this.rosterConfigService),
    );
    const isCompanyEnrichmentEnabled = readIsCompanyEnrichmentEnabled(
      this.rosterConfigService,
    );

    const isEmailingDomainInDemoMode =
      this.rosterConfigService.get('EMAILING_DOMAIN_DRIVER') ===
      EmailingDomainDriver.LOG;

    const isBillingEnabled = this.rosterConfigService.get('IS_BILLING_ENABLED');

    const availableModels =
      this.aiModelRegistryService.getAdminFilteredModels();
    const resolvedProviders =
      this.aiModelRegistryService.getResolvedProvidersForAdmin();

    const getProviderLabel = (providerName?: string | null) =>
      providerName
        ? (resolvedProviders[providerName]?.label ?? providerName)
        : undefined;

    const aiModels: ClientAiModelConfig[] = availableModels.map(
      (registeredModel) => {
        const modelConfig = this.aiModelRegistryService.getModelConfig(
          registeredModel.modelId,
        );

        const modelFamily = modelConfig?.modelFamily;
        const providerName = registeredModel.providerName;
        const { benchmark, isInherited } = this.resolveBenchmark(modelConfig);

        return {
          modelId: registeredModel.modelId,
          label: modelConfig?.label || registeredModel.modelId,
          modelFamily,
          modelFamilyLabel: modelFamily
            ? MODEL_FAMILY_LABELS[modelFamily]
            : undefined,
          sdkPackage: registeredModel.sdkPackage,
          providerName,
          providerLabel: getProviderLabel(providerName),
          nativeCapabilities: getNativeModelCapabilities(
            registeredModel.sdkPackage,
          ),
          inputCostPerMillionTokens: modelConfig?.inputCostPerMillionTokens,
          outputCostPerMillionTokens: modelConfig?.outputCostPerMillionTokens,
          contextWindowTokens: modelConfig?.contextWindowTokens,
          maxOutputTokens: modelConfig?.maxOutputTokens,
          isDeprecated: modelConfig?.isDeprecated,
          dataResidency: modelConfig?.dataResidency,
          zeroDataRetention: modelConfig?.zeroDataRetention,
          intelligenceIndex: benchmark?.intelligenceIndex,
          outputTokensPerSecond: benchmark?.outputTokensPerSecond,
          costPerTask: benchmark?.costPerTask,
          isBenchmarkInherited: isInherited,
          efforts:
            isDefined(modelConfig) && !isDefined(modelConfig.effort)
              ? getAvailableEfforts(modelConfig)
              : undefined,
          effort: modelConfig?.effort,
        };
      },
    );

    const aiEvaluationModels: ClientAiEvaluationModelConfig[] =
      this.aiModelRegistryService
        .getAvailableEvaluationModelConfigs()
        .filter((modelConfig) =>
          this.aiModelRegistryService.isModelAdminAllowed(modelConfig.modelId),
        )
        .map((modelConfig) => ({
          modelId: modelConfig.modelId,
          label: modelConfig.label,
          description: modelConfig.description,
          providerLabel: getProviderLabel(modelConfig.modelId.split('/')[0]),
          isAvailable: isDefined(
            this.aiModelRegistryService.getEvaluationModel(modelConfig.modelId),
          ),
          supportedQuestionTypes: modelConfig.supportedQuestionTypes,
          maxCriteriaPerQuestion: modelConfig.maxCriteriaPerQuestion,
          maxScoreLevels: modelConfig.maxScoreLevels,
          medianLatencyMs: modelConfig.medianLatencyMs,
          inputCostPerMillionTokens: modelConfig.inputCostPerMillionTokens,
          outputCostPerMillionTokens: modelConfig.outputCostPerMillionTokens,
          isDeprecated: modelConfig.isDeprecated,
        }));

    const aiModelTiers = AI_DATA_POLICIES.flatMap((aiDataPolicy) =>
      AI_MODEL_TIERS.flatMap((tier) => {
        const model = this.aiModelRegistryService.findDefaultModelForTier({
          tier,
          aiDataPolicy,
        });

        if (!isDefined(model)) {
          return [];
        }

        return [
          {
            tier,
            modelId: model.modelId,
            requiredDataResidencyRegion:
              aiDataPolicy.requiredDataResidencyRegion,
            isZeroDataRetentionRequired:
              aiDataPolicy.isZeroDataRetentionRequired,
          },
        ];
      }),
    );

    const clientConfig: ClientConfig = {
      appVersion: this.rosterConfigService.get('APP_VERSION'),
      billing: {
        isBillingEnabled,
        billingUrl: this.rosterConfigService.get('BILLING_PLAN_REQUIRED_LINK'),
        stripePublishableKey: this.rosterConfigService.get(
          'BILLING_STRIPE_PUBLISHABLE_KEY',
        ),
        trialPeriods: [
          {
            duration: this.rosterConfigService.get(
              'BILLING_FREE_TRIAL_WITH_CREDIT_CARD_DURATION_IN_DAYS',
            ),
            isCreditCardRequired: true,
          },
          {
            duration: this.rosterConfigService.get(
              'BILLING_FREE_TRIAL_WITHOUT_CREDIT_CARD_DURATION_IN_DAYS',
            ),
            isCreditCardRequired: false,
          },
        ],
      },
      aiModels,
      aiEvaluationModels,
      aiModelTiers,
      authProviders: {
        google: this.rosterConfigService.get('AUTH_GOOGLE_ENABLED'),
        magicLink: false,
        password: this.rosterConfigService.get('AUTH_PASSWORD_ENABLED'),
        microsoft: this.rosterConfigService.get('AUTH_MICROSOFT_ENABLED'),
        sso: [],
      },
      signInPrefilled: this.rosterConfigService.get('SIGN_IN_PREFILLED'),
      isMultiWorkspaceEnabled: this.rosterConfigService.get(
        'IS_MULTIWORKSPACE_ENABLED',
      ),
      isEmailVerificationRequired: this.rosterConfigService.get(
        'IS_EMAIL_VERIFICATION_REQUIRED',
      ),
      defaultSubdomain: this.rosterConfigService.get('DEFAULT_SUBDOMAIN'),
      frontDomain: this.domainServerConfigService.getFrontUrl().hostname,
      serverUrl: this.rosterConfigService.get('SERVER_URL'),
      publicFunctionDomain:
        this.domainServerConfigService.getPublicBaseHostnameOrUndefined() ??
        null,
      support: {
        supportDriver: supportDriver ? supportDriver : SupportDriver.NONE,
        supportFrontChatId: this.rosterConfigService.get(
          'SUPPORT_FRONT_CHAT_ID',
        ),
      },
      sentry: {
        environment: this.rosterConfigService.get('SENTRY_ENVIRONMENT'),
        release: this.rosterConfigService.get('APP_VERSION'),
        dsn: this.rosterConfigService.get('SENTRY_FRONT_DSN'),
        tracesSampleRate: this.rosterConfigService.get(
          'SENTRY_FRONT_TRACES_SAMPLE_RATE',
        ),
      },
      captcha: {
        provider: captchaProvider ? captchaProvider : undefined,
        siteKey: this.rosterConfigService.get('CAPTCHA_SITE_KEY'),
      },
      api: {
        mutationMaximumAffectedRecords: this.rosterConfigService.get(
          'MUTATION_MAXIMUM_AFFECTED_RECORDS',
        ),
      },
      onboarding: isBillingEnabled
        ? {
            importContactsCreditsReward: toDisplayCredits(
              this.rosterConfigService.get(
                'ONBOARDING_IMPORT_CONTACTS_CREDITS_REWARD',
              ),
            ),
            inviteTeamCreditsRewardPerUser: toDisplayCredits(
              this.rosterConfigService.get(
                'ONBOARDING_INVITE_TEAM_CREDITS_REWARD_PER_USER',
              ),
            ),
            createProfileCreditsReward: toDisplayCredits(
              this.rosterConfigService.get(
                'BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITHOUT_CREDIT_CARD',
              ),
            ),
            upgradeCreditsReward: toDisplayCredits(
              Math.max(
                0,
                this.rosterConfigService.get(
                  'BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITH_CREDIT_CARD',
                ) -
                  this.rosterConfigService.get(
                    'BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITHOUT_CREDIT_CARD',
                  ),
              ),
            ),
            inviteTeamMaxInvites: this.rosterConfigService.get(
              'ONBOARDING_INVITE_TEAM_MAX_INVITES',
            ),
          }
        : null,
      isAttachmentPreviewEnabled: this.rosterConfigService.get(
        'IS_ATTACHMENT_PREVIEW_ENABLED',
      ),
      analyticsEnabled: this.rosterConfigService.get('ANALYTICS_ENABLED'),
      canManageFeatureFlags:
        this.rosterConfigService.get('NODE_ENV') ===
          NodeEnvironment.DEVELOPMENT ||
        isBillingEnabled ||
        this.rosterConfigService.get('IS_FEATURE_FLAG_MANAGEMENT_ENABLED'),
      publicFeatureFlags: PUBLIC_FEATURE_FLAGS,
      isCookieSessionEnabled: true,
      isMicrosoftMessagingEnabled: this.rosterConfigService.get(
        'MESSAGING_PROVIDER_MICROSOFT_ENABLED',
      ),
      isMicrosoftCalendarEnabled: this.rosterConfigService.get(
        'CALENDAR_PROVIDER_MICROSOFT_ENABLED',
      ),
      isGoogleMessagingEnabled: this.rosterConfigService.get(
        'MESSAGING_PROVIDER_GMAIL_ENABLED',
      ),
      isGoogleCalendarEnabled: this.rosterConfigService.get(
        'CALENDAR_PROVIDER_GOOGLE_ENABLED',
      ),
      isConfigVariablesInDbEnabled: this.rosterConfigService.get(
        'IS_CONFIG_VARIABLES_IN_DB_ENABLED',
      ),
      isImapSmtpCaldavEnabled: this.rosterConfigService.get(
        'IS_IMAP_SMTP_CALDAV_ENABLED',
      ),
      isEmailingDomainInDemoMode,
      allowRequestsTorosterIcons: this.rosterConfigService.get(
        'ALLOW_REQUESTS_TO_roster_ICONS',
      ),
      calendarBookingPageId: isNonEmptyString(calendarBookingPageId)
        ? calendarBookingPageId
        : undefined,
      isBookCallOnboardingStepEnabled,
      isCompanyEnrichmentEnabled,
      isCloudflareIntegrationEnabled: this.isCloudflareIntegrationEnabled(),
      isClickHouseConfigured: !!this.rosterConfigService.get('CLICKHOUSE_URL'),
      isWorkspaceSchemaDDLLocked: this.rosterConfigService.get(
        'WORKSPACE_SCHEMA_DDL_LOCKED',
      ),
      isOnboardingAiChatEnabled: this.rosterConfigService.get(
        'IS_ONBOARDING_AI_CHAT_ENABLED',
      ),
      enterpriseInstanceType:
        this.rosterConfigService.get('ENTERPRISE_INSTANCE_TYPE') ??
        ENTERPRISE_INSTANCE_TYPE.PRODUCTION,
      webPushVapidPublicKey: deriveWebPushVapidKeyPair({
        rosterConfigService: this.rosterConfigService,
      }).publicKey,
    };

    const maintenanceMode =
      await this.maintenanceModeService.getMaintenanceMode();

    if (isDefined(maintenanceMode)) {
      clientConfig.maintenance = {
        startAt: new Date(maintenanceMode.startAt),
        endAt: new Date(maintenanceMode.endAt),
        link: maintenanceMode.link,
      };
    }

    return clientConfig;
  }
}
