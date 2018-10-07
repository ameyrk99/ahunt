import React from 'react'
import axios from 'axios'
import QRPage from "../QRPage/QRPage"
class SavedHunt extends React.Component {

    startHunt = (uid, huntId) => {
        this.setState({ checkingCode: true })

        console.log(uid, huntId)

        axios.get('https://us-central1-kahunt-218617.cloudfunctions.net/startHunt', {
            params: {
                uid: uid,
                hunt_id: huntId
            }
        })
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
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

    render() {

        // const {huntName, huntDes, huntSteps, huntCreated, huntCreationFail} = this.state
        const { huntName, huntDes, uid, huntId } = this.props

        return (
            <div className="container">
                <div style={{
                    paddingTop: "2%",
                    color: "white"
                }}>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-8">
                            <h3>{huntName}</h3>
                            <p>{huntDes}</p>
                            <QRPage uid={uid} huntID={huntId}/>
                        </div>
                        <div className="col-md-2">
                            <button type="button" class="btn btn-success" onClick={() => this.startHunt(uid, huntId)}>Initiate</button>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SavedHunt