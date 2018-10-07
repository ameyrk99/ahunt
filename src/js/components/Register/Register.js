import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'


class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        registrationFail: false,
        registrationFailMessage: null,
        registrationSuccess: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerWithFirebase = () => {
        const { email, password } = this.state

        firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((user) => {
                const account = {
                    name: this.state.name,
                    email: this.state.email,
                    uid: user.user.uid
                }
                this.addDisplayName(user.user.uid)
                this.setState({ creatingAccount: false, accountCreated: true })
            })

            .catch((error) => {
                this.setState({ creatingAccount: false, creatingAccountError: true })
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    addDisplayName = (uid) => {
        const { name } = this.state

        const user = firebase.auth().currentUser

        user.updateProfile({
            displayName: name
        })
            .then(() => {
                const updatedUser = firebase.auth().currentUser
                this.addNameToDatabase(uid, name)
            })
            .catch((error) => {
                this.setState({ registrationFail: true, registrationFailMessage: 'unable to add display name' })
                console.log('display name add failed', error)
            })
    }

    addNameToDatabase = (uid, name) => {
        firebase.database().ref('users').child(uid).child('credentials')
            .update({
                name: name
            })
            .then(() => this.setState({ registrationSuccess: true }))
            .catch((error) => {
                console.log('unable to add name to database', error)
                this.setState({ creatingAccount: false, creatingAccountError: true })
            })
    }

    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.displayName) {
                this.setState({ registrationSuccess: true })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { name, email, password, registrationSuccess } = this.state

        if (registrationSuccess) {
            return <Redirect push to="/dashboard" />
        }

        return (
            <form>
                Full Name

                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => this.handleChange(e)} />

                Email
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => this.handleChange(e)} />
                Password
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => this.handleChange(e)} />

                <button
                    type="button"
                    value="Log In"
                    onClick={this.registerWithFirebase} >
                    Sign Up
                </button>
            </form>
        )
    }
}

export default Register