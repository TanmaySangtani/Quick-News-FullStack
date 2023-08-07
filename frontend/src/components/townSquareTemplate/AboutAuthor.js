import React from 'react'

const AboutAuthor = (props) => {

  const {name, bio, image} = props

  return (
    <div style={{margin: '2rem 0', padding: '1rem 0', fontWeight: '900', width: '90%', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d6d4d4', border: '0.2rem solid black',borderRadius: '1rem'}}>
      <h3 style={{marginBottom: '1rem', wordWrap: 'break-word'}}>About Author</h3>
      <div style={{width: '100%', margin: '1rem 0', padding: '0 0.5rem', display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '30%'}}>
        <img style={{width: '100%', height: 'auto'}} src={image} alt=""/>
        </div>
        <div style={{width: '70%'}}>
          <h4 style={{textAlign: 'center', fontWeight: '900', marginBottom: '1rem', wordWrap: 'break-word'}}>
            {name}
          </h4>
          <p style={{width: '100%', fontWeight: '400', padding: '0 0.4rem', wordWrap: 'break-word'}}>
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutAuthor