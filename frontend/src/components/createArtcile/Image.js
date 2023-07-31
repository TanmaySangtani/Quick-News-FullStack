import React, { useEffect } from 'react'

const Image = (props) => {

    const {articleData, setArticleData, index} = props

    const onChangeImage = async (e) => {
        const file = e.target.files[0]
        const temp = [...articleData]
        
        const base64 = await convertImageToBase64(file)

        temp[index].value = base64
        setArticleData(temp)
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

    const onChangeDescription = (e) => {
        // setImageData({...imageData, [e.target.name] : e.target.value})

        const temp = [...articleData]
        temp[index].description = e.target.value
        setArticleData(temp)
    }

    const removeImage = () => {
        let temp = [...articleData]
        temp.splice(index, 1)
        setArticleData(temp)
    }

    useEffect(()=>{
        console.log(articleData[index].value)
        //eslint-disable-next-line
    }, [articleData])

  return (
    <>
    <div style={{width: '90%', display: 'flex', flexDirection: 'column', margin: '2rem 0', alignItems: 'center'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <label style={{margin: '0.5rem'}} htmlFor="paragraph">Block {index+1} - Image</label>
            <button className="fa-solid fa-xmark" style={{margin: '0.5rem', background: 'transparent', border: 'none'}} onClick={removeImage}>
            </button>
        </div>

        <input name="description" value={articleData[index].description} style={{width: '100%', margin: '0.5rem 0'}} placeholder="Enter Image Description" type="text" onChange={onChangeDescription}/>
        {/* <input name="value" id="selectedFile" style={{margin: '0.5rem', width: '50vw', textAlign: 'center'}} type="file" accept=".jpeg, .jpg, .png" onChange={onChangeImage}/>  */}

        {/* Creating File input that that does not display the name of the selected file */}
        <input name="value" type="file" accept=".jpeg, .jpg, .png" id={`selectedFile${index}`} style={{display: 'none'} } onChange={onChangeImage}/>
        <input style={{width: '100%', margin: '0.5rem'}} type="button" value="Browse..." onClick={() => { document.getElementById(`selectedFile${index}`).click() }} />

        <img style={{margin: '0.5rem', width: '100%'}} src={`${articleData[index].value}`} alt="" />
    </div>
    </>
  )
}

export default Image