import { FC, useRef, useState } from "react";
import { Button, CloseButton, Form, InputGroup, Overlay, Stack } from "react-bootstrap";
import { IFullList } from "../../models/list.interface";
import { ListCard } from "../list-card/list-card.component";
import { AddCard } from "../add-card/add-card.component";
import { ICard } from "../../models/card.interface";
import { useList } from "../../store/action-creators/list.action.creator";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-bootstrap-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { SubmitModal } from "../submit-modal/submit-modal.component";
import styles from "./list-block.module.scss";

interface IListBlock {
    list: IFullList
    cardClick: (card: ICard) => void;
}

export const ListBlock: FC<IListBlock> = ({ list, cardClick }) => {
    const [showDeleteTip, setShowDeleteTip] = useState<boolean>(false);
    const [showListChangeName, setShowListChangeName] = useState<boolean>(false);
    const [showAddCardForm, setShowAddCardForm] = useState<boolean>(false);
    const [showSubmitDeleteListForm, setShowSubmitDeleteListForm] = useState<boolean>(false);
    const target = useRef(null);
    const [name, setName] = useState<string>(list.name || "");
    const { updateList, deleteList } = useList();
    const dispatch: any = useDispatch();

    const handleShowChangeName = () => {
        setShowListChangeName(true);
    }

    const handelSaveListName = () => {
        if (name.length === 0) {
            return;
        }
        dispatch(updateList(list.id, { name: name }));
        setShowListChangeName(false);
    }

    const deleteListSubmitHandler = async () => {
        if (name.length === 0) {
            return;
        }
        setShowSubmitDeleteListForm(false);
        await dispatch(deleteList(list.id));
    }

    return (
        <div className={styles.list_block}>
            <Stack className="p-2 rounded" style={{ background: "#e0e5e6" }}>
                {showListChangeName ? (
                    <InputGroup className="mb-3 d-flex align-items-center">
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder=""
                        />
                        <Button variant="success" onClick={handelSaveListName}>
                            <span className="fw-bold">Save</span>
                        </Button>
                        <CloseButton className="ms-1" onClick={() => setShowListChangeName(false)} />
                    </InputGroup>
                ) : <div className="d-flex align-items-center justify-content-between mb-1">
                    <h4 onDoubleClick={handleShowChangeName}>{list.name}</h4>
                    <Button  ref={target} style={{ background: "none", border: "none", color: "black", alignSelf: "flex-start"  }} onClick={() => setShowDeleteTip(!showDeleteTip)}><ThreeDots /></Button>
                    <Overlay target={target.current} show={showDeleteTip} placement="bottom">
                        <div onClick={() => setShowSubmitDeleteListForm(!showSubmitDeleteListForm)} style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        cursor: 'pointer'
                        }}>
                            Delete
                        </div>
                    </Overlay>
                </div>}
                <Droppable droppableId={list.id}>
                    {(provided) => (<ul className={list.id} style={{ listStyle: "none", margin: 0, padding: 0 }}{...provided.droppableProps} ref={provided.innerRef}>
                        {list.cards.length > 0 && list.cards.map((card, index) =>
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided) =>
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <ListCard card={card} cardClick={cardClick} />
                                    </li>}
                            </Draggable>)}
                        {provided.placeholder}
                    </ul>)}
                </Droppable>
                {showAddCardForm ? (
                    <AddCard listId={list.id} setShow={setShowAddCardForm} />
                ) : (
                    <span className={styles.list_block_add_button} onClick={() => setShowAddCardForm(true)}>Add a card...</span>
                )}
                {showSubmitDeleteListForm &&
                    <SubmitModal
                        show={showSubmitDeleteListForm}
                        setShow={setShowSubmitDeleteListForm}
                        text="You want to delete this list?"
                        handleConfirm={deleteListSubmitHandler} />
                }
            </Stack>
        </div>
    )
}