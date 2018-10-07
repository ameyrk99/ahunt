import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import QrReader from 'react-qr-scanner'

class ScanQr extends React.Component {
    state = {
        delay: 300
    }

    render() {

        const { delay }

        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { handleQrData, handleQrReadError } = value

                    return (
                        <div>
                            <h4>Scan QR</h4>
                            <QrReader
                                delay={delay}
                                onError={ (error) => handleQrReadError(error) }
                                onScan={ (data) => handleQrData(data) }
                                style={{ width: "100%" }}
                            />
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default ScanQr;