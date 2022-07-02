const Notification = ({ message, color }) => {
  const styles = {
    color: color,
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "Solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  console.log("notification should have ")
  switch (message) {
    case "":
      return null
    default:
      return <div style={styles}>{message}</div>
  }
}
export default Notification
