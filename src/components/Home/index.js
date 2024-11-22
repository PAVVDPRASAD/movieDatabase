import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import VideoItemDetails from '../VideoItemDetails'

import './index.css'

const apiStatusMovieDataBase = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = ({filterMovies}) => {
  const [videosData, setVideosData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusMovieDataBase.initial)
  const [search, setSearch] = useState('')

  const onChangeSearch = event => {
    setSearch(event.target.value)
  }

  const updatedMovieDataNames = data => ({
    backdropPathUrl: data.backdrop_path,
    genreIds: data.genre_ids,
    id: data.id,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  useEffect(() => {
    const getMovieData = async () => {
      setApiStatus(apiStatusMovieDataBase.inProgress)
      const url = search
        ? `https://api.themoviedb.org/3/search/movie?api_key=3c38f470f9da519bd0f1dee3a46103f5&language=en-US&query=${search}&page=1`
        : `https://api.themoviedb.org/3/movie/${filterMovies}?api_key=3c38f470f9da519bd0f1dee3a46103f5&language=en-US&page=1`

      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          const filteredData = data.results.map(updatedMovieDataNames)
          setVideosData(filteredData)
          setApiStatus(apiStatusMovieDataBase.success)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error(error)
        setApiStatus(apiStatusMovieDataBase.failure)
      }
    }

    getMovieData()
  }, [filterMovies, search])

  const renderSuccessView = () => {
    if (videosData.length === 0) {
      return <p>No movies found for {search.toUpperCase()}</p>
    }

    return (
      <ul className="video-item-details-cont">
        {videosData.map(eachVideo => (
          <VideoItemDetails key={eachVideo.id} eachVideo={eachVideo} />
        ))}
      </ul>
    )
  }

  const renderLoaderView = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#4fa94d" height={50} width={50} />
    </div>
  )

  const renderErrorView = () => (
    <div className="loader-cont">
      <h1>Error loading data. Please try again later.</h1>
    </div>
  )

  const renderAllMovieDatabase = () => {
    switch (apiStatus) {
      case apiStatusMovieDataBase.success:
        return renderSuccessView()
      case apiStatusMovieDataBase.inProgress:
        return renderLoaderView()
      case apiStatusMovieDataBase.failure:
        return renderErrorView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header onChangeSearch={onChangeSearch} search={search} />
      {renderAllMovieDatabase()}
    </div>
  )
}

export default Home
