import React, { useState } from 'react'
import { useContext } from 'react'
import contextAddress from '../context/WebContext'
import { useEffect } from 'react'
import Spinner from './Spinner'

const Item = (props) => {
    const { title, description, source, imageUrl, newsUrl, publishedAt} = props
    const context = useContext(contextAddress)
    const { limitStr } = context

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

    return (
            <>
                <a href={newsUrl} rel="noreferrer" target="_blank">
                <img src={imageUrl} className="card-img-top" alt="..." />
                </a>
                <div className="card-body">
                <a href={newsUrl} rel="noreferrer" target="_blank" style={{textDecoration: 'none', color: 'inherit', fontSize: '1em', fontFamily: 'Times New Roman'}}>
                    <h5 className="card-title" style={{ fontSize: '1em' }}><b>{limitStr(title,100)}</b></h5>
                </a>
                    <p className="card-text" style={{fontSize: '1em', fontFamily: 'Times New Roman'}}>{limitStr(description, 100)}</p>
                    <div className="flexingBox">
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="card-title" style={{ fontSize: '1em', width: '50vw', textDecoration: 'none', color: 'inherit'}}><b>{source}</b></a>
                    <div style={{ fontSize: '0.8em', textAlign: 'right', width: '50vw'}}><i>{dateConversion(publishedAt)}</i></div>
                    </div>
                    <div>
                    </div>
                </div>
            </>
    )
}



const UserLikedArticles = () => {
    const context = useContext(contextAddress)
    const { checkLogin, getLikedArticles, whenImageNull, removeLikeArticle } = context
    const [artlist, setArtlist] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchArts = async () => {
        // console.log(await getLikedArticles())
        const arr = await getLikedArticles()
        setArtlist(arr)
        setLoading(false)
    }

    const onClickRemove = async (articleId) => {
        const result = await removeLikeArticle(articleId)

        if (result === true) {
            let temp = [...artlist]
            const index = temp.findIndex(element=>element["_id"] === articleId)

            if (index !== -1) {
                temp.splice(index, 1)
                setArtlist(temp)
            }
        }
        else {
            console.log("error")
        }
    }

    useEffect(() => {
        checkLogin()
        fetchArts()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column' }}>
                <h1 style={{fontFamily: 'Times New Roman', textAlign: 'center'}}>Liked Articles</h1>

                {
                    artlist.map((element)=>{
                        return (
                        <div key={element._id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div className="itemcard-display-size" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '1rem', margin: '0.5rem'}}>
                                <div style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                                    <button onClick={()=>{onClickRemove(element._id)}} className="fa-solid fa-xmark" style={{margin: '0.5rem', background: 'transparent', border: 'none'}}/>
                                </div>
                                <Item articleId={element._id} title={element.title} description={element.description} source={element.source} imageUrl={whenImageNull(element.imageUrl)} newsUrl={element.newsUrl} publishedAt={element.publishedAt}/>
                            </div>
                        </div>
                        )
                    })
                }
            </div>

            {loading && <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem', alignItems: 'center' }}>
                <Spinner />
            </div>
            }
        </>
    )
}

export default UserLikedArticles