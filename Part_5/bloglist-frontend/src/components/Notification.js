const Notification = ({ message, color }) => {
  const notificationStyles = {
    div: {
      backgroundcColor: "grey",
      border: `${color} 2px solid`,
      borderRadius: 15,
    },
    p: {
      color: `${color}`,
      textAlign: "center",
    },
  }

  //checking to see if there is a notification to show
  if (message === null) {
    return <div id="notificationDiv"></div>
  }

  return (
    <div style={notificationStyles.div}>
      <p style={notificationStyles.p}>{message}</p>
    </div>
  )
}

export default Notification
