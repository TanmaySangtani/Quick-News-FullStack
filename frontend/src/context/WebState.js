import WebContext from './WebContext'
import { useState } from 'react'
import altImage from '../components/altcardimage.png'

const WebState = (props) => {

    //Global states to be used
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function limitStr (str, cut) {
        if (str !== null)
        {
            let flag = false
            if (str.length > cut) {flag = true}
            if (flag)
            {
                return str.slice(0, cut).concat("...")
            }
            else
            {
                return str.slice(0, cut)
            }
        }
        else
        {
            return "..."
        }
    }
    
    function whenImageNull (imgUrl) {
        if (imgUrl === null)
        {
            return altImage
        }
        else
        {
            return imgUrl
        }
    }

    const checkLogin = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/isloggedin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const json = await response.json()
        
        if (json.success === true) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    const logout = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const json = await response.json()
        
        if (json.success === true) {
            console.log("done")
            setIsLoggedIn(false)
        }
    }

    const getUserDetails = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/auth/userdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        
        const json = await response.json()
        return json
    }

    const getLikedArticles = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/fetchlikedarticles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })  

        const json = await response.json()

        if (json.success) {
            return json.articles
        } else {
            console.error("Encountered some error fetching articles")
            return []
        }
    }

    const getSavedArticles = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/fetchsavedarticles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })  

        const json = await response.json()

        if (json.success) {
            return json.articles
        } else {
            console.error("Encountered some error fetching articles")
            return []
        }
    }

    const likeArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const removeLikeArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/removelike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const dislikeArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const removeDislikeArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/removedislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const saveArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const removeSaveArticle = async (articleId) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/removesave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleId: articleId
            }),
            credentials: 'include'
        }) 
        
        const json = await response.json()
        
        if (json.success === true) {
            return true
        } else {
            return false
        }
    }

    const getUserArticles = async () => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/userarts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }) 
        
        const json = await response.json()        
        return json
    }

    const updateUserDetails = async (type, value) => {
        const host = 'http://localhost:5000'

        let data

        if (type === 'username') {data = {username: value}}
        else if (type === 'email') {data = {email: value}}
        else if (type === 'password') {data = {password: value}}

        const response = await fetch(`${host}/api/auth/edituserdata`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        
        const json = await response.json()
        return json
    }

    const saveUserArticle = async (data,id) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/saveuserarticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data,
                id: id
            }),
            credentials: 'include'
        })

        const json = await response.json()
        return json
    }

    const publishUserArticle = async (data, id) => {
        const host = 'http://localhost:5000'

        const response = await fetch(`${host}/api/article/publishuserarticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data,
                id: id
            }),
            credentials: 'include'
        })
        
        const json = await response.json()
        return json  
    }

    const getCreatedArticle = async (createdgarticleid) => {
        const host = 'http://localhost:5000'

        const response = await fetch(`${host}/api/auth/getcreatedarticle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                cartid: createdgarticleid
            },
            credentials: 'include'
        })
        
        const json = await response.json()
        return json  
    }

    const townSquareArticles = async () => {
        const host = 'http://localhost:5000'

        const response = await fetch(`${host}/api/article/townsquarearticles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        
        const json = await response.json()
        return json  
    }

    const fetchOneUserArticle = async (id) => {
        const host = 'http://localhost:5000'
        const response = await fetch(`${host}/api/article/fetchoneuserarticle?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'include'
        })

        const json = await response.json()
        return json
    }

    return (
        <WebContext.Provider value={{limitStr, whenImageNull,isLoggedIn, checkLogin, logout, likeArticle, removeLikeArticle, 
        dislikeArticle, removeDislikeArticle, saveArticle, removeSaveArticle, getUserArticles, getUserDetails, updateUserDetails, 
        getCreatedArticle, saveUserArticle, publishUserArticle, getLikedArticles, getSavedArticles, townSquareArticles,
        fetchOneUserArticle} }>
            {props.children}
        </WebContext.Provider>
    )
}

export default WebState