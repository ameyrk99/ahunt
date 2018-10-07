import React from 'react'
import firebase from '../../firebase/firebase'

class QRGen extends React.Component {

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { stepName, qrCode} = this.props

        return (
            <div>
                <img src={qrCode} alt="Step QR"/>
            </div>
        )
    }
}

export default QRGen