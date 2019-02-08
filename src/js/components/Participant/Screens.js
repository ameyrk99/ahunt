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

                    const { isCodeValid, huntStatus, stepId, participantId } = value.state

                    return (
                        <div>
                            {!isCodeValid &&
                                <CodeEnter />
                            }
                            {( (isCodeValid && huntStatus == 'initiated') || (isCodeValid && huntStatus == 'started' && !participantId) ) &&
                                <Welcome />
                            }
                            {isCodeValid && huntStatus == 'started' && participantId && !stepId &&
                                <ScanQr />
                            }
                            {isCodeValid && huntStatus == 'started' && stepId &&
                                <StepContent />
                            }
                            {/* {isCodeValid && huntStatus == 'started' && stepId && !participantId &&
                                <Welcome />
                            } */}
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