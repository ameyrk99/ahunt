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
                            <h1 className="name">AHunt</h1><br />
                            <div className="container">
                                <div style={{
                                    padding: "2%",
                                    paddingTop: "5%",
                                    color: "white"
                                }}>
                                    {stepContentLoading &&
                                        <div>Loading...</div>
                                    }
                                    {stepContentLoaded &&
                                        <div>
                                            <h4>{stepContent.title}</h4>
                                            <div>{stepContent.feedback}</div>
                                            <img src={stepContent.image ? stepContent.image.url : null} />
                                            <div>Step #: {stepContent.order}</div>
                                            <div>People Who Completed: {stepContent.completed ? Object.keys(stepContent.completed).length : 0}</div>
                                            <br/>
                                            {stepContent.hint && <div>Next Hint: {stepContent.hint} </div>}
                                            <br/><br/>
                                            {stepContent.order != huntSteps &&
                                                <button
                                                    onClick={onContinueHunt}
                                                    class="btn btn-primary rounded">
                                                    Continue Hunt
                                                </button>
                                            }

                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default StepContent