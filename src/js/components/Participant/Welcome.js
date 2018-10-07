import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class Welcome extends React.Component {
    state = { 
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault()
            this.authenticateWithFirebase()
        }
    }

    render() { 

        return ( 
            <ParticipantContext.Consumer>
                {value => {

                    const { huntCreatorName, huntName, huntSteps } = value.state

                    const { addName } = value

                    const {name} = this.state

                    return (
                        <div>
                            <div>Welcome</div>
                            <div>{huntName}</div>
                            <label>By {huntCreatorName}</label>

                            <div>Number of Steps: {huntSteps}</div>

                            <input type="password" class="form-control" name="password" value={password} placeholder="Password" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                            <button disabled={name == ''} onClick={() => addName(name) }>Send Name</button>

                            <div>Waiting to Start...</div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}
 
export default Welcome