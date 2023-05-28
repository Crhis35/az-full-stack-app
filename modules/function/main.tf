
resource "azurerm_storage_account" "fn_storage_account" {
  name                     = "${var.fn_name}storage"
  location                 = var.resource_group.location
  resource_group_name      = var.resource_group.name
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "fn_app_service_plan" {
  name                = "${var.fn_name}-plan"
  location            = var.resource_group.location
  resource_group_name = var.resource_group.name
  os_type             = "Linux"
  sku_name            = "Y1"

}

resource "azurerm_application_insights" "application_insights" {
  name                = "${var.fn_name}-insights"
  location            = var.resource_group.location
  resource_group_name = var.resource_group.name
  application_type    = "Node.JS"
}

resource "azurerm_linux_function_app" "fn_app" {
  name                       = var.fn_name
  location                   = var.resource_group.location
  resource_group_name        = var.resource_group.name
  service_plan_id            = azurerm_service_plan.fn_app_service_plan.id
  storage_account_name       = azurerm_storage_account.fn_storage_account.name
  storage_account_access_key = azurerm_storage_account.fn_storage_account.primary_access_key





  site_config {
    application_insights_key = azurerm_application_insights.application_insights.instrumentation_key

    application_stack {
      node_version = "18"
    }

    cors {
      allowed_origins = ["*"]
    }
  }

  app_settings = {
    FUNCTIONS_EXTENSION_VERSION    = "~4"
    FUNCTIONS_WORKER_RUNTIME       = "node"
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.application_insights.instrumentation_key
    AzureWebJobsFeatureFlags       = "EnableWorkerIndexing"
    WEBSITE_NODE_DEFAULT_VERSION   = "~18"
    WEBSITE_RUN_FROM_PACKAGE       = "1"
  }

}
