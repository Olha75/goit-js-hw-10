import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, fetchBreedDetails } from './cat-api.js';

new SlimSelect({
  select: '#breedSelect',
});

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA";

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  let loader = document.querySelector('.loader');
  let error = document.querySelector('.error');
  let catInfo = document.querySelector('.cat-info');

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
          loader.style.display = 'none';
          error.style.display = 'block';
      });

  breedSelect.addEventListener('change', async () => {
      const selectedBreedId = breedSelect.value;
      catInfo.innerHTML = '';

      loader.style.display = 'block';

      try {
          const [cats, breedDetails] = await Promise.all([
              fetchCatByBreed(selectedBreedId),
              fetchBreedDetails(selectedBreedId)
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
          descriptionParagraph.textContent = `Опис: ${breedDetails.description}`;
          catInfo.appendChild(descriptionParagraph);

          const temperamentParagraph = document.createElement('p');
          temperamentParagraph.textContent = `Темперамент: ${breedDetails.temperament}`;
          catInfo.appendChild(temperamentParagraph);

          // assuming you have a 'hidden' element in your HTML
          const hidden = document.querySelector('.hidden');
          hidden.style.display = 'none';
      } catch (error) {
          console.error('Помилка при отриманні інформації про кота за породою:', error);
      } finally {
          loader.style.display = 'none';
      }
  });
});












// live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA

// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA'
