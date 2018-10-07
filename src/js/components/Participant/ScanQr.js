import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import QrReader from 'react-qr-scanner'

class ScanQr extends React.Component {
    state = {

    }

    render() {
        return (
            <ParticipantContext.Consumer>
                {value => {
                    return (
                        <div>
                            <h4>Scan QR</h4>
                            <QrReader
                                delay={this.state.delay}
                                style={previewStyle}
                                onError={this.handleError}
                                onScan={this.handleScan}
                            />
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default ScanQr;