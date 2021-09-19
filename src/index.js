import debounce from 'lodash.debounce';
// import { error, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';
import formTpl from './templates/form.hbs';
import imgCardTpl from './templates/img-card.hbs';
import ImgApiService from './js/apiService';

// -----создаем исходную разметку
const containerEl = document.querySelector('.container');

function appendMarkup(element) {
    containerEl.insertAdjacentHTML('beforeend', formTpl(element));
}
appendMarkup();

const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const searchFormEl = document.querySelector('.search-form');

const imgApiService = new ImgApiService();

searchFormEl.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    imgApiService.query = e.target.value;
    console.log(imgApiService.query);
    // чтобы очищалось вместе с инпутом
    // clearContainer(); 
    if (imgApiService.query === '' || imgApiService.query === ' ') {
    // return console.log('Введи что-нибудь');
        return;
    }
    imgApiService.resetPage();
    imgApiService.fetchImgCards().then(hits => {
        // очищает перед появлением результата нового запроса
        clearContainer();
        appendGalleryMarkup(hits);
        loadMoreBtn.classList.remove('visually-hidden');
    });
}

function onLoadMore() {
    imgApiService.fetchImgCards().then(hits => {
        appendGalleryMarkup(hits);
        scroll();
    })
}

function scroll() {
    setTimeout(() => {
        loadMoreBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, 1000);
}
    
// ---------разметка карточек изображений
function appendGalleryMarkup(hits) {
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
// ---------очистка контейнера
function clearContainer() {
    galleryEl.innerHTML = '';
}