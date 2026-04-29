var fileInput;

document.getElementById('submitBtn').onclick = (function payloadSubmit(){
    var fileInput = document.getElementById('fileInput').value;
    var fileMatchingResult  = fileMatching(fileInput);
    console.log(fileMatchingResult);
        if(fileMatchingResult == true){
//            ajax
            successPopup();
            fileInput = '';
        }else{
            errorPopup();
            fileInput = '';
        }
});