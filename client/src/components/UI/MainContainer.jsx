import React from 'react'

const MainContainer = ({ children, ...rest }) => {
  return (
    <div className="py-4 px-8 mx-auto max-w-4xl" {...rest}>
      {children}
    </div>
  )
}

export default MainContainer
