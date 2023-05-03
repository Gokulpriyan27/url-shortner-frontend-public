import "./Navigation.scss"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Navbar, NavbarBrand } from "reactstrap";
import axios from"axios"

function Navigation() {
  const { userid } = useParams();
  const navigate = useNavigate();

  const handleLogout=async()=>{
    try {
      const logResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{withCredentials:true});
      if(logResponse.status===200){
        navigate("/login");
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Navbar color="dark" dark className="navbar-wrapper">
        <Container className="nav-wrapper">
        <Link to={`/dashboard/${userid}`} className="links">
        <NavbarBrand>Dashboard</NavbarBrand>
      </Link>

      <Link to={`/short-url/${userid}`} className="links">
        <NavbarBrand>Create Short URL</NavbarBrand>
      </Link>

      <Link to={`/listall/${userid}`} className="links">
        <NavbarBrand>Display All</NavbarBrand>
      </Link>
        <Button color="danger" outline onClick={handleLogout}>Logout</Button>
        </Container>
    
    </Navbar>
  );
}

export default Navigation;
