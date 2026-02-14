# Use this file to Run the Terraform Script 

cd ./terraform-scripts/EC2_SG_KeyPairs
terraform init
terraform plan
terraform apply -auto-approve

terraform output -raw private_key > ssh-privatekey.pem
terraform output instance_public_ip > instance-ip.txt

cp ssh-privatekey.pem ../../ansible-scripts/ssh-privatekey.pem