import React from 'react';

export const Button = (props) => {
  let icone;

  if (props.icon !== '') {
    icone = <i className={`fa fa-${props.icon}`}></i>;
  }
  
  return (
    <>
      <button
        type='button'
        className={`btn btn-${props.type}`} 
        style={{marginTop: 5, marginRight: 5}}
        link={props.link}
        onClick={props.click}
      >{icone} {props.label}</button>
    </>
  )
}
