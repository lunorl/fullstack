import { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../mutations";
const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN);
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("guy-token", token);
    }
  }, [result.data]);
  if (!show) {
    return null;
  }
  const submit = (event) => {
    try {
    event.preventDefault();
    console.log(username, password);
    login({ variables: { username, password } });
    setName("");
    setPassword("");
    setPage("authors")
    } catch {
      console.log("BAD PASSWORD CUH")
    }
    
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={username}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
