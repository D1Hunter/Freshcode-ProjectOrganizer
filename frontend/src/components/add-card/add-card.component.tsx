import { FC, useState } from "react";
import { Button, Card, CloseButton, Form, InputGroup } from "react-bootstrap";
import { useList } from "../../store/action-creators/list.action.creator";
import { useDispatch } from "react-redux";
import styles from "./add-card.module.scss";

interface IAddCard {
    listId: string
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCard: FC<IAddCard> = ({ listId, setShow }) => {
    const [name, setName] = useState<string>("");
    const { addCardToList } = useList();
    const dispatch: any = useDispatch();

    const onSumbitClickHandler = async () => {
        if (name.length == 0) {
            return;
        }
        dispatch(addCardToList({ listId: listId, name: name }));
        setShow(false);
    }

    return (
        <div className={styles.add_card}>
            <InputGroup>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder=""
                />
            </InputGroup>
            <div className="d-flex align-items-center mt-2">
                <Button variant="success" onClick={onSumbitClickHandler}>Add</Button>
                <CloseButton onClick={() => setShow(false)} />
            </div>
        </div>
    )
}