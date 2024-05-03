import { useState } from "react";
import { login } from "../../services/auth.services";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("")
  const handleLogin = (e) => {
    e.preventDefault()

    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res)
        window.location.href = "/product"
      }
      else {
        setLoginFailed(res.response.data)
      }
    })
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto">
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="John Doe"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="******"
      />

      <Button type="submit" classname="bg-blue-600 w-full">
        Login
      </Button>

      {loginFailed && (
        <p className="text-red-500 text-center mt-3">{loginFailed}</p>
      )}

    </form>
  );
};

export default FormLogin;
