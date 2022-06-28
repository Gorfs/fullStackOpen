const AddSection = ({ handleSubmit, newInfo, handleChange }) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newInfo.name} name="name" onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input name="number" value={newInfo.number} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddSection
