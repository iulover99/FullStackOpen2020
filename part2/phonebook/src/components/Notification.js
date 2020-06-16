import React from 'react'

const Notification = ({ message,flag}) => {
    if (message === null) {
      return null
    }
    if(flag){
        return (
            <div className="information">
              {message}
            </div>
          )
    }
    return (
        <div className="error">
          {message}
        </div>
      )
  }

export default Notification