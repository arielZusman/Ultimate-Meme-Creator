'use strict';

let canvasService = (function() {
  const elCanvas = document.querySelector('#meme');
  const ctx = elCanvas.getContext('2d');

  let imageObj = null;
  let meme = {};
  function loadImage(src, id) {
    let image = new Image();
    image.onload = onImageLoad(image, id);
    image.src = src;
  }

  function changeText(value) {
    clearCanvas();
    ctx.drawImage(imageObj, 0, 0, elCanvas.width, elCanvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '50px arial';
    ctx.fillText(value, 50, 50);
  }

  function onImageLoad(image, id) {
    return function() {
      imageObj = image;
      meme.selectedImgId = id;

      document.querySelector('#gallery').classList.add('hidden');

      let elEditor = document.querySelector('#editor');
      elCanvas.width = elEditor.offsetWidth;

      const max_width = elCanvas.width;

      if (image.width > max_width) {
        image.height = (image.height * max_width) / image.width;
        image.width = max_width;
      }
      elCanvas.height = image.height;

      clearCanvas();
      ctx.drawImage(image, 0, 0, elCanvas.width, elCanvas.height);
    };
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
  }
  return { loadImage: loadImage, changeText: changeText };
})();
