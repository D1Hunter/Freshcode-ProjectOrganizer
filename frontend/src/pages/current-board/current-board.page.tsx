import { FC, useEffect, useState } from "react";
import styles from "./current-board.module.scss";
import { Navibar } from "../../components/navbar/navbar.component";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useBoard } from "../../store/action-creators/board.action.creator";
import { Card, Col, Container, Row } from "react-bootstrap";
import { AddListCard } from "../../components/add-list/add-list.component";
import { ListBlock } from "../../components/list-block/list-block.component";
import { ICard } from "../../models/card.interface";
import { CardInfoModal } from "../../components/card-info-modal/card-info-modal.component";
import { SidebarMenu } from "../../components/sidebar-menu/sidebar-menu.component";
import { getChunckedData } from "../../helpers/get-chucked.fuction";
import { ThreeDots } from "react-bootstrap-icons";
import { DragDropContext } from "react-beautiful-dnd";
import { useCard } from "../../store/action-creators/card.action.creator";

export const CurrentBoard: FC = () => {
    const [showAddNewListCard, showDisplaAddNewListCard] = useState<boolean>(false);
    const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [show, setShow] = useState(true);
    const { boardId } = useParams();
    const { isReady, getBoardById } = useBoard();
    const { moveCardToList } = useCard();
    const { currentBoard } = useTypedSelector(state => state.boardReducer);
    const { lists } = useTypedSelector(state => state.listReducer);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if (boardId) {
            dispatch(getBoardById(boardId));
        }
    }, [boardId, dispatch, getBoardById]);

    useEffect(() => {
    }, [currentBoard, lists]);


    const cardClick = (card: ICard) => {
        setSelectedCard(card);
        setShow(true);
    }

    if (!isReady) {
        return <div></div>
    }

    const handleOnDragEnd = async (result: any) => {
        dispatch(moveCardToList(result.draggableId, result.source.index, result.source.droppableId, result.destination.droppableId));
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={styles.current_board}>
                <Navibar />
                <div className={styles.current_board_body}>
                    <Container fluid="xl">
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
                            <h3>{currentBoard?.name}</h3>
                            <span className={styles.current_board_sidebar_button} onClick={() => {
                                setShowSidebarMenu(!showSidebarMenu)
                            }}><ThreeDots /> Show Menu</span>
                        </div>
                            {lists.length > 0 && getChunckedData(lists).map((chunk, index) => (
                                <Row key={index}>
                                    {chunk.map((list, index) => (
                                        <Col key={index}  sm={12} md={4} xl={4}>
                                            <ListBlock list={list} cardClick={cardClick} />
                                        </Col>
                                    )
                                    )}
                                    {chunk.length < 3 ?
                                        <Col  sm={12} md={4} xl={4}>
                                            {showAddNewListCard ? <AddListCard boardId={currentBoard?.id || ''} setShow={showDisplaAddNewListCard} /> :
                                                <Card className={styles.current_board_add_list} onClick={() => showDisplaAddNewListCard(true)}>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <span>Add a list...</span>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            }
                                        </Col>
                                        : <></>
                                    }
                                </Row>
                            ))}
                            {lists.length % 3 === 0 ?
                                <Col  sm={12} md={4} xl={4}>
                                    {showAddNewListCard ? <AddListCard boardId={currentBoard?.id || ''} setShow={showDisplaAddNewListCard} /> :
                                        <Card className={styles.current_board_add_list} onClick={() => showDisplaAddNewListCard(true)}>
                                            <Card.Body>
                                                <Card.Text>
                                                    <span>Add a list...</span>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    }
                                </Col> : <></>
                            }
                    </Container>
                    {showSidebarMenu && currentBoard && <SidebarMenu board={currentBoard} show={showSidebarMenu} setShow={setShowSidebarMenu} placement="end" />}
                    {show && selectedCard &&
                        <CardInfoModal card={selectedCard} show={show} setShow={setShow} />}
                </div >
            </div >
        </DragDropContext>)
}