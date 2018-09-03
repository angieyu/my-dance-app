import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
    return (
      <div className={input.name}>
          <input
            {...input}
            style={{ marginBottom: '5px' }}
            type="checkbox"
            checked={input.value}
            className="filled-in"
            id={label}
          />
          <label htmlFor={label}>Focus</label>
          <div className="red-text" style={{ marginBottom: '20px' }}>
              {touched && error}
          </div>
      </div>
    )
};

// https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d