import React from 'react'
import firebase from '../../firebase/firebase'

// class DisplayStep extends React.Component {
//     render() {
//         const { stepName, stepHint, stepFeedback } = this.props

//         return (
//             <div>
//                 <h5>Steps</h5>
//                 <h6>Name: {stepName}</h6>
//                 <p>Hint: {stepHint}</p>
//                 <small>Feedback: {stepFeedback}</small>
//             </div>
//         )
//     }
// }

class Step extends React.Component {
    state = {
        stepName: '',
        stepHint: '',
        stepImage: null,
        stepFeedback: '',
        order: 1,
        qrCode: ''
    }

    submitStep = () => {
        const {stepName, stepHint, stepImage, stepFeedback, order, qrCode} = this.state
        const { uid, huntID } = this.props
        console.log(uid, huntID)
        // if(!uid || !huntId) {
        //     return
        // }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntID).child('steps')
        const stepId = ref.push().key

        ref.child(stepId).set({
            title: stepName,
            hint: stepHint,
            feedback: stepFeedback,
            id: stepId,
            order: order,
            qr_code: "http://api.qrserver.com/v1/create-qr-code/?data="+stepId+"&size=500x500"
        })
        .then( () => {
            console.log("Step Created")
            this.setState({
                stepName: '',
                stepHint: '',
                stepImage: null,
                stepFeedback: '',
                order: this.state.order + 1,
                uid: null,
            })
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {

    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { stepName, stepHint, stepFeedback} = this.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                    {/* <DisplayStep stepName={stepName} stepHint={stepHint} stepFeedback={stepFeedback}/> */}

                    <form>
                        <fieldset>
                            <legend>Create Step</legend>
                            <div class="form-group row">
                                <label for="stepName" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="stepName" value={stepName} onChange={e => this.handleChange(e)}  placeholder="Step Name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="hint" class="col-sm-2 col-form-label">Hint</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" name="stepHint" value={stepHint}  onChange={e => this.handleChange(e)}  placeholder="Step Hint" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="file" class="form-control-file" name="stepImage" aria-describedby="fileHelp"/>
                                <small id="fileHelp" class="form-text text-muted">Image for the step</small>
                            </div>
                            <div class="form-group row">
                                <label for="feedback" class="col-sm-2 col-form-label">Feedback</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="stepFeedback" value={stepFeedback}  onChange={e => this.handleChange(e)}  placeholder="Passed Step Feedback"/>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.submitStep}>Add Step</button>
                        </fieldset>
                    </form>
                    <br/><br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Step