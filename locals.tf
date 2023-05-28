locals {
  enabled_services = [
    "postgresql",
    "function",
    "web_app"
  ]
  rg_name  = "azure_test"
  location = "eastus"
}
