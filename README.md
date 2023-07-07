## Afourathon Hackathon Project
## Features


## Tech Stack
**Back-End:** [Spring-Boot](https://spring.io/), [Spring Security](https://docs.spring.io/spring-security/reference/index.html)   
**Database:** [MySQL](https://www.mysql.com/)  
**Front-end:** [React](https://react.dev/)



## Installation
Clone the repository

```bash
  git clone https://github.com/quack-quack-quads/ElWiz.git
  cd ElWiz
```
- Running on Docker: Make sure to install [docker](https://www.docker.com/products/docker-desktop/) and [docker-compose](https://docs.docker.com/compose/install/) for your operating system.

- Runing Locally: This app requires [Node](https://nodejs.org/en) v18+ and [Java](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) SE v17+ if you plan on running in locally.

### Note: Update the `.env` file as per your MySQL and Naming-Server configuration.  
You can check the `.env.example` in each services directory to provide the necessary fields to be provided in the `.env` file.

## Running on Docker
Pull the latest images
```bash
  docker compose pull
```
Start all the services
```bash
  docker compose up -d
```
Verify all the containers are running
```bash
  docker ps -a
```
The output should be something like this
```bash
CONTAINER ID   IMAGE                                         COMMAND                  CREATED          STATUS                     PORTS                    NAMES
5bde9eac946a   rohitshah1706/elwiz:api-gateway-latest        "java -jar ./ElWiz-A…"   42 seconds ago   Up 35 seconds              0.0.0.0:8001->8001/tcp   api-gateway
c74ff74847e4   rohitshah1706/elwiz:auth-service-latest       "java -jar ./ElWiz-A…"   42 seconds ago   Up 37 seconds              0.0.0.0:7070->7070/tcp   auth-service
b9c537f0c2dc   rohitshah1706/elwiz:elective-service-latest   "java -jar ./ElWiz-E…"   42 seconds ago   Up 37 seconds              0.0.0.0:8100->8100/tcp   elective-service
e1eb7729ccce   postgres:latest                               "docker-entrypoint.s…"   42 seconds ago   Up 39 seconds              0.0.0.0:5432->5432/tcp   postgres
4c2ed475ec96   rohitshah1706/elwiz:naming-server-latest      "java -jar ./ElWiz-N…"   42 seconds ago   Up 40 seconds              0.0.0.0:8761->8761/tcp   naming-server
```











## Authors
- [@Heliospook](https://github.com/Heliospook)
- [@RohitShah1706](https://github.com/RohitShah1706)
- [@todorokishotoua15](https://github.com/todorokishotoua15)

## License

[MIT](https://choosealicense.com/licenses/mit/)

