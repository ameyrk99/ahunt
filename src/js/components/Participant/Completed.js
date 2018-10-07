import React from 'react'
import { ParticipantContext } from './ParticipantProvider';

class Completed extends React.Component {
    state = { 

    }
    render() { 
        return ( 
            <ParticipantContext.Consumer>
                {value => {

                    return (
                        <div>
                            <h1 className="name">KHunt</h1><br />

                            <div className="container">
                                <h5>Congratulations!! You completed the Hunt!</h5>
                                <br/><br/>
                                <h3>Thank you for Playing</h3>
                                <a href="/"></a>
                            </div>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}
 
export default Completed