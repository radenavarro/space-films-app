import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import Header from "../../../components/common/header";
import Footer from "../../../components/common/footer";

class WatchList extends Component{
    constructor(...props){
        super(...props);
    }

    render() {
        return(
            <div>
                <Header/>
                <div className="container-fluid">

                </div>
                <Footer/>
            </div>
        )
    }
}

export default WatchList;
