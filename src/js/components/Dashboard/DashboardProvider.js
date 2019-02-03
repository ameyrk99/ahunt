import React from 'react'
import DashboardContext from './DashboardContext'

class DashboardProvider extends React.Component {
    state = {
        activeMenu: 'activeHunt'
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
        console.log('check if active hunt fired')
        const ref = firebase.database().ref("users").child(this.state.uid).child("hunts").child("active")
        ref.once('value')
            .then((snapShot) => {
                console.log(snapShot.val())
                if (snapShot.exists() && (snapShot.child('status').val() != 'ended' || !snapShot.child('status').val())) {
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
        const { uid, huntName, huntDes } = this.state
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key

        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
            id: huntId
        })
            .then(() => {
                this.setState({
                    huntCreated: true,
                    huntID: huntId,
                    activeMenu: 'newSteps'
                })
            })
            .catch((error) => {
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
        return (
            <DashboardContext.Provider
                value={
                    {
                        state: this.state,
                        signOutWithFirebase: this.signOutWithFirebase
                    }
                }>
                {this.props.children}
            </DashboardContext.Provider>
        )
    }
}

export default DashboardProvider