import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import QrReader from 'react-qr-scanner'

class ScanQr extends React.Component {
    state = {
        delay: 300
    }

    render() {

        const { delay } = this.state

        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { handleQrData, handleQrReadError } = value

                    return (
                        <div>
                            <h1 className="name">AHunt</h1><br />
                            <div className="container">
                                <div style={{
                                    padding: "2%",
                                    paddingTop: "5%",
                                }}>

                                </div>
                            </div><br /><br />
                            <h4 style={{
                                color: "white",
                                textAlign: "center"
                            }}>Scan QR</h4>
                            <div className="jumbotron">
                                <QrReader
                                    delay={delay}
                                    onError={(error) => handleQrReadError(error)}
                                    onScan={(data) => handleQrData(data)}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <h4 style={{
                                color: "white",
                                textAlign: "center"
                            }}>To get hint for the next location</h4>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default ScanQr;