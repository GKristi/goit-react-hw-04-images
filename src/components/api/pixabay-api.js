import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getImages(searchQuery, page) {
    return axios.get(`?key=38608937-02ef803e1bcfc9fecc3c5d49f&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);
}