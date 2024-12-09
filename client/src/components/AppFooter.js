import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="ms-auto">
        <span className="me-1">Powered By: </span>
        <a href="https://www.swaastiksolutions.com" target="_blank" rel="noopener noreferrer">
          Swaastik Solutions 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
