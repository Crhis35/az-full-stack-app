terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-tfstate"
    storage_account_name = "devtfstate30567"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}