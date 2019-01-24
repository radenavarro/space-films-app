import React, {Component} from 'react';
import FilmService from "../../services/filmService";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./filmList.css";

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
            // TODO Sacar user id del token y el usuario de la BD
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

    filmRowBuilder(){
        // Este método se ha creado por la imposibilidad de utilizar bucles en render
        let rows = [];
        let counter = 0;
        console.log(this.props.movies.length);
        for (let i = 0; i < this.props.movies.length; i++){
            let filmContainers = [];
            for (let j = 0; j < this.moviesPerRow && counter < this.props.movies.length; j++) {
                filmContainers.push(
                    <div className={"filmContainer"} key={`film${counter}`}>
                        <div className={"filmTitle"}>{this.props.movies[counter].title}</div>
                        <div className={"filmPoster"}><img src={`images/posters/${this.props.movies[counter].poster}`} alt={`poster${counter}`}></img></div>
                    </div>)
                counter++;
            }

            if(counter < this.props.movies.length) rows.push(<div className={"filmRow"} key={`row${i}`}>{filmContainers}</div>)
        }
        return rows;
    }

    render() {
        if (this.state.Redirect === true){
            return <Redirect to={"/"}/>
        }

        return(

            <div className="container-fluid">
                {this.props.movies ? this.filmRowBuilder() : ""}
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
