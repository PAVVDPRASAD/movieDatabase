import {Link} from 'react-router-dom'
import Home from '../Home'

import './index.css'

const PopularMovies = () => (
  <Link to="/">
    <Home filterMovies="popular" />
  </Link>
)
export default PopularMovies
