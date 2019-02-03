import React from 'react'
import DashboardContext from '../DashboardContext'
import firebase from '../../../firebase/firebase'

class SavedStep extends React.Component {

    static contextType = DashboardContext

    state = {
        title: '',
        hint: '',
        feedback: '',

        editMode: false, 
        changesMade: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.checkIfChangesWereMade() )
    }

    checkIfChangesWereMade = () => {
        const { title, hint, feedback } = this.props

        if (this.state.title != title) {
            this.setState({changesMade: true})
            return
        }

        if (this.state.hint != hint) {
            this.setState({changesMade: true})
            return
        }

        if (this.state.feedback != feedback) {
            this.setState({changesMade: true})
            return
        }
        
    }

    makeChanges = () => {
        const { changesMade, title, hint, feedback, editMode } = this.state

        if (!editMode) {
            this.setState({editMode: true})
        }

        if (!changesMade) return

        const { stepId, huntId } = this.props
        const { uid } = this.context.state

        firebase.database().ref("users").child(uid).child("hunts").child("saved").child(huntId).child('steps').child(stepId)
            .update({
                title: title,
                hint: hint, 
                feedback: feedback
            })
            .then( () => {
                this.setState({ changesMade: false, editMode: false })
            })
            .catch( (error) => console.log('unable to edit step', error))

    }

    cancelChanges = () => {
        const { title, hint, feedback } = this.props

        this.setState({
            title: title,
            hint: hint,
            feedback: feedback,
            editMode: false,
            changesMade: false
        })
    }

    componentDidMount = () => {
        const { title, hint, feedback } = this.props

        this.setState({
            title: title,
            hint: hint,
            feedback: feedback
        })
    }

    render() {
        const { title, hint, feedback, editMode, changesMade } = this.state
        return (
            <div>
                <div>
                    <small>Title</small>
                    {editMode ?
                        <input type={"text"} name={'title'} value={title} onChange={e => this.handleChange(e)} />
                        :
                        <div>{title}</div>
                    }
                </div>

                <div>
                    <small>Hint to next step</small>
                    {editMode ?
                        <input type={"text"} name={'hint'} value={hint} onChange={e => this.handleChange(e)} />
                        :
                        <div>{hint}</div>
                    }
                </div>

                <div>
                    <small>Feedback</small>
                    {editMode ?
                        <input type={"text"} name={'feedback'} value={feedback} onChange={e => this.handleChange(e)} />
                        :
                        <div>{feedback}</div>
                    }
                </div>

                <button onClick={this.makeChanges}>{editMode ? (changesMade ? 'Update' : 'Edit') : 'Edit'}</button>
                {editMode && <button onClick={this.cancelChanges}>Cancel</button> }

            </div>
        )
    }
}

export default SavedStep