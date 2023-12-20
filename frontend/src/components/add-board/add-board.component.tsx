import { Card, Form, Button, CloseButton } from "react-bootstrap";
import styles from "./add-board.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useBoard } from "../../store/action-creators/board.action.creator";

export const AddBoard = () => {
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const { createBoard } = useBoard();
    const dispatch: any = useDispatch();

    const createBoardSubmitHandler = async () => {
        if (name.length === 0) {
            return;
        }
        setShow(false);
        await dispatch(createBoard({ name: name }));
    }

    return (
        <Card className={styles.add_board}>
            {!show ?
                <Card.Body className="d-flex align-items-center" onClick={() => setShow(true)}>
                    <Card.Text className="text-muted">
                        Create new board...
                    </Card.Text>
                </Card.Body> : <>
                    <Form style={{ width: "100%" }}>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                placeholder=""
                            />
                        </Form.Group>
                    </Form>
                    <div className="d-flex align-items-center px-2 gap-2" style={{ height: "100%", width: "100%" }}>
                        <Button variant="success" className="p-3" onClick={createBoardSubmitHandler}>
                            <span className="fw-bold">Create</span>
                        </Button>
                        <CloseButton onClick={() => setShow(false)} />
                    </div>
                </>}
        </Card>
    )
}