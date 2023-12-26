import { Accordion, Button, CloseButton, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { ICard } from "../../models/card.interface"
import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useCard } from "../../store/action-creators/card.action.creator"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { CardText, ChatLeft, List, ListColumnsReverse, Trash } from "react-bootstrap-icons"
import { EditCardDescription } from "../edit-card-description/edit-card-description.component"
import styles from "./card-info-modal.module.scss";
import { useActivity } from "../../store/action-creators/activity.action.creator"
import getExistTime from "../../helpers/get-exist-time.function"
import { useComment } from "../../store/action-creators/comment.action.creator"

interface ICardInfoModal {
    card: ICard;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardInfoModal: FC<ICardInfoModal> = ({ card, show, setShow }) => {
    const [showEditCardDescription, setShowEditCardDescription] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("")
    const { getActivitiesByCard } = useActivity();
    const { getCommentsByCardId, addCommentToCard } = useComment();
    const { isReady, getCardById, removeCardFromList } = useCard();
    const { user } = useTypedSelector(state => state.authReducer);
    const { currentCard } = useTypedSelector(state => state.cardReducer);
    const { activities } = useTypedSelector(state => state.activityReducer);
    const { comments } = useTypedSelector(state => state.commentReducer);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getCardById(card.id));
        dispatch(getCommentsByCardId(card.id));
        dispatch(getActivitiesByCard(card.id));
    }, [dispatch, getCardById, getActivitiesByCard, getCommentsByCardId]);

    useEffect(() => {
    }, [activities, currentCard, comments])

    const addCommentClickHandler = () => {
        if (comment.length === 0) {
            return;
        }
        dispatch(addCommentToCard({ cardId: card.id, text: comment }));
        dispatch(getActivitiesByCard(card.id));
    }

    const confirmDeleteCardHandler = async () => {
        dispatch(removeCardFromList(card.id, card.listId));
        setShow(false);
    }

    if (!isReady) {
        return <div></div>
    }

    return (
        <div>
            <Modal size="lg" fullscreen="sm-down" show={show} onHide={() => { setShow(false) }}>
                <Container className={styles.card_info_modal}>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <div className="d-flex">
                            <CardText className="mt-1 me-2" size={30} />
                            <div className="d-flex flex-column">
                                <h3>{currentCard?.name}</h3>
                                <h6 className="text-muted">in list {currentCard?.list.name}</h6>
                                <h5>{currentCard?.description}</h5>
                            </div>
                        </div>
                        <CloseButton className="mb-4" onClick={() => setShow(false)} />
                    </div>
                    <Row>
                        <Col xl={9} sm={8}>
                            {showEditCardDescription && currentCard ? <EditCardDescription card={currentCard} setShow={setShowEditCardDescription} /> :
                                <div className={styles.card_info_modal_edit_title} onClick={() => setShowEditCardDescription(true)}>
                                    <List size={20} className="mb-1" /><h5>Edit the description...</h5>
                                </div>}
                            <div className="mt-4">
                                <h4><ChatLeft className="me-2" />Add Comment</h4>
                                {comments && comments.length > 0 &&
                                    comments.map((comment, index) => (
                                        <div key={index} className="d-flex align-items-center mt-2">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-1 mt-1"
                                                style={{ background: "#e0e5e6", width: "40px", height: "40px", alignSelf: "flex-start" }}>
                                                <span>{comment.user?.email[0].toUpperCase()}</span>
                                            </div>
                                            <div >
                                                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                                    <span className="me-1">{comment.user?.email}</span>
                                                    <span className="text-muted" style={{ margin: 0 }}>{getExistTime(comment.createdAt)}</span>
                                                </div>
                                                <p>{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-1 mt-2"
                                        style={{ background: "#e0e5e6", width: "40px", height: "40px", alignSelf: "flex-start" }}>
                                        <span>{user.email[0].toUpperCase()}</span>
                                    </div>
                                    <div className="flex-grow-1">
                                        <InputGroup className="w-100 mt-2 mb-2">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                type="text"
                                                placeholder="Write a comment..."
                                            />
                                        </InputGroup>
                                        <Button className="mb-4" variant="success" onClick={addCommentClickHandler}>
                                            <span>Save</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Accordion className="mb-2" style={{maxHeight:"300px", overflow:"scroll"}}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><ListColumnsReverse />Activity</Accordion.Header>
                                    <Accordion.Body>
                                        {activities.length > 0 &&
                                            activities.map((activity, index) => (
                                                <div key={index}className="d-flex align-items-center mt-2">
                                                    <div className="h-50 rounded-circle d-flex align-items-center px-3 py-2 me-1 mt-1" style={{ background: "#e0e5e6", alignSelf: "flex-start" }}>
                                                        <span>{activity.user?.email[0].toUpperCase()}</span>
                                                    </div>
                                                    <div>
                                                        {activity.description}
                                                        <p>{getExistTime(activity.createdAt)}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xl={3} sm={4}>
                            <h5>Actions</h5>
                            <Button className={styles.card_info_modal_button} onClick={confirmDeleteCardHandler}>
                                <Trash className="mb-1 me-2" /><h5>Remove</h5>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </div>
    )
}