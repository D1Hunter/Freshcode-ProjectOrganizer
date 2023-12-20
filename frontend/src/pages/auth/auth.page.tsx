import { FC, useState } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import styles from "./auth.module.scss";
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/action-creators/auth.action.creator";

export const Auth: FC = () => {
    const [title, setTitle] = useState("Login In");
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const { registerUser, loginUser } = useAuth();
    const dispatch: any = useDispatch();

    const registerClickHandler = async () => {
        if (title != "Sign Up") {
            setTitle("Sign Up");
            return;
        }
        if (email.length === 0 && password.length === 0 && repeatPassword.length === 0) {
            return alert('Заповніть усі поля');
        }
        if (password !== repeatPassword) {
            return alert('Паролі не співпадають');
        }
        dispatch(registerUser({ email, password }));
    }

    const loginClickHandler = async () => {
        if (title != "Login In") {
            setTitle("Login In");
            return;
        }
        if (email.length === 0 && password.length === 0 && repeatPassword.length === 0) {
            return alert('Заповніть усі поля');
        }
        dispatch(loginUser({ email, password }));
    }

    return (
        <div className={styles.auth}>
            <Card className="d-flex flex-column">
                <Card.Body className="d-flex flex-column align-items-center justify-content-between">
                    <h2>{title}</h2>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                    </InputGroup>
                    {title === 'Sign Up' &&
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                                type="password"
                                placeholder="Repeat password"
                            />
                        </InputGroup>
                    }
                    <Container className="d-flex justify-content-between p-2">
                        <Button variant={title === "Login In" ? "primary" : "secondary"} onClick={loginClickHandler}>
                            <span className="fw-bold">Login In</span>
                        </Button>
                        <Button variant={title === "Sign Up" ? "primary" : "secondary"} onClick={registerClickHandler}>
                            <span className="fw-bold">Sign Up</span>
                        </Button>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}