import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/action-creators/auth.action.creator";
import { useNavigate } from "react-router-dom";
import { Columns } from "react-bootstrap-icons";
import styles from "./navbar.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";

export const Navibar = () => {
    const { logout } = useAuth();
    const { user } = useTypedSelector(state => state.authReducer);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    const handleBoardsClick = () => {
        navigate('/');
    }

    const handleLogoutClick = () => {
        dispatch(logout());
    }

    useEffect(() => {
    }, [user]);

    return (
        <div className={styles.navbar}>
            <Container fluid="lg">
                <Navbar className={styles.navbar_body} collapseOnSelect expand="lg" variant="primary">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <div className={styles.navbar_button}>
                                <Button onClick={handleBoardsClick} className="w-100 d-flex align-items-center"><Columns className="me-2" />
                                    <span>Boards</span>
                                </Button>
                            </div>
                        </Nav>
                        <Nav className="d-flex gap-2">
                            {user?.email.length > 0 &&
                                <div className={styles.navbar_user_avatar}>
                                    <span>{user?.email[0].toUpperCase()}</span>
                                </div>}
                            <div className={styles.navbar_button}>
                            <Button className="w-100" onClick={handleLogoutClick}>
                                <span>Logout</span>
                            </Button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    )
}