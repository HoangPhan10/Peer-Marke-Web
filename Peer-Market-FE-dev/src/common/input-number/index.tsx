import { Input } from 'antd'
import React from 'react'

const InputNumber = (props) => {
  const onKeyDown = (e) => {
    var options = [46, 8, 9, 27, 13, 110];
    if (options.indexOf(e.keyCode) !== -1) {
      return true;
    }
    if (((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
      return true;
    }
    if (/[0-9]/.test(e.key)) {
      return true;
    }

    e.preventDefault();

    return false;
  }

  return (
    <Input onKeyDown={onKeyDown} {...props}/>
  )
}

export default InputNumber