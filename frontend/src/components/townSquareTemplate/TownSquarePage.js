import React from 'react'
import ImageTemplate from './ImageTemplate'
import ParagraphTemplate from './ParagraphTemplate'
import AboutAuthor from './AboutAuthor'

const TownSquarePage = (props) => {
  const {title, author, date, articleData} = props

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Inknut Antiqua' }}>
        {/* Town Square */}
        <div style={{ color: '#ff0000', fontSize: '1rem', fontWeight: '900', margin: '0.5rem 0', padding: '1vw 2vw', borderRadius: '2rem' }}>
          Quick News Town Square
        </div>

        {/* Title */}
        <h2 style={{ margin: '0.5rem 0', fontWeight: '900', textAlign: 'center', width: '90%',  wordWrap: 'break-word'}}>
          {title}
        </h2>

        {/* Author */}
        <div style={{ color: 'grey', fontSize: '0.9rem', margin: '0.5rem 0', fontStyle: 'italic' }}>
          by {author.name}
        </div>

        {/* Last Updated */}
        <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Last updated: {date}
        </div>

        {articleData.map((element, index) => {
            if (element.paragraph) {
                return (
                    <ParagraphTemplate key={index} value={articleData[index].value}/>
                )
            }
            if (element.image) {
                return (
                  <ImageTemplate key={index} description={articleData[index].description} value={articleData[index].value}/>
                )
            }

            return (<></>)
        })} 

        <AboutAuthor name={author.name} bio={author.bio} image={author.image}/>

      </div>
    </>
  )
}

export default TownSquarePage