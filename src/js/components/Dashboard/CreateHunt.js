import React from 'react'
import firebase from '../../firebase/firebase'

class CreateHunt extends React.Component {

    state = {
        huntName: '',
        huntDes: '',
        huntCreated: false,
        huntCreationFail: false
    }

    submitForm = () => {
        // console.log("Hunt Created")
        const {uid, huntName, huntDes} = this.state
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key
        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
        })
        .then( () => {
            this.setState({
                huntCreated: true
            })
            this.props.goToCreatingSteps()
        })
        .catch( (error) => {
            console.log(error)
            this.setState({
                huntCreationFail: true
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkIfSignedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.displayName) {
                this.setState({ uid: user.uid })
            }
        })
    }

    componentDidMount = () => {
        this.checkIfSignedIn()
    }

    render() {

        const {huntName, huntDes, huntCreated, huntCreationFail} = this.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                    <form>
                        <fieldset>
                            <legend>Create Hunt</legend>
                            <div class="form-group row">
                                <label for="huntName" class="col-sm-2 col-form-label">Hunt Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" value={huntName} name="huntName" onChange={e => this.handleChange(e)} placeholder="Step Name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="description" class="col-sm-2 col-form-label">Description</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" value={huntDes} name="huntDes" onChange={e => this.handleChange(e)} placeholder="Hunt Description" rows="3"></textarea>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.submitForm}>Submit</button>
                        </fieldset>
                    </form>
                    <br/><br/>

                    {huntCreated &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Hunt Created</strong> Add Steps: <a href="#" class="alert-link"></a>.
                      </div>
                    }

                    {huntCreationFail &&
                        <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Oh snap!</strong> Hunt Creation Failed
                      </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateHunt