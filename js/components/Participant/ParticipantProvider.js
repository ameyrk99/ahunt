import React from 'react'
import firebase from '../../firebase/firebase'
import axios from 'axios'

export const ParticipantContext = React.createContext()

class ParticipantProvider extends React.Component {
    state = {
        isCodeValid: false,
        checkingCode: false,

        huntCreatorId: null,
        huntCreatorName: null,
        huntId: null,

        huntName: null,
        huntDescription: null,
        huntSteps: null,

        huntStatus: null,

        qrReadError: false,

        stepId: null,
        stepContent: null,
        stepContentLoaded: false,
        stepContentLoading: false,

        participantId: null,
        participantName: null,

        deletedStorageDataAfterEnded: false,
        inDeleteCountdownSequence: false

    }

    submitCode = (code) => {
        this.setState({ checkingCode: true })

        console.log(code)

        axios.get('https://us-central1-kahunt-218617.cloudfunctions.net/checkCode', {
            params: {
                code: code
            }
        })
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
                    this.setState({
                        huntCreatorId: response.data.huntCreatorId,
                        huntCreatorName: response.data.huntCreatorName,
                        huntId: response.data.huntId,

                        huntName: response.data.huntName,
                        huntDescription: response.data.huntDescription,
                        huntSteps: response.data.huntSteps,

                        isCodeValid: true,
                        checkingCode: false
                    })
                    localStorage.setItem('huntCode', code)
                    this.fetchHuntStatus()
                }
                else {
                    this.setState({
                        isCodeValid: false,
                        checkingCode: false
                    })
                }

            })
            .catch((error) => {
                this.setState({ isCodeValid: true, checkingCode: false })
                console.log('unable to check code', error)
            })
    }

    fetchHuntStatus = () => {
        console.log(this.state.huntCreatorId)
        firebase.database().ref('users').child(this.state.huntCreatorId).child('hunts').child('active/status')
            .on('value', (snapshot) => {
                this.setState({ huntStatus: snapshot.val() })
            })
    }

    handleQrData = (stepId) => {
        if (stepId) {
            console.log(stepId)
            const { previousStepId } = this.state
            this.setState({
                stepId: stepId,
            }, () => this.fetchStepContent())
        }
        else {
            console.log('stepId is null')
        }

    }

    addName = (name) => {

        const { huntCreatorId, huntId, stepId } = this.state

        if (this.state.participantId) {
            firebase.database().ref('users').child(huntCreatorId).child('hunts').child('saved').child(huntId).child('participants').child(this.state.participantId)
                .update({
                    name: name
                })
                .then(() => {
                    localStorage.setItem('participantName', name)
                    this.setState({ participantName: name })
                })
        }
        else {
            const { huntCreatorId, huntId, stepId } = this.state
            const ref = firebase.database().ref('users').child(huntCreatorId).child('hunts').child('saved').child(huntId).child('participants')
            const participantId = ref.push().key

            ref.child(participantId).update({
                id: participantId,
                name: name
            })
                .then(() => {
                    localStorage.setItem('participantId', participantId)
                    this.setState({ participantName: name, participantId: participantId })
                })
                .catch((error) => {
                    console.log('unable to create name and id', error)
                })
        }

    }

    updateProgress = () => {
        const { participantId, stepContent, stepId, huntCreatorId, huntId } = this.state
        firebase.database().ref('users').child(huntCreatorId).child('hunts').child('saved').child(huntId).child('participants').child(participantId)
            .update({
                current_step_order: stepContent.order,
                current_step_id: stepId,
                current_step_title: stepContent.title
            })
            .then(() => this.updateCompletedCount())
            .catch(error => console.log(error))
    }

    updateCompletedCount = () => {
        const { participantId, stepContent, stepId, huntCreatorId, huntId } = this.state
        firebase.database().ref('users').child(huntCreatorId).child('hunts').child('saved').child(huntId).child('steps').child(stepId).child('completed')
            .update({
                [participantId]: true
            })
            .catch(error => console.log(error))
    }

    handleQrReadError = (error) => {
        this.setState({
            qrReadError: true
        })
    }

    fetchStepContent = () => {

        this.setState({ stepContentLoading: true })

        const { huntCreatorId, huntId, stepId } = this.state

        firebase.database().ref('users').child(huntCreatorId).child('hunts').child('saved').child(huntId).child('steps').child(stepId)
            .once('value')
            .then((snapshot) => {
                console.log(snapshot.val())
                this.setState({
                    stepContent: snapshot.val(),
                    stepContentLoaded: true,
                    stepContentLoading: false
                }, () => this.updateProgress())
            })
    }

    onContinueHunt = () => {
        this.setState({
            stepId: null,
            stepContent: null,
            stepContentLoaded: false,
            stepContentLoading: false
        })
    }

    componentDidMount = () => {
        const savedCode = localStorage.getItem('huntCode')
        const savedParticipantId = localStorage.getItem('participantId')
        const savedParticipantName = localStorage.getItem('participantName')
        if (savedCode) {
            this.submitCode(savedCode)
        }
        if (savedParticipantId) {
            this.setState({ participantId: savedParticipantId })
        }
        if (savedParticipantName) {
            this.setState({ participantName: savedParticipantName })
        }
    }

    componentDidUpdate = () => {
        const { deletedStorageDataAfterEnded, huntStatus, inDeleteCountdownSequence } = this.state

        if (huntStatus == 'ended' && !deletedStorageDataAfterEnded && !inDeleteCountdownSequence) {

            this.setState({ inDeleteCountdownSequence: true })

            setTimeout(() => {
                localStorage.removeItem('huntCode')
                localStorage.removeItem('participantId')
                localStorage.removeItem('participantName')
                localStorage.removeItem('currentUserData')
                this.setState({ deletedStorageDataAfterEnded: true })
            }, 5000)

        }

    }

    render() {
        return (
            <ParticipantContext.Provider
                value={
                    {
                        state: this.state,
                        submitCode: (code) => this.submitCode(code),

                        handleQrData: (stepId) => this.handleQrData(stepId),
                        handleQrReadError: (error) => this.handleQrReadError(error),

                        onContinueHunt: () => this.onContinueHunt(),

                        addName: (name) => this.addName(name)

                    }
                }>
                {this.props.children}
            </ParticipantContext.Provider>
        )
    }
}

export default ParticipantProvider