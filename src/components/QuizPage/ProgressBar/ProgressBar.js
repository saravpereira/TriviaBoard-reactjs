import React from "react";
import classes from "./ProgressBar.module.css"

const ProgressBar = (props) => {
    const {completed } = props;
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: "#e1719d",
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div className={classes.containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;