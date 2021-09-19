export default class ImgApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImgCards() {
        // console.log(this);
    const url = `https://pixabay.com/api/?key=23370908-ce48d92bb09d31672ee5e9cf0&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;
    
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data.hits);
            this.page += 1
            return data.hits;
        });
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    resetPage() {
        this.page = 1;
    }
}