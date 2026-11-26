resource "kubernetes_persistent_volume_claim" "server" {
  metadata {
    name      = "${var.rostercrm_app_name}-server-pvc"
    namespace = kubernetes_namespace.rostercrm.metadata.0.name
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.rostercrm_server_pvc_requests
      }
    }
    volume_name = kubernetes_persistent_volume.server.metadata.0.name
  }
}
