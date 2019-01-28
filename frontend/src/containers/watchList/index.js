import React, {Component} from 'react';
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
        if (filmsInWL){
            console.log(filmsInWL);
        }
    }

    render() {
        console.log(this.props);
        return(
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="row">

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        // moviesFiltered : (state.movies.data).filter((movie) => {
        //     return movie.id === state.watchList.id;
        // })
        moviesInWatchlist : state.movies.data
    }
};



export default connect(mapStateToProps)(WatchList);
