'use strict';

const imgService = (function() {
  const images_ = [
    { id: 0, url: 'imgs/003.jpg', keyword: ['trump', 'funny', 'celeb'] },
    { id: 1, url: 'imgs/004.jpg', keyword: ['dogs', 'cute', 'funny'] },
    { id: 2, url: 'imgs/005.jpg', keyword: ['cute', 'funny', 'happy'] },
    { id: 3, url: 'imgs/006.jpg', keyword: ['cat', 'sleepy'] },
    { id: 4, url: 'imgs/12.jpg', keyword: ['pointing'] },
    { id: 5, url: 'imgs/19.jpg', keyword: ['wtf', 'funny'] },
    { id: 6, url: 'imgs/2.jpg', keyword: ['happy', 'nature', 'flowers'] },
    { id: 7, url: 'imgs/5.jpg', keyword: ['funny', 'angry'] },
    { id: 8, url: 'imgs/8.jpg', keyword: ['funny', 'celeb'] },
    { id: 9, url: 'imgs/9.jpg', keyword: ['happy'] },
    { id: 10, url: 'imgs/Ancient-Aliens.jpg', keyword: ['alien'] },
    { id: 11, url: 'imgs/drevil.jpg', keyword: ['alien', 'celeb'] },
    { id: 12, url: 'imgs/img11.jpg', keyword: ['celeb', 'obama', 'happy'] },
    { id: 13, url: 'imgs/img12.jpg', keyword: ['kiss'] },
    { id: 14, url: 'imgs/img2.jpg', keyword: ['happy'] },
    { id: 15, url: 'imgs/img4.jpg', keyword: ['trump', 'funny', 'celeb'] },
    { id: 16, url: 'imgs/img5.jpg', keyword: ['wtf', 'funny'] },
    { id: 17, url: 'imgs/img6.jpg', keyword: ['dog', 'funny'] },
    { id: 18, url: 'imgs/leo.jpg', keyword: ['leo', 'celeb'] },
    { id: 19, url: 'imgs/meme1.jpg', keyword: ['celeb', 'matrix'] },
    {
      id: 20,
      url: 'imgs/One-Does-Not-Simply.jpg',
      keyword: ['celeb', 'game of thrones']
    },
    {
      id: 21,
      url: 'imgs/Oprah-You-Get-A.jpg',
      keyword: ['opera', 'celeb']
    },
    {
      id: 22,
      url: 'imgs/patrick.jpg',
      keyword: ['star trek', 'patrick', 'celeb']
    },
    { id: 23, url: 'imgs/putin.jpg', keyword: ['putin', 'celeb'] },
    { id: 24, url: 'imgs/X-Everywhere.jpg', keyword: ['toy story'] }
  ];

  function getImagesForDisplay() {
    return JSON.parse(JSON.stringify(images_));
  }

  return { getImagesForDisplay: getImagesForDisplay };
})();
