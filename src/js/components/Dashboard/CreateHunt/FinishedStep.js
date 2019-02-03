import React from 'react'

class FinishedStep extends React.Component {

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { stepName, stepHint, stepFeedback, imageUrl} = this.props

        return (
            <div>
                <h4>Name: {stepName}</h4>
                <p>Hint: {stepHint}</p>
                <small>Feedback: {stepFeedback}</small>
                {imageUrl != null &&
                    <img src={imageUrl} alt="Step Image"/>
                }
            </div>
        )
    }
}

export default FinishedStep