import React from 'react'
import firebase from '../../firebase/firebase'
import ParticipantProvider from './ParticipantProvider'
import Screens from './Screens'

class Participant extends React.Component {

    render() {
        return (
            <ParticipantProvider>
                <Screens />
            </ParticipantProvider>
        )
    }
}

export default Participant;