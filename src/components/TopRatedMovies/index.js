import {Link} from 'react-router-dom'

import Home from '../Home'

import './index.css'

const TopRatedMovies = () => (
  <Link to="/top-rated">
    <Home filterMovies="top_rated" />
  </Link>
)
export default TopRatedMovies
