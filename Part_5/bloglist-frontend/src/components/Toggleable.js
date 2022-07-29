import { useState, forwardRef, useImperativeHandle } from "react"

//is a react component that makes any item toggleable with a button to toggle if it is visible.
//the message to show and cancle are showMessage and cancelMessage.
//the actual item to be toggleable is in the children of the component
const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false) // is a boolean to set if the componenet is visible.

  const toggleVisible = () => {
    console.log("the toggle visible function has been called")
    if (visible === true) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible,
    }
  })

  if (visible) {
    return (
      <div>
        <div>{props.children}</div>
        <button onClick={() => toggleVisible()}>{props.cancelMessage}</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => toggleVisible()}>{props.showMessage}</button>
      </div>
    )
  }
})
export default Toggleable
