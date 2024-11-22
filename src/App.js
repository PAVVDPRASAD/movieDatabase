import {Route, Switch} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import ViewDetailsPage from './components/ViewDetailsPage'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route exact path="/top-rated" component={TopRatedMovies} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/movie/:id" component={ViewDetailsPage} />
    <Route path="*" render={() => <h1>404 Not Found</h1>} />
  </Switch>
)

export default App
