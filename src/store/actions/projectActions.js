export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    var players = [];
    players.push(authorId);

    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      players: players,
      lotteryOpen: true,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};

export const addPlayer = (uid,project) => {
  return (dispatch, getState, {getFirestore}) => {

    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').doc(project.id).get()
    .then((project)=>{
      if (project.exists) {
        var addedPlayers = project.data().players;
        var lotteryOpen = project.data().lotteryOpen;
        
        // adding player allowed ?
        if( ! addedPlayers.find(e => { return e === uid ? 1 : 0;}) ){
          addedPlayers.push(authorId);

          if (addedPlayers.length === 2) lotteryOpen = false;

          // Update the database
          firestore.collection('projects').doc(project.id).update({
            players:addedPlayers,
            lotteryOpen:lotteryOpen
          }).then(function() {
            dispatch({ type: 'UPDATE_PROJECT_SUCCESS' });
          }).catch(function(err) {
            // The document probably doesn't exist.
            dispatch({ type: 'UPDATE_PROJECT_ERROR' }, err);
          });

        }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such project!");
          dispatch({ type: 'GET_PROJECT_ERROR' });
        }
    }).catch(function(err) {
        dispatch({ type: 'GET_PROJECT_ERROR' }, err);
    });
  }
};
