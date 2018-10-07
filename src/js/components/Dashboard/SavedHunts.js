import React from 'react'
import firebase from '../../firebase/firebase'
import SavedHunt from './SavedHunt'

class SavedHunts extends React.Component {

    state = {
        savedHunts: null,
        uid: null,
    }

    fetchHunts = () => {
        const { uid } = this.props
        if (!uid) {
            return
        }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        ref.on('value', (snapShot) => {
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
        const { uid } = this.props

        return (
            <div style={{ paddingTop: "2%" }}>
                {savedHunts != null &&
                    Object.keys(savedHunts).map((hunt, i) => {
                        return (
                           <SavedHunt key={i} huntName={savedHunts[hunt].hunt_name} huntDes={savedHunts[hunt].hunt_description} uid={uid} huntId={savedHunts[hunt].hunt_id}/> 
                        )
                    })}
            </div>
        )
    }
}

export default SavedHunts