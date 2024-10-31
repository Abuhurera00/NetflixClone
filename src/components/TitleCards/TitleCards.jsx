import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([])
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzhlYWMzZDVlMTQ4MTIwNGRhNTE3MjRmMGZkNjZhYiIsIm5iZiI6MTczMDM1OTUxNS40OTg5MzIxLCJzdWIiOiI2NzIzMmUyYjgyNjU4YWVlYWM5MjU1ZGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S9tewERdWToSyEI_qpByZ59HzPaWJQZAGr13thvPn0g'
        }
    };



    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.delta
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title ? title : 'Popular On Netflix'}</h2>

            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => (
                    <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TitleCards
