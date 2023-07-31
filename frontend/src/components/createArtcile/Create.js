import React, { useEffect, useState } from 'react'
import Paragraph from './Paragraph'
import Image from './Image'
import TownSquarePage from '../townSquareTemplate/TownSquarePage'

import { useContext } from 'react'
import contextAddress from '../../context/WebContext'

const Create = (props) => {
    const context = useContext(contextAddress)
    const {checkLogin, saveUserArticle, publishUserArticle} = context

    const [title, setTitle] = useState('')
    //Add Thumbnail
    const [author, setAuthor] = useState({name: '', image: '', bio: ''})
    const [date, setDate] = useState('')
    const [articleData, setArticleData] = useState([])
    const [showPreview, setShowPreview] = useState('preview_hide')
    const [articleId, setArticleId] = useState('none')

    const [half, setHalf] = useState(false)

    const [preview, setPreview] = useState(false)

    const clearData = () => {
        setTitle('')
        document.getElementById('iptitle').value = ''
        setAuthor({name: '', image: '', bio: ''})
        document.getElementById('ipaname').value = ''
        setArticleData([])
        document.getElementById('ipabio').value = ''
        document.getElementById('ipaimg').value = ''
    }

    const onClickSplitScreen = () => {
        if (half) {
            document.getElementById('tp1').removeAttribute('disabled')
            document.getElementById('tp2').removeAttribute('disabled')
            setHalf(false)
        } else {
            document.getElementById('tp1').setAttribute('disabled', true)
            document.getElementById('tp2').setAttribute('disabled', true)
            setHalf(true)
        }
    }

    const togglePreview = () => {
        const body = document.getElementsByTagName("body")

        if (preview) {
            setPreview(false)
            setShowPreview('preview_hide')
            body[0].style.overflowY = "auto"
        } else {
            setPreview(true)
            setShowPreview('preview_show')
            body[0].style.overflowY = "hidden"
        }
    }

    const onChangeAuthorImg = async (e) => {
        const file = e.target.files[0]
        
        const base64 = await convertImageToBase64(file)
        setAuthor({...author, [e.target.name] : base64})
    }

    const convertImageToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const onClickAdd = (e) => {
        console.log(e.target.attributes.index.value)
        const ind = e.target.attributes.index.value
        let temp = [...articleData]

        if (e.target.name === 'paragraphbtn') {
            temp.splice(ind, 0, {paragraph: true, value: ''})
            console.log(temp)
        }
        if (e.target.name === 'imagebtn') {
            temp.splice(ind, 0, {image: true, description: '', value: ''})
            console.log(temp)
        }

        setArticleData(temp)
    }

    const onClickSave = async () => {

        const data = {
            title: title,
            author: author,
            dateupdated: date,
            articleData: articleData
        }

        const result = await saveUserArticle(data, articleId)

        if (result.success === true) {
            setArticleId(result.articleId)
        }

        console.log(result)
    }

    const onClickPublish = async () => {

        const data = {
            title: title,
            author: author,
            dateupdated: date,
            articleData: articleData
        }

        //Incomplete, to be completed later

        if (articleId === "none") {
            console.error("Please save before publishing you article")
        } else {
            publishUserArticle(data, articleId)
        }

    }

    useEffect(()=>{
        //Creating a last updated date string in desired format
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const Dt = new Date(Date.now())
        setDate(`${Dt.getDate()} ${months[Dt.getMonth()]}, ${Dt.getFullYear()}`)
        checkLogin()

        setArticleId(articleId)
        //eslint-disable-next-line
    }, [])
    
  return (
    <> 
        <div className={`${half ? 'parent_preview_half' : ''}`} style={{paddingTop: '6rem'}}>
            <div className={`${half ? 'preview_half' : ''}`} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <h2 id='title'>Article Creator</h2>

                <div style={{display: 'flex', flexDirection: "row"}}>
                        <button id="tp1" style={{margin: '0.5rem'}} onClick={()=>{togglePreview()}}>Toggle Preview</button>
                        <button style={{margin: '0.5rem'}} onClick={clearData}>Clear All Fields</button>
                        <button style={{margin: '0.5rem'}} onClick={onClickSplitScreen}>Split Screen</button>
                </div>

                <div style={{width: '50%',display: 'flex', flexDirection: 'column', margin: '2rem 0'}}>
                    <label style={{margin: '0.5rem', textAlign: 'center'}} htmlFor="Title">Title</label>
                    <input id="iptitle" style={{width: '100%'}} type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>

                <div style={{width: '50%',display: 'flex', flexDirection: 'column', margin: '2rem 0'}}>
                    <label style={{margin: '0.5rem', textAlign: 'center'}} htmlFor="Author Name">Author Name</label>
                    <input id="ipaname" style={{width: '100%'}} type="text" name="name" onChange={(e)=>{setAuthor({...author, [e.target.name] : e.target.value})}}/>
                </div>

                <div style={{width: '70%' ,display: 'flex', flexDirection: 'column', margin: '2rem 0'}}>
                    <label style={{margin: '0.5rem', textAlign: 'center'}} htmlFor="Author Bio">Author Bio</label>
                    <textarea id="ipabio" style={{width: '100%', height: '10rem'}} type="text" name="bio" onChange={(e)=>{setAuthor({...author, [e.target.name] : e.target.value})}}/>
                </div>

                <div style={{width: '50%' ,display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0'}}>
                    <label style={{margin: '0.5rem'}} htmlFor="Author Image">Upload Author Image</label>
                    <input id="ipaimg" style={{margin: '0.5rem', width: '100%', textAlign: 'center'}} type="file" accept=".jpeg, .jpg, .png" name="image" onChange={onChangeAuthorImg}/>  
                    <img style={{margin: '0.5rem', width: '60%'}} src={author.image} alt="" />
                </div>

                {/* First Add block to add element at the first index and shift remaining articles*/}
                <div style={{display: 'flex', margin: '2rem 0'}}>
                    <button onClick={onClickAdd} index='0' name='paragraphbtn' style={{margin: '0rem 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Paragraph Block</button>
                    <button onClick={onClickAdd} index='0' name='imagebtn' style={{margin: '0rem 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Image Block</button>
                </div> 

                {articleData.map((element, index) => {
                    if (element.paragraph) {
                        return (
                            <div style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={index}>
                                <Paragraph articleData={articleData} setArticleData={setArticleData} index={index}/>

                                {/* Add block to add element at the first index and shift remaining articles */}
                                <div style={{display: 'flex'}}>
                                    <button onClick={onClickAdd} index={index+1} name='paragraphbtn' style={{margin: '0 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Paragraph Block</button>
                                    <button onClick={onClickAdd} index={index+1} name='imagebtn' style={{margin: '0 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Image Block</button>
                                </div> 
                            </div>
                        )
                    } else {
                        return (
                            <div style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={index}>
                                <Image articleData={articleData} setArticleData={setArticleData} index={index}/>

                                {/* Add block to add element at the first index and shift remaining articles */}
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <button onClick={onClickAdd} index={index+1} name='paragraphbtn' style={{margin: '0 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Paragraph Block</button>
                                    <button onClick={onClickAdd} index={index+1} name='imagebtn' style={{margin: '0 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Add Image Block</button>
                                </div> 
                            </div>
                        )
                    }
                })} 

                {/* Save Button */}
                <button onClick={onClickSave} name='submitbtn' style={{margin: '1rem 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Save</button>
                {/* Publish Button */}
                <button onClick={onClickPublish} name='submitbtn' style={{margin: '1rem 0.5rem', backgroundColor: '#538ced', color: 'white', border: '0.1rem solid black', borderRadius: '0.5rem'}}>Publish</button>

            </div>

            <div className={`${half ? '' : showPreview}  ${half ? 'preview_half' : ''}`} id='pblock' style={{paddingTop: '6rem', overflowY: 'auto', height: '100%', backgroundColor: 'white'}}>

                <div style={{textAlign: 'center'}}>
                    <button id="tp2" style={{margin: '0.5rem'}}onClick={()=>{togglePreview()}}>Toggle Preview</button>
                </div>
                <TownSquarePage title={title} author={author} date={date} articleData={articleData}/>

            </div>
        </div>
    </>
  )
}

export default Create