import React from 'react'
import firebase from '../../firebase/firebase'
import SavedHunt from './SavedHunt'
import DashboardContext from './DashboardContext';

class SavedHunts extends React.Component {

    static contextType = DashboardContext

    state = {
        savedHunts: null,
        uid: null,
    }

    fetchHunts = () => {
        const { uid } = this.context.state
        
        if (!uid) {
            return
        }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        ref.on('value', (snapShot) => {
            console.log(snapShot.val())
            this.setState({
                savedHunts: snapShot.val()
            })
        })
    }

    componentDidMount = () => {
        this.fetchHunts()
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { savedHunts } = this.state

        return (
            <div style={{ paddingTop: "2%" }}>
                {savedHunts != null &&
                    Object.keys(savedHunts).map((hunt, i) => {
                        return (
                           <SavedHunt 
                                key={i} 
                                huntId={savedHunts[hunt].id} 
                                huntName={savedHunts[hunt].hunt_name} 
                                huntDes={savedHunts[hunt].hunt_description}
                                huntParticipants={savedHunts[hunt].participants}
                                huntSteps={savedHunts[hunt].steps} /> 
                        )
                    })}
            </div>
        )
    }
}

export default SavedHunts