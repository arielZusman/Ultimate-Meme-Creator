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
             alt="${keywords.join(' ')}"></div>`;
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
