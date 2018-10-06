import React from 'react'

import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import 'antd/dist/antd.css'
import './bootstrap.css'
import './home.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="start">
                    <h1 className="name">KHunt</h1>

                    <div className="row options">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-2">
                            <a href="#">
                                <div class="card rounded">
                                    <div class="card-body card-button">
                                        <h3>Create Hunt</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2">
                            <a href="#">
                                <div class="card rounded">
                                    <div class="card-body card-button">
                                        <h3>Join Hunt</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>

                <div className="info">

                    <div class="card rounded">
                        <div class="card-body ">
                            <h4 class="card-title">What is KHunt about?</h4>
                            <p class="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </p>
                        </div>
                    </div>

                    <br/><br/>

                    <div class="card rounded">
                        <div class="card-body">
                            <h4 class="card-title">How to use KHunt?</h4>
                            <p class="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
