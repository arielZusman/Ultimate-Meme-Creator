'use strict';

function init() {
  render();
}

function render() {
  let images = imgService.getImagesForDisplay();
  console.log(images);

  let strHtml = '';

  let imagesStrs = images.map(image => {
    let { id, url, keyword } = image;
    return `<img class="image" src="${url}" data-id="${id}" alt="${keyword.join(
      ' '
    )}"/>`;
  });

  document.querySelector('.image-container').innerHTML = imagesStrs.join('');
}
