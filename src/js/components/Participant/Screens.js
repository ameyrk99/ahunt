import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import CodeEnter from './CodeEnter'
import Welcome from './Welcome'
import ScanQr from './ScanQr';
import StepContent from './StepContent'

class Screens extends Component {

    render() {
        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { isCodeValid, huntStarted, stepId } = value.state

                    return (
                        <div>
                            {!isCodeValid && 
                                <CodeEnter />
                            }
                            {isCodeValid && !huntStarted &&
                                <Welcome />
                            }
                            {isCodeValid && huntStarted && !stepId &&
                                <ScanQr />
                            }
                            {isCodeValid && huntStarted && stepId &&
                                <StepContent />
                            }
                        </div>
                        
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default Screens