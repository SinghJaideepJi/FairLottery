// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});


exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: 'Started a new Lottery Game',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

exports.playerAdded = functions.firestore
  .document('projects/{projectId}')
  .onUpdate(doc => {

    const newValue = doc.after.data();
    const previousValue = doc.before.data();

    if (newValue.players.length > previousValue.players.length){
      const newPlayerUid = newValue.players[newValue.players.length-1]
      console.log(newPlayerUid)

      admin.firestore().collection('users').doc(newPlayerUid).get()
      .then(newPlayer => {
        if(newPlayer){

          console.log(newPlayer)

          const notification = {
            content: 'Started Playing',
            user: `${newPlayer.data().firstName} ${newPlayer.data().lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          }
          return createNotification(notification);
        }
      });
    }
    return null;
});


exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the Game !!!',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});
