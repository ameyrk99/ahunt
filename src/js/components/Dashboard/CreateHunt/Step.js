import React from 'react'
import firebase from '../../../firebase/firebase'
import DashboardContext from '../DashboardContext';

class Step extends React.Component {

    static contextType = DashboardContext

    state = {
        stepName: '',
        stepHint: '',
        stepImage: null,
        stepFeedback: '',
        order: 1,
        qrCode: '',
        finalStep: false
    }

    submitStep = () => {
        const { stepName, stepHint, stepImage, stepFeedback, order, qrCode, finalStep } = this.state
        const { uid } = this.context.state
        const { huntId } = this.props

        if (!uid || !huntId) {
            return
        }

        if (stepName.trim() == '' || stepHint.trim() == '' || feedback.trim() == '') return

        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntId).child('steps')
        const stepId = ref.push().key

        ref.child(stepId).set({
            title: stepName,
            hint: stepHint,
            feedback: stepFeedback,
            id: stepId,
            order: order,
            final_step: finalStep,
            qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=" + stepId + "&size=500x500"
        })
            .then(() => {

                if (finalStep) {
                    // goes to hunts when done
                    this.context.changeActiveMenu('hunts')
                }

                this.setState({
                    stepName: '',
                    stepHint: '',
                    stepImage: null,
                    stepFeedback: '',
                    order: this.state.order + 1,
                    uid: null,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { stepName, stepHint, stepFeedback, finalStep } = this.state

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
                                        <input type="text" class="form-control" name="stepName" value={stepName} onChange={e => this.handleChange(e)} placeholder="Step Name" />
                                    </div>
                                </div>

                                {/* <div class="form-group">
                                <input type="file" class="form-control-file" name="stepImage" aria-describedby="fileHelp"/>
                                <small id="fileHelp" class="form-text text-muted">Image for the step</small>
                            </div> */}

                                <div class="form-group row">
                                    <label for="feedback" class="col-sm-2 col-form-label">Feedback</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="stepFeedback" value={stepFeedback} onChange={e => this.handleChange(e)} placeholder="Passed Step Feedback" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="hint" class="col-sm-2 col-form-label">Final Step</label>
                                    <div class="col-sm-10">
                                        <input type="checkbox" class="form-control" name="finalStep" value={finalStep} onChange={() => this.setState({ finalStep: !finalStep })} placeholder="Final Step" rows="3"></input>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="hint" class="col-sm-2 col-form-label">Hint for Next Step</label>
                                    <div class="col-sm-10">
                                        <textarea disabled={finalStep} class="form-control" name="stepHint" value={stepHint} onChange={e => this.handleChange(e)} placeholder="Step Hint" rows="3"></textarea>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-primary" onClick={this.submitStep}>{finalStep ? 'Finish' : 'Add Step'}</button>

                            </fieldset>
                        </form>
                        <br /><br />
                    </div>
                </div>
            </div>
        )
    }
}

export default Step