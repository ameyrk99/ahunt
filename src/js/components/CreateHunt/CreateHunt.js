import React from 'react'
import './createForm.css'
import firebase from '../../firebase/firebase'

class CreateForm extends React.Component {

    state = {
        huntName: '',
        huntDes: '',
        huntSteps: 0,
        huntCreated: false,
        huntCreationFail: false
    }

    submitForm = () => {
        // console.log("Hunt Created")
        const {uid, huntName, huntDes, huntSteps} = this.state
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key
        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
            hunt_steps: huntSteps
        })
        .then( () => {
            this.setState({
                huntCreated: true
            })
        })
        .catch( (error) => {
            console.log(error)
            this.setState({
                huntCreationFail: true
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.displayName) {
                this.setState({ uid: user.uid })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                    <form>
                        <fieldset>
                            <legend>Create Step</legend>
                            <div class="form-group row">
                                <label for="huntName" class="col-sm-2 col-form-label">Hunt Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" value={huntName} name="huntName" onChange={e => this.handleChange(e)} placeholder="Step Name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="description" class="col-sm-2 col-form-label">Description</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" value={huntDes} name="huntDes" onChange={e => this.handleChange(e)} placeholder="Hunt Description" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="steps" class="col-sm-2 col-form-label">Steps</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" value={huntSteps} name="huntSteps" onChange={e => this.handleChange(e)} placeholder="Total Number of Steps"/>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.submitForm}>Submit</button>
                        </fieldset>
                    </form>
                    <br/><br/>

                    {huntCreated &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Hunt Created</strong> Add Steps: <a href="#" class="alert-link"></a>.
                      </div>
                    }

                    {huntCreationFail &&
                        <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Oh snap!</strong> Hunt Creation Failed
                      </div>
                    }
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
                                <a class="nav-link" href="/hunts">Scavengar Hunts</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="/createhunt">New Hunt</a>
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