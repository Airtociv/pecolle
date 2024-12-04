import { Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000/voluntarios";

const Login = () => {

  localStorage.removeItem("userName")
  localStorage.removeItem("email")

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const [inscritos, setInscritos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const users = await req.json();
        console.log(users);
        setInscritos(users);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const gravarLocalStorage = (usuario) => {
    localStorage.setItem("userName", usuario.nome);
    localStorage.setItem("email", usuario.email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userToFind = inscritos.find((user) => user.email == email);

    if (email != "") {
      if (senha != "") {
        if (userToFind != undefined && userToFind.senha == senha) {
          gravarLocalStorage(userToFind);
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success");
          setAlertMensagem("login efetuado com sucesso");
          alert("login efetuado com sucesso");
          navigate("/home");
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("usuario ou senha inválidos");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo senha não pode ficar vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo email não pode ficar vazio");
    }
  };

  return (
    <div>
      <Container>
        <span>LOGIN</span>

        <Form onSubmit={handleLogin}>
          <FloatingLabel controlId="inputVol" label = "Email" >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel controlId="passVol" label = "Senha">
            <Form.Control 
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e)=>{
              setSenha(e.target.value)
            }} />
          </FloatingLabel>
            <Alert variant={alertVariant} className={alertClass}>
              {alertMensagem}
            </Alert>
            <Button variant="light" type="submit" className="mt-4" size="lg">
              Entrar
            </Button>

        </Form>
      </Container>
    </div>
  );
};

export default Login;
