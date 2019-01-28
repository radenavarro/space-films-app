import React, {Component} from 'react';
import FilmService from "../../services/filmService";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./filmList.css";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";

class FilmList extends Component{
    state = {
        Redirect : false,
        Movies : []
    };

    constructor(...props){
        super(...props);
        this.moviesPerRow = 5;
    }

    componentWillMount() {
        if (localStorage.getItem('auth')){
            // Obtener idUser del payload
            this.userId = (function () {
                let token = localStorage.getItem('auth');
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(window.atob(base64));
            })();
            console.log("ID DE USUARIO : " + this.userId);
            console.log("Tienes permisos");
            // Watchlist en localstorage para que no se pierda tras deslogear
            // if (localStorage.getItem('watchlist')){
            //     if (localStorage.getItem('watchlist').length === 0) localStorage.setItem('watchlist', '');
            // } else {
            //     localStorage.setItem('watchlist', '')
            // }

            // Get films
            this.getAllFilms();

        } else{
            this.state.Redirect = true;
        }
    }
    // TODO: Eliminar y reemplazar
    static getIdFromToken(){
        let token = localStorage.getItem('auth');
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    async getAllFilms(){
        let filmService = new FilmService();
        let filmsObj = await filmService.getAllFilms();
        console.log(filmsObj);
        this.props.dispatch({type: "GET_ALL_FILMS", data: filmsObj})
    }

    addToWatchlist(){
        // WATCHLIST EN BD
        let filmService = new FilmService();
        let result = filmService.insertIntoWatchlist(this[1]);
        if (result){
            alert("Película añadida a tu lista");
            this[0].props.dispatch({type: "ADD_TO_WATCHLIST", data: {userId: FilmList.getIdFromToken(), movieId: this[1]}})
        }

        // Watchlist en localstorage para que no se pierda al deslogear
        // let arrTotalFilmsInWatchlist = [];
        // let strFilmsStored = localStorage.getItem('watchlist');
        // let filmService = new FilmService();
        // let objFilmToWatchlist = await filmService.getFilm(this);
        // // console.log(objFilmToWatchlist.data);
        //
        // if (!strFilmsStored || strFilmsStored === ""){
        //     arrTotalFilmsInWatchlist.push(objFilmToWatchlist.data);
        // } else{
        //     arrTotalFilmsInWatchlist = JSON.parse(strFilmsStored);
        //     // Validar que no se añada una película por duplicado
        //     let filtered = arrTotalFilmsInWatchlist.filter(val=>val.id === objFilmToWatchlist.data.id);
        //     if (filtered.length > 0){
        //         console.log("LA PELICULA YA ESTÁ EN LOCALSTORAGE")
        //     } else{
        //         arrTotalFilmsInWatchlist.push(objFilmToWatchlist.data);
        //     }
        // }
        //
        // localStorage.setItem('watchlist', JSON.stringify(arrTotalFilmsInWatchlist));
    }

    filmRowBuilder(){
        // Este método se ha creado por la imposibilidad de utilizar bucles en render
        let rows = [];
        let counter = 0;
        console.log(this.props.movies.length);
        for (let i = 0; i < (this.props.movies.length/this.moviesPerRow); i++){
            let filmContainers = [];
            for (let j = 0; j < this.moviesPerRow && counter < this.props.movies.length; j++) {
                // console.log("Contador: " + counter + " -- ID: " + this.props.movies[counter].id + " -- Nº PELIS: "+ this.props.movies.length + " -- i: " + i);
                filmContainers.push(
                    // Al iterar las veces que indique moviesPerRow, puede que al final no hayan películas. Me ayudo de counter para no sacar nada en ese caso
                    this.props.movies[counter] ?
                        <div className={"filmContainer"} key={`film${counter}`}>
                            <div className={"filmTitle"}>
                                <span>{this.props.movies[counter].title}</span>
                                <span>
                                    <i className="fas fa-bars" title="Detalle"></i>
                                    <i className="fas fa-bookmark" title="Añadir a watchlist" onClick={this.addToWatchlist.bind([this, this.props.movies[counter].id])}></i>
                                </span>                            </div>
                            <div className={"filmPoster"}>
                                <img src={`images/posters/${this.props.movies[counter].poster}`} alt={`poster${counter}`}></img>
                            </div>
                        </div> : "");
                counter++;
            }

            if(counter <= this.props.movies.length) rows.push(<div className={"filmRow"} key={`row${i}`}>{filmContainers}</div>)
        }
        return rows;
    }

    render() {
        if (this.state.Redirect === true){
            return <Redirect to={"/"}/>
        }
        return(
            <div>
                <Header/>
                    <div className="container-fluid">
                        {this.props.movies ? this.filmRowBuilder() : ""}
                    </div>
                <Footer/>
            </div>

        )
    }
}

const mapStateToProps=(state) =>{
    // watchlist todavía no se usa en el componente. Se añade porque más adelante se validará qué id de películas del watchlist
    // coincide con las películas de la lista, para mostrar el icono de bookmark correspondiente de otro color
    return{
        movies : state.movies.data,
        watchlist : state.watchList.data
    }
};

export default connect(mapStateToProps)(FilmList);
