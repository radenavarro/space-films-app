import axios from 'axios';
import GlobalData from './globalData';

class UserService {

    constructor() {
        this.endPointLogin = `${GlobalData.base_endpoint}/login/`;
        this.endPointRegister = `${GlobalData.base_endpoint}/register/`;
    }

    async loginUser(userObj){
        try {
            let result = await axios.post(this.endPointLogin, userObj);
            console.log(result)
            if (result){
                localStorage.setItem('auth', result.data.data);
            }
            return result;

        } catch (error) {
            console.error(error);
        }
    }

    async registerUser(userObj){
        try {
            let result = await axios.post(this.endPointRegister, userObj);
            console.log(result);
            return result;

        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;
