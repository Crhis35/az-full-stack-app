resource "azurerm_resource_group" "resource_group" {
  name     = local.rg_name
  location = local.location
}


resource "random_integer" "ri" {
  min = 10000
  max = 99999
}
resource "random_password" "password" {
  length           = 12
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

module "db_postgres" {
  count                     = contains(local.enabled_services, "postgresql") ? 1 : 0
  source                    = "./modules/database"
  name                      = "az-test-sql"
  db_name                   = "azure_test_db"
  postgresql-admin-login    = "azure_test"
  postgresql-admin-password = random_password.password.result
  postgresql-sku-name       = "B_Standard_B1ms"
  postgresql-storage        = 32768
  postgresql-version        = "14"
  resource_group = {
    name     = azurerm_resource_group.resource_group.name,
    location = azurerm_resource_group.resource_group.location
  }
}

module "fn_gql" {
  count  = contains(local.enabled_services, "function") ? 1 : 0
  source = "./modules/function"

  fn_name = "azapigql"
  resource_group = {
    name     = azurerm_resource_group.resource_group.name,
    location = azurerm_resource_group.resource_group.location
  }
}

#Create Storage account
resource "azurerm_storage_account" "web_app" {
  count = contains(local.enabled_services, "web_app") ? 1 : 0

  name                = "azwebapptestaccount"
  resource_group_name = azurerm_resource_group.resource_group.name

  location                 = azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"

  static_website {
    index_document = "index.html"
  }
}
