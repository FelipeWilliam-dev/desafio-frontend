FROM gradle:8.4-jdk21 AS build

WORKDIR /app
COPY . .
RUN gradle clean build -x test

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
COPY src/main/resources/data.json ./data.json

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
