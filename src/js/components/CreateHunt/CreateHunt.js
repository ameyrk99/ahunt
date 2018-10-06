import React from 'react'
import ReactDOM from 'react-dom'

class CreateForm extends React.Component {
    render() {
        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello</h1>
                    </div>
                </div>
            </div>
        )
    }
}

class CreateHunt extends React.Component {
    render() {
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">KHunt</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor03">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Scavengar Hunts</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#">New Hunt</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                    <button class="btn btn-secondary my-2 my-sm-0" onClick={this.signOutWithFirebase} >Sign Out</button>
                </nav>

                <CreateForm/>
            </div>
        )
    }
}

export default CreateHunt