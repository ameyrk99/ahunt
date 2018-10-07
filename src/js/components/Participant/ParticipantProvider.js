import React from 'react'
import firebase from '../../firebase/firebase'
import axios from 'axios'

export const ParticipantContext = React.createContext()

class ParticipantProvider extends React.Component {
    state = {
        isCodeValid: false,
        checkingCode: false,

        huntCreatorId: null,
        huntCreatorName: null,
        huntId: null,

        huntName: null, 
        huntDescription: null,
        huntSteps: null
    }

    submitCode = (code) => {
        this.setState({checkingCode: true})

        axios.get('', {
            params: {
                code: code
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({ 
                        huntCreatorId: response.data.huntCreatorId,
                        huntCreatorName: response.data.huntCreatorName, 
                        huntId: response.data.huntId,

                        huntName: response.data.huntName,
                        huntDescription: response.data.huntDescription,
                        huntSteps: response.data.stepsCount,
                        
                        isCodeValid: true,
                        checkingCode: false
                    })
                    localStorage.setItem('savedCode', code)
                }
                else {
                    this.setState({ 
                        isCodeValid: false, 
                        checkingCode: false 
                    })
                }

            })
            .catch((error) => {
                this.setState({ isCodeValid: true, checkingCode: false })
                console.log('unable to check code', error)
            })
    }

    componentDidMount = () => {
        const savedCode = localStorage.getItem('huntCode')
        if (savedCode) {
            this.submitCode(savedCode)
        }
    }

    render() {
        return (
            <ParticipantContext.Provider
                value={
                    {
                        state = this.state,
                        submitCode: (code) => this.submitCode(code)
                    }
                }>
                {this.props.children}
            </ParticipantContext.Provider>
        )
    }
}

export default ParticipantProvider;