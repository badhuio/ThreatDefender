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
        dropZone.style.display = 'none';
   }else if(currentMode == 'IMAGE'){
        span.textContent = 'browse image';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
   }else if(currentMode == 'VIDEO'){
        span.textContent = 'browse video';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
   }else{
        span.textContent = 'browse file';
        dropZone.style.display = 'block';
        fileInput.style.display = 'block';
   }
}
