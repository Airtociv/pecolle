import { Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Observe from "../components/Observe";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const urlMal = "http://localhost:5000/animais"
const urlReg ="http://localhost:5000/adote"
const urlVaci =""


function Adotavel() {

const [mals,setMals] = useState([])
const [vacis,setVacis] = useState([])

const [alertClass, setAlertClass] = useState("mb-3 d-none");
const [alertMensagem, setAlertMensagem] = useState("");
const [alertVariant, setAlertVariant] = useState("danger");

const linkImagem ="https://m.media-amazon.com/images/I/516AngdquqL._SL1200_.jpg"

const[nome,setNome] = useState("")
const[tipo,setTipo] = useState("")
const[raca,setRaca] = useState("")
const[vacinado,setVacinado] = useState("")
const[fotoUrl,setFotoUrl] = useState("")


useEffect(()=>{
  async function fetchData() {
    try{
      const req = await fetch(urlMal)
      const familia = await req.json()
      console.log(familia);
      setMals(familia)

    }
    catch(erro){
      console.log(erro.message);

    }
  }
  fetchData()
},[])
     
useEffect(()=>{
  async function fetchData() {
    try{
      const req = await fetch(urlVaci)
      const imunidade = await req.json()
      console.log(imunidade);
      setVacis(imunidade)

    }
    catch(erro){
      console.log(erro.message);

    }
  }
  fetchData()
},[])

const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  if (nome != "") {
    if (raca != "") {
      if (vacinado != "") {

        const pet ={nome,tipo,raca,vacinado,fotoUrl}
        console.log(pet);
        try{

          const req = await fetch(urlReg,{
            method: "POST",
            headers:{"Content-type": "application/json"},
            body: JSON.stringify(pet)
        })

        const res = req.json()
        console.log(res);
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMensagem("Animal registrado com sucesso");
        alert("Animal registrado  com sucesso");
        navigate("/home")

        } catch (erro){
          console.log(erro);
          
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo vacinado não pode ficar vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo raça não pode ficar vazio");
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
        Registro de Animais
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
                  placeholder="digite o nome do animal"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  />
                </FloatingLabel>

                <FloatingLabel
                controlId="floatingInputRaca"
                label="Descrição"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="digite a raca do animal"
                  value={raca}
                  onChange={(e) => {
                    setRaca(e.target.value);
                  }}
                />
              </FloatingLabel>
            
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>tipo de animal</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange=
                  {(e) => {
                   setTipo(e.target.value);
                  }}>
                  {mals.map((mal) => (
                    <option key={mal.id} value={mal.nome}>
                      {mal.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formGridVaci" className="mb-3">
                <Form.Label>foi vacinado?</Form.Label>
                <Form.Select
                  value={vacinado}
                  onChange=
                  {(e) => {
                   setVacinado(e.target.value);
                  }}>
                  {vacis.map((vacina) => (
                    <option key={vacina.id} value={vacina.nome}>
                      {vacina.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

            </Col>

            <Col xs={6}>
              <Form.Group controlId="formFotoLg" className="mb-3">
                <FloatingLabel
                  controlId="floatingInputFoto"
                  label="envie um link de uma foto do animal"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="envie um link de uma foto do animal"
                    value={fotoUrl}
                    onChange={(e) => {
                      setFotoUrl(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <Image
                  src={fotoUrl == "" ? linkImagem : fotoUrl}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
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

export default Adotavel
