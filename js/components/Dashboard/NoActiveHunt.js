import React from 'react'
import './dashboard.css'

class NoActiveHunt extends React.Component {
    render() {
        return (
            <div className="createPrompt">
                <div className="container">
                    <div className="jumbotron">
                        <a href="/createhunt">
                            <h2>Create One Here + :)</h2>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoActiveHunt