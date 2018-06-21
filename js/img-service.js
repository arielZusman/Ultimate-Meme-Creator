'use strict';

const imgService = (function() {
  const images_ = [
    { id: 0, url: 'imgs/003.jpg', keywords: ['trump', 'funny', 'celeb'] },
    { id: 1, url: 'imgs/004.jpg', keywords: ['dogs', 'cute', 'funny'] },
    { id: 2, url: 'imgs/005.jpg', keywords: ['cute', 'funny', 'happy'] },
    { id: 3, url: 'imgs/006.jpg', keywords: ['cat', 'sleepy'] },
    { id: 4, url: 'imgs/12.jpg', keywords: ['pointing'] },
    { id: 5, url: 'imgs/19.jpg', keywords: ['wtf', 'funny'] },
    { id: 6, url: 'imgs/2.jpg', keywords: ['happy', 'nature', 'flowers'] },
    { id: 7, url: 'imgs/5.jpg', keywords: ['funny', 'angry'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'celeb'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'imgs/Ancient-Aliens.jpg', keywords: ['alien'] },
    { id: 11, url: 'imgs/drevil.jpg', keywords: ['alien', 'celeb'] },
    { id: 12, url: 'imgs/img11.jpg', keywords: ['celeb', 'obama', 'happy'] },
    { id: 13, url: 'imgs/img12.jpg', keywords: ['kiss'] },
    { id: 14, url: 'imgs/img2.jpg', keywords: ['happy'] },
    { id: 15, url: 'imgs/img4.jpg', keywords: ['trump', 'funny', 'celeb'] },
    { id: 16, url: 'imgs/img5.jpg', keywords: ['wtf', 'funny'] },
    { id: 17, url: 'imgs/img6.jpg', keywords: ['dog', 'funny'] },
    { id: 18, url: 'imgs/leo.jpg', keywords: ['leo', 'celeb'] },
    { id: 19, url: 'imgs/meme1.jpg', keywords: ['celeb', 'matrix'] },
    {
      id: 20,
      url: 'imgs/One-Does-Not-Simply.jpg',
      keywords: ['celeb', 'game of thrones']
    },
    {
      id: 21,
      url: 'imgs/Oprah-You-Get-A.jpg',
      keywords: ['opera', 'celeb']
    },
    {
      id: 22,
      url: 'imgs/patrick.jpg',
      keywords: ['star trek', 'patrick', 'celeb']
    },
    { id: 23, url: 'imgs/putin.jpg', keywords: ['putin', 'celeb'] },
    { id: 24, url: 'imgs/X-Everywhere.jpg', keywords: ['toy story'] }
  ];

  let filter_ = '';
  function getImagesForDisplay() {
    return JSON.parse(JSON.stringify(images_));
  }

  function getKeywords() {
    let keywords = images_.reduce((acc, image) => {
      let keywords = image.keywords.filter(keyword => {
        return !acc.includes(keyword);
      });
      return acc.concat(keywords);
    }, []);

    return keywords;
  }

  function getIdsByFilter(filter) {
    filter = filter.trim().toLowerCase();
    return images_.reduce((acc, image) => {
      if (image.keywords.includes(filter)) {
        acc.push(image.id);
      }
      return acc;
    }, []);
  }

  function getImageById(id) {
    return images_.find(image => {
      return image.id === id;
    });
  }

  return {
    getImagesForDisplay: getImagesForDisplay,
    getKeywords: getKeywords,
    getIdsByFilter: getIdsByFilter,
    getImageById: getImageById
  };
})();
