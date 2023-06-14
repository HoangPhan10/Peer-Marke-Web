import React from 'react'
import { FrownOutlined } from '@ant-design/icons'

const styles = {
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
    top: '30%',
    marginTop: '-50px',
    left: '50%',
    marginLeft: '-100px',
    width: '200px',
}

const Error = () => (
  <div className={`${styles}`}>
    <FrownOutlined />
    <h1>404 Not Found</h1>
  </div>
)

export default Error