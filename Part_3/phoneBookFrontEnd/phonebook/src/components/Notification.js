const Notification = ({ message }) => {
  switch (message) {
    case null:
      return null
    default:
      const styles = {
        color: message.color,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        marginBottom: 10,
      }
      return <div style={styles}>{message.message}</div>
  }
}

export default Notification
