import React from 'react';
import classes from './Logo.module.css';
import Logo from '../../assets/Logo.png'

const logo = (props) => (
    <div className={classes.Logo}>
        <img className={classes.Image} src={Logo} alt="TriviaBoard"/>
    </div>
)

export default logo