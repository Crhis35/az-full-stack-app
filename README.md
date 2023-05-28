# Azure Test

## Steps

1. Execute terraform command `terraform apply -auto-approve`
2. Get password `terraform output -json` and replace in *az-api* db config.
3. Deploy api and web app with `yarn deploy`.
