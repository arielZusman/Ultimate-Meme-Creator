'use strict';
let gCurrentLineIdx = 0;

function init() {
  imgService.init();
  renderSearch();
  render();
  renderKeywords();
  getFontList();
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

// get fonts from google
function getFontList() {
  let url =
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyARVUmPpWziASm1rlO6d12srMZt8vV8u8o&sort=popularity';

  fetch(url, {
    method: 'GET'
  })
    .then(function(response) {
      return response.json();
    })
    .then(renderFontList)
    .catch(function(error) {
      console.error(error);
    });
}

function renderFontList(fonts) {
  // to many fonts....
  // let optionsStrs = fonts.items.map(font => {
  //   return `<option value="${font.family}">${font.family}</option>`;
  // });

  let strHtml = '<option value="impact">Impact</option>';
  for (let i = 0; i < 10; i++) {
    let currFontFamily = fonts.items[i].family;
    strHtml += `<option value="${currFontFamily}">${currFontFamily}</option>`;
  }
  document.querySelector('#fonts').innerHTML = strHtml;
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
  console.log(ev.layerX, ev.layerY);

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
