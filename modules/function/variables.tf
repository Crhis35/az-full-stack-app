variable "fn_name" {
  description = "Name of the function"
}

variable "resource_group" {
  description = "The name of the resource group"
  type = object({
    name     = string
    location = string
  })
}