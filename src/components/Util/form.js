import React from 'react'
import s from './form.module.scss'

export const Input = ({input, meta, ...props}) => {
    
    return (
        <div className = {s.formControl+' '+ s.error}>
            <input {...input} {...props}/>
            {meta.error && meta.touched && meta.error}
        </div>
    )
}