import Navbar from 'react-bootstrap/Navbar';
import { User } from '../models/user';
import { Container, Nav } from 'react-bootstrap';
import NavBarLoggedInView from './NavBarLoginViewComp';
import NavBarLoggedOutView from './NavBarLogoutViewComp';

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClick: () => void,
    onLoginClick: () => void,
    onLogoutClick: () => void,
}

const NavBar = ({ loggedInUser, onLoginClick, onLogoutClick, onSignUpClick }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>
                    KTrust Notes
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutClick} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClick} onSignUpClicked={onSignUpClick} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;