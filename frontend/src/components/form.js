import React from 'react'

const Form = (props) => {
  return (
    <div className="bs-component">
      <div className='form-group' style={{paddingBottom: 5}}>
          <label htmlFor={props.id}>{props.label}</label>
          <input 
            className='form-control' 
            id={props.id} 
            {...props} />
      </div>
    </div>
  )
}

export default Form;