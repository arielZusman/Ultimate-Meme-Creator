'use strict';

let uploadService = (function() {
  function handleImageFromInput(file) {
    let reader = new FileReader();

    reader.onload = function(event) {
      let img = new Image();
      img.onload = onImageReady.bind(null, img);
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function uploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
    })
      .then(function(response) {
        return response.text();
      })
      .then(onSuccess)
      .catch(function(error) {
        console.error(error);
      });
  }

  function onImageReady(img) {
    document.getElementById('imgData').value = img.src;
  }

  return {
    handleImageFromInput: handleImageFromInput,
    uploadImg: uploadImg
  };
})();
