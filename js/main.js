'use strict';

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

  let image = new Image();
  image.onload = onImageLoad(image);
  image.src = src;
  // console.dir(image);
}

function onImageLoad(image) {
  return function() {
    let elCanvas = document.querySelector('#meme');
    let ctx = elCanvas.getContext('2d');

    let elEditor = document.querySelector('#editor');
    elCanvas.width = elEditor.offsetWidth;

    const max_width = elCanvas.width;

    if (image.width > max_width) {
      image.height = (image.height * max_width) / image.width;
      image.width = max_width;
    }
    elCanvas.height = image.height;

    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    ctx.drawImage(image, 0, 0, elCanvas.width, elCanvas.height);
  };
}
