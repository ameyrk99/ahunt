import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

import ActiveHunt from './ActiveHunt'
import NoActiveHunt from './NoActiveHunt'
import Navbar from '../Navbar/Navbar'
import CreateHunt from './CreateHunt'
import CreateStep from './HuntsSteps'

import './dashboard.css'
class Dashboard extends React.Component {
    state = {
        signedOut: false,
        activeMenu: 'newSteps',
        uid: null
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
                    activeMenu: 'activeHunt'
                })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { signedOut, activeMenu } = this.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <Navbar 
                    activeMenu={activeMenu}
                    changeActiveMenu={ (activeMenu) => this.setState({activeMenu: activeMenu})}/>

                {this.state.activeMenu =='noActiveHunt' && !this.state.activeMenu=='activeHunt' &&
                    // <NoActiveHunt/>
                    <CreateHunt/>
                }
                {this.state.activeMenu=='activeHunt' &&
                    <ActiveHunt /> 
                }
                {(this.state.activeMenu=='newHunt' && !this.state.activeHunt) &&
                    <CreateHunt goToCreatingSteps = { () => this.setState({activeMenu: 'newSteps'})}/>
                }
                {this.state.activeMenu=='newSteps' &&
                    <CreateStep/>
                }
            </div>
        )
    }
}

export default Dashboard