var currentMode = 'FILE';

function dataMode(type, btn){

   currentMode = type;
   var dropZone = document.getElementById('dropZone');
   var urlInput = document.getElementById('urlInput');
   var fileInput = document.getElementById('fileInput');
   const span = document.querySelector('.drop-label span');

   fileInput.style.display = 'none';
   urlInput.style.display = 'none';

    var tabs = document.querySelectorAll(".tab");
    for (i=0; i<tabs.length; i++){
        tabs[i].classList.remove("active");
    }
        btn.classList.add("active");

   if(currentMode == 'URL'){
        urlInput.style.display = 'block';
        urlInput.accept = 'URL';
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


//popupMessage

function successPopup(popupMessage){
    document.getElementById('popupMessage').textContent = 'Payload saved';
    document.getElementById('popup').style.display = 'block';
}
function errorPopup(popupMessage){
    document.getElementById('popupMessage').textContent = 'Invalid format!';
    document.getElementById('popup').style.display = 'block';
}
function closePopup(){
    document.getElementById('popup').style.display = 'none';
}

//crossCheck

 function fileMatching(fileInput){
    if(!fileInput.match(/\.(pdf)$/i)){
        return false;
    }else{
        return true;
    }
 }