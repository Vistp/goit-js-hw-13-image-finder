// import debounce from 'lodash.debounce';
// import { error, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
// import './sass/main.scss';
// import countryCardTpl from './templates/country-card.hbs';
// import countriesListTpl from './templates/countries-list.hbs';
// import API from './js/fetchCountries';

import formTpl from './templates/form.hbs';
import imgCardTpl from './templates/img-card.hbs';

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
console.log(galleryEl);

function appendGalleryMarkup(card) {
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(card));
}
// appendGalleryMarkup();


// fetch(
//     'https://pixabay.com/api/?key=23370908-ce48d92bb09d31672ee5e9cf0&q=yellow+flowers&image_type=photo&per_page=12'
// )
//     .then(r => r.json())
//     .then(console.log);


fetch(
    'https://pixabay.com/api/?key=23370908-ce48d92bb09d31672ee5e9cf0&q=yellow+flowers&image_type=photo&per_page=12'
)
    .then(r => r.json())
    .then(appendGalleryMarkup);