import React from 'react'
import firebase from '../../../firebase/firebase'
import FinishedStep from './FinishedStep'
import DashboardContext from '../DashboardContext'

class HuntsSteps extends React.Component {

    static contextType = DashboardContext

    state = {
        finishedSteps: null
    }

    fetchSteps = () => {
        const { uid } = this.context.state
        const { huntId } = this.props
        if (!uid || !huntId) {
            return
        }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntId).child('steps')
        ref.on('value', (snapShot) => {
            this.setState({
                finishedSteps: snapShot.val()
            })
        })
    }

    componentDidMount = () => {
        this.fetchSteps()
    }

    componentWillUnmount = () => {
        const { uid } = this.context.state
        const {huntId} = this.props

        if (!uid || !huntId) return

        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntId).child('steps')
        ref.off('value')
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { finishedSteps } = this.state

        if (!finishedSteps) {
            return <div></div>
        }

        return (
            <div style={{ paddingTop: "2%" }}>
                <div className="container">
                    <div className="jumbotron">
                        {finishedSteps != null &&
                            Object.keys(finishedSteps).map((step, i) => {
                                return (
                                    <div key={finishedSteps[step].id}>
                                        <FinishedStep
                                            stepName={finishedSteps[step].title}
                                            stepHint={finishedSteps[step].hint}
                                            image={finishedSteps[step].image ? finishedSteps[step].image.url : null}
                                            stepFeedback={finishedSteps[step].feedback} />
                                        <br />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HuntsSteps