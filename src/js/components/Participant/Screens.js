import React from 'react'
import { ParticipantContext } from './ParticipantProvider'
import CodeEnter from './CodeEnter'
import Welcome from './Welcome'
import ScanQr from './ScanQr';

class Screens extends Component {
    state = {

    }

    render() {
        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { isCodeValid, huntStarted } = value.state

                    return (
                        <div>
                            {!isCodeValid && 
                                <CodeEnter />
                            }
                            {isCodeValid && !huntStarted &&
                                <Welcome />
                            }
                            {isCodeValid && huntStarted &&
                                <ScanQr />
                            }
                        </div>
                        
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default Screens