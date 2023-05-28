output "outbound_ips" {
  description = "IP addreses from the function"
  value       = azurerm_linux_function_app.fn_app.outbound_ip_address_list
}
