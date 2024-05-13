// Write your code here
import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {CgGitFork} from 'react-icons/cg'
import {IoIosInformationCircle} from 'react-icons/io'

import './index.css'

class RepositoryItem extends Component {
  render() {
    const {repoDetails} = this.props
    const {
      avatarUrl,
      id,
      name,
      starsCount,
      forksCount,
      issuesCount,
    } = repoDetails
    return (
      <div className="repo-con">
        <img src={avatarUrl} className="avatar-css" />
        <p className="name">{name}</p>

        <div className="f-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star-icon"
          />
          <p className="text">{starsCount} stars</p>
        </div>
        <div className="f-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="fork-icon"
          />
          <p className="text">{forksCount} forks</p>
        </div>
        <div className="f-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="issue-icon"
          />
          <p className="text">{starsCount} open issues</p>
        </div>
      </div>
    )
  }
}

export default RepositoryItem
