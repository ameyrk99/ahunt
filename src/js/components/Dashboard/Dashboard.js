import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

import ActiveHunt from './ActiveHunt'
import NoActiveHunt from './NoActiveHunt'
import Navbar from './Navbar'
import CreateHunt from './CreateHunt'
import HuntSteps from './HuntSteps'
import Step from './Step'
import SavedHunts from './SavedHunts'

import './dashboard.css'
class Dashboard extends React.Component {
    state = {
        signedOut: false,
        activeHunt: false,
        activeMenu: 'newSteps',
        uid: null,
        huntID: null
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
            .then((snapShot) => {
                if (snapShot.exists()) {
                    this.setState({
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

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { uid, signedOut, activeMenu, huntID, activeHunt } = this.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <Navbar
                    activeMenu={activeMenu}
                    activeHunt={activeHunt}
                    changeActiveMenu={(activeMenu) => this.setState({ activeMenu: activeMenu })} />

                {this.state.activeMenu == 'noActiveHunt' &&
                    // <NoActiveHunt/>
                    <CreateHunt />
                }
                {this.state.activeMenu == 'activeHunt' &&
                    <ActiveHunt />
                }
                {this.state.activeMenu == 'hunts' &&
                    <SavedHunts uid={uid} />
                }
                {(this.state.activeMenu == 'newHunt' && !this.state.activeHunt) &&
                    <CreateHunt
                        goToCreatingSteps={this.changeToCreatingSteps.bind(this)}
                        setHuntID={this.setHuntId.bind(this)} />
                }
                {this.state.activeMenu == 'newSteps' &&

                    <div>
                        <Step huntID={'-LOCz1XkIhgBVqqI0PVJ'} uid={uid} />
                        <br /><br />
                        <HuntSteps huntID={'-LOCz1XkIhgBVqqI0PVJ'} uid={uid} />
                    </div>
                }
            </div>
        )
    }
}

export default Dashboard