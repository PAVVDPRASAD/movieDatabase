import {useState, useEffect} from 'react'

import Header from '../Header'
import './index.css'

const ViewDetailsPage = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  const [movieDetails, setMovieDetails] = useState(null)
  const [castDetails, setCastDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        setLoading(true)
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=3c38f470f9da519bd0f1dee3a46103f5&language=en-US`
        const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3c38f470f9da519bd0f1dee3a46103f5&language=en-US`

        const [movieResponse, castResponse] = await Promise.all([
          fetch(url),
          fetch(castUrl),
        ])

        if (!movieResponse.ok || !castResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const movieData = await movieResponse.json()
        const castData = await castResponse.json()

        console.log(movieData)
        console.log(castData)

        setMovieDetails(movieData)
        setCastDetails(castData.cast)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(true)
        setLoading(false)
      }
    }

    getVideoDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading data. Please try again.</p>
  }

  return (
    <>
      <Header />
      <div className="view-details-page-cont">
        <h1>{movieDetails.title}</h1>
        {movieDetails && (
          <div className="view-details-text">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="backdrop-path-image"
            />
            <div>
              <p>Rating: {movieDetails.vote_average}</p>
              <p>Duration: {movieDetails.runtime} mins</p>
              <p>
                Genre: {movieDetails.genres.map(genre => genre.name).join(', ')}
              </p>
              <p>Release Date: {movieDetails.release_date}</p>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
        )}

        <h2>Cast</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {castDetails.map(member => (
            <div key={member.id} style={{textAlign: 'center'}}>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                style={{width: '100%', borderRadius: '8px'}}
              />
              <p>{member.name}</p>
              <p>as {member.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ViewDetailsPage
