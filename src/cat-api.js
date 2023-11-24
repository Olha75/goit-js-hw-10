const API_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${API_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return fetch(`${API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

function fetchBreedDetails(breedId) {
  return fetch(`${API_URL}/breeds/${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching breed details:', error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed, fetchBreedDetails };

// https://api.thecatapi.com/v1/images/search
// breed_ids
// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
// https://api.thecatapi.com/v1/images/search?limit=10