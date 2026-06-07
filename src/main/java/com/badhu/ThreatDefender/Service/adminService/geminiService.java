package com.badhu.ThreatDefender.Service.adminService;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class geminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String askGemini(String prompt) {

        if(prompt == null || prompt.isBlank()){
            return "Invalid prompt";
        }

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();

        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.5-flash-lite",
                "gemini-2.0-flash",
                "gemini-2.0-flash-lite"
        };

        for (String model : models) {

            try {

                System.out.println("Trying model: " + model);

                String response = client.models.generateContent(
                        model,
                        prompt,
                        null
                ).text();

                if (response != null && !response.isBlank()) {
                    return response;
                }

            } catch (Exception e) {

                System.out.println(
                        "Model failed: "
                                + model
                                + " | Error: "
                                + e.getMessage()
                );
            }
        }

        return """
                Risk: UNKNOWN
                Priority: UNKNOWN
                Type: AI Service Unavailable
                Mitigation: Gemini quota exceeded or all models failed. Try again later.
                """;
    }
}