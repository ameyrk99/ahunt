import React from 'react'
import ReactDOM from 'react-dom'
import './home.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="start">
                    <h1 className="name">AHunt</h1>

                    <div className="row options">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-2">
                            <a href="/login">
                                <div class="card rounded">
                                    <div class="card-body card-button">
                                        <h3>Creator</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2">
                            <a href="/participant">
                                <div class="card rounded">
                                    <div class="card-body card-button">
                                        <h3>Join Hunt</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>

                <div className="info">

                    <div class="card rounded">
                        <div class="card-body ">
                            <h4 class="card-title">What is AHunt about?</h4>
                            <p class="card-text">
                                The purpose of AHunt is to aid scavengar hunts.<br />Users will gather in one area and will be given an initial “hint” as to where the first part of the scavenger hunt will take place. Each of the notable sites will have strategic QR Codes placed around the area. A hint to the next step of the scavenger hunt will be given if that the user is able to find each location of and scan the previous QR Codes. Users will be put against the clock to find all the items over a specific interval of time. Included in the application is a page where anyone can create and host a scavenger hunt with their own hints and items to be found. The creator of the hunt can specify how much time is given and what prizes, if any, will be given to the competitors who finish before the time is up. How difficult or quick the hunt may be is solely up to the creator. This range of freedom will allow any individual to participate and create any scavenger hunt of their choosing. Essentially, our purpose to get people to discover just how much their environment has to offer.
                            </p>
                        </div>
                    </div>

                    <br /><br />

                    <div class="card rounded">
                        <div class="card-body">
                            <h4 class="card-title">How to use AHunt?</h4>
                            <h5 id="creating-and-getting-qr-codes">Creating and Getting QR Codes</h5>
                            <ul>
                                <li>If there is no active hunt or if you select <strong>New Hunt</strong>, then you'll be given the option to create a new Scavengar Hunt</li>
                                <li>Enter the Name and Description of the Hunt to move on to the creation of Steps</li>
                                <li>Enter the info you want in the steps (image is optional) and use <strong>Add Step</strong> to create a new step for the Hunt</li>
                                <li>
                                    <ul>
                                        <li>Once done, click the <strong>End Add</strong> Button</li>
                                    </ul>
                                </li>
                                <li>To get your QR Codes for the steps and see your saved hunts, go to <strong>Scavengar Hunts</strong></li>
                            </ul>
                            <h5 id="initiating-and-starting-a-hunt">Initiating and Starting a Hunt</h5>
                            <ul>
                                <li>Click <strong>Initiate</strong> to initiate a hunt</li>
                                <li>Give the code to people who you want in the hunt</li>
                                <li>
                                    <ul>
                                        <li>Wait for people to join after you <strong>Initiate</strong></li>
                                    </ul>
                                </li>
                                <li><strong>Start</strong> once you think everyone you want has joined</li>
                                <li>You won't see participants on the home until a participant has scaned a code</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
