import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import altImage from './altcardimage.png'

import { useContext } from 'react'
import contextAddress from '../context/WebContext'

const News = (props) => {
    const context = useContext(contextAddress)
    const {checkLogin, getUserArticles, limitStr, whenImageNull} = context

    //To communicate with server
    const host = "http://localhost:5000"

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(0)

    const [userArticles, setUserArticles] = useState({likedArticles: [], dislikedArticles: [], savedArticles: []})

    // const fetchMoreData = async () => {
    //     setPage(page+1)
    //     setLoading(true)
    //     fetch(`newsdata/${props.category}.json`).then((response)=>{
    //         return response.json()
    //     }).then((data)=>{
    //         setArticles(data.articles.slice(0, Math.min((articles.length+props.pageSize), data.totalResults)))
    //         setTotalArticles(data.totalResults)
    //         setLoading(false)
    //     })        
    // };

    // const updateNews = async () => {
    //     props.setProgress(30);
    //     fetch(`newsdata/${props.category}.json`).then((response)=>{
    //         return response.json()
    //     }).then((data)=>{
    //         props.setProgress(70);

    //         setArticles(data.articles.slice(0, Math.min((articles.length+props.pageSize), data.totalResults)))
    //         setTotalArticles(data.totalResults)

    //         setLoading(false)
    //         props.setProgress(100);
    //     })
    // }


    const fetchMoreData = async () => {
        await applyUserArticles()
        const response = await fetch(`${host}/api/article/fetcharticle?category=${props.category}&page=${page+1}&pageSize=${props.pageSize}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        })
        setPage(page + 1)
        setLoading(true)
        
        const data = await response.json()
      
        setArticles(data.articles)
        setTotalArticles(data.totalResults)
        
        setLoading(false)
    };

    //Get all Articles
    const updateNews = async () => {
        //Front end side logic to get all notes
        props.setProgress(30)
        const response = await fetch(`${host}/api/article/fetcharticle?category=${props.category}&page=${page}&pageSize=${props.pageSize}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        props.setProgress(70)
        const data = await response.json()

        props.setProgress(85)

        setArticles(data.articles)
        setTotalArticles(data.totalResults)

        setLoading(false)
        props.setProgress(100)
    }

    const applyUserArticles = async () => {
        const result = await getUserArticles()

        if (result.success) {
            setUserArticles({likedArticles: result.likedArticles, dislikedArticles: result.dislikedArticles, savedArticles: result.savedArticles})
        }
    }

    useEffect(() => {
        document.title = "Quick News - " + props.category.toUpperCase();
        updateNews()
        checkLogin()
        applyUserArticles()
        const body = document.getElementsByTagName("body")
        body[0].style.overflowY = "auto"
        // eslint-disable-next-line
    }, [])


    
    return (
      <React.Fragment>
      <div className="container my-3">
        {/* <NavBar category={props.category.charAt(0).toUpperCase() + props.category.slice(1)}></NavBar> */}
        <h1 className="text-center" style={{marginTop: '20vh', fontFamily: 'Times New Roman'}}>{props.category.toUpperCase()}</h1>
        <div className="text-center">{loading && <Spinner />}</div>
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalArticles}
          loader={loading && <div className="text-center"><Spinner/></div>}
        >
            <div className="container">
                <div className="row">
                    {articles.map((element) => {
                        // return <div className="col-lg-3" key={element.url}>
                        //     <NewsItem title={limitStr(element.title, 100)} description={limitStr(element.description, 100)} imageUrl={whenImageNull(element.urlToImage)} newsUrl = {element.url} source={element.source.name} publishedAt={element.publishedAt}></NewsItem>
                        // </div>
                        return <div className="col-lg-3" key={element._id}>
                            <NewsItem id={element._id} title={limitStr(element.title, 100)} description={limitStr(element.description, 100)} likeCount={element.likeCount} dislikeCount ={element.dislikeCount} userArticles={userArticles} imageUrl={whenImageNull(element.imageUrl)} newsUrl = {element.newsUrl} source={element.source} publishedAt={element.publishedAt}></NewsItem>
                        </div>
                        // return <div className="col-lg-3" key={element.newsUrl}>
                        //     <NewsItem title={element.title} description={element.description} imageUrl={whenImageNull(element.imageUrl)} newsUrl = {element.newsUrl} source={element.source} publishedAt={element.publishedAt}></NewsItem>
                        // </div>
                    })}
                </div>
            </div>
        </InfiniteScroll>
      </div>
    </React.Fragment>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News