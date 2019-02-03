import React from 'react'
import firebase from '../../../firebase/firebase'
import QRGen from './QR'
import DashboardContext from '../DashboardContext'

class QRPage extends React.Component {

    static contextType = DashboardContext

    state = {
        QR: null
    }

    fetchSteps = () => {
        const { uid } = this.context.state

        const { huntID } = this.props

        if(!uid || !huntID) {
            return
        }
        const ref = firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntID).child('steps')
        ref.on('value', (snapShot) => {
            this.setState({
                QR: snapShot.val()
            })
        })
    }

    componentDidMount = () => {
        this.fetchSteps()
    }

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { QR } = this.state

        return (
            <div style={{paddingTop: "2%"}}>
                <div className="container">
                    <div >
                        {QR != null && 
                            Object.keys(QR).map( (step, i) => {
                                return (
                                    <QRGen key={i} stepName={QR[step].title} qrCode={QR[step].qr_code}/>
                                )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default QRPage