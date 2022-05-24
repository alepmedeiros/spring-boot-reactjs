import React from 'react';

export default function Form(props) {
  return (
    <fieldset>
        <div className='form-group' style={{paddingBottom: 5}}>
            <label htmlFor={props.id}>{props.label}</label>
            <input 
              type={props.type} 
              className='form-control' 
              id={props.id} 
              placeholder={props.placeholder} 
              value={props.value}
              onChange={props.change}/>
        </div>
    </fieldset>
  )
}
