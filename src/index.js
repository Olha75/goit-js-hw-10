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

    loader.style.display = 'block';

    Promise.all([fetchCatByBreed(selectedBreedId), fetchBreedDetails(selectedBreedId)])
      .then(([cats, breedDetails]) => {
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

        hidden.style.display =  'none';
      })
      .catch(error => {
        console.error('Помилка при отриманні інформації про кота за породою:', error);
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });
});





// document.addEventListener('DOMContentLoaded', () => {
//   const breedSelect = document.querySelector('.breed-select');
//   const loader = document.querySelector('.loader');
//   const error = document.querySelector('.error');
//   const catInfo = document.querySelector('.cat-info');

//   fetchBreeds()
//     .then(breeds => {
//       breeds.forEach(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.textContent = breed.name;
//         breedSelect.appendChild(option);
//       });
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       loader.style.display = 'none';
//       error.style.display = 'block';
//     });

//   breedSelect.addEventListener('change', () => {
//     const selectedBreedId = breedSelect.value;
//     catInfo.innerHTML = '';

//     loader.style.display = 'block';

//     Promise.all([fetchCatByBreed(selectedBreedId), fetchBreedDetails(selectedBreedId)])
//       .then(([cats, breedDetails]) => {
//         const cat = cats[0];
//         const img = document.createElement('img');
//         img.src = cat.url;
//         img.alt = 'Cat';
//         catInfo.appendChild(img);

//         const infoParagraph = document.createElement('p');
//         infoParagraph.textContent = `Порода: ${breedDetails.name}, Опис: ${breedDetails.description}, Темперамент: ${breedDetails.temperament}`;
//         catInfo.appendChild(infoParagraph);
//       })
//       .catch(error => {
//         console.error('Помилка при отриманні інформації про кота за породою:', error);
//       })
//       .finally(() => {
//         loader.style.display = 'none';
//       });
//   });
// });



// GET https://api.thecatapi.com/v1/breeds
// select.breed-select




// live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA

// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_9hI5TC9HPYJRhH8Gtg4eTcngwpwFFfjAMbdbyKywZKhWDoRzX1TTnnEkwSlVw6aA'
