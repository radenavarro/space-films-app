import React, {Component} from 'react';
import FilmService from "../../services/filmService";
import {Redirect} from "react-router-dom";

class FilmList extends Component{
    state = {Redirect : false};
    constructor(props){
        super(props);
        this.films = "";
    }

    componentWillMount() {
        if (localStorage.getItem('auth')){
            console.log("Tienes permisos");
            // TODO Sacar user id del token y el usuario de la BD
        } else{
            this.state.Redirect = true;
        }
    }

    async buildMovieList(){
        console.log(this.props);
        let filmService = new FilmService();
        let filmsObj = await filmService.getAllFilms();
        // console.log(filmsObj.data);
        for(let film of filmsObj.data){
            this.films += "<div>asd</div>";
        }
    }

    render() {
        if (this.state.Redirect === true){
            return <Redirect to={"/"}/>
        }
        let films = this.buildMovieList();
        return(
            <div className="container-fluid">
                {this.films}
            </div>
        )
    }
}

export default FilmList;
