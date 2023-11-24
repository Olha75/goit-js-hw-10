import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


new SlimSelect({
  select: '#selectElement',
});

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA";

// GET https://api.thecatapi.com/v1/breeds
// select.breed-select
const refs = {
  form: document.querySelector(".js-search-form "),
  list: document.querySelector(".js-list"),
};

refs.form.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const {breeds, opus}=event.currentTarget.elements;



}

// live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA

// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA'
