import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    isLoading: false,
    activeLanguage: languageFiltersData[0].language,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposData()
  }

  getReposData = async () => {
    const {activeLanguage} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    const data = await response.json()
    const formattedReposData = data.popular_repos.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    console.log(response.status)
    if (response.status === 200) {
      this.setState({
        reposData: formattedReposData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {activeLanguage, reposData} = this.state

    const updateActiveLanguageOption = (id, language) => {
      this.setState({activeLanguage: language}, this.getReposData)
    }

    return (
      <div className="github-popular-repos-con">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languages-filter-con">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              activeLanguage={activeLanguage}
              updateActiveLanguageOption={updateActiveLanguageOption}
              key={eachLanguage.id}
              isActive={activeLanguage === eachLanguage.language}
            />
          ))}
        </ul>
        <ul className="all-repositories-con">
          {reposData.map(eachRepo => (
            <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {activeLanguage, reposData} = this.state
    const updateActiveLanguageOption = (id, language) => {
      this.setState({activeLanguage: language}, this.getReposData)
    }
    return (
      <div className="failure-con">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languages-filter-con">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              activeLanguage={activeLanguage}
              updateActiveLanguageOption={updateActiveLanguageOption}
              key={eachLanguage.id}
              isActive={activeLanguage === eachLanguage.language}
            />
          ))}
        </ul>
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <p className="failure-msg">Something Went Wrong</p>
      </div>
    )
  }

  renderInProgressView = () => (
    <div className="loading-con">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {reposData, activeLanguage} = this.state

    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
