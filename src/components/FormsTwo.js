import React, { useState } from 'react'

export const FormsTwo = () => {
  const [values, setValue] = useState([
    {
      id: 12,
      params: ['h','e']
    }
  ])
  function addParamsInput(e) { 
    e.preventDefault()
    const currVal = [...values];
    currVal[0].params.push('yo')
    setValue(currVal);
    console.log('add params input ()')
  }
  const addRulesInput = (e) => { 
    e.preventDefault()
    // setValue([...values, {
    //   params: ['yo']
    // }])
    console.log('add rules input ()') 
  }
  return (
    <div>
      <form>
        <div>
          <label htmlFor="">Rule</label>
          <button onClick={addParamsInput}>Add params</button>
        </div>
          <button onClick={addRulesInput}>Add rules</button>
      </form>
    </div>
  )
}