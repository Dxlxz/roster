resource "kubernetes_service" "rostercrm_redis" {
  metadata {
    name      = "${var.rostercrm_app_name}-redis"
    namespace = kubernetes_namespace.rostercrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.rostercrm_app_name}-redis"
    }
    session_affinity = "ClientIP"
    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}
