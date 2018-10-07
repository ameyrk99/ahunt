import React from 'react'
import './createForm.css'

class CreateForm extends React.Component {
    render() {
        return (
            <div style={{
                paddingTop: "2%"
            }}>
                <div className="container">
                    <div className="jumbotron">
                    <form>
                        <fieldset>
                            <legend>Create Step</legend>
                            <div class="form-group row">
                                <label for="stepName" class="col-sm-2 col-form-label">Step Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control-plaintext" id="stepName" placeholder="Step Name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="hint" class="col-sm-2 col-form-label">Hint</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control-plaintext" id="hint" placeholder="Step Hint"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="feedback" class="col-sm-2 col-form-label">Feedback</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control-plaintext" id="feedback" placeholder="Step Passed! Feedback"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="stepImage">Step Image</label>
                                <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
                                <small id="fileHelp" class="form-text text-muted">Image for step</small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </fieldset>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

class CreateHunt extends React.Component {
    render() {
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">KHunt</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor03">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Scavengar Hunts</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#">New Hunt</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                    <button class="btn btn-secondary my-2 my-sm-0" onClick={this.signOutWithFirebase} >Sign Out</button>
                </nav>

                <CreateForm/>
            </div>
        )
    }
}

export default CreateHunt