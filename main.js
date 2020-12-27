import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const imageModalRef = document.querySelector(".lightbox__image");
const closeModalButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlayRef = document.querySelector(".lightbox__overlay");
let indexCurrentImage;
galleryRef.addEventListener("click", onOpenModal);

function createGalleryItems({ original, preview, description }, index) {
  const galItem = document.createElement("li");
  const galLink = document.createElement("a");
  const galImg = document.createElement("img");

  galItem.classList.add("gallery__item");
  galLink.classList.add("gallery__link");
  galImg.classList.add("gallery__image");

  galLink.href = original;
  galImg.src = preview;
  galImg.alt = description;
  galImg.setAttribute("data-source", original);
  galImg.setAttribute("data-index", index);
  galLink.append(galImg);
  galItem.append(galLink);
  return galItem;
}

function createGallery(galleryItems) {
  return galleryItems.map((galleryItem, index) => {
    return createGalleryItems(
      {
        original: galleryItem.original,
        preview: galleryItem.preview,
        description: galleryItem.description,
      },
      index
    );
  });
}

galleryRef.append(...createGallery(galleryItems));

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  indexCurrentImage = Number(event.target.dataset.index);
  modalRef.classList.add("is-open");
  imageModalRef.src = event.target.dataset.source;
  imageModalRef.alt = event.target.alt;
  closeModalButton.addEventListener("click", onCloseModal);
  overlayRef.addEventListener("click", onCloseModal);
  window.addEventListener("keydown", onPressKey);
}

function onCloseModal() {
  modalRef.classList.remove("is-open");
  imageModalRef.src = "";
}

function onPressKey(event) {
  switch (event.code) {
    case "Escape":
      onCloseModal();
      break;
    case "ArrowRight":
      indexCurrentImage + 1 === galleryItems.length
        ? (indexCurrentImage = 0)
        : (indexCurrentImage += 1);
      imageModalRef.src = galleryItems[indexCurrentImage].original;
      break;

    case "ArrowLeft":
      indexCurrentImage === 0
        ? (indexCurrentImage = galleryItems.length - 1)
        : (indexCurrentImage -= 1);
      imageModalRef.src = galleryItems[indexCurrentImage].original;
      break;

    default:
      break;
  }
}
