import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; hungdev.js</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Contact: 0123456789</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
