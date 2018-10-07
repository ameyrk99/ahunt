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

                    const { name } = this.state

                    return (
                        <div className="container" style={{
                            color: "white"
                        }}>
                            <h1 className="name">KHunt</h1><br />

                            <div style={{
                                padding: "2%",
                                paddingTop: "5%",
                            }}>
                                <div>Hunt {huntName}</div>
                                <label>By {huntCreatorName}</label>
                                <div>Number of Steps: {huntSteps}</div><br />

                                {participantName ?
                                    <div>{participantName}</div>
                                    :
                                    <div>
                                        <div class="form-group">
                                            <label for="name" style={{ color: "white" }}>Name</label>
                                            <input type="text" class="form-control rounded" name="name" value={name} placeholder="Name" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                                        </div>
                                        <button
                                            onClick={() => addName(name)} class="btn btn-primary rounded">
                                            Enter
                                        </button>
                                    </div>
                                }<br /><br />

                                <div>Waiting to Start...</div>
                            </div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}

export default Welcome