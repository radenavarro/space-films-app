import React, {Component} from 'react';
import './loginForm.css';
import Header from "../common/header";
import Footer from "../common/footer";
import UserService from "../../services/userService";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

class LoginForm extends Component{
    state = {Redirect: false};
    submitForm = async(e) =>{
        e.preventDefault();
        let email = this.getEmail.value;
        let password = this.getPassword.value;
        // Acceso a datos
        let userService = new UserService();
        let result = await userService.loginUser({email, password});
        this.props.dispatch({type: "LOGIN_USER", data: result.data});
        this.setState(
            () => ({Redirect : true})
        )
    };
    render() {
        if (this.state.Redirect){
            return <Redirect to={'/movies'}/>;
        }
        return(
            <div className="contenedor bg-dark d-flex flex-column justify-content-center">
                <Header/>
                <div className="login d-flex">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <h1>LOGIN</h1>
                            <label htmlFor="email">E-Mail</label>
                            <input type="text" className="form-control" placeholder="Introduce E-Mail" name="email" ref={(input)=>this.getEmail = input}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" placeholder="Introduce password" name="password" ref={(input)=>this.getPassword = input}/>
                            <br/>
                            <input type="submit" className="btn" value="Inicia sesión" />
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>

        )
    }
}

export default connect()(LoginForm);
