import React from 'react'
import classes from './Button.module.css'

const button = (props) => (
    <button className={classes.button} 
    onClick={props.clicked}>{props.children}</button>
)

export default button