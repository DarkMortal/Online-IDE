# OnlineIDE made with node server on Ubuntu Linux

## [Link to docker Image](https://hub.docker.com/r/darkmortal69/onlineide)
## Steps to run the app
- Build frontend using

      yarn build
- Build backend using

      yarn build
- Place both the generated folders in `builds` folder.
- Install the necessary packages using

      yarn install
- Start the app using

      yarn start
***
## Docker commands
Command to get the app-image

    docker pull darkmortal69/onlineide:infinity
Command to build the docker application

    docker build -t onlineide:infinity .
Command to run the docker application

    docker run -p 5000:8000 darkmortal69/onlineide:infinity
Docker get ID of all running containers

    docker ps
Stopping a Docker container

    docker stop container_id
# Screenshots
<img width="1366" height="637" alt="image" src="https://github.com/user-attachments/assets/98b5553b-806b-4b2c-9bc0-aedcdaa2ac3f" />
<img width="1366" height="636" alt="image" src="https://github.com/user-attachments/assets/9382de03-c697-40b0-8d00-fcd4b6983099" />

***
