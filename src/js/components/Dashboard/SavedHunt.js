import React from 'react'
import axios from 'axios'
import QRPage from "../QRPage/QRPage"
import firebase from '../../firebase/firebase'

class SavedHunt extends React.Component {

    state = {
        checkingCode: false,
        code: null,
        status: null,
        buttonAction: 'Initiate'

    }

    initiateHunt = (uid, huntId) => {
        this.setState({ 
            checkingCode: true, 
            code: null,
            buttonAction: '...'
        })

        console.log(uid, huntId)

        axios.get('https://us-central1-kahunt-218617.cloudfunctions.net/startHunt', {
            params: {
                uid: uid,
                hunt_id: huntId
            }
        })
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
                    this.setState({
                        code: response.data,
                        checkingCode: false,
                        buttonAction: 'Start'
                    })
                }
                else {
                    this.setState({
                        checkingCode: false,
                        
                    })
                }

            })
            .catch((error) => {
                this.setState({ isCodeValid: true, checkingCode: false })
                console.log('unable to check code', error)
            })
    }

    buttonHandler = () => {
        const { status, code } = this.state
        if (!status || status == 'ended') {
            this.initiateHunt(this.props.uid, this.props.huntId)
        }
        if (status == 'initiated') {
            this.onStartClickHandler()
        }
        if (status == 'started'){
            this.onEndClickHandler()
        }
    }

    onStartClickHandler = () => {
        firebase.database().ref('users').child(this.props.uid).child('hunts/active')
            .update({
                status: 'started'
            })
            .then( () => this.setState({buttonAction: 'End'}))
    }

    onEndClickHandler = () => {
        firebase.database().ref('users').child(this.props.uid).child('hunts/active')
            .update({
                status: 'ended'
            })
            .then( () => this.setState({buttonAction: 'Initiate'}))
    }

    fetchCodeAndStatus = () => {
        firebase.database().ref('users').child(this.props.uid).child('hunts/active')
            .on('value', (snapshot) => {
                console.log(snapshot.child('hunt_id').val(), this.props.huntId)
                if (snapshot.child('hunt_id').val() == this.props.huntId) {
                    const status = snapshot.child('status').val()
                    let buttonAction
                    if (!status || status == 'ended') {
                        buttonAction='Initiate'
                        this.initiateHunt(this.props.uid, this.props.huntId)
                    }
                    if (status == 'initiated') {
                        this.onStartClickHandler()
                    }
                    if (status == 'started'){
                        this.onEndClickHandler()
                    }
                    this.setState({
                        status: status,
                        code: snapshot.child('hunt_code').val()
                    })
                }
            })
    }

    componentDidMount = () => {
        this.fetchCodeAndStatus()
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { huntName, huntDes, uid, huntId } = this.props

        const {checkingCode, code, buttonAction} = this.state

        return (
            <div className="container">
                <div style={{
                    paddingTop: "2%",
                    color: "white"
                }}>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-8">
                            <h3>{huntName}</h3>
                            <p>{huntDes}</p>
                            <QRPage uid={uid} huntID={huntId}/>
                        </div>
                         {code && 
                            <div>{code}</div>
                        }
                        {status &&
                            <div>status</div>
                        }
                        {status == 'initiated' &&
                            <button onClick={this.onStartClickHandler}>Start</button>
                        }
                        {status == 'started' &&
                            <button onClick={this.onEndClickHandler}>Start</button>
                        }
                        <div className="col-md-2">
                            <button 
                                type="button" 
                                class="btn btn-success" 
                                onClick={this.buttonHandler}>{buttonAction}</button>
                            {checkingCode &&
                                <div>Initiating</div>
                            }
                            
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SavedHunt