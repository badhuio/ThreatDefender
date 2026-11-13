let currentMode = 'FILE';

// ---------- helpers ----------

function parseResult(result) {
    const clean = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    try {
        return JSON.parse(clean);
    } catch {
        return clean;
    }
}

function isEmptyPayload(data) {
    if (data === null || data === undefined) return true;
    if (typeof data === "string") return data.trim() === "";
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === "object") return Object.keys(data).length === 0;
    return false;
}

// shared by FILE and URL
async function handleAiResponse(response, inputToClear) {
    if (!response.ok) {
        inputToClear.value = "";
        responsePopup("PAYLOAD CHECKING FAILED");
        return;
    }

    const result = await response.text();
    const data = parseResult(result);
    inputToClear.value = "";

    if (isEmptyPayload(data)) {
        responsePopup("PAYLOAD NOT FOUND");   // not found popup
    } else {
        responsePopup(data);                  // found popup
    }
}

// ---------- submit ----------

document.getElementById('submitBtn').onclick = async function () {
    const fileInputClear = document.getElementById("fileInput");
    const urlInputClear = document.getElementById("urlInput");
    const fileInput = fileInputClear.files[0];
    const urlInput = urlInputClear.value;

    if (currentMode === 'FILE') {

        if (!fileInput) {
            responsePopup("ADD FILE TO CHECK");
            return;
        }

        // FUTURE: doc/docx save-only flow. To enable, uncomment this block,
        // the fileSaveMatching function in adminPannel.js, and fileSaving() below.
        /*
        if (fileSaveMatching(fileInput.name)) {
            await fileSaving(fileInput, fileInputClear);
            return;
        }
        */

        // file format check
        if (!fileMatching(fileInput.name)) {
            fileInputClear.value = "";
            responsePopup("FILE FORMAT INVALID");
            return;
        }

        // payload check
        try {
            const fileData = new FormData();
            fileData.append("file", fileInput);

            const fileResponse = await fetch("/fileDataMatching", {
                method: "POST",
                body: fileData
            });

            await handleAiResponse(fileResponse, fileInputClear);
        } catch (e) {
            console.error("Data Passing program failed", e);
            fileInputClear.value = "";
            responsePopup("PAYLOAD CHECKING FAILED");
        }

    // FUTURE: IMAGE mode. Uncomment this block and imageMatching in adminPannel.js.
    /*
    } else if (currentMode === 'IMAGE') {

        if (!fileInput) {
            responsePopup("ADD IMAGE TO CHECK");
            return;
        }

        if (!imageMatching(fileInput.name)) {
            fileInputClear.value = "";
            responsePopup("IMAGE FORMAT INVALID");
            return;
        }

        try {
            const imageData = new FormData();
            imageData.append("image", fileInput);

            const imageResponse = await fetch("/imageDataMatching", {
                method: "POST",
                body: imageData
            });

            fileInputClear.value = "";
            responsePopup(imageResponse.ok ? "IMAGE CHECKED" : "IMAGE CHECKING FAILED");
        } catch (e) {
            console.log("Data Passing program failed", e);
            fileInputClear.value = "";
            responsePopup("IMAGE CHECKING FAILED");
        }
    */

    // FUTURE: VIDEO mode. Uncomment this block and videoMatching in adminPannel.js.
    /*
    } else if (currentMode === 'VIDEO') {

        if (!fileInput) {
            responsePopup("ADD VIDEO TO CHECK");
            return;
        }

        if (!videoMatching(fileInput.name)) {
            fileInputClear.value = "";
            responsePopup("VIDEO FORMAT INVALID");
            return;
        }

        try {
            const videoData = new FormData();
            videoData.append("Video", fileInput);

            const videoResponse = await fetch("/videoDataMatching", {
                method: "POST",
                body: videoData
            });

            fileInputClear.value = "";
            responsePopup(videoResponse.ok ? "VIDEO CHECKED" : "VIDEO CHECKING FAILED");
        } catch (e) {
            console.log("Data Passing program failed", e);
            fileInputClear.value = "";
            responsePopup("VIDEO CHECKING FAILED");
        }
    */

    } else if (currentMode === 'URL') {

        if (!urlInput.trim()) {
            responsePopup("ADD URL TO CHECK");
            return;
        }

        // url format check
        if (!urlMatching(urlInput)) {
            urlInputClear.value = "";
            responsePopup("URL FORMAT INVALID");
            return;
        }

        // payload check
        try {
            const urlData = new FormData();
            urlData.append("payload", urlInput.trim());

            const urlResponse = await fetch("/urlDataMatching", {
                method: "POST",
                body: urlData
            });

            await handleAiResponse(urlResponse, urlInputClear);
        } catch (e) {
            console.log("Data Passing program failed", e);
            urlInputClear.value = "";
            responsePopup("URL CHECKING FAILED");
        }

    } else {
        // IMAGE / VIDEO tabs are not active yet
        fileInputClear.value = "";
        responsePopup("THIS MODE IS NOT AVAILABLE YET");
    }
};

// ---------- save (FUTURE) ----------
/*
async function fileSaving(fileInput, fileInputClear) {
    try {
        const fileData = new FormData();
        fileData.append("file", fileInput);

        const fileResponse = await fetch('/fileDataSaving', {
            method: 'POST',
            body: fileData
        });

        fileInputClear.value = "";
        responsePopup(fileResponse.ok ? "PAYLOAD SAVED SUCCESSFULLY" : "PAYLOAD FAILED TO SAVE");
    } catch (e) {
        console.log("Data Passing Program Failed", e);
        fileInputClear.value = "";
        responsePopup("PAYLOAD FAILED TO SAVE");
    }
}
*/

//crossCheck

function fileMatching(fileInputName){
    return /\.(pdf|txt|ppt|pptx|zip|rar)$/i.test(fileInputName);
}

function urlMatching(urlInput){
    try {
        const url = new URL(urlInput.trim());
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

// FUTURE
// function fileSaveMatching(fileInputName){
//     return /\.(doc|docx)$/i.test(fileInputName);
// }
// function imageMatching(fileInputName){
//     return /\.(jpg|jpeg|png|webp|svg)$/i.test(fileInputName);
// }
// function videoMatching(fileInputName){
//     return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(fileInputName);
// }

