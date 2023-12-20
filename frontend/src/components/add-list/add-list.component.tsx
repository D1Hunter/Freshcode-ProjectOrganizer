import { FC, useState } from "react"
import { Button, Card, CloseButton, Form, InputGroup } from "react-bootstrap"
import { useList } from "../../store/action-creators/list.action.creator"
import { useDispatch } from "react-redux"

interface IAddListCard {
    boardId: string
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddListCard: FC<IAddListCard> = ({ boardId, setShow }) => {
    const [name, setName] = useState<string>("");
    const { createList } = useList();
    const dispatch: any = useDispatch();

    const onSumbitClickHandler = async () => {
        if (name.length == 0) {
            return;
        }
        dispatch(createList({ boardId, name }));
        setShow(false);
    }

    return (
        <Card style={{ background: "#e0e5e6" }}>
            <Card.Body>
                <InputGroup style={{ background: "#d7d8daЪ"}}>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Add a list..."
                    />
                </InputGroup>
                <div className="d-flex align-items-center mt-2 gap-2">
                    <Button variant="success" onClick={onSumbitClickHandler}><b>Save</b></Button>
                    <CloseButton onClick={()=>setShow(false)}/>
                </div>
            </Card.Body>
        </Card>
    )
}
