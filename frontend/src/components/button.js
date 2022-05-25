import React from 'react'

export const Button = (props) => {
  let icone;

  if (props.ico != '') {
    icone = <i className={`fa fa-${props.ico}`} />;
  }
  
  return (
    <>
        <a 
            className={`btn btn-${props.type}`} 
            style={{marginTop: 5, marginRight: 5}}
            link={props.link}
            onClick={props.click}
        >{icone} {props.label}</a>
    </>
  )
}
