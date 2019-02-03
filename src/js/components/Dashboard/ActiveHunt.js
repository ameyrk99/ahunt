import React from 'react'
import firebase from '../../firebase/firebase'
import './dashboard.css'
import DashboardContext from './DashboardContext'

class ActiveHunt extends React.Component {

    static contextType = DashboardContext

    state = {
        participants: null,
        participantsLoaded: false,
        status: null,
        code: null
    }

    fetchParticipants = () => {
        const { uid, activeHuntId } = this.context.state
        if (!uid || !activeHuntId) {
            return
        }
        firebase.database().ref('users').child(uid).child('hunts/saved').child(activeHuntId)
            .on('value', (snapShot) => {
                this.setState({
                    participants: snapShot.child('participants').val(),
                    participantsLoaded: true,
                    steps: snapShot.child('steps').val()
                })
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

        const { participants, participantsLoaded, steps } = this.state
        const { displayName, activeHuntId } = this.context.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello {displayName}</h1>

                        <br />

                        {!activeHuntId &&
                            <div>No active hunt. Initiate hunt to begin</div>
                        }
                        
                        {(activeHuntId && participantsLoaded && participants) &&
                            <div>
                                <h3>Participants: {Object.keys(participants).length}</h3>
                                {Object.keys(participants).map((participant) => {
                                    
                                    return (
                                        <div key={participants[participant].id}>
                                            <div style={{
                                                paddingLeft: "1%",
                                                paddingTop: "1%"
                                            }}>
                                                {participants[participant].name}:<br />
                                                <p style={{ paddingLeft: "1%" }}>Current Step: {participants[participant].current_step_order || 0} {participants[participant].current_step_title}</p>

                                                {participants[participant].current_step_order === Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar bg-success" role="progressbar" style={{
                                                            width: "100%",
                                                            ariaValuenow: 40,
                                                            ariaValuemin: 0,
                                                            ariaValuemax: 100
                                                        }}></div>
                                                    </div>

                                                }

                                                {participants[participant].current_step_order != Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                            width: participants[participant].current_step_order * 1000 / (Object.keys(steps).length + 1),
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