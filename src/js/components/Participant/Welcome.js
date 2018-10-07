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

    render() { 

        return ( 
            <ParticipantContext.Consumer>
                {value => {

                    const { huntCreatorName, huntName, huntSteps, participantName } = value.state

                    const { addName } = value

                    const {name} = this.state

                    return (
                        <div>
                            <div>Welcome</div>
                            <div>{huntName}</div>
                            <label>By {huntCreatorName}</label>

                            <div>Number of Steps: {huntSteps}</div>

                            {participantName ?
                                <div>{participantName}</div>
                                :
                                <div>
                                    <input type="text" class="form-control" name="name" value={name} placeholder="Name" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                                    <button disabled={name == ''} onClick={() => addName(name) }>Send Name</button>
                                </div>
                                
                            }
                            
                            <div>Waiting to Start...</div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}
 
export default Welcome