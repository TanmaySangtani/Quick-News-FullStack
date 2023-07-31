import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import contextAddress from '../context/WebContext'

const NewsItem = (props) => {
  const context = useContext(contextAddress)
  const { likeArticle, removeLikeArticle, dislikeArticle, removeDislikeArticle, saveArticle, removeSaveArticle, isLoggedIn } = context

  const white = '#ffffff'
  const red = '#f56262'
  const blue = 'lightBlue'
  const green = 'lightGreen'

  const [like, setLike] = useState(white)
  const [likeCnt, setLikeCnt] = useState(0)

  const [dislike, setDislike] = useState(white)
  const [dislikeCnt, setDislikeCnt] = useState(0)

  const [save, setSave] = useState(white)

  function limitStr(str, cut) {
    if (str !== null) {
      let flag = false
      if (str.length > cut) { flag = true }
      if (flag) {
        return str.slice(0, cut).concat("...")
      }
      else {
        return str.slice(0, cut)
      }
    }
    else {
      return "..."
    }
  }

  const onClickLike = async () => {
    if (like === white) {

      //firstly checking if dislike is already set then removing it
      const tempRes = await removeDislikeArticle(id)
      if (tempRes) {
        if (dislike === red) {
          setDislike(white)
          setDislikeCnt(dislikeCnt-1)
        }
      } else {
        console.error("Encountered some error")
        return
      }

      const result = await likeArticle(id)

      if (result) {
        setLike(green)
        setLikeCnt(likeCnt+1)
      } else {
        console.error("Encountered some error, try logging in if not logged in")
      }
    } else {
      const result = await removeLikeArticle(id)

      if (result) {
        setLike(white)
        setLikeCnt(likeCnt-1)
      } else {
        console.error("Encountered some error")
      }
    }
  }

  const onClickDislike = async () => {
    if (dislike === white) {

      //firstly checking if like is already set then removing it
      const tempRes = await removeLikeArticle(id)
      if (tempRes) {
        setLike(white)
        if (like === green) {
          setLike(white)
          setLikeCnt(likeCnt-1)
        }
      } else {
        console.error("Encountered some error")
        return
      }

      const result = await dislikeArticle(id)

      if (result) {
        setDislike(red)
        setDislikeCnt(dislikeCnt+1)
      } else {
        console.error("Encountered some error, try logging in if not logged in")
      }
    } else {
      const result = await removeDislikeArticle(id) 

      if (result) {
        setDislike(white)
        setDislikeCnt(dislikeCnt-1)
      } else {
        console.error("Encountered some error")
      }
    }
  }

  const onClickSave = async () => {
    if (save === white) {
      const  result = await saveArticle(id)

      if (result) {
        setSave(blue)
      } else {
        console.error("Encountered some error, try logging in if not logged in")
      }
    } else {
      const result = await removeSaveArticle(id)

      if (result) {
        setSave(white)
      } else {
        console.error("Encountered some error")
      }
    }
  }

  function dateConversion (str) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ]
    const d = new Date(str)
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()

    var s = date.toString() + " " + monthNames[month-1] + ", " + year.toString()
    return s
  }

  let { id, title, description, likeCount, dislikeCount, userArticles, imageUrl, newsUrl, source, publishedAt } = props;

  const updateUserArticles = () => {
    const check = (i) => {
      return i === id
    }

    if (userArticles.likedArticles.find(check)) {
      setLike(green)
    }

    if (userArticles.dislikedArticles.find(check)) {
      setDislike(red)
    }

    if (userArticles.savedArticles.find(check)) {
      setSave(blue)
    }
  }

  useEffect(()=>{
    setLikeCnt(likeCount)
    setDislikeCnt(dislikeCount)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(!isLoggedIn) {
      setLike(white)
      setDislike(white)
      setSave(white)
    } else {
      updateUserArticles()
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <div className="my-3">
      
      <div className="card border-0">
      <a href={newsUrl} rel="noreferrer" target="_blank">
        <img src={imageUrl} className="card-img-top" alt="..." />
      </a>
        <div className="card-body">
        <a href={newsUrl} rel="noreferrer" target="_blank" style={{textDecoration: 'none', color: 'inherit', fontSize: '1em', fontFamily: 'Times New Roman'}}>
          <h5 className="card-title" style={{ fontSize: '1em' }}><b>{title}</b></h5>
        </a>
          <p className="card-text" style={{fontSize: '1em', fontFamily: 'Times New Roman'}}>{description}</p>
          <div className="flexingBox">
          <a href={newsUrl} rel="noreferrer" target="_blank" className="card-title" style={{ fontSize: '1em', width: '50vw', textDecoration: 'none', color: 'inherit'}}><b>{limitStr(source, 25)}</b></a>
          <div style={{ fontSize: '0.8em', textAlign: 'right', width: '50vw'}}><i>{dateConversion(publishedAt)}</i></div>
          </div>
          <div>
            <ul style={{display: "flex", flexDirection: "row", listStyle: "none", margin: "0px", padding: "0px"}}>
              <li style={{width: "33%"}}>
                <button onClick={onClickLike} style={{width: "100%", background: `${like}`, border: '1px solid black', borderRadius: '0.5rem', padding: '0'}}>
                  Like - {likeCnt}
                </button>
                
              </li>
              <li style={{width: "33%"}}>
                <button onClick={onClickDislike} style={{width: "100%", background: `${dislike}`, border: '1px solid black', borderRadius: '0.5rem', padding: '0'}}>
                  Dislike - {dislikeCnt}
                </button>
              </li>
              <li style={{width: "33%"}}>
                <button onClick={onClickSave} style={{width: "100%", background: `${save}`, border: '1px solid black', borderRadius: '0.5rem', padding: '0'}}>
                  Save
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem