resource "kubernetes_service" "rostercrm_db" {
  metadata {
    name      = "${var.rostercrm_app_name}-db"
    namespace = kubernetes_namespace.rostercrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.rostercrm_app_name}-db"
    }
    session_affinity = "ClientIP"
    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}
