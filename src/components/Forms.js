import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { v1 as uuidv1 } from 'uuid'

const overlayStyle = {
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0)', 
    backgroundColor: 'rgba(0,0,0,0.5)'
}

const modalStyle = {
  backgroundColor: '#fefefe',
  margin: '5% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%'
}

export const Forms = () => {
  const [values, setValue] = useState([
    {
      params: [{
        id: uuidv1(),
        value: ['Insert parameter']
      }]
    }
  ])
  const addRulesInput = (index) => (e) => { 
    e.preventDefault()

    let currVal = [...values]
    let item = {...currVal[index]}
    item.params.push({
      id: uuidv1(),
      value: ['insert parameter']
    });
    currVal[index] = item
    setValue(currVal)
  }
  const removeRulesInput = (inputId, sectionIndex) => (e) => { 
    e.preventDefault()
    const currVal = [...values]
    let item = [...currVal[sectionIndex].params]
    console.log(item)
    item = item.filter(v => v.id !== inputId)
    
    currVal[sectionIndex].params = item
    setValue(currVal)
  }
  const addSection = (e) => { 
    e.preventDefault()
    setValue([...values, {
        params: [{
          id: uuidv1(),
          value: ['Insert parameter']
        }]
      }]
    )
  }
  const deleteSection = (index) => (e) => {
    e.preventDefault();
    setValue(values.filter((v,i) => i !== index))
  }
  return (
    <>
      <Form style={overlayStyle}>
        <div style={modalStyle}>
        <h3>Add Revenue Group</h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Insert Title"
            aria-label="Insert Title"
          />
        </InputGroup>

        <div style={{display: 'flex', alignItems: 'baseline'}}>
          If
          <Form.Group className='mx-2'>
            <Form.Control as="select">
              <option>ALL</option>
              <option>SOME</option>
            </Form.Control>
          </Form.Group>
          of the below conditions are met
        </div>

        { 
          values.map((value,index) => {
            return (
              <div className='p-3' style={{ background: '#f7f7f7' }}>
                <label><strong>Rule {index+1}</strong></label>
                { index !== 0 ? <Button onClick={deleteSection(index)} variant="link">Delete section</Button> : '' }
                <hr />
                {
                  value.params.map((v,i) => 
                    <InputGroup className="mb-3" key={v.id}>
                      <Form.Group className='mx-2 mb-0'>
                        <Form.Control as="select">
                          <option>aff_sub</option>
                          <option>option 2</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='mx-2 mb-0'>
                        <Form.Control as="select">
                          <option>is</option>
                          <option>option 2</option>
                        </Form.Control>
                      </Form.Group>
                      <FormControl
                        placeholder={v.value}
                        aria-label="Insert parameter"
                        aria-describedby="basic-addon2"
                        key = {`input-${v.id}`}
                      />
                      { i === value.params.length - 1 ? (
                        <InputGroup.Append>
                          <Button size="sm" variant="outline-secondary" onClick={addRulesInput(index)}>Add rule</Button>
                          { index === values.length - 1 ? <Button size="sm" variant="dark" onClick={addSection}>Add section</Button> : '' }
                        </InputGroup.Append>
                      ) : 
                      <InputGroup.Append>
                          <Button variant="outline-danger" onClick={removeRulesInput(v.id, index)}>Remove rule</Button>
                      </InputGroup.Append>
                      }
                    </InputGroup>
                  )
                }
              </div>
            )
          })
        }
        
        <div className='mt-4' style={{display: 'flex', alignItems: 'baseline'}}>
          then revenue is
          <InputGroup className="mb-3 pl-2" style={{ flex: '1' }}>
            <FormControl type='number' aria-label="Percentage" />
            <InputGroup.Append>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <Button className="mr-3" variant="primary">Confirm</Button>
        <Button variant="outline-dark">Cancel</Button>
        </div>
      </Form>
    </>
  )
}