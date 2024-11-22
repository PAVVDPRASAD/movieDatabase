import {Link} from 'react-router-dom'
import './index.css'

const VideoItemDetails = ({eachVideo}) => {
  const {id, posterPath, title, voteAverage} = eachVideo

  return (
    <li className="each-video-cont">
      <img
        className="thumbnail-image"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <h1 className="video-title">{title}</h1>
      <p className="video-rating">Rating: {voteAverage}</p>
      <Link to={`movie/${id}`}>
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default VideoItemDetails
