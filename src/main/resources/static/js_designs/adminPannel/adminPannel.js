function dataMode(type, btn){

    currentMode = type;
    var dropZone = document.getElementById('dropZone');
    var urlInput = document.getElementById('urlInput');
    var fileInput = document.getElementById('fileInput');
    var span = document.querySelector('.drop-label span');

    fileInput.style.display = 'none';
    urlInput.style.display = 'none';

    var tabs = document.querySelectorAll(".tab");
    for(var i = 0; i < tabs.length; i++){
        tabs[i].classList.remove("active");
    }
    btn.classList.add("active");

    if(currentMode == 'URL'){
        urlInput.style.display = 'block';
        dropZone.style.display = 'none';
    }else if(currentMode == 'IMAGE'){
        span.textContent = 'browse image';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
        fileInput.accept = '.jpg,.jpeg,.png,.webp,.svg';
    }else if(currentMode == 'VIDEO'){
        span.textContent = 'browse video';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
        fileInput.accept = '.mp4,.webm,.ogg,.mov,.avi,.mkv';
    }else{
        span.textContent = 'browse file';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
        fileInput.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.zip,.rar';
    }
}


//popupMessages

function responsePopup(data){

    var popup = document.getElementById("popupMessage");
    popup.textContent = "";

    // one object -> make it a list
    if(data && typeof data === "object" && !Array.isArray(data) && !data.message){
        data = [data];
    }

    if(Array.isArray(data)){

        var keys = ["type", "risk", "priority", "mitigation"];

        for(var n = 0; n < data.length; n++){

            var item = data[n];
            var card = document.createElement("div");
            card.className = "result-card";

            // only add a box if it has a value
            for(var i = 0; i < keys.length; i++){
                if(item[keys[i]]){
                    var span = document.createElement("span");
                    span.textContent = item[keys[i]];
                    card.appendChild(span);
                }
            }

            // skip empty cards
            if(card.children.length > 0){
                popup.appendChild(card);
            }
        }

    }else{
        if(typeof data === "string"){
            popup.textContent = data;
        }else{
            popup.textContent = data.message || "Something went wrong";
        }
    }

    document.getElementById("popup").style.display = "block";
}


//close after click "ok"

function closePopup(){
    document.getElementById('popup').style.display = 'none';
}


//crossCheck

function fileMatching(fileInputName){
    return /\.(pdf|txt|ppt|pptx|zip|rar)$/i.test(fileInputName);
}

function urlMatching(urlInput){
    try{
        var url = new URL(urlInput.trim());
        return url.protocol === 'http:' || url.protocol === 'https:';
    }catch(e){
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
