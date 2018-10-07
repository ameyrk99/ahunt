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

class CreateStep extends React.Component {
    // state = {
    //     huntName: '',
    //     huntDes: '',
    //     huntSteps: 0,
    //     huntCreated: false,
    //     huntCreationFail: false,
    //     stepName: ''
    // }

    state = {
        stepName: '',
        stepHint: '',
        stepImage: null,
        stepFeedback: ''
    }

    submitStep = () => {
        console.log("Step Created")
        // const {uid, huntName, huntDes, huntSteps} = this.state
        // const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        // const huntId = ref.push().key
        // ref.child(huntId).set({
        //     hunt_name: huntName,
        //     hunt_description: huntDes,
        //     hunt_steps: huntSteps
        // })
        // .then( () => {
        //     this.setState({
        //         huntCreated: true
        //     })
        // })
        // .catch( (error) => {
        //     console.log(error)
        //     this.setState({
        //         huntCreationFail: true
        //     })
        // })

        // const {uid, stepName, stepHint, stepImage, stepFeedback} = this.state
        // const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        // const stepId = ref.push().key
        // ref.child(huntId).set({
        //     step_name: stepName,
        //     step_hint: stepHint,
        //     step_feedback: stepFeedback
        // })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // checkIfSignedIn = () => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user && user.displayName) {
    //             this.setState({ uid: user.uid })
    //         }
    //     })
    // }

    // componentDidMount = () => {
    //     this.checkIfSignedIn()
    // }

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
                                    <input type="text" class="form-control" name="stepName" onChange={e => this.handleChange(e)}  placeholder="Step Name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="hint" class="col-sm-2 col-form-label">Hint</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" name="stepHint" onChange={e => this.handleChange(e)}  placeholder="Step Hint" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="file" class="form-control-file" name="stepImage" aria-describedby="fileHelp"/>
                                <small id="fileHelp" class="form-text text-muted">Image for the step</small>
                            </div>
                            <div class="form-group row">
                                <label for="feedback" class="col-sm-2 col-form-label">Feedback</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="stepFeedback" onChange={e => this.handleChange(e)}  placeholder="Passed Step Feedback"/>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.submitStep}>Add Step</button>
                        </fieldset>
                    </form>
                    <br/><br/>

                    {/* {huntCreated &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Hunt Created</strong> Add Steps: <a href="#" class="alert-link"></a>.
                      </div>
                    } */}

                    {/* {huntCreationFail &&
                        <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Oh snap!</strong> Hunt Creation Failed
                      </div>
                    } */}
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateStep