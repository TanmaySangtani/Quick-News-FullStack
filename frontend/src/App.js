import './App.css';
import React, { useState } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import About from './components/About';
import Navbar from './components/NavBar-2'
import Sidebar from './components/Sidebar'
import Create from './components/createArtcile/Create';
import './components/styles.css'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';

import WebState from './context/WebState';
import Account from './components/Account';
import UserLikedArticles from './components/UserLikedArticles';
import UserSavedArticles from './components/UserSavedArticles';
import TownSquare from './components/TownSquare';
import TSArticle from './components/TSArticle';

const App = () => {
  const pageSize = 9
  const apiKey = process.env.REACT_APP_NEWS_API   //This is for my local machine.
  // const apiKey = "Paste Your API Key Here"
  const [progress, setProgress] = useState(0)
  
  return (
    <>
    <WebState>
    <Router>
      <LoadingBar
        color='#f44336'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Routes>
        <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"></News>} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"></News>} />
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"></News>} />
        {/* <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"></News>} /> */}
        <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"></News>} />
        <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"></News>} />
        <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"></News>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/account" element={<Account/>}></Route>
        <Route exact path="/articlecreator" element={<Create/>}></Route>
        <Route exact path="/likedarticles" element={<UserLikedArticles/>}></Route>
        <Route exact path="/savedarticles" element={<UserSavedArticles/>}></Route>
        <Route exact path="/townsquare" element={<TownSquare/>}></Route>
        <Route exact path="/townsquare/:artId" element={<TSArticle/>}></Route>
      </Routes>
    </Router>
    </WebState>
    </>
  )
}

export default App