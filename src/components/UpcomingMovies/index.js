import {Link} from 'react-router-dom'

import Home from '../Home'

import './index.css'

const UpcomingMovies = () => (
  <Link to="/upcoming">
    <Home filterMovies="upcoming" />
  </Link>
)
export default UpcomingMovies
