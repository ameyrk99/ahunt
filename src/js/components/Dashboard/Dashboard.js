import React from 'react'
import firebase from '../../firebase/firebase'

import ActiveHunt from './ActiveHunt'
import NoActiveHunt from './NoActiveHunt'
import Navbar from './Navbar'
// import CreateHunt from './CreateHunt'
import HuntSteps from './CreateHunt/HuntSteps'
import Step from './CreateHunt/Step'
import SavedHunts from './SavedHunts/SavedHunts'

import './dashboard.css'
import DashboardContext from './DashboardContext'
import CreateHunt from './CreateHunt/CreateHunt'


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
        const { uid, huntName, huntDes } = this.state
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
                    huntID: huntId,
                    activeMenu: 'newSteps'
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    huntCreationFail: true
                })
            })
    }

    render() {

        const { activeMenu, uid, checkedIfActiveHunt } = this.context.state

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
                    </div>
                }
            </div>
        )
    }
}

export default Dashboard