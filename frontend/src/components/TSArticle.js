import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import contextAddress from '../context/WebContext'
import { useState } from 'react';
import TownSquarePage from './townSquareTemplate/TownSquarePage';



const TSArticle =  () => {
    const context = useContext(contextAddress)

    const [article, setArticle] = useState({title: "", author: {name: "", image: "", bio: ""}, data: "", articleData: [{paragraph: true, value: ""}]})
    const { fetchOneUserArticle, checkLogin } = context

    const { artId } = useParams()

    const fetchArt = async () => {
        const data = await fetchOneUserArticle(artId)
        setArticle(data.article)
    }

    useEffect(()=>{
        checkLogin()
        fetchArt()
        //eslint-disable-next-line
    },[])

    return(
        <div style={{paddingTop: '6rem'}}>
            <TownSquarePage title={article.title} author={article.author} date={article.dateupdated} articleData={article.articleData}/>
        </div>
        
    )
}

export default TSArticle