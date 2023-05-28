
resource "azurerm_postgresql_flexible_server" "this" {
  name                   = var.name
  resource_group_name    = var.resource_group.name
  location               = var.resource_group.location
  version                = var.postgresql-version
  administrator_login    = var.postgresql-admin-login
  administrator_password = var.postgresql-admin-password
  zone                   = "1"
  storage_mb             = var.postgresql-storage
  sku_name               = var.postgresql-sku-name
  backup_retention_days  = 7


}
resource "azurerm_postgresql_flexible_server_database" "this" {
  name      = "${var.name}-db"
  server_id = azurerm_postgresql_flexible_server.this.id
  collation = "en_US.UTF8"
  charset   = "UTF8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "this" {
  count     = length(var.allowed_ip)
  name      = "${var.name}-rule-${count.index}"
  server_id = azurerm_postgresql_flexible_server.this.id

  start_ip_address = var.allowed_ip[count.index].start
  end_ip_address   = var.allowed_ip[count.index].end
}
