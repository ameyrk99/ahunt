import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class StepContent extends React.Component {
    state = { 

     }

    render() { 
        return ( 
            <ParticipantContext.Consumer>
                {value => {
                    const { stepContent, stepContentLoaded, stepContentLoading, huntSteps } = value.state
                    const { onContinueHunt } = value

                    return (
                        <div>
                            {stepContentLoading &&
                                <div>Loading...</div>
                            }
                            {stepContentLoaded &&
                                <div>
                                    <h3>{stepContent.title}</h3>
                                    <div>{stepContent.feedback}</div>
                                    <img src={stepContent.image ? stepContent.image.url : null} />
                                    <div>Step #: {stepContent.order}</div>
                                    <div>People Who completed: {stepContent.completed ? Object.keys(stepContent.completed).length : 0}</div>
                                    {stepContent.order != huntSteps &&
                                        <button
                                        onClick={onContinueHunt}>
                                        Continue Hunt
                                    </button>
                                    }
                                    
                                </div>
                            
                            }
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
         )
    }
}
 
export default StepContent