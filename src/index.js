import debounce from 'lodash.debounce';
// import { error, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
// import './sass/main.scss';
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


// let searchQuery = '';
function onSearch(e) {
    // console.log(e.target.value);
    //    const form = e.target;
    imgApiService.query = e.target.value;
    console.log(imgApiService.query);
    // чтобы очищалось вместе с инпутом
    // clearContainer(); 
    if (imgApiService.query === '' || imgApiService.query === ' ') {
    return console.log('Введи что-нибудь');
  }
//     const url = `https://pixabay.com/api/?key=23370908-ce48d92bb09d31672ee5e9cf0&q=${searchQuery}&image_type=photo&per_page=12&page=3`;
// fetch(url)
//     .then(r => r.json())
//     .then(appendGalleryMarkup);
    imgApiService.resetPage();
    // imgApiService.fetchImgCards().then(hits => console.log(hits));
    imgApiService.fetchImgCards().then(hits => {
        // очищает перед появлением результата нового запроса
        clearContainer();
        appendGalleryMarkup(hits);
    });
}




function onLoadMore() {
//      const url = `https://pixabay.com/api/?key=23370908-ce48d92bb09d31672ee5e9cf0&q=${searchQuery}&image_type=photo&per_page=12&page=3`;
// fetch(url)
//     .then(r => r.json())
//     .then(appendGalleryMarkup);

imgApiService.fetchImgCards().then(appendGalleryMarkup);
    
}


// ---------разметка карточек изображений
function appendGalleryMarkup(hits) {
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
// ---------очистка контейнера
function clearContainer() {
    galleryEl.innerHTML = '';
}