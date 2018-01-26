import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// polyfill for requestAnimationFrame github.com/facebookincubator/create-react-app/issues/3199
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

Enzyme.configure({ adapter: new EnzymeAdapter() });
