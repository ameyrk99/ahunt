import React from 'react'
import firebase from '../../firebase/firebase'
import FinishedStep from './FinishedStep'

class HuntsSteps extends React.Component {

    state = {
        finishedSteps: null
    }

    fetchSteps = () => {
        const { uid, huntID } = this.props
        if(!uid || !huntID) {
            return
        }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntID).child('steps')
        ref.on('value', (snapShot) => {
            this.setState({
                finishedSteps: snapShot.val()
            })
        })
    }

    componentDidMount = () => {
        this.fetchSteps()
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { finishedSteps } = this.state

        return (
            <div style={{paddingTop: "2%"}}>
                <div className="container">
                    <div className="jumbotron">
                        {finishedSteps != null && 
                            Object.keys(finishedSteps).map( (step) => {
                                return (
                                    <FinishedStep stepName={finishedSteps[step].title} stepHint={finishedSteps[step].hint} image={finishedSteps[step].image? finishedSteps[step].image.url:null} stepFeedback={finishedSteps[step].feedback}/>
                                )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HuntsSteps