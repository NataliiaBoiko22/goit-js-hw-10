import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const lookupCountry = async function (el) {
  const name = el.target.value.trim();
  if (!name) {
    return;
  }
  await fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        countriesList.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        countryInfo.innerHTML = '';
        renderCountriesList(countries);
      } else if (countries.length === 1) {
        countriesList.innerHTML = '';
        renderOneCountry(countries);
      }
    })
    .catch(err => {
      Notify.failure('❌ Oops, there is no country with that name');
    });
};
searchBox.addEventListener('input', debounce(lookupCountry, DEBOUNCE_DELAY));

function renderCountriesList(countries) {
  const countryList = countries
    .map(
      country =>
        ` <li class="country-list-item">
        <img src="${country.flags.svg}" alt="Flag">
        <h2>${country.name.common}</h2>
    </li>`
    )
    .join('');
  countriesList.innerHTML = countryList;
}

function renderOneCountry(countries) {
  const countryProperties = countries
    .map(
      country =>
        ` <div class="country-info_main">
        <img src="${country.flags.svg}" alt="Flag">
        <h1>${country.name.official}</h1>
    </div>
    <ul class="country-info_list">
        <li><b>Capital:</b> ${country.capital}</li>
        <li><b>Population:</b> ${country.population}</li>
        <li><b>Languages:</b> ${Object.values(country.languages)}</li>
    </ul>`
    )
    .join('');
  countryInfo.innerHTML = countryProperties;
}
