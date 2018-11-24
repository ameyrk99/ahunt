import React from 'react'
import { ParticipantContext } from './ParticipantProvider';
import '../Home/home.css'

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

                    const { submitCode, codeSubmitted } = value
                    const { isCodeValid } = value.state

                    return (
                        <div className="container">
                            <h1 className="name">AHunt</h1><br/>
                            <div style={{
                                padding: "2%",
                                paddingTop: "5%",
                            }}>
                                {codeSubmitted && !isCodeValid &&
                                    <div>Invalid Code. Try Again</div>
                                }

                                {/* <input
                                    type="text"
                                    name="code"
                                    value={code}
                                    onChange={e => this.handleChange(e)} /> */}
                                <div class="form-group">
                                        <label for="name" style={{color: "white"}}>Enter Code</label>
                                        <input type="text" class="form-control rounded" name="code" value={code} placeholder="Code" onChange={e => this.handleChange(e)}/>
                                </div>
                                <button
                                    disabled={!code || code == ''}
                                    onClick={() => submitCode(code)} class="btn btn-primary rounded">
                                    Join
                                </button>
                            </div>
                        </div>
                    )
                }}

            </ParticipantContext.Consumer>
        )
    }
}

export default CodeEnter