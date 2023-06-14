# syntax=docker/dockerfile:1
# which Java image
FROM openjdk:latest
# Working dir
WORKDIR /app
# copy host to container
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Run inside image
RUN ./mvnw dependency:go-offline
COPY src ./src
# Run inside container
CMD ["./mvnw","spring-boot:run"]

