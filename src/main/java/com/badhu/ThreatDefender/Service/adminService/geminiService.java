package com.badhu.ThreatDefender.Service.adminService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class geminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String urlAi(String urlAi) {

        try {
            RestTemplate restTemplate = new RestTemplate();

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                            + apiKey;

            String prompt = """
                    You are a cybersecurity analyst.

                    Analyze the following payload.

                    Identify:
                    - Risk Level (LOW, MEDIUM, HIGH)
                    - Attack Type
                    - Explanation
                    - Mitigation

                    Payload:
                    %s

                    Respond only in JSON.
                    """.formatted(urlAi);

            Map<String, Object> body = Map.of(
                    "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
            );

            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(json, headers);

            return restTemplate.postForObject(urlAi, request, String.class);

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}