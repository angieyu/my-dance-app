import React from 'react'

// The component that adds a new combo and validates in input
export default ({ input, label, meta: { error, touched } }) => {
    return (
      <div className={input.name}>
          <label>{label}</label>
          <input {...input} style={{ marginBottom: '5px' }}/>
          <div className="red-text" style={{ marginBottom: '20px' }}>
              {touched && error}
          </div>
      </div>
    )
};
