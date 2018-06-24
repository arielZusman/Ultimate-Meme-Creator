'use strict';
let gCurrentLineIdx = 0;

function init() {
  imgService.init();
  renderSearch();
  render();
  renderKeywords();
}

function render() {
  let images = imgService.getImagesForDisplay();
  console.log(images);

  let imagesStrs = images.map(image => {
    let { id, url, keywords } = image;
    return `<div class="image"
             style="background-image:url('${url}')"
             data-id="${id}" 
             alt="${keywords.join(' ')}"
             onclick="onImageClick(this)"
             ></div>`;
  });

  document.querySelector('.image-container').innerHTML = imagesStrs.join('');
}

function renderSearch() {
  let keywords = imgService.getKeywords();
  keywords = Object.keys(keywords);
  let optionsStrs = keywords.map(keyword => {
    return `<option value="${keyword}">${keyword}</option>`;
  });

  document.querySelector('#images').innerHTML = optionsStrs.join('');
}

function renderKeywords() {
  let keywordsMap = imgService.getKeywords();
  let baseFontSize = 1;

  let keywords = Object.keys(keywordsMap);

  let keywordsStrs = keywords.map(keyword => {
    let fontSize = keywordsMap[keyword] * baseFontSize;
    return `<li>
              <a href="#" 
                style="font-size: ${fontSize}em"
                onclick="onKeywordClick('${keyword}', event)">
                ${keyword}
                </a>
            </li>`;
  });

  document.querySelector('.keywords-container').innerHTML = keywordsStrs.join(
    ''
  );
}

function onKeywordClick(keyword, ev) {
  ev.preventDefault();

  imgService.updateKeywordsMap(keyword);
  renderKeywords();

  document.querySelector('.image-filter__input').value = keyword;
  onFilterChange(keyword);
}

function onFilterChange(filter) {
  let ids = imgService.getIdsByFilter(filter);

  let elImages = document.querySelectorAll('.image');

  elImages.forEach(elImage => {
    if (ids.includes(+elImage.dataset.id)) elImage.classList.remove('hidden');
    else elImage.classList.add('hidden');
  });
}

function onToggleMobileMenu(elNavToggle) {
  document.querySelector('.header__nav').classList.toggle('header__nav--open');
}

function onMenuClick() {
  document.querySelector('.header__nav').classList.remove('header__nav--open');
}

function onImageClick(elImage) {
  let id = +elImage.dataset.id;
  let imageData = imgService.getImageById(id);
  let src = imageData.url;

  canvasService.init(src, id);
}

function onTextChange(value) {
  canvasService.renderText(value, gCurrentLineIdx);
}

function onTextPropChange(prop) {
  canvasService.changeTextProp(gCurrentLineIdx, prop);
}
function onIncreaseText() {
  canvasService.textSize(gCurrentLineIdx, 5);
}
function onDecreaseText() {
  canvasService.textSize(gCurrentLineIdx, -5);
}

function onBackToGallery() {
  document.querySelector('#editor').classList.add('hidden');
  document.querySelector('#gallery').classList.remove('hidden');
}

function onAddNewLine() {
  gCurrentLineIdx = canvasService.addNewLine();
  document.querySelector('.control__input').value = '';
}

function onCanvasClick(ev) {
  let lineObj = canvasService.editLine(ev.layerX, ev.layerY);
  if (lineObj) {
    gCurrentLineIdx = lineObj.idx;
    document.querySelector('.control__input').value = lineObj.line;
  }
}

function onDownloadCanvas(elLink) {
  canvasService.download();
  let imgContent = canvasService.download();
  elLink.href = imgContent;
  elLink.download = 'meme.jpg';
}

function onDeleteLine() {
  canvasService.deleteLine(gCurrentLineIdx);
  if (gCurrentLineIdx > 0) {
    gCurrentLineIdx--;
  }
  document.querySelector('.control__input').value = '';
}

function onLineMove(eventKeyboard) {
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      canvasService.moveLine(gCurrentLineIdx, 'up');
      break;
    case 'ArrowDown':
      canvasService.moveLine(gCurrentLineIdx, 'down');
      break;
    case 'ArrowLeft':
      canvasService.moveLine(gCurrentLineIdx, 'left');
      break;
    case 'ArrowRight':
      canvasService.moveLine(gCurrentLineIdx, 'right');
      break;
  }
}

function onDragStart(ev) {
  canvasService.dragStart(ev.layerX, ev.layerY);
}

function onDragEnd(ev) {
  canvasService.dragEnd(gCurrentLineIdx);
}

function onDragLine(ev) {
  canvasService.dragLine(ev.movementX, ev.movementY, gCurrentLineIdx);
}

function onUploadImg(elForm, ev) {
  ev.preventDefault();
  uploadService.uploadImg(elForm, imgService.onImageReady);
}

function onFileInputChange(ev) {
  uploadService.handleImageFromInput(ev.target.files[0]);
}

function onPublishImg(elForm, ev) {
  ev.preventDefault();
  var imgSrc = canvasService.getDataUrl();
  document.querySelector('#imgToPublish').value = imgSrc;
  uploadService.uploadImg(elForm, onPublishSuccess);
}

function onPublishSuccess(uploadedImgUrl) {
  console.log('uploadedImgUrl', uploadedImgUrl);

  uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
  document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`;
}
