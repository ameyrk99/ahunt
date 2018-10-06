import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

class Dashboard extends React.Component {
    state = { 
        signedOut: false
    }

    signOutWithFirebase = () => {
        firebase.auth().signOut()
            .then ( () => {
                console.log('signed out successfully')
                this.setState({signedOut: true})
            })
            .catch( () => console.log('failed to sign out'))
    }
    
    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged( (user) => {
            if (!user) {
              this.setState({signedOut: true})
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
                Welcome to Dashboard
                <button onClick={this.signOutWithFirebase} >Sign Out</button>
            </div>
            
         )
    }
}
 
export default Dashboard