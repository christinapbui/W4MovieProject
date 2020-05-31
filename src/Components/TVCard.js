import React from 'react'
import {Card,ListGroup,ListGroupItem,Badge} from 'react-bootstrap'

export default function TVCard(props) {
    let tvProps = props.tv
    let genres = props.genresFromTvList
    // let [isShown,setIsShown] = useState(false);

    return (
        // <button
        // onMouseEnter={() => setIsShown(true)}
        // onMouseLeave={() => setIsShown(false)}>
        // Hover over me!
        // </button>
        // {isShown && (
        //   <div>
        //     I'll appear when you hover over the button.
        //   </div>
        // )}
    
        <div className="container">
            <div className="row tv-shows">
                <div className="col tv-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${tvProps.poster_path}`}/>
                        {/* <>
                        {isShown && (
                            <div>
                             I'll appear when you hover over the button.
                            </div>
                        )}
                        </> */}
                        <Card.Body>
                            <Card.Title>{tvProps.original_name}</Card.Title>
                            <Card.Text>
                            {/* {tvProps.overview} */}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Genre: <br></br>
                                {tvProps.genre_ids.map(id =>{
                                    let genre = genres.find(genre => {return id === genre.id;});
                                    if (genre) return <Badge variant="info" className="genre-badge">{genre.name}</Badge>
                                })}
                            </ListGroupItem>
                            <ListGroupItem>Original Language: {tvProps.original_language}</ListGroupItem>
                            <ListGroupItem>First Air Date: {tvProps.first_air_date}</ListGroupItem>
                            <ListGroupItem>Rating: {tvProps.vote_average}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link><a href={`https://www.themoviedb.org/tv/${tvProps.id}?language=en-US`} target="_blank">More Info</a></Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}
