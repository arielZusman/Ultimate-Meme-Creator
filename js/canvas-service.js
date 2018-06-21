'use strict';

let canvasService = (function() {
  const MIN_SIZE = 15;
  const elCanvas = document.querySelector('#meme');
  const ctx = elCanvas.getContext('2d');

  let textStyle = {
    size: 40,
    family: 'Arial',
    align: 'left',
    fill: '#ffffff',
    stroke: '#000000'
  };

  let imageObj = null;
  let meme = {
    selectedImgId: null,
    txts: []
  };
  function init(src, id) {
    loadImage(src, id);
    createTextObj(30, 30);
  }
  function loadImage(src, id) {
    let image = new Image();
    image.onload = onImageLoad(image, id);
    image.src = src;
  }

  function createTextObj(x, y) {
    let txt = {
      x: x,
      y: y,
      line: ''
    };

    Object.assign(txt, textStyle);
    meme.txts.push(txt);
  }

  function renderText(value, idx) {
    // clear and redraw the image
    clearCanvas();
    ctx.drawImage(imageObj, 0, 0, elCanvas.width, elCanvas.height);
    let txt = meme.txts[idx];

    // set text styles
    ctx.fillStyle = txt.fill;
    ctx.strokeStyle = txt.stroke;
    ctx.font = `${txt.size}px ${txt.font}`;
    ctx.textAlign = txt.align;

    txt.line = value;
    let maxWidth = elCanvas.width - 30;
    ctx.fillText(value, txt.x, txt.y, maxWidth);
    ctx.strokeText(value, txt.x, txt.y, maxWidth);
  }

  function textSize(idx, inc) {
    let txt = meme.txts[idx];

    if (txt.size + inc < MIN_SIZE) {
      txt.size = MIN_SIZE;
    } else {
      txt.size += inc;
    }

    renderText(txt.line, idx);
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
  return { init: init, renderText: renderText, textSize: textSize };
})();
