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

                    const { handleQrData, handleQrReadError, dismissWrongCodeAlert } = value
                    const { wrongQrCode, stepContentLoading, stepContent } = value.state

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
                            }}>Point at QR Code</h4>

                            {wrongQrCode &&
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" onClick={() => dismissWrongCodeAlert()} data-dismiss="alert">&times;</button>
                                    <strong>Wrong QR Code</strong> This is not the next step
                                    {stepContent && stepContent.hint && <div>Remember: <strong>{stepContent.hint}</strong> </div>}
                                </div>
                            }
                            
                            {stepContentLoading ?
                                <h2>Loading Step...</h2>
                                :
                                <div className="jumbotron">
                                    <QrReader
                                        delay={delay}
                                        onError={(error) => handleQrReadError(error)}
                                        onScan={(data) => handleQrData(data)}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            }

                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default ScanQr;