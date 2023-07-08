# Stage 1: Build the Java Application
FROM maven:3.8.4-openjdk-17 AS build-stage

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean install

# Stage 2: Build the final optimized docker image
FROM openjdk:17-jdk-alpine AS production-stage

WORKDIR /app

EXPOSE 7070

COPY --from=build-stage /app/target/ElWiz-AuthService.jar .

ENTRYPOINT ["java", "-jar", "./ElWiz-AuthService.jar"]
