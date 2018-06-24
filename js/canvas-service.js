'use strict';

let canvasService = (function() {
  const MIN_FONT_SIZE = 15;
  const BASE_FONT_SIZE = 40;

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
      size: BASE_FONT_SIZE,
      family: 'Impact',
      align: 'center',
      fill: '#ffffff',
      stroke: true,
      isDragging: false
    };

    meme.txts.push(txt);
  }

  function changeText(value, idx) {
    // clear and redraw the image
    redrawImage();
    // ctx.drawImage(imageObj, 0, 0, elCanvas.width, elCanvas.height);

    // set current line text
    meme.txts[idx].line = value;

    drawTextBox(idx);

    renderTextLines();
  }

  function renderTextLines() {
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

  function deleteLine(idx) {
    if (meme.txts.length > 1) {
      meme.txts.splice(idx, 1);
    } else {
      meme.txts[idx].line = '';
    }
    redrawImage();
    renderTextLines();
  }

  function moveLine(idx, direction) {
    let txt = meme.txts[idx];

    switch (direction) {
      case 'up':
        txt.y -= 5;
        break;
      case 'down':
        txt.y += 5;
        break;
      case 'left':
        txt.x -= 5;
        break;
      case 'right':
        txt.x += 5;
        break;
    }

    redrawImage();
    renderTextLines();
  }

  function dragStart(mouseX, mouseY) {
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
    if (idx > -1) meme.txts[idx].isDragging = true;
  }

  function dragEnd(idx) {
    meme.txts[idx].isDragging = false;
  }

  function dragLine(movX, movY, idx) {
    let txt = meme.txts[idx];
    if (txt.isDragging) {
      txt.y += movY;
      txt.x += movX;
      redrawImage();
      renderTextLines();
    }
  }

  function changeTextProp(idx, prop) {
    let txt = meme.txts[idx];

    if (prop === 'stroke') {
      txt.stroke = !txt.stroke;
    } else if (prop.inc) {
      let inc = prop.inc;
      if (txt.size + inc < MIN_FONT_SIZE) {
        txt.size = MIN_FONT_SIZE;
      } else {
        txt.size += inc;
      }
    } else {
      Object.assign(txt, prop);
    }

    changeText(txt.line, idx);
  }

  function getDataUrl() {
    // prepare canvas for upload
    redrawImage();
    renderTextLines();

    return elCanvas.toDataURL('image/jpeg');
  }

  function onImageLoad(image, id) {
    return function() {
      imageObj = image;
      meme.selectedImgId = id;

      document.querySelector('#gallery').classList.add('hidden');

      document.querySelector('#editor').classList.remove('hidden');

      elCanvas.height = image.height;
      elCanvas.width = image.width;

      redrawImage();

      yTextPositions = [50, elCanvas.height - 10, elCanvas.height / 2];
      addNewLine();
    };
  }

  function redrawImage() {
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    ctx.drawImage(imageObj, 0, 0, elCanvas.width, elCanvas.height);
  }

  return {
    init: init,
    renderText: changeText,
    changeTextProp: changeTextProp,
    addNewLine: addNewLine,
    editLine: editLine,
    download: download,
    deleteLine: deleteLine,
    moveLine: moveLine,
    dragStart: dragStart,
    dragEnd: dragEnd,
    dragLine: dragLine,
    getDataUrl: getDataUrl
  };
})();
