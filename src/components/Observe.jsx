import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function Observe() {

   const usuarioNome = localStorage.getItem("userName");


  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/home">Adote um animal</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home" className="active">
              disponiveis
              </Nav.Link>
              <Nav.Link href="/pets/cadastrar">registro de animais</Nav.Link>
              <Nav.Link href="/voluntarios/cadastro">regitro de voluntarios</Nav.Link>
              </Nav>
              <Nav className="justify-content-end">
                <Navbar.Text style={{ color: "black" }}>
                {usuarioNome}
                </Navbar.Text>
                <Nav.Link href="/login">sair</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Observe
