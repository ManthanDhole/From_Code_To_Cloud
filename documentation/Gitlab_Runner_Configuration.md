## Demo Flight Website
Angular based Application

## Pre-requisites
1. Node JS
2. NPM
3. Docker Desktop

## Build the App using following commands
```
npm install
npm run build 
```

## Gitlab Runner Commands
1. Pull Gitlab Runner Image <br>
```
docker pull gitlab/gitlab-runner:alpine
```
2. Run the Gitlab Runner Image with the Docker Sock Mounted to Allow Pulling Images mentioned in CI Job Configurations <br>
```
docker run -v /var/run/docker.sock:/var/run/docker.sock --name gitlab-runner gitlab/gitlab-runner:alpine
```
3. Register the Gitlab Runner Container. Execute the following command in the Gitlab Runner Container.
```
gitlab-runner register  --url <gitlab-server-url>  --token <user-token> --docker-network-mode 'host'
```

Docker command  <br>
```
docker exec -it <container-id> gitlab-runner register  --url https://gitlab.com  --token <user-token> --docker-network-mode 'host'
```