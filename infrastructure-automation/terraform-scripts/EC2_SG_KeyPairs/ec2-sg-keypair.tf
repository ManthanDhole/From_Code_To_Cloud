provider "aws" {
    region = "us-east-1"
}

## Key Pair
resource "tls_private_key" "flight-website-app-ssh-key" {
    algorithm = "RSA"
    rsa_bits = 4096
}

resource "aws_key_pair" "ssh-keypair" {
    key_name = "flight-website-keypair"
    public_key = tls_private_key.flight-website-app-ssh-key.public_key_openssh
}

## Security Group 
resource "aws_security_group" "allow_http_traffic" {
    name = "Allow HTTP at Port 80"
    description = "Allow HTTP at Port 80 for NginX Server"

    ingress {
        description = "SSH inbound"
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "HTTP inbound"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "All outbound traffic"
        from_port = 0
        to_port = 0 
        protocol = -1
        cidr_blocks = ["0.0.0.0/0"]
    }
}

## EC2 Instance
resource "aws_instance" "upload-app-bundle" {
    ami = "ami-0532be01f26a3de55"
    instance_type = "t3.micro"
    vpc_security_group_ids = [ aws_security_group.allow_http_traffic.id ]
    key_name = aws_key_pair.ssh-keypair.key_name
}

## Get the Public Ip of the EC2 Instance created
output "instance_public_ip" {
    description = "Public IP of EC2 Instance"
    value = aws_instance.upload-app-bundle.public_ip
}


## Get the Private Key Pair as Output.
## It would not be stored on the device. You'll need another command to save it.
## `terraform output -raw private_key`
output "private_key" {
    description = "Private Key Pair"
    value = tls_private_key.flight-website-app-ssh-key.private_key_pem
    sensitive = true
}
