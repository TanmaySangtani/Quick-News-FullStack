import React from 'react'

const Paragraph = (props) => {

    const {articleData, setArticleData, index} = props

    const onChange = (e) => {
        let temp = [...articleData]
        temp[index] = {paragraph: true, value: e.target.value}
        setArticleData(temp)
    }

    const removePara = () => {
        let temp = [...articleData]
        temp.splice(index, 1)
        setArticleData(temp)
    }

  return (
    <>
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', margin: '2rem 0', alignItems: 'center'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <label style={{margin: '0.5rem'}} htmlFor="paragraph">Block {index+1} - Paragraph</label>
            <button className="fa-solid fa-xmark" style={{margin: '0.5rem', background: 'transparent', border: 'none'}} onClick={removePara}>
            </button>
        </div>
    
        <textarea value={articleData[index] ? articleData[index].value : ''} style={{width: '100%', height: '10rem'}} type="text" name="bio" onChange={onChange}/>  
    </div>
    </>
  )
}

export default Paragraph