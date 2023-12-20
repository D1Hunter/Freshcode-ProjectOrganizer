import { FC, useState } from "react";
import { IFullCard } from "../../models/card.interface";
import { Button, CloseButton, Form } from "react-bootstrap";
import { useCard } from "../../store/action-creators/card.action.creator";
import { useDispatch } from "react-redux";
import styles from "./edit-card-description.module.scss";

interface IEditCardDescription {
    card: IFullCard;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditCardDescription: FC<IEditCardDescription> = ({ card, setShow }) => {
    const [description, setDescription] = useState<string>(card.description || '');
    const {updateCard}= useCard();
    const dispatch: any = useDispatch();

    const onSumbitClickHandler = async () => {
        if (description.length == 0) {
            return;
        }
        dispatch(updateCard(card,{name:card.name,description:description,listId:card.list.id}));
        setShow(false);
    }

    return (
        <>
            <Form className={styles.edit_card_description}>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>
            </Form>
            <div className="d-flex align-items-center mt-2">
                <Button variant="success" onClick={onSumbitClickHandler}>
                    <span className="fw-bold">Save</span>
                </Button>
                <CloseButton onClick={() => setShow(false)} />
            </div>
        </>
    )
}