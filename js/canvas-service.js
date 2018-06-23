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

  let fontFamily = '';

  function init(src, id) {
    let image = new Image();
    image.onload = onImageLoad(image, id);
    image.src = src;
    return 0;
  }

  function loadFont() {
    var f = new FontFace('impact', 'url("../fonts/impact.ttf")');

    f.load().then(function(font) {
      fontFamily = font.family;
      addNewLine();
    });
  }
  function addNewLine() {
    let x = elCanvas.width / 2;

    let idx = meme.txts.length;
    let y = yTextPositions[idx];
    createTextObj(x, y);
    drawTextBox(meme.txts.length - 1);
    // the idx of the last text
    return meme.txts.length - 1;
  }

  /**
   * get the click mouse position
   * and return an object with index of text to edit
   * and the text
   */
  function editLine(mouseX, mouseY) {
    let actualX = (elCanvas.width * mouseX) / elCanvas.clientWidth;
    let actualY = (elCanvas.height * mouseY) / elCanvas.clientHeight;

    let idx = meme.txts.findIndex(txt => {
      let boxPositionY = txt.y - txt.size + 5;
      return (
        actualX > 10 &&
        actualX < elCanvas.width - 20 &&
        actualY > boxPositionY &&
        actualY < txt.y + 5
      );
    });
    return idx > -1 ? { idx: idx, line: meme.txts[idx].line } : null;
  }

  function download() {
    console.dir(imageObj);
    return elCanvas.toDataURL('image/jpeg');
  }

  function createTextObj(x, y) {
    let txt = {
      x: x,
      y: y,
      line: '',
      size: 100,
      family: fontFamily,
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

    drawTextBox(idx);

    // render lines
    for (const txt of meme.txts) {
      // set text styles
      ctx.fillStyle = txt.fill;
      // ctx.font = `${txt.size}px/1 ${txt.font}`;
      ctx.font = `normal 700 ${txt.size}px ${txt.family}`;
      ctx.textAlign = txt.align;

      ctx.fillText(txt.line, txt.x, txt.y);

      if (txt.stroke) ctx.strokeText(txt.line, txt.x, txt.y);
    }
  }

  function drawTextBox(idx) {
    let boxPositionY = meme.txts[idx].y - meme.txts[idx].size + 5;
    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    ctx.strokeRect(
      10,
      boxPositionY,
      elCanvas.width - 20,
      meme.txts[idx].size + 5
    );
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

      elCanvas.height = image.height;
      elCanvas.width = image.width;

      clearCanvas();
      ctx.drawImage(image, 0, 0, elCanvas.width, elCanvas.height);

      yTextPositions = [50, elCanvas.height - 10, elCanvas.height / 2];
      loadFont();
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
    addNewLine: addNewLine,
    editLine: editLine,
    download: download
  };
})();
