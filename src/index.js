import debounce from 'lodash.debounce';
// import { error, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';
// import countryCardTpl from './templates/country-card.hbs';
// import countriesListTpl from './templates/countries-list.hbs';
// import API from './js/fetchCountries';

import formTpl from './templates/form.hbs';
import imgCardTpl from './templates/img-card.hbs';
// import onSearch from './js/apiService';
import ImgApiService from './js/apiService';

// ***
console.log('13 домашка');
// ***

// -----создаем исходную разметку
const bodyEl = document.querySelector('body');

function appendMarkup(element) {
    bodyEl.insertAdjacentHTML('beforeend', formTpl(element));
}
appendMarkup();

const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
// console.log(loadMoreBtn);

const searchFormEl = document.querySelector('.search-form');

const imgApiService = new ImgApiService();

searchFormEl.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    // console.log(e.target.value);
    //    const form = e.target;
    imgApiService.query = e.target.value;
    console.log(imgApiService.query);
    // чтобы очищалось вместе с инпутом
    // clearContainer(); 
    if (imgApiService.query === '' || imgApiService.query === ' ') {
    // return console.log('Введи что-нибудь');
        return;
    }
    console.log('Нужно убрать невидимость с кнопки');
    //  loadMoreBtn.classList.remove('visually-hidden');
    imgApiService.resetPage();
    // imgApiService.fetchImgCards().then(hits => console.log(hits));
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
     galleryEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        });
}
// ---------разметка карточек изображений
function appendGalleryMarkup(hits) {
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
// ---------очистка контейнера
function clearContainer() {
    galleryEl.innerHTML = '';
}