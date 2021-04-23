import React from 'react'
import s from './form.module.scss'

export const Input = ({input, meta, ...props}) => {
    
    return (
        <div className = {s.formControl+' '+ s.error}>
            <input {...input} {...props}/>
            <p>{meta.error && meta.touched && meta.error}</p>
        </div>
    )
}