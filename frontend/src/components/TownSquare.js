import React, { useState } from 'react'
import { useContext } from 'react'
import contextAddress from '../context/WebContext'
import { useEffect } from 'react'
import Spinner from './Spinner'
import altImage from '../components/altcardimage.png'

const Item = (props) => {
    const {title, description, source, newsUrl, imageUrl, publishedAt} = props

    const context = useContext(contextAddress)
    const { limitStr } = context

    return (
        <>
            <a href={newsUrl} rel="noreferrer" target="_blank">
                <img style={{borderRadius: '1rem'}} src={imageUrl} className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
                <a href={newsUrl} rel="noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1em', fontFamily: 'Times New Roman' }}>
                    <h5 className="card-title" style={{ fontSize: '1em' }}><b>{limitStr(title, 100)}</b></h5>
                </a>
                <p className="card-text" style={{ fontSize: '1em', fontFamily: 'Times New Roman' }}>{limitStr(description, 100)}</p>
                <div className="flexingBox">
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="card-title" style={{ fontSize: '1em', width: '50vw', textDecoration: 'none', color: 'inherit' }}><b>{source}</b></a>
                    <div style={{ fontSize: '0.8em', textAlign: 'right', width: '50vw' }}><i>{publishedAt}</i></div>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}


const TownSquare = () => {

    const context = useContext(contextAddress)
    const { townSquareArticles, checkLogin } = context
    const [artlist, setArtlist] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchArts = async () => {
        const arr = await townSquareArticles()
        setArtlist(arr)
        setLoading(false)
    }

    const findCoverImage = (articleData) => {
        console.log(articleData)
        let img = ""
        for (let i = 0; i < articleData.length; i++) {
            if (articleData[i].image) {
                img = articleData[i].value
                break           
            }
        }

        return (img === "" ? altImage : img)
    }

    useEffect(() => {
        fetchArts()
        checkLogin()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#ff0000', fontSize: '2rem', fontWeight: '900', margin: '0.5rem 0', padding: '1vw 2vw', borderRadius: '2rem', textAlign: 'center' }}>
                Quick News Town Square
            </div>
                <h4 style={{ marginBottom: '2rem', fontFamily: 'Times New Roman', textAlign: 'center', fontWeight: '700' }}>Articles Submitted By Quick News Users</h4>

                {
                    artlist.map((element) => {
                        return (
                            <div key={element._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="itemcard-display-size" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '1rem', margin: '0.5rem' }}>
                                    <Item title={element.title} description={element.author.bio} source={element.author.name} newsUrl={`/townsquare/${element._id}`} imageUrl={findCoverImage(element.articleData)} publishedAt={element.dateupdated}/>
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

export default TownSquare