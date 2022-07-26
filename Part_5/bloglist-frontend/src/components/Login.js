const Login = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <h1>Login Form</h1>
    <input value={username} onChange={handleUsername} />
    <br />
    <input value={password} onChange={handlePassword} />
    <br />
    <button type="submit">log in</button>
  </form>
)

export default Login
