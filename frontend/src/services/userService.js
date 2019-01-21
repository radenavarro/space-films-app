import axios from 'axios';
import GlobalData from './globalData';

class UserService {

    constructor() {
        this.endPointPost = `${GlobalData.base_endpoint}/login/`;
    }

    async loginUser(userObj){
        try {
            let result = await axios.post(this.endPointPost, userObj);
            if (result){
                localStorage.setItem('auth', result.data.data);
            }
            return result;

        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;
