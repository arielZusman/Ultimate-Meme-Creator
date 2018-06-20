'use strict';

function init() {
  renderSearch();
  render();
}

function render() {
  let images = imgService.getImagesForDisplay();
  console.log(images);

  let imagesStrs = images.map(image => {
    let { id, url, keyword } = image;
    return `<img class="image" src="${url}" data-id="${id}" alt="${keyword.join(
      ' '
    )}"/>`;
  });

  document.querySelector('.image-container').innerHTML = imagesStrs.join('');
}
function renderSearch() {
  let images = imgService.getImagesForDisplay();

  let optionsStrs = images.map(image => {
    let { id, url } = image;
    let value = url.replace('imgs/', '');
    value = value.replace('.jpg', '');

    return `<option value="${value}">${value}</option>`;
  });

  document.querySelector('#images').innerHTML = optionsStrs.join('');
}
