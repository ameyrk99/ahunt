import React from 'react'
import firebase from '../../firebase/firebase'
import './dashboard.css'

const participants = [
    {
        name: "Hermionie",
        id: "ajsdlAFaf",
        currentStep: 4
    },
    {
        name: "Harry",
        id: "Adsfaeag",
        currentStep: 6
    },
    {
        name: "Ron",
        id: "asdfarFAs",
        currentStep: 3
    },
    {
        name: "Voldermot",
        id: "asdataARARArsd",
        currentStep: 10
    }
]

const totalSteps = 10

const steps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Step 7',
    'Step 8',
    'Step 9',
    'Destination',
]

class ActiveHunt extends React.Component {

    state = {
        participants: null,
        participantsLoaded: false
    }

    fetchParticipants = () => {
        firebase.database().ref('users').child(this.props.uid).child('hunts/saved').child(this.props.activeHuntId)
            .on('value', (snapShot) => {
                console.log(snapShot.val())
                this.setState({
                    participants: snapShot.child('participants').val(),
                    participantsLoaded: true,
                    steps: snapShot.child('steps').val()
                })
            })
    }

    componentDidMount = () => {
        this.fetchParticipants()
    }

    render() {

        const { displayName, participants, participantsLoaded, steps } = this.state
        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello {displayName}</h1>

                        <br />
                        
                        {(participantsLoaded) &&
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
                                                <p style={{ paddingLeft: "1%" }}>Current Step: {participants[participant].current_step_count} {participants[participant].current_step_title}</p>

                                                {participants[participant].current_step_count === Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar bg-success" role="progressbar" style={{
                                                            width: "100%",
                                                            ariaValuenow: 40,
                                                            ariaValuemin: 0,
                                                            ariaValuemax: 100
                                                        }}></div>
                                                    </div>

                                                }

                                                {participants[participant].current_step_count != Object.keys(steps).length &&
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                            width: participants[participant].current_step_count * 1000 / Object.keys(steps).length,
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