let currentMode = 'FILE';


// check if real data came back
function hasPayload(data){

    // nothing came back
    if(!data){
        return false;
    }

    // text came back
    if(typeof data === 'string'){
        if(data.trim() === ""){
            return false;
        }
        if(data.toLowerCase().includes("not found")){
            return false;
        }
        return true;
    }

    // make it a list so one loop works for both
    if(!Array.isArray(data)){
        data = [data];
    }

    var keys = ["type", "risk", "priority", "mitigation"];

    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < keys.length; j++){
            var value = data[i][keys[j]];
            if(value && String(value).trim() !== ""){
                return true;   // found something real
            }
        }
    }

    return false;
}


document.getElementById('submitBtn').onclick = async function(){

    var fileInputClear = document.getElementById('fileInput');
    var urlInputClear = document.getElementById('urlInput');
    var fileInput = fileInputClear.files[0];
    var urlInput = urlInputClear.value;

    if(currentMode === 'FILE'){

        if(!fileInput){
            responsePopup("ADD FILE TO CHECK");
            return;
        }

        var fileMatchingResult = fileMatching(fileInput.name);

        if(fileMatchingResult === false){
            fileInputClear.value = "";
            responsePopup("FILE FORMAT INVALID");
            return;
        }

        try{
            const fileData = new FormData();
            fileData.append("file", fileInput);

            const fileResponse = await fetch("/fileDataMatching", {
                method: "POST",
                body: fileData
            });

            fileInputClear.value = "";

            if(fileResponse.ok){
                const result = await fileResponse.text();

                let clean = result
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                let data;
                try{ data = JSON.parse(clean); }catch{ data = clean; }
                console.log(data);

                // not found has priority
                if(!hasPayload(data)){
                    responsePopup("PAYLOAD NOT FOUND");
                }else{
                    responsePopup(data);
                }
            }else{
                responsePopup("PAYLOAD CHECKING FAILED");
            }
        }catch(e){
            console.error("Data Passing program failed", e);
            fileInputClear.value = "";
            responsePopup("PAYLOAD CHECKING FAILED");
        }

    }else if(currentMode === 'URL'){

        if(urlInput.trim() === ""){
            responsePopup("ADD URL TO CHECK");
            return;
        }

        var urlMatchingResult = urlMatching(urlInput);

        if(urlMatchingResult === false){
            urlInputClear.value = "";
            responsePopup("URL FORMAT INVALID");
            return;
        }

        try{
            const urlData = new FormData();
            urlData.append("payload", urlInput.trim());

            const urlResponse = await fetch("/urlDataMatching", {
                method: "POST",
                body: urlData
            });

            urlInputClear.value = "";

            if(urlResponse.ok){
                const result = await urlResponse.text();

                let clean = result
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                let data;
                try{ data = JSON.parse(clean); }catch{ data = clean; }
                console.log(data);

                // not found has priority
                if(!hasPayload(data)){
                    responsePopup("PAYLOAD NOT FOUND");
                }else{
                    responsePopup(data);
                }
            }else{
                responsePopup("URL CHECKING FAILED");
            }
        }catch(e){
            console.log("Data Passing program failed", e);
            urlInputClear.value = "";
            responsePopup("URL CHECKING FAILED");
        }

    }

    // FUTURE: IMAGE (uncomment this block + imageMatching in adminPannel.js)
    /*
    else if(currentMode === 'IMAGE'){

        if(!fileInput){
            responsePopup("ADD IMAGE TO CHECK");
            return;
        }

        if(imageMatching(fileInput.name) === false){
            fileInputClear.value = "";
            responsePopup("IMAGE FORMAT INVALID");
            return;
        }

        try{
            const imageData = new FormData();
            imageData.append("image", fileInput);

            const imageResponse = await fetch("/imageDataMatching", {
                method: "POST",
                body: imageData
            });

            fileInputClear.value = "";

            if(imageResponse.ok){
                responsePopup("IMAGE CHECKED");
            }else{
                responsePopup("IMAGE CHECKING FAILED");
            }
        }catch(e){
            console.log("Data Passing program failed", e);
            fileInputClear.value = "";
        }
    }
    */

    // FUTURE: VIDEO (uncomment this block + videoMatching in adminPannel.js)
    /*
    else if(currentMode === 'VIDEO'){

        if(!fileInput){
            responsePopup("ADD VIDEO TO CHECK");
            return;
        }

        if(videoMatching(fileInput.name) === false){
            fileInputClear.value = "";
            responsePopup("VIDEO FORMAT INVALID");
            return;
        }

        try{
            const videoData = new FormData();
            videoData.append("Video", fileInput);

            const videoResponse = await fetch("/videoDataMatching", {
                method: "POST",
                body: videoData
            });

            fileInputClear.value = "";

            if(videoResponse.ok){
                responsePopup("VIDEO CHECKED");
            }else{
                responsePopup("VIDEO CHECKING FAILED");
            }
        }catch(e){
            console.log("Data Passing program failed", e);
            fileInputClear.value = "";
        }
    }
    */
}


// FUTURE: doc/docx save only (uncomment this + fileSaveMatching in adminPannel.js,
// then call it from the FILE block before the format check)
/*
async function fileSaving(fileInput, fileInputClear){
    try{
        const fileData = new FormData();
        fileData.append("file", fileInput);

        const fileResponse = await fetch('/fileDataSaving', {
            method: 'POST',
            body: fileData
        });

        fileInputClear.value = "";

        if(fileResponse.ok){
            responsePopup("PAYLOAD SAVED SUCCESSFULLY");
        }else{
            responsePopup("PAYLOAD FAILED TO SAVE");
        }
    }catch(e){
        console.log("Data Passing Program Failed", e);
    }
}
*/
