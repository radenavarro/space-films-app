import React, {Component} from 'react';
import './watchlist.css';
import {NavLink} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import {connect} from "react-redux";
import FilmService from "../../services/filmService";

class WatchList extends Component{
    constructor(...props){
        super(...props);
    }

    async componentWillMount() {
        let filmService = new FilmService();
        let filmsInWL = await filmService.getFilmsInWatchlist();
        console.log(filmsInWL.data);
        if (filmsInWL){
            this.props.dispatch({type: "ADD_TO_WATCHLIST", data: filmsInWL.data})
        }
    }

    filmRowBuilder(){
        // Este método se ha creado por la imposibilidad de utilizar bucles en render
        let rows = [];
        let filmContainers = [];
        for (let i = 0; i < (this.props.moviesInWatchlist.length); i++){
            filmContainers.push(
                <div className="movieCard" key={this.props.moviesInWatchlist[i].Movie.id}>
                    <div className="picture">
                        <img src={`images/posters/${this.props.moviesInWatchlist[i].Movie.poster}`} alt={`poster${i}`}></img>
                    </div>
                    <div className="infoSection">
                        <div className="movieTitle">Título: {this.props.moviesInWatchlist[i].Movie.title}</div>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            )
        }
        rows.push(filmContainers);
        return rows;
    }

    render() {
        // console.log(this.props.moviesInWatchlist);
        const isInWatchlist = true;
        return(
            <div>
                <Header watchlist={isInWatchlist}/>
                <div className="container-fluid">
                    <div className="flex-column containerMovies">
                        {this.props.moviesInWatchlist ? this.filmRowBuilder() : ""}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    // console.log("STATE " + JSON.stringify(state.watchList));
    return {
        moviesInWatchlist : state.watchList
    }
};



export default connect(mapStateToProps)(WatchList);
