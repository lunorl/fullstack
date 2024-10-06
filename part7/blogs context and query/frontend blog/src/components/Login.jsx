import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import styled from 'styled-components'
const StyledLabel = styled.label`
color: white;
`
const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <StyledLabel>
        Username:
        <TextField
        size="small"
          type="text"
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </StyledLabel>
      <StyledLabel>
        Password:
        <TextField
        size='small'
          type="password"
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)} />
      </StyledLabel>
      <Button variant="contained" type="submit">Login</Button>
    </form>
  )
}

export default Login