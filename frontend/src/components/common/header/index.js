import React, {Component} from 'react';
import './header.css';

class Header extends Component{
    render() {
        return(
            <div>
                <header>
                    <nav className="nav">
                        <div className="row justify-content-end w-100">
                            <div className="col-1">Login</div>
                            <div className="col-1">Register</div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header;
