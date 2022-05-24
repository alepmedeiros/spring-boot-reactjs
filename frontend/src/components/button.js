import React from 'react'

export const Button = (props) => {
  return (
    <>
        <button 
            className={`btn btn-${props.type}`} 
            style={{marginTop: 10}}
            onClick={props.click}
        >{props.label}</button>
    </>
  )
}
