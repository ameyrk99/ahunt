import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class CodeEnter extends Component {
    state = {
        code: ''
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

        const { code } = this.state

        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { submitCode } = value

                    return (
                        <div>
                            {(!code || code != '') && !isCodeValid &&
                                <div>Invalid Code. Try Again</div>
                            }

                            <input
                                type="text"
                                name="code"
                                value={code}
                                onChange={e => this.handleChange(e)}
                                onKeyPress={this.handleKeyPress} />
                            <button
                                disabled={!code || code == ''}
                                onClick={() => submitCode(code)}>
                                Join
                            </button>
                        </div>
                    )
                }}

            </ParticipantContext.Consumer>
        )
    }
}

export default CodeEnter