import { createContext } from "react";

const LoginContext = createContext({
  name: "",
  setName: () => {},
  surname: "",
  setSurname: () => {},
});

export default LoginContext;