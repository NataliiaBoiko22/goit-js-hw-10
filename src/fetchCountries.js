const BASE_URL = 'https://restcountries.com/v3.1/name/';
const QUERY_SELECTORS = '?fields=name,capital,population,flags,languages';
export const fetchCountries = async function (name) {
  return fetch(`${BASE_URL}${name}${QUERY_SELECTORS}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
