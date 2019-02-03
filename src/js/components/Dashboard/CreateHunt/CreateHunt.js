import React from 'react'
import firebase from '../../../firebase/firebase'
import DashboardContext from '../DashboardContext'
import Step from './Step'
import HuntSteps from './HuntSteps'

class CreateHunt extends React.Component {

    static contextType = DashboardContext

    state = {
        huntName: '',
        huntDes: '',
        huntId: null,
        huntCreated: false,
        huntCreationFail: false,
    }

    submitForm = () => {
        const { uid } = this.context.state
        const { huntName, huntDes } = this.state

        if (!uid) return

        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key

        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
            id: huntId
        })
            .then(() => {
                this.setState({
                    huntCreated: true,
                    huntId: huntId
                })

                // this.props.sethuntId(huntId)
                // this.props.goToCreatingSteps()

                console.log(huntId)
            })
            .catch((error) => {
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


    render() {

        const { huntName, huntDes, huntCreated, huntCreationFail, huntId } = this.state

        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    {!huntId &&
                        <div className="jumbotron">
                            <form>
                                <fieldset>
                                    <legend>Create Hunt</legend>
                                    <div class="form-group row">
                                        <label for="huntName" class="col-sm-2 col-form-label">Hunt Name</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" value={huntName} name="huntName" onChange={e => this.handleChange(e)} placeholder="Step Name" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="description" class="col-sm-2 col-form-label">Description</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" value={huntDes} name="huntDes" onChange={e => this.handleChange(e)} placeholder="Hunt Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary" onClick={this.submitForm}>Continue</button>
                                </fieldset>
                            </form>
                            <br /><br />

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
                    }

                    <div>
                        {huntCreated && huntId &&
                            <div>
                                <Step huntId={huntId} />
                                <br /><br />
                                <HuntSteps huntId={huntId} />
                            </div>

                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateHunt