import firebase from './firebase'


 class FirebaseAuth {

  currentUserUid = ''
  currentUserName = ''
  currentUserEmail = ''
  currentUserEmailVerified = ''
  currentUserPhotoUrl = ''
   
  constructor () {

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {

        this.currentUserUid = user.uid
        this.currentUserName = user.displayName
        this.currentUserEmail = user.email
        this.currentUserEmailVerified = user.emailVerified
        this.currentUserPhotoUrl = user.photoURL

        console.log('User is signed in')
      
      } else {
        console.log('User not signed in')
        localStorage.removeItem('currentUserData')
        localStorage.removeItem('currentUserType')
      }
    })
    

   }

   fetchCurrentUserUid = () => {
     return this.currentUserUid
   }

   fetchCurrentUserName = () => {
     return this.currentUserName
   }

   fetchCurrentUserEmail = () => {
     return this.currentUserEmail
   }

   fetchCurrentUserEmailVerified = () => {
     return this.currentUserEmailVerified
   }

   fetchCurrentUserPhotoUrl = () => {
     return this.currentUserPhotoUrl
   }

   signOutCurrentUser = () => {
     firebase.auth().signOut()
     .then ( () => console.log('signed out successfully'))
     .catch( () => console.log('failed to sign out'))
   }

 }

export default new FirebaseAuth()