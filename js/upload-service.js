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

// facebook api
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
