package com.badhu.ThreatDefender.Service.adminService;

import com.badhu.ThreatDefender.Model.Payload;
import com.badhu.ThreatDefender.Repository.adminRepository.dataRepository;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@Service
public class dataService {

    @Autowired
    dataRepository dataRepository;

    public Boolean fileMatching(String fileName){
        return fileName.matches("(?i).+\\.(pdf|txt|jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mov|avi|mkv|3gp)$");
    }

    public Boolean urlMatching(String urlInput) throws MalformedURLException {

        URL url = new URL(urlInput.trim());

        String protocol = url.getProtocol().toLowerCase();

        return protocol.equals("http") || protocol.equals("https");
    }

    public boolean urlChecking(String url) {

        try {

            List<Payload> payloads = dataRepository.findAll();

            String checkingUrl = url.toLowerCase().trim();

            for (Payload payload : payloads) {

                if (payload.getPayload() != null &&
                        checkingUrl.contains(
                                payload.getPayload()
                                        .trim()
                                        .toLowerCase()
                        )) {

                    return true;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }


//            // connect website
//            Document doc = Jsoup.connect(urlChecking)
//                    .userAgent("Mozilla/5.0")
//                    .timeout(5000)
//                    .ignoreHttpErrors(true)
//                    .get();
//
//            // extract html
//            String html = doc.html().toLowerCase();
//
//            // check website content
//            for(Payload payload : payloads){
//
//                if(payload.getPayload() != null &&
//                        html.contains(payload.getPayload().trim().toLowerCase())){
//
//                    response.put(payload.getPayload(), true);
//
//                    return response;
//                }
//            }
//
//        } catch (Exception e){
//
//            e.printStackTrace();
//        }
//
//        return response;
//    }

    public Payload dataExtract(MultipartFile file) throws IOException, TikaException {

        Tika tika = new Tika();

        String dataExtracted = tika.parseToString(file.getInputStream())
                .trim()
                .toLowerCase();

        List<Payload> payloads = dataRepository.findAll();

        for(Payload payload : payloads){

            if(payload.getPayload() != null &&
                    dataExtracted.contains(payload.getPayload().trim().toLowerCase())){

                return payload;
            }
        }

        return null;
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

            String cleanPayload = payload.trim().toLowerCase();

            // already exists
            if(dataRepository.existsByPayload(cleanPayload)){
                continue;
            }

            String priority = "SAFE";

            // HIGH
            if(cleanPayload.contains("union select") ||
                    cleanPayload.contains("' or '1'='1") ||
                    cleanPayload.contains("cmd.exe") ||
                    cleanPayload.contains("powershell") ||
                    cleanPayload.contains("whoami") ||
                    cleanPayload.contains("../../../") ||
                    cleanPayload.contains("/etc/passwd") ||
                    cleanPayload.contains("onerror=alert(") ||
                    cleanPayload.contains("javascript:") ||
                    cleanPayload.contains("wget http") ||
                    cleanPayload.contains("curl http") ||
                    cleanPayload.contains("bash -i") ||
                    cleanPayload.contains("nc -e") ||
                    cleanPayload.contains("${jndi:")){

                priority = "HIGH";
            }

            // MEDIUM
            else if(cleanPayload.contains("<script>alert(") ||
                    cleanPayload.contains("<script>") ||
                    cleanPayload.contains("onerror=") ||
                    cleanPayload.contains("onclick=") ||
                    cleanPayload.contains("document.cookie") ||
                    cleanPayload.contains("eval(") ||
                    cleanPayload.contains("base64_decode(") ||
                    cleanPayload.contains("{{7*7}}") ||
                    cleanPayload.contains("<%= 7*7 %>")){

                priority = "MEDIUM";
            }

            Payload payloadModel = new Payload();

            payloadModel.setPayload(cleanPayload);
            payloadModel.setPriority(priority);

            dataRepository.save(payloadModel);
        }

        return true;
    }
}