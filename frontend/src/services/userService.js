import axios from 'axios';
import GlobalData from './globalData';

class UserService {

    constructor() {
        this.endPointLogin = `${GlobalData.base_endpoint}/login/`;
        this.endPointRegister = `${GlobalData.base_endpoint}/register/`;
        this.endPointUser = `${GlobalData.base_endpoint}/user`
    }

    async loginUser(userObj){
        try {
            let result = await axios.post(this.endPointLogin, userObj);
            console.log(result);
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

    async getUsernameById(userId){
        try {
            let result = await axios.get(`${this.endPointUser}/${userId}`);
            // console.log("RESULT " + JSON.stringify(result));
            return result.data.data.name;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;
