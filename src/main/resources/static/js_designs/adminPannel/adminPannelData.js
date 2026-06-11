let currentMode = 'FILE';

document.getElementById('submitBtn').onclick = async function(){
           var fileInput = document.getElementById('fileInput').files[0];
           var urlInput = document.getElementById('urlInput').value;

                var fileInputClear = document.getElementById("fileInput");
                var urlInputClear = document.getElementById('urlInput');


           if(currentMode === 'FILE' ){

            if(!fileInput ){
                let popupMessage = "ADD FILE TO CHECK";
                responsePopup(popupMessage);
                return;
            }

               var fileMatchingResult = fileMatching(fileInput.name);

                if(fileMatchingResult == false){
                    try{
                        let fileSaved = await fileSaveMatching(fileInput.name);

                        console.log("fileSaved:",fileSaved);

                        if(fileSaved == false){
                            fileInputClear.value = "";
                                let popupMessage = "FILE FORMAT INVALID";
                                responsePopup(popupMessage);
                        }else{
                            await fileSaving(fileInput,fileInputClear);
                        }

                    }catch (e){
                    console.log("fileSaving failed",e)
                    }
                }

                   if(fileMatchingResult == true){

           //            ajax
                   const fileData = new FormData();
                   fileData.append("file",fileInput);

                   try{
                       const fileResponse = await fetch("/fileDataMatching",{
                             method: "POST",
                             body:  fileData
                       });
                       if(fileResponse.ok){

                        const result = await fileResponse.text();

                       if(result !== null){

                        let clean = result
                            .replace(/```json/g, "")
                            .replace(/```/g, "")
                            .trim();

                        const data = JSON.parse(clean);
                        console.log(data);

                           fileInputClear.value = "";
                                responsePopup(data);


                                        /*const fileAi = fileData;
                                        aiData.append("payload", fileInput.value);
                                           const fileAiResult = await fetch("/ask", {
                                                method : "POST",
                                                body : fileAi
                                           });

                                           console.log("fileAiResult",fileAiResult);

                                                if(fileAiResult !== null){
                                                    popupMessage = await fileAiResult.text();
                                                    responsePopup(popupMessage);
                                                }else{
                                                    popupMessage = "gemini communication failed";
                                                    responsePopup(popupMessage);
                                                }*/
                       }else{
                           fileInputClear.value = "";
                                let popupMessage = "PAYLOAD NOT FOUNDED";
                                responsePopup(popupMessage);
                       }

                       }else{
                           fileInputClear.value = "";
                                let popupMessage = "PAYLOAD CHECKING FAILED";
                                responsePopup(popupMessage);
                       }
                   }catch(e){
                        console.error("Data Passing program failed",e);
                   }}

           }else if(currentMode === 'IMAGE'){
                var imageMatchingResult = fileMatching(fileInput.name);

                 if(!videoMatchingResult == true){
//                     errorPopup();
                     fileInputClear.value = "";
                 }

                if(imageMatchingResult === true){

                    try{
                        const imageData = new FormData();
                        imageData.append("image",fileInput);

                        const imageResponse = await fetch("/imageDataMatching", {
                              method : "POST",
                              body : imageData
                        });

                            if(imageResponse.ok){
//                                matchPopup();
                                fileInputClear.value = "";
                            }else{
//                                elsePopup();
                                fileInputClear.value = "";
                            }
                    }catch (e){
                        console.log("Data Passing program failed",e);
                    }}

           }else if(currentMode === 'VIDEO'){
                var videoMatchingResult = fileMatching(fileInput.name);

                if(!videoMatchingResult == true){
//                    errorPopup();
                    fileInputClear.value = "";
                }

                if(videoMatchingResult == true){
                    try{

                        const videoData = new FormData();
                        videoData.append("Video", fileInput);

                        const videoResponse = await fetch("/videoDataMatching", {
                              method : "POST",
                              body : videoData
                        });

                        if(videoResponse.ok){
//                            matchPopup();
                            fileInputClear.value = "";
                        }else{
//                            elsePopup();
                            fileInputClear.value = "";
                        }
                    }catch(e){
                        console.log("Data Passing program failed",e);
                    }
                }

           }else if(currentMode === 'URL'){

                let urlMatchingResult = urlMatching(urlInput);

                if(urlMatchingResult === false){
                    urlInputClear.value = "";
                    responsePopup("URL FORMAT INVALID");
                    return;
                }

                try {

                    const urlData = new FormData();
                    urlData.append("payload", urlInput);

                    const urlResponse = await fetch("/urlDataMatching", {
                        method: "POST",
                        body: urlData
                    });

                    if(urlResponse.ok){

                        const result = await urlResponse.text();

                            let clean = result
                                .replace(/```json/g, "")
                                .replace(/```/g, "")
                                .trim();

                            const data = JSON.parse(clean);

                            urlInputClear.value = "";



                        responsePopup(data);

                    }else{

                        responsePopup("URL CHECKING FAILED");

                    }

                }catch(e){

                    console.log("Data Passing program failed", e);
                    responsePopup("URL CHECKING FAILED");

                }
            }
}


        async function fileSaving(fileInput,fileInputClear){
                try{
                    const fileData = new FormData();
                    fileData.append("file",fileInput);

                        try{
                            const fileResponse = await fetch('/fileDataSaving',{
                                method : 'POST',
                                body : fileData
                            });

                            if(fileResponse.ok){
                                fileInputClear.value = "";
                                    let popupMessage = "PAYLOAD SAVED SUCCESSFULLY";
                                    responsePopup(popupMessage);
                            }else{
                                fileInputClear.value = "";
                                     let popupMessage = "PAYLOAD FAILED TO SAVE";
                                     responsePopup(popupMessage);
                            }
                        }catch(e){
                            console.log("Data Passing Program Failed",e);
                        }

                }catch(e){
                    console.log("error",e);
                }
           }
