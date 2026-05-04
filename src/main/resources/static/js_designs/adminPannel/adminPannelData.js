currentMode = 'FILE';

document.getElementById('submitBtn').onclick = async function(){
           var fileInput = document.getElementById('fileInput').files[0];
           var urlInput = document.getElementById('urlInput').value;

           var fileInputClear = document.getElementById('fileInput');
           var urlInputClear = document.getElementById('urlInput');

           if(currentMode === 'FILE' ){
               var fileMatchingResult = fileMatching(fileInput);

                if(!videoMatchingResult == true){
                    errorPopup();
                    fileInput.value = '';
                }

                   if(fileMatchingResult == true){

           //            ajax
                   const fileData = new FormData();
                   fileData.append("file",fileInput);

                   try{
                           const urlResponse = await fetch("/fileDataSending",{
                                 method: "POST",
                                 body:  fileData
                           });
                       if(urlResponse.ok){
                        successPopup();
                        fileInputClear.value = '';
                       }else{
                           elsePopup();
                           fileInputClear.value = '';
                       }
                   }catch(e){
                        console.error("Data Passing program failed",e);

                   }}

           }else if(currentMode === 'IMAGE'){
                var imageMatchingResult = fileMatching(fileInput);

                 if(!videoMatchingResult == true){
                     errorPopup();
                     fileInput.value = '';
                 }

                if(imageMatchingResult === true){

                    try{
                        const imageData = new FormData();
                        imageData.append("image",fileInput);

                        const imageResponse = await fetch("/imageDataSending", {
                              method : "POST",
                              body : imageData
                        });

                            if(imageResponse.ok){
                                successPopup();
                                fileInput.value = '';
                            }else{
                                elsePopup();
                                fileInput.value = '';
                            }
                    }catch (e){
                        console.log("Data Passing program failed",e);
                    }}

           }else if(currentMode === 'VIDEO'){
                var videoMatchingResult = fileMatching(fileInput);

                if(!videoMatchingResult == true){
                    errorPopup();
                    fileInput.value = '';
                }

                if(videoMatchingResult == true){
                    try{

                        const videoData = new FormData();
                        videoData.append("Video", fileInput);

                        const videoResponse = await fetch("/videoDataSending", {
                              method : "POST",
                              body : videoData
                        });

                        if(videoResponse.ok){
                            successPopup();
                            fileInput.value = '';
                        }else{
                            elsePopup();
                            fileInput.value = '';
                        }
                    }catch(e){
                        console.log("Data Passing program failed",e);
                    }
                }

           }else if(currentMode === 'URL'){
                var urlMatchingResult = urlMatching(urlInput);

                if(!urlMatchingResult == true){
                    errorPopup();
                    fileInput.value = '';
                }

                if(urlMatchingResult == true){
                    try{
                        const urlData = new FormData();
                        urlData.append("url", urlInput);

                        const urlResponse = await fetch("/urlDataSending" , {
                            method : 'POST',
                            body : urlData
                        });

                        if(urlResponse.ok){
                            successPopup();
                            fileInput.value = '';
                        }else{
                            elsePopup();
                            urlInput.value = '';
                        }
                    }catch(e){
                        console.log("Data Passing program failed",e);
                    }
                    }
                }

}