import React from 'react'
import firebase from '../../firebase/firebase'

class SavedHunts extends React.Component {

    state = {
        savedHunts: null
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

        return (
            <div style={{paddingTop: "2%"}}>
                {savedHunts != null &&
                    Object.keys(savedHunts).map((hunt) => {
                        return (
                            <div className="container">
                                <div style={{
                                    paddingTop: "2%",
                                    color: "white"
                                }}>
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-8">
                                            <h3>{savedHunts[hunt].hunt_name}</h3>
                                            <p>{savedHunts[hunt].hunt_description}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" class="btn btn-success">Start</button>
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default SavedHunts