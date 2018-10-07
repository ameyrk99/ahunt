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
        activeMenu: 'newHunt',
        uid: null,
        displayName: null,
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
                    uid: user.uid,
                    displayName: user.displayName
                }, () => this.checkIfActiveHunt())
            }
        })
    }

    checkIfActiveHunt = () => {
        console.log(this.state.uid)
        const ref = firebase.database().ref("users").child(this.state.uid).child("hunts").child("active")
        ref.once('value')
            .then((snapShot) => {
                console.log(snapShot.val())
                if (snapShot.exists() && (snapShot.child('status').val() != 'ended' || !snapShot.child('status').val() ))  {
                    this.setState({
                        activeHuntId: snapShot.child('hunt_id').val(),
                        activeHunt: true,
                        activeMenu: 'activeHunt'
                    })
                }
            })
    }

    changeToCreatingSteps = () => {
        this.setState({ activeMenu: 'newSteps' })
        
    }

    setHuntId = (newHuntID) => {
        this.setState({ huntID: newHuntID })
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

        const { uid, displayName, activeHuntId, signedOut, activeMenu, huntID, activeHunt, huntName, huntDes } = this.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <Navbar
                    activeMenu={activeMenu}
                    activeHunt={activeHunt}
                    changeActiveMenu={ (activeMenu) => this.setState({activeMenu: activeMenu})}/>
                {this.state.activeMenu == 'activeHunt' && uid &&
                    <ActiveHunt uid={uid} displayName={displayName} activeHuntId={activeHuntId} />
                }
                {this.state.activeMenu == 'hunts' &&
                    <SavedHunts uid={uid} />
                }
                {(this.state.activeMenu=='newHunt' || this.state.activeMenu=='noActiveHunt' || (!this.state.activeHunt && this.state.activeMenu == 'activeHunt')) &&
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
                            </div>
                        </div>
                    </div>
                }
                {this.state.activeMenu == 'newSteps' && huntID &&

                    <div>
                        <Step huntID={huntID} uid={uid} changeActiveMenu={ (activeMenu) => this.setState({activeMenu: activeMenu})}/>
                        <br /><br />
                        <HuntSteps huntID={huntID} uid={uid} />
                    </div>
                }
            </div>
        )
    }
}

export default Dashboard