// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {languageDetails, updateActiveLanguageOption, isActive} = this.props
    const {id, language, activeLanguage} = languageDetails

    const onSelectLanguage = () => {
      updateActiveLanguageOption(id, language)
    }

    const tabStyle = isActive ? 'active' : ''

    return (
      <div>
        <button
          className={`${tabStyle}language-filter-button`}
          onClick={onSelectLanguage}
        >
          {language}
        </button>
      </div>
    )
  }
}

export default LanguageFilterItem
