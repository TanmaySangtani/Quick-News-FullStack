import React, { useState } from 'react'
import { useContext } from 'react'
import contextAddress from '../context/WebContext'
import { useEffect } from 'react'
import Spinner from './Spinner'
import altImage from './altcardimage.png'

const Item = (props) => {
    const {title, description, source, imageUrl, newsUrl, publishedAt} = props
    const context = useContext(contextAddress)
    const { limitStr, whenImageNull } = context

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

    const onClickRemove = async () => {

    }

    const onClickSave = async () => {
        
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="itemcard-display-size" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '1rem', margin: '0.5rem'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <button className="fa-solid fa-xmark" style={{margin: '0.5rem', background: 'transparent', border: 'none'}}/>
                </div>
                <a href="#" rel="noreferrer" target="_blank">
                <img src={imageUrl} className="card-img-top" alt="..." />
                </a>
                <div className="card-body">
                <a href="#" rel="noreferrer" target="_blank" style={{textDecoration: 'none', color: 'inherit', fontSize: '1em', fontFamily: 'Times New Roman'}}>
                    <h5 className="card-title" style={{ fontSize: '1em' }}><b>{limitStr(title,100)}</b></h5>
                </a>
                    <p className="card-text" style={{fontSize: '1em', fontFamily: 'Times New Roman'}}>{limitStr(description, 100)}</p>
                    <div className="flexingBox">
                    <a href="#" rel="noreferrer" target="_blank" className="card-title" style={{ fontSize: '1em', width: '50vw', textDecoration: 'none', color: 'inherit'}}><b>{source}</b></a>
                    <div style={{ fontSize: '0.8em', textAlign: 'right', width: '50vw'}}><i>{dateConversion(publishedAt)}</i></div>
                    </div>
                    <div>
                    <ul style={{display: "flex", flexDirection: "row", listStyle: "none", margin: "0px", padding: "0px", justifyContent: 'center'}}>
                        <li style={{width: "20%"}}>
                        <button style={{width: "100%", border: '1px solid black', borderRadius: '0.5rem', padding: '0'}}>
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



const UserLikedArticles = () => {
    const context = useContext(contextAddress)
    const { checkLogin, getLikedArticles } = context

    const [artlist, setArtlist] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchArts = async () => {
        console.log(await getLikedArticles())
        const arr = await getLikedArticles()
        setArtlist(arr)
        setLoading(false)
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
                                <Item key={element._id} title={element.title} description={element.description} source={element.source} imageUrl={element.imageUrl} newsUrl={element.newsUrl} publishedAt={element.publishedAt}/>
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