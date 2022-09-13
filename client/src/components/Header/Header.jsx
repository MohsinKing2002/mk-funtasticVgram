import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; 
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';


function Header() {

    return (
        <>
            <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#382047"}} >
                <Nav className="Nav">
                    <Nav.Link as={NavLink} to="/"> <HomeIcon className="nav-icon" /> </Nav.Link>
                    <Nav.Link as={NavLink} to="/search"> <SearchIcon className="nav-icon" /> </Nav.Link>
                    <Nav.Link as={NavLink} to="/new"> <AddCircleOutlineIcon className="nav-icon" /> </Nav.Link>
                    <Nav.Link as={NavLink} to="/message"> <ForumIcon className="nav-icon" /> </Nav.Link>
                    <Nav.Link as={NavLink} to="/account"> <AccountCircleIcon className="nav-icon" /> </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}

export default Header;