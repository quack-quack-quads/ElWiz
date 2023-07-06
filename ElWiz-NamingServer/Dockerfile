# Stage 1: Build the java application
FROM maven:3.8.4-openjdk-17 AS build-stage

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean install 

# Stage 2: Run the java application
FROM openjdk:17-alpine3.14 as production-stage

WORKDIR /app

COPY --from=build-stage /app/target/ElWiz-NamingServer.jar ElWiz-NamingServer.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "./ElWiz-NamingServer.jar"]