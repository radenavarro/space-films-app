import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class NotFoundError extends Component{
    render(){
        return(
            <div className="container-fluid p-0 m-0">

                <div id="errorBG">
                    <div id="error404">
                        <h1>404</h1>
                        <p>Parece que te perdiste</p>
                        <NavLink to={"/"}>Vuelve</NavLink>
                    </div>
                </div>

            </div>
        )
    }
}

export default NotFoundError;
