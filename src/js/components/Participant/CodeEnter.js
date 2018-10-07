import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class CodeEnter extends React.Component {
    state = {
        code: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { code } = this.state

        return (
            <ParticipantContext.Consumer>
                {value => {

                    const { submitCode } = value
                    const { isCodeValid } = value.state

                    return (
                        <div>
                            {(!code || code != '') && !isCodeValid &&
                                <div>Invalid Code. Try Again</div>
                            }

                            <input
                                type="text"
                                name="code"
                                value={code}
                                onChange={e => this.handleChange(e)} />
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