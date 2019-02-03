import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'

import ActiveHunt from './ActiveHunt'
import NoActiveHunt from './NoActiveHunt'
import Navbar from './Navbar'
// import CreateHunt from './CreateHunt'
import HuntSteps from './HuntSteps'
import Step from './Step'
import SavedHunts from './SavedHunts/SavedHunts'

import './dashboard.css'
import DashboardContext from './DashboardContext'
import CreateHunt from './CreateHunt';


class Dashboard extends React.Component {

    static contextType = DashboardContext

    state = {
        huntID: null,
        huntName: '',
        huntDes: '',
        huntCreated: false,
        huntCreationFail: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = () => {
        // console.log("Hunt Created")
        const {uid, huntName, huntDes} = this.state
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved")
        const huntId = ref.push().key

        ref.child(huntId).set({
            hunt_name: huntName,
            hunt_description: huntDes,
            id: huntId
        })
        .then( () => {
            this.setState({
                huntCreated: true,
                huntID: huntId,
                activeMenu: 'newSteps'
            })
        })
        .catch( (error) => {
            console.log(error)
            this.setState({
                huntCreationFail: true
            })
        })
    }

    render() {

        const { displayName, activeHuntId, signedOut, huntID, activeHunt, huntName, huntDes } = this.state

        const { activeMenu, uid, checkedIfActiveHunt } = this.context.state

        if (signedOut) {
            return <Redirect push to="/" />
        }

        return (
            <div>
                <Navbar />
                {activeMenu == 'activeHunt' && uid && checkedIfActiveHunt && //needs uid because browser takes too long to read it from localstorage
                    <ActiveHunt />
                }
                {activeMenu == 'hunts' &&
                    <SavedHunts />
                }
                {(activeMenu == 'newHunt') &&
                    <div style={{
                        paddingTop: "2%"
                    }}>
                    <CreateHunt />
                        {/* <div className="container">
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
                            </div>
                        </div> */}
                    </div>
                }
                {/* {activeMenu == 'newSteps' && huntID &&

                    <div>
                        <Step huntID={huntID} uid={uid} changeActiveMenu={ (activeMenu) => this.setState({activeMenu: activeMenu})}/>
                        <br /><br />
                        <HuntSteps huntID={huntID} uid={uid}/>
                    </div>
                } */}
            </div>
        )
    }
}

export default Dashboard