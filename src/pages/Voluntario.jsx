import { Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import Observe from "../components/Observe";

import { useState} from "react";

import { useNavigate } from "react-router-dom";


const url = "http://localhost:5000/voluntarios";


function Voluntario() {

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (nome != "") {
      if (email != "") {
        if (senha != "") {
          const atendente ={nome,email,senha}
          console.log(atendente);
          try{
  
            const req = await fetch(url,{
              method: "POST",
              headers:{"Content-type": "application/json"},
              body: JSON.stringify(atendente)
          })
          const res = req.json()
        console.log(res);
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMensagem("Voluntario registrado com sucesso");
        alert("Voluntario registrado  com sucesso");
        navigate("/home")

        } catch (erro){
          console.log(erro);
          
        }
    }  else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo senha não pode ficar vazio");
    }
  } else {
    setAlertClass("mb-3 mt-2");
    setAlertMensagem("O campo email não pode ficar vazio");
  }
} else {
  setAlertClass("mb-3 mt-2");
  setAlertMensagem("O campo nome não pode ficar vazio");
}
};

  return (
    <div>
      
      <Observe />
       <Container>
        <h1>
        Registro de Voluntarios
        </h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
            <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="digite o nome do Voluntario"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  />
                </FloatingLabel>

                <FloatingLabel
                controlId="floatingInputEmail"
                label="email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="crie um email para o voluntario"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FloatingLabel>
            
              <FloatingLabel
                controlId="floatingInputSenha"
                label="Senha"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="crie uma senha para o voluntario"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                  }}
                />
              </FloatingLabel>
 
</Col>
          </Row>
          
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          <Button variant="success" size="lg" type="submit">
            cadastrar
          </Button>

        </Form>
       </Container>

    </div>
  )
}

export default Voluntario
