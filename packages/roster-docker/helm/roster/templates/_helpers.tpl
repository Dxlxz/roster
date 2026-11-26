{{- define "roster.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "roster.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "roster.namespace" -}}
{{ .Release.Namespace }}
{{- end -}}

{{/* ServiceAccount name used by server/worker pods */}}
{{- define "roster.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "roster.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- default "default" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}

{{/* Server image fields merged with globals */}}
{{- define "roster.server.image" -}}
{{- $repo := default $.Values.image.repository (index $.Values.server.image "repository" | default "") -}}
{{- $tag := default (default $.Chart.AppVersion $.Values.image.tag) (index $.Values.server.image "tag" | default "") -}}
{{- $pp := default $.Values.image.pullPolicy (index $.Values.server.image "pullPolicy" | default "") -}}
{{- printf "%s:%s|%s" $repo $tag $pp -}}
{{- end -}}

{{/* Worker image fields merged with globals */}}
{{- define "roster.worker.image" -}}
{{- $repo := default $.Values.image.repository (index $.Values.worker.image "repository" | default "") -}}
{{- $tag := default (default $.Chart.AppVersion $.Values.image.tag) (index $.Values.worker.image "tag" | default "") -}}
{{- $pp := default $.Values.image.pullPolicy (index $.Values.worker.image "pullPolicy" | default "") -}}
{{- printf "%s:%s|%s" $repo $tag $pp -}}
{{- end -}}

{{/* Extract parts of image helper */}}
{{- define "roster.image.repository" -}}
{{- regexFind "^([^:|]+)" . -}}
{{- end -}}
{{- define "roster.image.tag" -}}
{{- regexFind ":([^|]+)" . | trimPrefix ":" -}}
{{- end -}}
{{- define "roster.image.pullPolicy" -}}
{{- regexFind "\\|(.+)$" . | trimPrefix "|" -}}
{{- end -}}

{{/* Check if using external secret for database password */}}
{{- define "roster.db.useExternalSecret" -}}
{{- if and (not .Values.db.enabled) .Values.db.external.secretName .Values.db.external.passwordKey -}}
true
{{- else -}}
false
{{- end -}}
{{- end -}}

{{/* Database URL secret name */}}
{{- define "roster.dbUrl.secretName" -}}
{{- printf "%s-db-url" (include "roster.fullname" .) -}}
{{- end -}}

{{/* Database password secret name */}}
{{- define "roster.dbPassword.secretName" -}}
{{- if eq (include "roster.db.useExternalSecret" .) "true" -}}
{{- .Values.db.external.secretName -}}
{{- else -}}
{{- include "roster.dbUrl.secretName" . -}}
{{- end -}}
{{- end -}}

{{/* Database password secret key */}}
{{- define "roster.dbPassword.secretKey" -}}
{{- if eq (include "roster.db.useExternalSecret" .) "true" -}}
{{- .Values.db.external.passwordKey -}}
{{- else if .Values.db.enabled -}}
appPassword
{{- else -}}
password
{{- end -}}
{{- end -}}

{{/* Database URL template for external secret (will be evaluated at runtime) */}}
{{- define "roster.dbUrl.template" -}}
{{- if eq (include "roster.db.useExternalSecret" .) "true" -}}
{{- $scheme := "postgres" -}}
{{- $host := .Values.db.external.host -}}
{{- $port := .Values.db.external.port | default 5432 -}}
{{- $user := .Values.db.external.user | default "postgres" -}}
{{- $db := .Values.db.external.database | default "roster" -}}
{{- $qs := ternary "?sslmode=require" "" (eq .Values.db.external.ssl true) -}}
{{- printf "%s://%s:$(DB_PASSWORD)@%s:%v/%s%s" $scheme $user $host $port $db $qs -}}
{{- end -}}
{{- end -}}

{{/* Check if using external secret for redis password */}}
{{- define "roster.redis.useExternalSecret" -}}
{{- if and (not .Values.redisInternal.enabled) .Values.redis.external.secretName .Values.redis.external.passwordKey -}}
true
{{- else -}}
false
{{- end -}}
{{- end -}}

{{/* Compose Redis URL */}}
{{- define "roster.redisUrl" -}}
{{- if .Values.server.env.REDIS_URL -}}
{{- .Values.server.env.REDIS_URL -}}
{{- else if .Values.redisInternal.enabled -}}
{{- $host := printf "%s-redis" (include "roster.fullname" .) -}}
{{- printf "redis://%s.%s.svc.cluster.local:6379" $host (include "roster.namespace" .) -}}
{{- else -}}
{{- $host := .Values.redis.external.host | default "redis" -}}
{{- $port := .Values.redis.external.port | default 6379 -}}
{{- if or (eq (include "roster.redis.useExternalSecret" .) "true") (.Values.redis.external.password) -}}
{{- $auth := ":$(REDIS_PASSWORD)@" -}}
{{- printf "redis://%s%s:%v" $auth $host $port -}}
{{- else -}}
{{- printf "redis://%s:%v" $host $port -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/* Compose Server URL from override, ingress, or service */}}
{{- define "roster.serverUrl" -}}
{{- if .Values.server.env.SERVER_URL -}}
{{- .Values.server.env.SERVER_URL -}}
{{- else if and .Values.server.ingress.enabled (gt (len .Values.server.ingress.hosts) 0) -}}
{{- $host := (index .Values.server.ingress.hosts 0).host -}}
{{- $tls := gt (len .Values.server.ingress.tls) 0 -}}
{{- $scheme := ternary "https" "http" $tls -}}
{{- $port := ternary 443 80 $tls -}}
{{- printf "%s://%s:%v" $scheme $host $port -}}
{{- else -}}
{{- $svc := printf "%s-server" (include "roster.fullname" .) -}}
{{- $ns := include "roster.namespace" . -}}
{{- $port := .Values.server.service.port | default 3000 -}}
{{- printf "http://%s.%s.svc.cluster.local:%v" $svc $ns $port -}}
{{- end -}}
{{- end -}}

{{/* Tokens secret name */}}
{{- define "roster.secret.tokens.name" -}}
{{- .Values.secrets.tokens.name | default "tokens" -}}
{{- end -}}

{{/* Access token value: reuse existing secret if present, else provided value, else generated */}}
{{- define "roster.secret.tokens.access" -}}
{{- $name := include "roster.secret.tokens.name" . -}}
{{- $ns := include "roster.namespace" . -}}
{{- $existing := lookup "v1" "Secret" $ns $name -}}
{{- if and $existing $existing.data.accessToken -}}
{{- b64dec $existing.data.accessToken -}}
{{- else if .Values.secrets.tokens.accessToken -}}
{{- .Values.secrets.tokens.accessToken -}}
{{- else -}}
{{- randAlphaNum 32 -}}
{{- end -}}
{{- end -}}

{{/* Server container port */}}
{{- define "roster.server.containerPort" -}}
{{- .Values.server.service.port | default 3000 -}}
{{- end -}}

{{/* Storage type: prefer top-level storage.type, else legacy server.env.STORAGE_TYPE, else local */}}
{{- define "roster.storageType" -}}
{{- if .Values.storage.type -}}
{{- .Values.storage.type -}}
{{- else if .Values.server.env.STORAGE_TYPE -}}
{{- .Values.server.env.STORAGE_TYPE -}}
{{- else -}}
local
{{- end -}}
{{- end -}}

{{/* Additional storage env vars (e.g., S3) */}}
{{- define "roster.storageEnv" -}}
{{- if eq (include "roster.storageType" .) "s3" -}}
{{- with .Values.storage.s3.bucket }}
- name: STORAGE_S3_NAME
  value: {{ . | quote }}
{{- end }}
{{- with .Values.storage.s3.region }}
- name: STORAGE_S3_REGION
  value: {{ . | quote }}
{{- end }}
{{- with .Values.storage.s3.endpoint }}
- name: STORAGE_S3_ENDPOINT
  value: {{ . | quote }}
{{- end }}
{{- if and .Values.storage.s3.secretName .Values.storage.s3.accessKeyIdKey }}
- name: STORAGE_S3_ACCESS_KEY_ID
  valueFrom:
    secretKeyRef:
      name: {{ .Values.storage.s3.secretName | quote }}
      key: {{ .Values.storage.s3.accessKeyIdKey | quote }}
{{- else }}
  {{- with .Values.storage.s3.accessKeyId }}
- name: STORAGE_S3_ACCESS_KEY_ID
  value: {{ . | quote }}
  {{- end }}
{{- end }}
{{- if and .Values.storage.s3.secretName .Values.storage.s3.secretAccessKeyKey }}
- name: STORAGE_S3_SECRET_ACCESS_KEY
  valueFrom:
    secretKeyRef:
      name: {{ .Values.storage.s3.secretName | quote }}
      key: {{ .Values.storage.s3.secretAccessKeyKey | quote }}
{{- else }}
  {{- with .Values.storage.s3.secretAccessKey }}
- name: STORAGE_S3_SECRET_ACCESS_KEY
  value: {{ . | quote }}
  {{- end }}
{{- end }}
{{- end -}}
{{- end -}}
