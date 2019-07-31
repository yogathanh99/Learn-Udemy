import React, { Suspense } from 'react'

const asyncComponent = Component => {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  )
}

export default asyncComponent
