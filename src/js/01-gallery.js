// Import gallery-items
import { galleryItems } from './gallery-items';

// Описаний в документації Simplelightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів Simplelightbox
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');

const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
populateList(galleryCardsMarkup);

function createGalleryCardsMarkup(imgItems) {
  return imgItems
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
          />
        </a>
      `;
    })
    .join('');
}

function populateList(markup) {
  galleryRef.innerHTML = markup;
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  //   captionPosition:	"bottom", // Default
  captionDelay: 250,
});
