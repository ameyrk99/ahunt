import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

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
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
              this.setState({authenticationSuccess: true})
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
            <form>
                Email 
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={e => this.handleChange(e)}
                    onKeyPress={this.handleKeyPress} />
                Password 
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={e => this.handleChange(e)}
                    onKeyPress={this.handleKeyPress} />

                <button 
                    type="button" 
                    value="Log In" 
                    onClick={this.authenticateWithFirebase}>
                    Login 
                </button> 
            </form>
                        )
                   }
               }
                
export default Login