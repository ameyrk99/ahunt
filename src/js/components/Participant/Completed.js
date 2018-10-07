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
                            <h3>Thank you for Playing</h3>
                            <a href="/"></a>
                        </div>
                    )
                }}
            </ParticipantContext.Consumer>
        )
    }
}
 
export default Completed