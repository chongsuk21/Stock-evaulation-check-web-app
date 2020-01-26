import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/navigation.css';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {

    }
};

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.logoutClicked = () =>  {
            sessionStorage.removeItem('userId');
            this.setState({ redirectTo: '/' });
        };
        this.home = () => this.setState({ redirectTo: '/home' });
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    <div className="area"></div>
                    <nav className="main-menu navigation">
                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-home fa-2x"></i>
                                    <span className="nav-text" onClick={this.home}>
                            Home
                        </span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="fa fa-credit-card fa-2x"></i>
                                    <span className="nav-text" onClick={this.home}>
                            Credit Card
                        </span>
                                </a>
                            </li>
                        </ul>

                        <ul className="logout">
                            <li>
                                <a>
                                    <i className="fa fa-power-off fa-2x"></i>
                                    <span className="nav-text" onClick={this.logoutClicked}>
                            Logout
                        </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, null)(Navigation);