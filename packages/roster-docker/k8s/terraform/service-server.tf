resource "kubernetes_service" "rostercrm_server" {
  metadata {
    name      = "${var.rostercrm_app_name}-server"
    namespace = kubernetes_namespace.rostercrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.rostercrm_app_name}-server"
    }
    session_affinity = "ClientIP"
    port {
      name        = "http-tcp"
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}
