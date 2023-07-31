import React from 'react'

const ParagraphTemplate = (props) => {
    const { value } = props
  return (
    <p style={{margin: '2rem 0', width: '70%', fontSize: '1rem', wordWrap: 'break-word'}}>
      {value}
    </p>

  )
}

export default ParagraphTemplate