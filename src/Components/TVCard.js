import React, {useState} from 'react'
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap'
import './../App.css';
import ReactModal from 'react-modal';
import VideoPopup from './VideoPopup';


export default function TVCard(props) {
    let tvProps = props.tv
    let genres = props.genresFromTvList
    let [tvCardContent,setTvCardContent] = useState(false)

    const [openModal, setOpenModal] = useState(false);

    const watchTrailer = () => {
        setOpenModal(true);
    }

    const onClose = () => {
        setOpenModal(false);
    }

    const seeTvCardContent = (b) => {
        setTvCardContent(b)
    }

    const modalStyles = {
        overlay: {
          backgroundColor: '#ffffff',
        },
      };

    return (
        <> 
            <div className="container">
                <ReactModal 
                className="video-popup-modal" 
                isOpen={openModal}
                onRequestClose={()=>onClose()}
                closeTimeOutMS={2000}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    content: {
                      position: 'absolute',
                      top: '40px',
                      left: '40px',
                      right: '40px',
                      bottom: '40px',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '20px'
                    }
                  }}>
                    <VideoPopup id={props.tv.id} onClose={onClose} />
                </ReactModal>
                <div className="row tv-shows">
                    <div className="col tv-card">
                        <Card style={{ width: '18rem' }}>
                            <div className="container tvshow-image-overview">
                                <Card.Img variant="top" className="tvshow-image"
                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${tvProps.poster_path}`} 
                                onMouseEnter={() => seeTvCardContent(true)}
                                onMouseLeave={() => seeTvCardContent(false)}/>
                                <div className="tvshow-overview-overlay">{
                                tvCardContent?<div>{tvProps.overview}</div>:<div></div>
                                }</div>
                            </div>
                            <Card.Body>
                                <Card.Title>{tvProps.original_name}</Card.Title>
                                <Card.Text className="tv-overview">
                                    {tvProps.overview}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    {tvProps.genre_ids.map(id => {
                                        let genre = genres.find(genre => { return id === genre.id; });
                                        if (genre) return <Badge variant="info" className="genre-badge">{genre.name}</Badge>
                                    })}
                                </ListGroupItem>
                                <ListGroupItem>First Air Date: {tvProps.first_air_date}</ListGroupItem>
                                <ListGroupItem>Rating: {tvProps.vote_average}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link><a href={`https://www.themoviedb.org/tv/${tvProps.id}?language=en-US`} target="_blank">More Info</a></Card.Link>
                                {/* <Card.Link><a href="#" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>Details of Show</a></Card.Link> */}
                                <Card.Link onClick={watchTrailer} className="TvCard-watch-trailer">Watch trailer</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}
