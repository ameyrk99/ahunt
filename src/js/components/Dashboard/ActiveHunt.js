import React from 'react'
import './dashboard.css'

const participants = [
    {
        name: "Hermionie",
        id: "ajsdlAFaf",
        currentStep: 4
    },
    {
        name: "Harry",
        id: "Adsfaeag",
        currentStep: 6
    },
    {
        name: "Ron",
        id: "asdfarFAs",
        currentStep: 3
    },
    {
        name: "Voldermot",
        id: "asdataARARArsd",
        currentStep: 10
    }
]

const totalSteps = 10

const steps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Step 7',
    'Step 8',
    'Step 9',
    'Destination',
]

class ActiveHunt extends React.Component {

    render() {
        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Hello World!</h1>

                        <br />
                        <h3>Participants:</h3>

                        {participants.map((parts) => {
                            return (
                                <div key={parts.id}>
                                    <div style={{
                                        paddingLeft: "1%",
                                        paddingTop: "1%"
                                    }}>
                                        {parts.name}:<br />
                                        <p style={{ paddingLeft: "1%" }}>Current Step: {parts.currentStep} {steps[parts.currentStep - 1]}</p>

                                        {/* {
                                            if(parts.currentStep === totalSteps) {
                                                const bar = "progress-bar bg-success"
                                            } else {
                                                const bar = "progress-bar progress-bar-striped progress-bar-animated"
                                            }
                                        } */}

                                        {parts.currentStep === totalSteps &&
                                            <div class="progress">
                                                <div class="progress-bar bg-success" role="progressbar" style={{
                                                    width: "100%",
                                                    ariaValuenow: 40,
                                                    ariaValuemin: 0,
                                                    ariaValuemax: 100
                                                }}></div>
                                            </div>

                                        }

                                        {parts.currentStep != totalSteps &&
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                    width: parts.currentStep * 1000 / totalSteps,
                                                    ariaValuenow: 40,
                                                    ariaValuemin: 0,
                                                    ariaValuemax: 100
                                                }}></div>
                                            </div>

                                        }

                                        {/* <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{
                                                width: parts.currentStep * 1000 / totalSteps,
                                                ariaValuenow: 40,
                                                ariaValuemin: 0,
                                                ariaValuemax: 100
                                            }}></div>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default ActiveHunt