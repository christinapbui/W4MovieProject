import React, {useEffect,useState,Component} from 'react'; // these are react hooks
import './App.css';
import TVList from './Components/TVList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from "./Components/NavbarTop"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Landing from './Components/Landing.js';
import {Container,Row,Col} from 'react-bootstrap'
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Loading from './Components/Loading'
import Modal from 'react-modal';
import ReactModal from 'react-modal';

const apiKey = REACT_APP_API_KEY

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

Modal.setAppElement('#root')

function App() {
  // 2. create state
  let [sliderValue, setSliderValue] = useState({
    min: 1,
    max: 10
  })
  let [tvList,setTvList] = useState(null)
  let [originalList,setOriginalList] = useState(null)
  let [genreList, setGenreList] = useState([]); // empty array for genre
  let [showAllList, setShowAllList] = useState([]);
  let [activePage,setActivePage] = useState(1);
  let [totalPage,setTotalPage] = useState(0);
  let [modalOpen,setModalOpen] = useState(true);

  const getTvOnAir = async(page) => {
      let url=`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${page}`
      let data = await fetch(url)
      let result = await data.json();
      // 2.1
      setTvList(result.results)
      setOriginalList(result.results) // backup tv list
      setShowAllList(result.results)
      setTotalPage(result.total_results);
      console.log(result.total_pages);
      console.log("tv shows",result)
  }

  // A. search by category (genre)
  // A.note: need to list=>map all available genres
  const getGenreList = async() => {
    let url=`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
    let data = await fetch(url)
    let result = await data.json();
    getTvOnAir(1);
    setGenreList(result.genres) // have to target the "key" of the object (="genres")
    console.log("genre data",result)
    // setTvListGenre(result.results)

  }

  const searchByGenre = (genreId) => {
    setTvList(showAllList.filter(item => item.genre_ids.includes(genreId)));
  }

  // 1. takes two arguments: useEffect(function you want to fire, when you call the useEffect again)
  // 1.1 for now, just use array in the second argument
  // 1.2 cannot call function right away - either just say the name w/o () or use ()=>{getNowPlayingMovie();}
  useEffect(()=>{ // 1.3 use this instead of componentDidMount
    getGenreList();
  },[])
  // 1.4 need to import useEffect & useState

  // 3. so the comp doesn't show us null:
  if(tvList === null || genreList === null){
    return (<div>

      <Loading></Loading>
    </div>)
  }

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    getTvOnAir(pageNumber);
  }

  const searchTheKeyword = (keyword) =>{
    console.log("this is from the app",keyword)
    if(keyword===''){
      setTvList(originalList) // this will reset the TV list to original list if searchbox is empty
      return;
    }
    //C.Q1 grab tv show list 
    //C.Q2 grab each item from list 
    //C.Q3 check if it includes that keyword
    //C.Q4 if that includes that keyword, save into another array
    //C.Q5 set that array into state so user can see => useState (tvShowList)
    console.log("tv list",tvList)
    let filteredList = tvList.filter(tv => tv.name.toLowerCase().includes(keyword.toLowerCase())) // use filter bc you want to see if something turns out to be true (returns an array). // you can use "includes" only for string! 
    setTvList(filteredList)
    //have to make it all lowercase so the search value doesn't have to exactly match -- add .toLowerCase before ".includes" and after keyword

  }

  //D. Modals
  const closeModal = () =>{
    //D.1 change to close modal
    setModalOpen(false)
  }

  //D.2 open modal when clicking on picture
  const openModal = () =>{
    setModalOpen(true)
  }

  const sortByVoteDesc = () => {
    const sortedVoteDesc = originalList.sort((a,b)=>b.vote_average - a.vote_average)
    setTvList([...sortedVoteDesc]) // the ... means it's a new array
  }

  const sortByVoteAsce = () => {
    const sortedVoteAsce = originalList.sort((a,b)=>a.vote_average - b.vote_average)
    setTvList([...sortedVoteAsce])
  }

  return (
    <Router>
      
    <>
    <div className="nav-bar">
      <NavbarTop searchTheKeywordProps={searchTheKeyword} sortByVoteAsce={sortByVoteAsce} sortByVoteDesc={sortByVoteDesc}></NavbarTop>
    </div>
    {/* <Switch> */}
    <Landing></Landing>
    {/* <div className="landing-main">
      <img src="https://coverfiles.alphacoders.com/704/70484.jpg" className="agents-img"></img>
      <div className="landing-main-text">Get out of your mind during the pandemic.<br/>Watch a TV show today.</div>
    </div> */}
          {/* <Route exact path="/"></Route> */}
    {/* <div className="search">
      <h1>Search by Genre</h1>
      <h3>Filter and Map genre categories here</h3>
      <ul>
        {{tvList.map(result => {
          return <li>{result}</li>;
        })}}
      </ul>
    </div> */}
    <Container>
      <Row className="sidebar-row">
        <Col xs={2} className="sidebar-col">
          <div className="sidebar-div">
          <h3 className="search-by-rating-h3">Search by Rating</h3>
            <InputRange
              maxValue={10}
              minValue={0}
              value={sliderValue}
              onChange={value => setSliderValue(value)} />
            <h3 className="search-by-genre-h3">Search by Genre</h3>
            <ul>{genreList.map(elm =>{ return (
              <li><a href="#" onClick={()=>searchByGenre(elm.id)}>{elm.name}</a></li>)
            })}
            </ul>
          </div>
        </Col>
        <Col>
          <TVList 
            tvList = {tvList} 
            genresFromApp={genreList}
            openModal = {openModal}>
          </TVList>
          <ReactModal isOpen={modalOpen}>
            <button onClick={()=>closeModal()}>Close</button>
            React Modal</ReactModal>
          <Pagination className="pagination"
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={20}
            totalItemsCount={totalPage}
            pageRangeDisplayed={10}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
    {/* </Switch> */}
    {/* <div className="sidebar">
      <Container className="search-by-genre">
          <h3>Search by Genre</h3>
          <ul>{genreList.map(elm =>{ return (
            <li><a href="#" onClick={()=>searchByGenre(elm.id)}>{elm.name}</a></li>)
          })}
          </ul>
      </Container> */}
      {/* <Container>
        <h3>Search by Rating</h3>
        <InputRange
          maxValue={20}
          minValue={0}
          value={sliderValue}
          onChange={value => setSliderValue(value)} />
      </Container> */}
      {/* <SideBar></SideBar> */}
    {/* </div>  */}
    </>
    </Router>
  );
}


export default App;
