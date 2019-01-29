import axios from 'axios';
import GlobalData from './globalData';

class FilmService {

    constructor() {
        this.endPointMovies = `${GlobalData.base_endpoint}/movies`;
        this.endPointWatchlist = `${GlobalData.base_endpoint}/watchlist`;
    }

    async getAllFilms(){
        try {
            // Token necesario para cargar películas (ruta protegida)
            let token = localStorage.getItem('auth');
            let result = await axios.get(this.endPointMovies, {'headers':{'authorization':'Bearer ' + token}});

            return result.data;

        } catch (error) {
            console.error(error);
        }
    }

    async getFilm(idFilm){
        try {
            let token = localStorage.getItem('auth');
            let result = await axios.get(`${this.endPointMovies}/${idFilm}`, {'headers':{'authorization':'Bearer ' + token}});
            return result.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getFilmsInWatchlist(){
        try {
            let token = localStorage.getItem('auth');
            let result = await axios.get(`${this.endPointWatchlist}`, {'headers':{'authorization':'Bearer ' + token}});
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }

    async insertIntoWatchlist(movieId){
        try {
            let token = localStorage.getItem('auth');
            let result = await axios.get(`${this.endPointWatchlist}/${movieId}`, {'headers':{'authorization':'Bearer ' + token}});
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }
}

export default FilmService;
