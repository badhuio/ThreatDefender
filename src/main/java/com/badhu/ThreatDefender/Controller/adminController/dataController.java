package com.badhu.ThreatDefender.Controller.adminController;

import com.badhu.ThreatDefender.Model.Payload;
import com.badhu.ThreatDefender.Service.adminService.dataService;
import com.badhu.ThreatDefender.Service.adminService.geminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
public class dataController {

    @Autowired
    private dataService dataService;

    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }

    @PostMapping("/fileDataMatching")
    public String fileDataMatching(@RequestParam("file") MultipartFile file) {

        try {

            String fileName = file.getOriginalFilename();

            if (fileName == null || !dataService.fileMatching(fileName)) {
                return "FILE FORMAT INVALID";
            }

            List<Payload> payloads = dataService.dataExtract(file);

            if (payloads == null || payloads.isEmpty()) {
                return "PAYLOAD NOT FOUND";
            }


            return dataService.askFile(payloads);

        } catch (Exception e) {

            e.printStackTrace();
            return "PAYLOAD CHECKING FAILED";
        }
    }

    @PostMapping("/urlDataMatching")
    public String urlDataMatching(
            @RequestParam("payload") String urlInput) {

        try {

            if (!dataService.urlMatching(urlInput)) {
                return "URL FORMAT INVALID";
            }

            Payload payload = dataService.urlChecking(urlInput);

            if (payload == null) {
                return "PAYLOAD NOT FOUND";
            }

            return dataService.askUrl(payload);

        } catch (Exception e) {
            e.printStackTrace();
            return "URL CHECKING FAILED";
        }
    }


    @PostMapping("/fileDataSaving")
    public boolean fileDataSaving(@RequestParam("file") MultipartFile file) {

        try {

            String fileName = file.getOriginalFilename();

            if (fileName == null || !dataService.fileSaveMatching(fileName)) {
                return false;
            }

            return dataService.fileSaving(file);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}