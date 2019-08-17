import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPlayer } from '../../store/actions/projectActions'

const ProjectList = ({projects,auth,addPlayer}) => {

  var latestProject;
  var userAlreadyJoined;
  var lotteryOpen;

  if (projects && projects.length > 0) {
    latestProject = projects[0]
    lotteryOpen = projects[0].lotteryOpen;
    // console.log(latestProject, lotteryOpen)
  }

  userAlreadyJoined = latestProject && latestProject.players && latestProject.players.find( e => { return e === auth.uid ? 1 : 0});

  return (
    <div className="project-list section">

      { lotteryOpen ?
      userAlreadyJoined ?
      <p className="pink-text lighten-1">Already Joined Lottery</p>   
      :   <div className="input-field">
      <button className="btn pink lighten-1" onClick={() => addPlayer(auth.uid,latestProject)}>Join the lottery!</button>
      </div>
      :
      <div className="input-field">
      <Link to="/create"><button className="btn pink lighten-1">Start a new Lottery</button></Link>
    </div>
      }

      { projects && projects.map(project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} auth={auth}/>
          </Link>
        )
      })}  
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: (uid,project) => dispatch(addPlayer(uid,project))
  }
}

export default connect(null, mapDispatchToProps)(ProjectList)