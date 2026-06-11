package com.badhu.ThreatDefender.Configuration.java;

import com.badhu.ThreatDefender.Service.mcp.mcpTools;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class mcpConfiguration {

    @Bean
    public ToolCallbackProvider tools(mcpTools tools) {
        return MethodToolCallbackProvider.builder()
                .toolObjects(tools)
                .build();
    }
}