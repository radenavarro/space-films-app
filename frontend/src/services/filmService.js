import axios from 'axios';
import GlobalData from './globalData';

class FilmService {

    constructor() {
        this.endPointLogin = `${GlobalData.base_endpoint}/movies`;
    }

    async getAllFilms(){
        try {
            let token = localStorage.getItem('auth');
            console.log(token);
            let result = await axios.get(this.endPointLogin, {'headers':{'authorization':'Bearer ' + token}});
            if (result){
                // console.log(result);
            }
            return result.data;

        } catch (error) {
            console.error(error);
        }
    }
}

export default FilmService;
