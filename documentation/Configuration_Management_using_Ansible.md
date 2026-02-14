### Configuration Management using Ansible

##### Pre-requisites 

1. EC2 Instance
2. SSH Private Key
3. Docker 
4. Ansible (Alpine) Image


##### Steps to Configure Ansible

1. You need to have an EC2 instance running and it Public IP along with an SSH Key.
2. Pull a Docker Image for Ansible: `docker pull alpine/ansible:latest` <br>
Configuring Ansible on Non-UNIX machine could be a bit error prone. Either use WSL or Ubuntu Docker to proceed further.

3. Once you have the Public IP of Instance and the SSH key associated with it. <br>
Create an Inventory File `inventory.ini` which would have the Public IP and reference to the Private SSH Key to be used for it.
Ex:
```
[flight-app-instance]
<IP-ADDRESS> ansible_user=ec2-user ansible_ssh_private_key_file=<PATH-TO-SSH-KEY>
```

4. Create a Dockerfile as follow and copy the required things in the image
```
FROM alpine/ansible:latest
COPY ./ /usr/src/app
```
5. Enter into WSL Mode and Run Docker Desktop to build the image
```
docker build -t ansible .
```

6. Run the docker image and enter into its Terminal/Shell to further execute the Ansible commands.
```
docker run -itd --rm --name ansible-container ansible sleep infinity
```
Sleep Infinity is used so that the container should now exit as it does not contain anything to keep it in a running state

7. Enter in the container when in WSL (Not from GitBash or Powershell) using the container name/Id with the following command
```
wsl
docker exec -it <container-name/Id> /bin/bash
docker exec -it ansible-container /bin/bash
```

8. Navigate to the folder containing the Ansible Playbook & Private Key PEM file and Try to ssh into the EC2 instance from the container
```
ssh -i <ssh-privatekey.pem> ec2-user@<instance-public-ip>
```

9.  Eexecute the following command to configure the instance.
```
ansible-playbook -i <inventory-file.ini> <filename.yml>

ansible-playbook -i inventory.ini nginx.yml
```

##### Troubleshooting 

1. If the permissions are too wide/open for the Private pem file, Ansible will not execute the playbooks for that host.
Narrow down the Permissions to only Read for Admin users, use the following command
```
chmod 400 ssh-privatekey.pem
```

2. If the hosts are not in the list of Known Host, create `~/.ssh` folder and add a `known_hosts` or try to ssh into the instance which would add hosts in the known_hosts file.