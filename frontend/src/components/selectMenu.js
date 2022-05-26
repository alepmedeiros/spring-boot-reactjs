import React from 'react'

const SelectMenu = (props) => {

    const options = props.lista.map((option, index) => {
        return <option key={index} value={option.value}>{option.label}</option>
    });  

  return (
    <div className='form-group' style={{paddingBottom: 5}}>
        <label htmlFor={props.id}>{props.label}</label>
        <select className="form-control" 
          id={props.id} 
          value={props.value} 
          onChange={props.change}>
            {options}
        </select>
    </div>
  )
}

export default SelectMenu;