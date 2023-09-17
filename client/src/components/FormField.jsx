import React from 'react'

const FormField = ({ labelName, value, inputType, onChange, isRequired }) => {
  return (
    <div className='p-4'>
      <label className='flex-1 flex w-full text-text'>
        <span>{labelName}:</span>
      </label>
      <input
        required={isRequired}
        value={value}
        onChange={onChange}
        type={inputType}
        className='mt-1 bg-transparent border-2 border-primary rounded-md w-full py-2 text-text'
      />
    </div>
  )
}

export default FormField