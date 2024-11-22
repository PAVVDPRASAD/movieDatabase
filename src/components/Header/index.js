import {Link} from 'react-router-dom'
// import Popup from 'reactjs-popup'
import './index.css'

const Header = props => {
  const {onChangeSearch, search} = props

  const handleSearchClick = () => {
    onChangeSearch({target: {value: search}})
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo-link">
        <h1 className="nav-logo-text">movieDB</h1>
      </Link>
      <div className="nav-filter-cont">
        <ul className="nav-filter-list-cont">
          <li className="nav-each-list">
            <Link to="/" className="nav-link">
              Popular Movies
            </Link>
          </li>
          <li className="nav-each-list">
            <Link to="/top-rated" className="nav-link">
              Top Rated Movies
            </Link>
          </li>
          <li className="nav-each-list">
            <Link to="/upcoming" className="nav-link">
              Upcoming Movies
            </Link>
          </li>
        </ul>

        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={onChangeSearch}
            placeholder="Search..."
            className="input-search"
          />
          <button
            className="search-btn"
            type="button"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
