import React from 'react'
import firebase from '../../firebase/firebase'

// class DisplayStep extends React.Component {
//     render() {
//         const { stepName, stepHint, stepFeedback } = this.props

//         return (
//             <div>
//                 <h5>Steps</h5>
//                 <h6>Name: {stepName}</h6>
//                 <p>Hint: {stepHint}</p>
//                 <small>Feedback: {stepFeedback}</small>
//             </div>
//         )
//     }
// }

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