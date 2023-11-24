import axios from "axios";


function fetchBreeds(){
    return axios
    .get(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(({ data }) => data);
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(({ data }) => data);
}
export { fetchBreeds, fetchCatByBreed };


// https://api.thecatapi.com/v1/images/search
// breed_ids
// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
// https://api.thecatapi.com/v1/images/search?limit=10