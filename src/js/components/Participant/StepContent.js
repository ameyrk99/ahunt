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
                                            <h2> <strong> {stepContent.title} </strong> </h2>
                                            <span class="badge badge-pill badge-info">This is Step {stepContent.order} </span>
                                            <br /> <br />
                                            <div class="alert alert-secondary">
                                                <strong> {stepContent.feedback} </strong>
                                            </div>
                                            {/* <div>{stepContent.feedback}</div> */}
                                            <img src={stepContent.image ? stepContent.image.url : null} />

                                            {/* <div>Step #: {stepContent.order}</div> */}
                                            <div class="alert alert-dismissible alert-light">
                                                <strong>{stepContent.completed ? Object.keys(stepContent.completed).length : 0} Players</strong> already went this far
                                            </div>
                                            {/* <div>People Who Have Gone this Far: </div> */}
                                            <br />
                                            {stepContent.hint &&
                                                <div class="alert alert-success">
                                                    <strong>Next Hint: </strong> {stepContent.hint}
                                                </div>
                                                // <div>Next Hint: {stepContent.hint} </div>
                                            }
                                            <br /><br />
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