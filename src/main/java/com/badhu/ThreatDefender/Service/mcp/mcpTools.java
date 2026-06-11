package com.badhu.ThreatDefender.Service.mcp;

import com.badhu.ThreatDefender.Model.Payload;
import com.badhu.ThreatDefender.Service.adminService.dataService;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import org.springframework.ai.tool.annotation.Tool;

@Service
public class mcpTools {

    private final dataService dataService;

    public mcpTools(dataService dataService) {
        this.dataService = dataService;
    }

    @Tool(name = "scanUrl", description = "Scan URL for threats")
    public String scanUrl(String url) throws MalformedURLException {
       if(!dataService.urlMatching(url)){
            return "url does not match";
       }else {
           Payload payload =  dataService.urlChecking(url);
           if (payload == null){
               return  "no payloads found";
           }else {
               return dataService.askUrl(payload);
           }
       }
    }

    @Tool(name = "scanFile", description = "Scan uploaded file for threats")
    public String scanFile(List<Payload> payloads) throws TikaException, IOException {

        if(payloads == null ||payloads.isEmpty()){
            return "no files found";
        }
        return dataService.askFile(payloads);
    }

}
