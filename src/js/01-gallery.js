// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGallery (galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);
gallery.addEventListener("click", onClick);

function createGallery (galleryItems) { 
    return galleryItems.map(({preview, original, description}) => 
        `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </div>`
).join("");
};

function onClick (evt){
    if(evt.target.tagName !== 'IMG') return;

    evt.preventDefault();

    const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
`,{
    onClose: (instance) => {
    window.removeEventListener('keydown', onModelClose);
    }
});

    instance.show();

    const onModelClose = (evt) => {
        if (evt.key === 'Escape') instance.close();
    }
    window.addEventListener('keydown', onModelClose);
}

