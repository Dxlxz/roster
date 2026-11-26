import { type WorkspaceCompanyEnrichment } from 'roster-shared/workspace';

export const COMPANY_ENRICHMENT_KEY = 'COMPANY_ENRICHMENT';

export type CompanyEnrichmentKeyValueTypeMap = {
  [COMPANY_ENRICHMENT_KEY]: WorkspaceCompanyEnrichment;
};
