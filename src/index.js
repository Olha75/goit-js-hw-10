import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, fetchBreedDetails } from './cat-api.js';

new SlimSelect({
  select: '#breedSelect',
});

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA';

  document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.querySelector('.breed-select');
    const loader = document.querySelector('.loader');
    const error = document.querySelector('.error');
    const catInfo = document.querySelector('.cat-info');
  
    const hideError = () => {
      error.style.display = 'none';
    };
  
    const displayError = () => {
      loader.style.display = 'none';
      error.style.display = 'block';
    };
  
    fetchBreeds()
      .then(breeds => {
        breeds.forEach(({ id, name }) => {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = name;
          breedSelect.appendChild(option);
        });
        loader.style.display = 'none';
      })
      .catch(() => {
        displayError();
      });
  
    breedSelect.addEventListener('change', async () => {
      const selectedBreedId = breedSelect.value;
      catInfo.innerHTML = '';
  
      loader.style.display = 'block';
      hideError(); // Приховуємо помилку перед завантаженням нових даних
  
      try {
        const [cats, breedDetails] = await Promise.all([
          fetchCatByBreed(selectedBreedId),
          fetchBreedDetails(selectedBreedId),
        ]);
  
        const cat = cats[0];
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = 'Cat';
        catInfo.appendChild(img);
  
        const breedTitle = document.createElement('h1');
        breedTitle.textContent = breedDetails.name;
        catInfo.appendChild(breedTitle);
  
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.innerHTML = `<strong>Опис:</strong> ${breedDetails.description}`;
        catInfo.appendChild(descriptionParagraph);
  
        const temperamentParagraph = document.createElement('p');
        temperamentParagraph.innerHTML = `<strong>Темперамент:</strong> ${breedDetails.temperament}`;
        catInfo.appendChild(temperamentParagraph);
  
        const hidden = document.querySelector('.hidden');
        hidden.style.display = 'none';
      } catch (error) {
        console.error(error);
        displayError();
      } finally {
        loader.style.display = 'none';
      }
    });
  });
// live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA

// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA'
