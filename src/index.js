import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


new SlimSelect({
  select: '#selectElement',
});

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA";

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      loader.style.display = 'none';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    catInfo.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
      .then(cats => {
        const cat = cats[0];
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = 'Cat';
        catInfo.appendChild(img);

        const infoParagraph = document.createElement('p');
        infoParagraph.textContent = `Порода: ${cat.breeds[0].name}, Опис: ${cat.breeds[0].description}, Темперамент: ${cat.breeds[0].temperament}`;
        catInfo.appendChild(infoParagraph);
      })
      .catch(error => {
        console.error('Помилка при отриманні інформації про кота за породою:', error);
      });
  });
});




// GET https://api.thecatapi.com/v1/breeds
// select.breed-select




// live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA

// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA'
