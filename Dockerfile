FROM eclipse-temurin:17

WORKDIR /app

COPY src/main/java/com/badhu/ThreatDefender .

RUN chmod +x gradlew

RUN ./gradlew build

EXPOSE 8080

CMD ["java", "-jar", "build/libs/ThreatDefender-0.0.1-SNAPSHOT.jar"]