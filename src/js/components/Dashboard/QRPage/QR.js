import React from 'react'

class QRGen extends React.Component {

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { stepName, qrCode} = this.props

        return (
            <div>
                <a href={qrCode} target="_blank"><span>QR for Step - {stepName} {' '}</span></a>
                {/* <img src={qrCode} alt="Step QR"/> */}
            </div>
        )
    }
}

export default QRGen