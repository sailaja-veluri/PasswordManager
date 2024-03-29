import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: [],
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      websiteInput,
      usernameInput,
      passwordInput,
      showPassword: false,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserNameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickShowPasswords = () => {
    const {passwordList} = this.state
    const updatedList = passwordList.map(eachPassword => ({
      ...eachPassword,
      showPassword: !eachPassword.showPassword,
    }))
    this.setState({passwordList: updatedList})
  }

  deletedPassword = id => {
    const {passwordList} = this.state
    const filteredPassWordData = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredPassWordData})
  }

  render() {
    const {websiteInput, usernameInput, passwordInput, searchInput} = this.state
    console.log(searchInput)
    let {passwordList} = this.state
    if (searchInput !== '') {
      passwordList = passwordList.filter(each =>
        each.websiteInput.toLowerCase().includes(searchInput),
      )
    }
    return (
      <div className="bg-container">
        <div className="pm-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="logo-image"
            alt="app logo"
          />
          <div className="form-img-container">
            <picture className="picture">
              <source
                srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="pm-image"
                media="(min-width:768px)"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="pm-image"
              />
            </picture>

            <div className="form-container">
              <h1 className="form-heading">Add New Password</h1>
              <form className="input-form" onSubmit={this.onAddPassword}>
                <div className="website-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="image-for-inputEle"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    value={websiteInput}
                    onChange={this.onChangeWebsiteInput}
                    className="input-ele"
                  />
                </div>
                <div className="userName-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="image-for-inputEle"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={usernameInput}
                    onChange={this.onChangeUserNameInput}
                    className="input-ele"
                  />
                </div>
                <div className="password-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                    className="image-for-inputEle"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={passwordInput}
                    onChange={this.onChangePasswordInput}
                    className="input-ele"
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="passwards-container">
            <div className="passwords-count-search-container">
              <div className="count-header">
                <h1 className="password-heading">Your Passwords</h1>
                <p className="count">{passwordList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="search-image"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearchPassword}
                />
              </div>
            </div>
            <div className="ul-showPassword-container">
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="showCheckBox"
                  className="checkbox"
                  onClick={this.onClickShowPasswords}
                />
                <label htmlFor="showCheckBox" className="show-password-label">
                  Show Passwords
                </label>
              </div>
              {(passwordList.length === 0 && searchInput === '') ||
              (passwordList.length === 0 && searchInput !== '') ? (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-password-text">No Passwords</p>
                </div>
              ) : (
                <ul className="ul-Container">
                  {passwordList.map(each => (
                    <PasswordItem
                      key={each.id}
                      passwordItemDetails={each}
                      deletedPassword={this.deletedPassword}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
