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
            console.log("Tienes permisos");
            // Watchlist en localstorage para que no se pierda tras deslogear
            if (localStorage.getItem('watchlist')){
                if (localStorage.getItem('watchlist').length === 0) localStorage.setItem('watchlist', '');
            } else {
                localStorage.setItem('watchlist', '')
            }

            // Get films
            this.getAllFilms();

        } else{
            this.state.Redirect = true;
        }
    }

    async getAllFilms(){
        let filmService = new FilmService();
        let filmsObj = await filmService.getAllFilms();
        console.log(filmsObj);
        this.props.dispatch({type: "GET_ALL_FILMS", data: filmsObj})
    }

    async addToWatchlist(){
        // Watchlist en localstorage para que no se pierda al deslogear
        let arrTotalFilmsInWatchlist = [];
        let strFilmsStored = localStorage.getItem('watchlist');
        let filmService = new FilmService();
        let objFilmToWatchlist = await filmService.getFilm(this);
        // console.log(objFilmToWatchlist.data);

        if (!strFilmsStored || strFilmsStored === ""){
            arrTotalFilmsInWatchlist.push(objFilmToWatchlist.data);
        } else{
            arrTotalFilmsInWatchlist = JSON.parse(strFilmsStored);
            // Validar que no se añada una película por duplicado
            let filtered = arrTotalFilmsInWatchlist.filter(val=>val.id === objFilmToWatchlist.data.id);
            if (filtered.length > 0){
                console.log("LA PELICULA YA ESTÁ EN LOCALSTORAGE")
            } else{
                arrTotalFilmsInWatchlist.push(objFilmToWatchlist.data);
            }
        }

        localStorage.setItem('watchlist', JSON.stringify(arrTotalFilmsInWatchlist));
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
                                    <i className="fas fa-bookmark" title="Añadir a watchlist" onClick={this.addToWatchlist.bind(this.props.movies[counter].id)}></i>
                                </span>

                            </div>
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
    let arr = state.movies.data;
    console.log(arr)
    return{
        movies : state.movies.data
    }
    // if(state.length > 0){
    //     return{
    //         movies: state.movies.data
    //     }
    // }
    // return {movies: []}
}

// const mapDispatchToProps=(dispatch)=>{
//     console.log("Entra en map");
//
//     return{
//         getFilms: () =>{
//             console.log("llama a getFilms");
//             let filmService = new FilmService();
//             return filmService.getAllFilms().then(res=>{
//                 console.log("entra disptach"+ JSON.stringify(res));
//                 // dispatch(loadPosts(res))
//             })
//                 .catch((error)=>{
//                     console.error(error);
//                 })
//         }
//     }
// }

export default connect(mapStateToProps)(FilmList);
