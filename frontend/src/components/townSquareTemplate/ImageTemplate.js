import React from 'react'
const ImageTemplate = (props) => {
    
    const {description, value} = props

  return (
    <div style={{width: '70%', margin: '2rem 0', height: 'auto'}}>
       <div style={{fontSize: '0.5rem'}}>{description}</div> 
       <img style={{width: '100%', height: 'auto'}} src={value} alt="" />
    </div>
  )
}

export default ImageTemplate