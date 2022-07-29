const Login = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <h1>Login Form</h1>
    <p>
      Username: <input value={username} onChange={handleUsername} />
      <br />
      Password:
      <input value={password} onChange={handlePassword} />
    </p>

    <br />
    <button type="submit">log in</button>
  </form>
)

export default Login
