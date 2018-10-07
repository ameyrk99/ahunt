import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import CodeEnter from './CodeEnter'
import Welcome from './Welcome'
import ScanQr from './ScanQr';
import StepContent from './StepContent'
import Completed from './Completed'

class Screens extends React.Component {

    render() {
        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { isCodeValid, huntStatus, stepId } = value.state

                    return (
                        <div>
                            {!isCodeValid && 
                                <CodeEnter />
                            }
                            {isCodeValid &&  huntStatus == 'initiated' &&
                                <Welcome />
                            }
                            {isCodeValid && huntStatus == 'started' && !stepId &&
                                <ScanQr />
                            }
                            {isCodeValid && huntStatus == 'started' && stepId &&
                                <StepContent />
                            }
                            {isCodeValid && huntStatus == 'ended' && stepId &&
                                <Completed />
                            }
                        </div>
                        
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default Screens