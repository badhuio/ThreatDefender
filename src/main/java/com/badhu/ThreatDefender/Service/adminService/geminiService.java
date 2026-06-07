package com.badhu.ThreatDefender.Service.adminService;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class geminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String askGemini(String prompt) {

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();

        return client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null
        ).text();
    }
}