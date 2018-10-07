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
            <div>
                <h1 className="name">AHunt</h1>
                <div className="row" style={{
                    paddingTop: "3%"
                }}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card rounded">
                            <div className="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="name">Full Name</label>
                                        <input type="text" class="form-control" name="name" value={name} placeholder="Enter full name" onChange={e => this.handleChange(e)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" class="form-control" name="email" value={email} aria-describedby="emailHelp" placeholder="Enter email" onChange={e => this.handleChange(e)}/>
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" name="password" value={password} placeholder="Password" onChange={e => this.handleChange(e)}/>
                                    </div>
                                    <button
                                        type="button"
                                        value="Log In"
                                        className="btn btn-primary rounded"
                                        onClick={this.registerWithFirebase}>
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}

export default Register