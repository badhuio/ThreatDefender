plugins {
	java
	id("org.springframework.boot") version "4.0.5"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.badhu"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {

	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("com.google.genai:google-genai:1.55.0")

	implementation("org.apache.tika:tika-core:3.2.1")
	implementation("org.apache.tika:tika-parsers-standard-package:3.2.1")

	implementation(platform("org.springframework.ai:spring-ai-bom:1.0.1"))
	implementation ("org.springframework.ai:spring-ai-starter-mcp-server")

	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("org.springframework.boot:spring-boot-starter-test")

	testCompileOnly("org.projectlombok:lombok")
	testAnnotationProcessor("org.projectlombok:lombok")
}

tasks.withType<Test> {
	useJUnitPlatform()
}