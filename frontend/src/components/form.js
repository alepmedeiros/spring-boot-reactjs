import React from 'react'

export const Form = (props) => {
  return (
    <>
        <form>
            <fieldset>
                {props.children}
            </fieldset> 
        </form>
    </>
  )
}
