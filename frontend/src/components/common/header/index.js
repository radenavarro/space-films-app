import React, {Component} from 'react';
import './header.css';
import UserService from "../../../services/userService";
import {NavLink} from "react-router-dom";

class Header extends Component{
    constructor(...props){
        super(...props);
        if (localStorage.getItem('auth')){
            this.isLogged = true;
            // Obtener id del payload. Sustituír esta parte mas adelante
            this.userId = (function () {
                let token = localStorage.getItem('auth');
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(window.atob(base64));
            })();
            this.getUserName();
        }

    }

    async getUserName(){
        let userService = new UserService();
        let strUser = await userService.getUsernameById(this.userId);
        console.log(strUser);
        this.userName = strUser;
    }

    logout(){
        this.isLogged = false;
        localStorage.removeItem('auth');
        window.location = "/";
    }

    render() {
        const {watchlist} = this.props;

        return(
            <div>
                <header>
                    <nav className="nav">
                        {this.isLogged ?
                            <div className="row justify-content-between w-100">
                                <div className="col-2">SpaceFilms</div>
                                <div className="col-10">
                                    <div className="row justify-content-end">
                                        {watchlist ? <div className="col-2 text-center"><NavLink to="/movies">Atrás</NavLink></div> : ""}
                                        <div className="col-2 text-center">User: {this.userName ? this.userName : ""}</div>
                                        <div className="col-2 text-center"><NavLink to="/watchlist">Mi WatchList</NavLink></div>
                                        <div className="col-2 text-center"><NavLink to={"#"} onClick={this.logout.bind(this)}>Desconectar</NavLink></div>
                                    </div>
                                </div>
                            </div>:
                            <div className="row justify-content-between w-100">
                                <div className="col-2">SpaceFilms</div>
                                <div className="col-10">
                                    <div className="row justify-content-end">
                                        <div className="col-2 text-center"><NavLink to="/" >Iniciar sesión</NavLink></div>
                                        <div className="col-2 text-center"><NavLink to="/register">Registro</NavLink></div>
                                    </div>
                                </div>
                            </div>
                            }
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header;
