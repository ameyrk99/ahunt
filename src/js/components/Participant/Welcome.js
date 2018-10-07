import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class Welcome extends React.Component {
    state = { 

    }
    render() { 

        return ( 
            <ParticipantContext.Consumer>
                {value => {

                    const { huntCreatorName, huntName, huntSteps } = value.state

                    return (
                        <div>
                            <div>Welcome</div>
                            <div>{huntName}</div>
                            <label>By {huntCreatorName}</label>

                            <div>Number of Steps: {huntSteps}</div>

                            <div>Waiting to Start...</div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}
 
export default Welcome