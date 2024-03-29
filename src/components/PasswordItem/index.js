import './index.css'

const PasswordItem = props => {
  const {passwordItemDetails, deletedPassword} = props
  const {
    id,
    websiteInput,
    usernameInput,
    passwordInput,
    showPassword,
  } = passwordItemDetails

  const initialLetter = websiteInput.slice(0, 1).toUpperCase()
  const deleteItem = () => {
    deletedPassword(id)
  }

  const randomColor = `#${Math.random().toString(16).substring(2, 8)}`

  return (
    <li className="list-container">
      <div className="initial-Letter" style={{background: `${randomColor}`}}>
        {initialLetter}
      </div>
      <div className="details-container">
        <p className="websiteName">{websiteInput}</p>
        <p className="userName">{usernameInput}</p>
        {showPassword && <p className="password">{passwordInput}</p>}
        {!showPassword && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
      </div>
      <button
        className="delete-button"
        onClick={deleteItem}
        type="button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
