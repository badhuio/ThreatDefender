package com.badhu.ThreatDefender.Service.adminService;

import com.badhu.ThreatDefender.Model.Payload;
import com.badhu.ThreatDefender.Repository.adminRepository.dataRepository;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class dataService {

    @Autowired
    dataRepository dataRepository;

    public Boolean fileMatching(String fileName){
        return fileName.matches("(?i).+\\.(pdf|doc|docx|txt|jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mov|avi|mkv|3gp)$");
    }

    public boolean dataExtract(MultipartFile file) throws IOException, TikaException {

        Tika tika = new Tika();

        String dataExtracted = tika.parseToString(file.getInputStream())
                .trim()
                .toLowerCase();

        List<Payload> payloads = dataRepository.findAll();

        for(Payload payload : payloads){

            if(payload.getPayload() != null &&
                    dataExtracted.contains(payload.getPayload().trim().toLowerCase())){

                return true;
            }
        }

        return false;
    }

    public boolean fileSaveMatching(String fileName){
        return fileName.matches("(?i).+\\.(doc|docx)$");
    }

    public boolean fileSaving(MultipartFile file) throws IOException, TikaException {

        Tika tika = new Tika();

        String dataExtracted = tika.parseToString(file.getInputStream());

        String[] dataExtractedSplitting = dataExtracted.split("\\R");

        for(String payload : dataExtractedSplitting){

            if(payload.trim().isEmpty()){
                continue;
            }

            String cleanPayload = payload.trim();

            if(dataRepository.existsByPayload(cleanPayload)){
                continue;
            }

            Payload payloadModel = new Payload();

            payloadModel.setPayload(cleanPayload);

            dataRepository.save(payloadModel);
        }

        return true;
    }
}