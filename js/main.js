'use strict';
let gCurrentLineIdx = 0;

function init() {
  renderSearch();
  render();
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
  let values = imgService.getKeywords();

  let optionsStrs = values.map(value => {
    return `<option value="${value}">${value}</option>`;
  });

  document.querySelector('#images').innerHTML = optionsStrs.join('');
}

function onFilterChange(elList) {
  let filter = elList.value;
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

function onCanvasClick(elCanvas, ev) {
  let lineObj = canvasService.editLine(ev.layerX, ev.layerY);
  if (lineObj) {
    gCurrentLineIdx = lineObj.idx;
    document.querySelector('.control__input').value = lineObj.line;
  }
}
