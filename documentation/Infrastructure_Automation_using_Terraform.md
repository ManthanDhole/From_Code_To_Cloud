### Infrastructure Provisioning Automation using Terraform

#### Pre-requisites

1. Package Manager: Choco(Windows) | Brew(MacOS) | APT(Ubuntu) 
2. Terraform CLI
3. AWS CLI
4. AWS Access Keys


#### Installing Terraform CLI & AWS CLI (Windows Specific Instructions)

```
choco install terraform
choco install aws

# Verify if Terraform & AWS CLI is installed correctly
terraform --version
aws --version
```

If you get the following response, it means that Terraform CLI tool is installed properly. If not, please check the [installation guide.](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
```
$ terraform --version
Terraform v1.14.4
on windows_amd64

$ aws --version
aws-cli/2.33.12 Python/3.13.11 Windows/11 exe/AMD64
```

#### Create Terraform Scripts for the Components we need for our application

1. Key Pair
2. Security Group (Ingress/Egress)
3. EC2 Instance

#### Generate AWS Access Keys

1. Navigate to the AWS Console > IAM > Users > admin-user (or the IAM user you're using) > Security Credentials > Create Access Keys
2. Open a terminal and configure the AWS CLI to use the Access Keys. The following command will prompt you to add <br>
    1. AWS Access Key <br>
    2. Secret Key <br>
    3. Default Region Name <br>
    4. Default Output Format <br>
Provide the Keys are prompted below.
```
aws configure

AWS Access Key ID [None]: AKIAxxxxxxxxxx4B4
AWS Secret Access Key [None]: KAsnxxxxxxx2UlJxxxJi
Default region name [None]: us-east-1 
Default output format [None]: json
```

#### Apply Terraform Scripts

After the configuration is complete, you can apply the terraform scripts and create your infrastructure.

1. Navigate to the directory where terraform scripts are available.
2. Run the following commands
```
terraform init      ## Initialize the AWS Providers
terraform plan      ## Test the Script and Check the possilbe outcome
terraform apply     ## Apply the changes to the AWS Account
```
Note: The <b>private key-pair</b> created using the terraform script will not be stored on the device. <br>
You'll need to extract it using the following command:
```
terraform output -raw private_key
```

3. Terraform will now create the mentioned resources in the AWS Account. Please verify is everything is as required.
4. To delete all the resources that are created by terraform, when not needed, please use the following command.
```
terraform destroy
```

#### SSH into the EC2 Instance

After the instance and key-pair are created, you can ssh into the instance using the following commands: <br>

1. Store the private-keypair
```
terraform output -raw private_key > flight-website-keypair.pem
```
2. Use SSH to log into the instance using the Public IP you got in the output section after `terraform apply`
```
ssh -i flight-website-keypair.pem ec2-user@<public-ip>
```