import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const {id} =useParams();

    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzhlYWMzZDVlMTQ4MTIwNGRhNTE3MjRmMGZkNjZhYiIsIm5iZiI6MTczMDM1OTUxNS40OTg5MzIxLCJzdWIiOiI2NzIzMmUyYjgyNjU4YWVlYWM5MjU1ZGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S9tewERdWToSyEI_qpByZ59HzPaWJQZAGr13thvPn0g'
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_Player_API_KEY}`
        }
      };

      useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));

      }, [])
      

  return (
    <div className='player'>
      <img onClick={()=> {navigate(-2)}} src={back_arrow_icon} alt="" />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' width="90%" height="90%" frameBorder="0" allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        {/* <p>typeog</p> */}
      </div>
    </div>
  )
}

export default Player
