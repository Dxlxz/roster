resource "kubernetes_namespace" "rostercrm" {
  metadata {
    annotations = {
      name = var.rostercrm_namespace
    }

    name = var.rostercrm_namespace
  }
}
