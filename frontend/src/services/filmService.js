import axios from 'axios';
import GlobalData from './globalData';

class FilmService {

    constructor() {
        this.endPointMovies = `${GlobalData.base_endpoint}/movies`;
    }

    async getAllFilms(){
        try {
            // Token necesario para cargar películas (ruta protegida)
            let token = localStorage.getItem('auth');
            let result = await axios.get(this.endPointMovies, {'headers':{'authorization':'Bearer ' + token}});
            if (result){
                // console.log(result);
            }
            return result.data;

        } catch (error) {
            console.error(error);
        }
    }

    async getFilm(idFilm){
        try {
            let token = localStorage.getItem('auth');
            let result = await axios.get(`${this.endPointMovies}/${idFilm}`, {'headers':{'authorization':'Bearer ' + token}});
            // console.log("BD  "+JSON.stringify(result));
            return result.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default FilmService;
