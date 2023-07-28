import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-t from-cyan-200 to-cyan-600'>
        {" "}
        {text}
    </span>
  )
}



export default HighlightText
