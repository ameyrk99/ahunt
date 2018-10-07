import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import './dashboard.css'

const participants = [
    {
        name: "Hermionie",
        id: "ajsdlAFaf",
        currentStep: 4
    },
    {
        name: "Harry",
        id: "Adsfaeag",
        currentStep: 6
    },
    {
        name: "Ron",
        id: "asdfarFAs",
        currentStep: 3
    },
    {
        name: "Voldermot",
        id: "asdataARARArsd",
        currentStep: 10
    }
]

const totalSteps = 10

const steps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Step 7',
    'Step 8',
    'Step 9',
    'Destination',
]

class NoActiveHunt extends React.Component {
    render() {
        return (
            <div className="createPrompt">
                <div className="container">
                    <div className="jumbotron">
                        <a href="/createhunt">
                            <h2>Create One Here + :)</h2>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

class Hunt extends React.Component {

    render() {
        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello World!</h1>

                        <br />
                        <h3>Participants:</h3>

                        {participants.map((parts) => {
                            return (
                                <div key={parts.id}>
                                    <div style={{
                                        paddingLeft: "1%",
                                        paddingTop: "1%"
                                    }}>
                                        {parts.name}:<br />
                                        <p style={{ paddingLeft: "1%" }}>Current Step: {parts.currentStep} {steps[parts.currentStep - 1]}</p>

                                        {/* {
                                            if(parts.currentStep === totalSteps) {
                                                const bar = "progress-bar bg-success"
                                            } else {
                                                const bar = "progress-bar progress-bar-striped progress-bar-animated"
                                            }
                                        } */}

                                        {parts.currentStep === totalSteps &&
                                            <div class="progress">
                                                <div class="progress-bar bg-success" role="progressbar" style={{
                                                    width: "100%",
                                                    ariaValuenow: 40,
                                                    ariaValuemin: 0,
                                                    ariaValuemax: 100
                                                }}></div>
                                            </div>

                                        }

                                        {parts.currentStep != totalSteps &&
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                    width: parts.currentStep * 1000 / totalSteps,
                                                    ariaValuenow: 40,
                                                    ariaValuemin: 0,
                                                    ariaValuemax: 100
                                                }}></div>
                                            </div>

                                        }

                                        {/* <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                width: parts.currentStep * 1000 / totalSteps,
                                                ariaValuenow: 40,
                                                ariaValuemin: 0,
                                                ariaValuemax: 100
                                            }}></div>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

class Dashboard extends React.Component {
    state = {
        signedOut: false,
        activeHunt: true
    }

    signOutWithFirebase = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('signed out successfully')
                this.setState({ signedOut: true })
            })
            .catch(() => console.log('failed to sign out'))
    }

    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({ signedOut: true })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { signedOut } = this.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/">KHunt</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor03">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/hunts">Scavengar Hunts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/createhunt">New Hunt</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                    <button class="btn btn-secondary my-2 my-sm-0" onClick={this.signOutWithFirebase} >Sign Out</button>
                </nav>

                {!this.state.activeHunt &&
                    <NoActiveHunt/>
                }
                {this.state.activeHunt &&
                    <Hunt /> 
                }
            </div>
        )
    }
}

export default Dashboard