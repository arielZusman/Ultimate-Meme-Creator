'use strict';

let canvasService = (function() {
  const MIN_SIZE = 15;
  const elCanvas = document.querySelector('#meme');
  const ctx = elCanvas.getContext('2d');

  let yTextPositions = [];

  let imageObj = null;
  let meme = {
    selectedImgId: null,
    txts: []
  };
  function init(src, id) {
    let image = new Image();
    image.onload = onImageLoad(image, id);
    image.src = src;
    return 0;
  }

  function addNewLine() {
    let x = elCanvas.width / 2;

    let idx = meme.txts.length;
    let y = yTextPositions[idx];
    createTextObj(x, y);

    // the idx of the last text
    return meme.txts.length - 1;
  }

  function createTextObj(x, y) {
    let txt = {
      x: x,
      y: y,
      line: '',
      size: 40,
      family: 'Arial',
      align: 'center',
      fill: '#ffffff',
      stroke: false
    };

    meme.txts.push(txt);
  }

  function renderText(value, idx) {
    // clear and redraw the image
    clearCanvas();
    ctx.drawImage(imageObj, 0, 0, elCanvas.width, elCanvas.height);

    // set current line text
    meme.txts[idx].line = value;

    // render lines
    for (const txt of meme.txts) {
      // let txt = meme.txts[idx];

      // set text styles
      ctx.fillStyle = txt.fill;
      // ctx.strokeStyle = txt.stroke;
      ctx.font = `${txt.size}px ${txt.font}`;
      ctx.textAlign = txt.align;

      // let maxWidth = elCanvas.width - 30;
      // TODO support for multiple lines;
      // let textWidth = ctx.measureText(value).width;
      // if (textWidth > maxWidth) {
      // }

      ctx.fillText(txt.line, txt.x, txt.y);

      if (txt.stroke) ctx.strokeText(txt.line, txt.x, txt.y);
    }
  }

  function changeTextProp(idx, prop) {
    let txt = meme.txts[idx];

    if (prop === 'stroke') {
      txt.stroke = !txt.stroke;
    } else if (prop.inc) {
      let inc = prop.inc;
      if (txt.size + inc < MIN_SIZE) {
        txt.size = MIN_SIZE;
      } else {
        txt.size += inc;
      }
    } else {
      Object.assign(txt, prop);
    }

    renderText(txt.line, idx);
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

      yTextPositions = [30, elCanvas.height - 30, elCanvas.height / 2];
      addNewLine();
    };
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
  }
  return {
    init: init,
    renderText: renderText,
    textSize: textSize,
    changeTextProp: changeTextProp,
    addNewLine: addNewLine
  };
})();
