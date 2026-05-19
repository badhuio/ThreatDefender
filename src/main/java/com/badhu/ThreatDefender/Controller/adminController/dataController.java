package com.badhu.ThreatDefender.Controller.adminController;

import com.badhu.ThreatDefender.Service.adminService.dataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class dataController {

    @Autowired
    dataService dataService;

    @PostMapping("/fileDataMatching")
    public boolean fileDataMatching(@RequestParam("file") MultipartFile file) {

        try {

            String fileName = file.getOriginalFilename();

            if (fileName == null || !dataService.fileMatching(fileName)) {
                return false;
            }

            return dataService.dataExtract(file);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
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