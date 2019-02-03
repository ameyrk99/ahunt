import React from 'react'
import axios from 'axios'
import QRPage from "../QRPage/QRPage"
import firebase from '../../../firebase/firebase'
import DashboardContext from '../DashboardContext'
import SavedStep from './SavedStep'
import moment from 'moment'

class SavedHunt extends React.Component {

    static contextType = DashboardContext

    state = {
        checkingCode: false,
        code: null,
        status: null,
        buttonAction: 'Initiate',
        showSteps: false,
        showParticipants: false
    }

    initiateHunt = (uid, huntId) => {
        this.setState({
            checkingCode: true,
            code: null,
            buttonAction: '...'
        })

        axios.get('https://us-central1-kahunt-218617.cloudfunctions.net/startHunt', {
            params: {
                uid: uid,
                hunt_id: huntId
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        code: response.data,
                        checkingCode: false,
                        buttonAction: 'Start'
                    })
                    this.context.checkIfActiveHunt()
                }
                else {
                    this.setState({
                        checkingCode: false,

                    })
                }

            })
            .catch((error) => {
                this.setState({ checkingCode: false })
                console.log('unable to check code', error)
            })
    }

    buttonHandler = () => {
        const { status, code } = this.state
        const { uid } = this.context.state
        if (!status || status == 'ended') {
            this.initiateHunt(uid, this.props.huntId)
        }
        if (status == 'initiated') {
            this.onStartClickHandler()
        }
        if (status == 'started') {
            this.onEndClickHandler()
        }
    }

    onStartClickHandler = () => {
        const { uid } = this.context.state
        firebase.database().ref('users').child(uid).child('hunts/active')
            .update({
                status: 'started'
            })
            .then(() => {
                this.setState({ buttonAction: 'End' })
                this.context.checkIfActiveHunt()
            })
    }

    onEndClickHandler = () => {
        const { uid } = this.context.state
        firebase.database().ref('users').child(uid).child('hunts/active')
            .update({
                status: 'ended'
            })
            .then(() => {
                this.setState({ buttonAction: 'Initiate', code: null })
                this.context.checkIfActiveHunt()
            })
    }

    resetParticipation = () => {
        const { uid } = this.context.state
        const { huntId } = this.props

        firebase.database().ref('users').child(uid).child('hunts/saved').child(huntId).child('participants').remove()
            .catch((error) => console.log('unable to delete participants', error))
    }

    deleteHunt = () => {
        const { uid } = this.context.state
        const { huntId } = this.props

        firebase.database().ref('users').child(uid).child('hunts/saved').child(huntId).remove()
            .catch((error) => console.log('unable to delete hunt', error))
    }

    fetchCodeAndStatus = () => {
        const { uid } = this.context.state
        firebase.database().ref('users').child(uid).child('hunts/active')
            .on('value', (snapshot) => {
                if (snapshot.child('hunt_id').val() == this.props.huntId) {
                    const status = snapshot.child('status').val()
                    let buttonAction
                    let code = snapshot.child('hunt_code').val()
                    if (!status || status == 'ended') {
                        buttonAction = 'Initiate'
                        code = null
                    }
                    if (status == 'initiated') {
                        buttonAction = 'Start'
                    }
                    if (status == 'started') {
                        buttonAction = 'End'
                    }
                    this.setState({
                        status: status,
                        code: code,
                        buttonAction: buttonAction
                    })
                }
            })
    }

    rankParticipants = () => {
        const { huntParticipants } = this.state
        let participantsRankedByStep = huntParticipants.sort((a, b) => {
            if (!a.current_step_order) {
                a.current_step_order = 0
            }
            if (!b.current_step_order) {
                b.current_step_order = 0
            }
            if (a.current_step_order == b.current_step_order) {
                return moment(b.time_completion[b.current_step_order], moment.ISO_8601).diff(moment(a.time_completion[a.current_step_order], moment.ISO_8601))
            }

            return b.current_step_order - a.current_step_order
        })

        this.setState({ huntParticipants: participantsRankedByStep })
    }

    componentDidMount = () => {
        this.fetchCodeAndStatus()
        const { huntParticipants } = this.props
        if (huntParticipants)
            this.setState({ huntParticipants: Object.values(huntParticipants) }, () => this.rankParticipants())
    }

    componentWillUnmount = () => {
        const { uid } = this.context.state
        const ref = firebase.database().ref('users').child(uid).child('hunts/active')
        ref.off('value')
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { huntName, huntDes, huntId, huntSteps } = this.props

        const { checkingCode, code, buttonAction, showSteps, huntParticipants, status, showParticipants } = this.state

        return (
            <div className="container">
                <div style={{
                    paddingTop: "2%",
                    color: "white"
                }}>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                            <h3>{huntName}{status != 'ended' ? ' - Active' : null}</h3>
                            <p>{huntDes}</p>
                            <QRPage huntID={huntId} />

                            {huntSteps &&
                                <div>
                                    <div>{Object.keys(huntSteps).length} Steps</div>
                                    <button onClick={() => this.setState({ showSteps: !showSteps })}>{showSteps ? 'Hide' : 'Show'} Steps</button>

                                    {showSteps && Object.keys(huntSteps).map((step) => {
                                        return (
                                            <div key={huntSteps[step].id}>

                                                <SavedStep
                                                    title={huntSteps[step].title}
                                                    hint={huntSteps[step].hint}
                                                    feedback={huntSteps[step].feedback}
                                                    huntId={huntId}
                                                    stepId={huntSteps[step].id} />

                                            </div>
                                        )
                                    })}
                                </div>


                            }
                            {huntParticipants && status == 'ended' &&
                                <div>
                                    <button onClick={() => this.setState({ showParticipants: !showParticipants })}>{showParticipants ? 'Hide' : 'Show'} Participants</button>
                                    {showParticipants &&
                                        <div>
                                            <h5>Previous Participants</h5>
                                            {huntParticipants.map((participant, i) => {
                                                return (
                                                    <div key={participant.id}>
                                                        <h6> <b>{i + 1}</b> - {participant.name}</h6>
                                                    </div>
                                                )
                                            })}
                                            <button onClick={this.resetParticipation}>Reset Participation</button>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                        {code && (buttonAction != 'Initiate' || buttonAction != 'End') &&
                            <div>Code: {code}</div>
                        }

                        <div className="col-md-2">
                            <button onClick={this.deleteHunt}>Delete Hunt</button>
                        </div>

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