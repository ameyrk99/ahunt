import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import '../Home/home.css'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
        authenticationFail: false,
        authenticationFailMessage: null,
        authenticationSuccess: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault()
            this.authenticateWithFirebase()
        }
    }

    authenticateWithFirebase = () => {

        this.setState({
            authenticationFail: false,
            loading: true
        })

        if (!this.state.email || !this.state.password) {

            this.setState({
                authenticationFail: true,
                authenticationFailMessage: 'Fields cannot be left empty',
                loading: false
            })

            return
        }

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                localStorage.setItem('currentUserData', JSON.stringify(user.user))
                // console.log(JSON.parse(localStorage.getItem('currentUserData')));

                this.setState({
                    authenticationSuccess: true,
                    loading: false
                })

            })
            .catch((error) => {
                let errorCode = error.code
                let failMessage
                if (errorCode == "auth/wrong-password")
                    failMessage = "Password is incorrect"
                else if (errorCode == "auth/invalid-email")
                    failMessage = "Invalid email"
                else if (errorCode == "auth/user-not-found")
                    failMessage = "This account does not exist"
                else
                    failMessage = error.message

                this.setState({
                    authenticationFail: true,
                    authenticationFailMessage: failMessage,
                    loading: false
                })
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // ...
            })

    }

    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ authenticationSuccess: true })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const { email, password, authenticationSuccess } = this.state

        if (authenticationSuccess) {
            return <Redirect push to="/dashboard" />
        }

        return (
            <div>
                <h1 className="name">KHunt</h1>
                <div className="row" style={{
                    paddingTop: "3%"
                }}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card rounded">
                            <div className="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" class="form-control" name="email" value={email} aria-describedby="emailHelp" placeholder="Enter email" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" name="password" value={password} placeholder="Password" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                                    </div><br/>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <button
                                            type="button"
                                            value="Log In"
                                            className="btn btn-primary rounded"
                                            onClick={this.authenticateWithFirebase}>
                                            Login
                                            </button>
                                        </div>
                                        <div className="col-sm-2">
                                            <button
                                                type="button"
                                                value="Redirect To Register"
                                                className="btn btn-success rounded">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                    
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

export default Login