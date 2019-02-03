import React from 'react'
import firebase from '../../firebase/firebase'
import './dashboard.css'
import DashboardContext from './DashboardContext'
import moment from 'moment'

class ActiveHunt extends React.Component {

    static contextType = DashboardContext

    state = {
        huntName: null,
        participants: null,
        participantsLoaded: false,
        status: null,
        code: null
    }

    rankParticipants = () => {
        const { participants } = this.state
        let participantsRankedByStep = participants.sort((a, b) => {
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

        this.setState({ participants: participantsRankedByStep })
    }

    fetchParticipants = () => {
        const { uid, activeHuntId } = this.context.state
        if (!uid || !activeHuntId) {
            return
        }
        firebase.database().ref('users').child(uid).child('hunts/saved').child(activeHuntId)
            .on('value', (snapShot) => {
                this.setState({
                    huntName: snapShot.child('hunt_name').val(),
                    participants: Object.values(snapShot.child('participants').val()),
                    participantsLoaded: true,
                    steps: snapShot.child('steps').val()
                }, () => this.rankParticipants())
            })
    }

    fetchActiveHuntInfo = () => {
        const { uid } = this.context.state
        if (!uid) return
        firebase.database().ref('users').child(uid).child('hunts/active')
            .on('value', (snapShot) => {
                this.setState({
                    status: snapShot.child('status').val(),
                    code: snapShot.child('hunt_code').val(),
                })
            })
    }

    componentDidMount = () => {
        this.fetchParticipants()
        this.fetchActiveHuntInfo()
    }

    

    render() {

        const { participants, participantsLoaded, steps, status, code, huntName } = this.state
        const { displayName, activeHuntId } = this.context.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello {displayName}</h1>

                        <br />

                        {activeHuntId &&
                            <h3>{huntName}</h3>
                        }

                        {!activeHuntId &&
                            <div>No active hunt. Initiate hunt to begin</div>
                        }

                        {activeHuntId &&
                            <div>
                                <div>Code {code}</div>
                                <div>Status {status}</div>
                                {status == 'initiated' && !participants &&
                                    <div>Waiting for participants</div>
                                }
                            </div>
                        }

                        {(activeHuntId && participantsLoaded && participants) &&
                            <div>
                                <h3>Participants: {participants.length}</h3>
                                {participants.map((participant, i) => {

                                    return (
                                        <div key={participant.id}>
                                            <div style={{
                                                paddingLeft: "1%",
                                                paddingTop: "1%"
                                            }}>
                                                <b>{i + 1}</b> - {participant.name}:<br />
                                                <p style={{ paddingLeft: "1%" }}>
                                                    Current Step: {participant.current_step_order || 'Initial Step'} {participant.current_step_title}
                                                    {participant.current_step_order && participant.time_completion ? <i> - {moment(participant.time_completion[participant.current_step_order], moment.ISO_8601).format('LT')} </i> : null}
                                                </p>

                                                {participant.current_step_order === Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar bg-success" role="progressbar" style={{
                                                            width: "100%",
                                                            ariaValuenow: 40,
                                                            ariaValuemin: 0,
                                                            ariaValuemax: 100
                                                        }}></div>
                                                    </div>

                                                }

                                                {participant.current_step_order != Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                            width: participant.current_step_order * 1000 / (Object.keys(steps).length + 1),
                                                            ariaValuenow: 40,
                                                            ariaValuemin: 0,
                                                            ariaValuemax: 100
                                                        }}></div>
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default ActiveHunt