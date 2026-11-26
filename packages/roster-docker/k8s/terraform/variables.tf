######################
# Required Variables #
######################
variable "rostercrm_pgdb_admin_password" {
  type        = string
  description = "rosterCRM password for postgres database."
  sensitive   = true
}

variable "rostercrm_app_hostname" {
  type        = string
  description = "The protocol, DNS fully qualified hostname, and port used to access rosterCRM in your environment. Ex: https://crm.example.com:443"
}

######################
# Optional Variables #
######################
variable "rostercrm_app_name" {
  type        = string
  default     = "rostercrm"
  description = "A friendly name prefix to use for every component deployed."
}

variable "rostercrm_server_image" {
  type        = string
  default     = "rostercrm/roster:latest"
  description = "rosterCRM server image for the server deployment. This defaults to latest. This value is also used for the workers image."
}

variable "rostercrm_db_image" {
  type        = string
  default     = "rostercrm/roster-postgres-spilo:latest"
  description = "rosterCRM image for database deployment. This defaults to latest."
}

variable "rostercrm_server_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the rosterCRM server deployment. This defaults to 1."
}

variable "rostercrm_worker_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the rosterCRM worker deployment. This defaults to 1."
}

variable "rostercrm_db_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the rosterCRM database deployment. This defaults to 1."
}

variable "rostercrm_server_data_mount_path" {
  type        = string
  default     = "/app/packages/roster-server/.local-storage"
  description = "rosterCRM mount path for servers application data. Defaults to '/app/packages/roster-server/.local-storage'."
}

variable "rostercrm_db_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "rostercrm_server_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "rostercrm_db_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for database persistent volume."
}

variable "rostercrm_db_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for database persistent volume claim."
}

variable "rostercrm_server_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "rostercrm_server_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for server persistent volume claim."
}

variable "rostercrm_namespace" {
  type        = string
  default     = "rostercrm"
  description = "Namespace for all rosterCRM resources"
}

variable "rostercrm_redis_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the rosterCRM Redis deployment. This defaults to 1."
}

variable "rostercrm_redis_image" {
  type        = string
  default     = "redis/redis-stack-server:latest"
  description = "rosterCRM image for Redis deployment. This defaults to latest."
}

variable "rostercrm_docker_data_mount_path" {
  type        = string
  default     = "/app/docker-data"
  description = "rosterCRM mount path for servers application data. Defaults to '/app/docker-data'."
}

variable "rostercrm_docker_data_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "rostercrm_docker_data_pv_capacity" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "rostercrm_docker_data_pvc_requests" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity reservation for server persistent volume claim."
}
