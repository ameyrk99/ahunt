import React from 'react'
import firebase from '../../firebase/firebase'

class Navbar extends React.Component {

    signOutWithFirebase = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('signed out successfully')
                this.setState({ signedOut: true })
            })
            .catch(() => console.log('failed to sign out'))
    }


    render() {

        const { changeActiveMenu, activeMenu, activeHunt } = this.props

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">KHunt</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor03">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class={(activeMenu=='activeHunt' || activeMenu=='noActiveMenu')?'nav-link active': 'nav-link'} onClick={ () => changeActiveMenu(activeHunt?'activeHunt':'noActiveHunt')}>Home<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class={activeMenu=='hunts'?'nav-link active': 'nav-link'} onClick={ () => changeActiveMenu('hunts')}>Scavengar Hunts</a>
                        </li>
                        <li class="nav-item">
                            <a class={(activeMenu=='newHunt' || activeMenu=='newSteps')?'nav-link active': 'nav-link'} onClick={ () => changeActiveMenu('newHunt')}>New Hunt</a>
                        </li>
                        <li class="nav-item">
                            <a class={activeMenu=='settings'?'nav-link active': 'nav-link'} onClick={ () => changeActiveMenu('settings')}>Settings</a>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-secondary my-2 my-sm-0" onClick={this.signOutWithFirebase} >Sign Out</button>
            </nav>
        )
    }
}

export default Navbar