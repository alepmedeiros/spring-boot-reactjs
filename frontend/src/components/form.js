import React from 'react'

const Form = (props) => {
  return (
    <div className="bs-component">
      <div className='form-group' style={{paddingBottom: 5}}>
          <label htmlFor={props.id}>{props.label}</label>
          <input 
            type={props.type} 
            className='form-control' 
            id={props.id} 
            placeholder={props.placeholder} 
            value={props.value}
            onChange={props.change} />
      </div>
    </div>
  )
}

export default Form;