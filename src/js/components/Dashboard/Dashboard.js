import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

import ActiveHunt from './ActiveHunt'
import NoActiveHunt from './NoActiveHunt'
import Navbar from './Navbar'
// import CreateHunt from './CreateHunt'
import HuntSteps from './HuntSteps'
import Step from './Step'
import SavedHunts from './SavedHunts'

import './dashboard.css'
class Dashboard extends React.Component {
    state = {
        signedOut: false,
        activeHunt: false,
        activeMenu: 'noActiveHunt',
        uid: null,
        huntID: null,
        huntName: '',
        huntDes: '',
        huntCreated: false,
        huntCreationFail: false
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
            } else {
                this.setState({
                    uid: user.uid
                }, () => this.checkIfActiveHunt())
            }
        })
    }

    checkIfActiveHunt = () => {
        const ref = firebase.database().ref("users").child(this.state.uid).child("hunts").child("active")
        ref.once('value')
        .then( (snapShot) => {
            if(snapShot.exists()) {
                this.setState({
                    activeHunt: true,
                    activeMenu: 'activeHunt'
                })
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = () => {
        // console.log("Hunt Created")
        const {uid, huntName, huntDes} = this.state
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key

        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
            id: huntId
        })
        .then( () => {
            this.setState({
                huntCreated: true,
                huntID: huntId,
                activeMenu: 'newSteps'
            })
        })
        .catch( (error) => {
            console.log(error)
            this.setState({
                huntCreationFail: true
            })
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { uid, signedOut, activeMenu, huntID, activeHunt, huntName, huntDes } = this.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <Navbar 
                    activeMenu={activeMenu}
                    activeHunt={activeHunt}
                    changeActiveMenu={ (activeMenu) => this.setState({activeMenu: activeMenu})}/>
                {this.state.activeMenu == 'activeHunt' &&
                    <ActiveHunt /> 
                }
                {this.state.activeMenu == 'hunts' &&
                    <SavedHunts uid={uid}/> 
                }
                {(this.state.activeMenu=='newHunt' && !this.state.activeHunt) || (this.state.activeMenu == 'noActiveHunt') &&
                    <div style={{
                        paddingTop: "2%"
                    }}>
                        <div className="container">
                            <div className="jumbotron">
                            <form>
                                <fieldset>
                                    <legend>Create Hunt</legend>
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
                                    <button type="button" class="btn btn-primary" onClick={this.submitForm}>Submit</button>
                                </fieldset>
                            </form>
                            <br/><br/>
        
                            {/* {huntCreated &&
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
                            } */}
                            </div>
                        </div>
                    </div>
                }
                {this.state.activeMenu=='newSteps' && huntID &&
                    
                    <div>
                        <Step huntID={huntID} uid={uid}/> 
                        <br/><br/>
                        <HuntSteps huntID={huntID} uid={uid}/>    
                    </div>
                }
            </div>
        )
    }
}

export default Dashboard