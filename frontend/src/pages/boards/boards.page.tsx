import { FC, useEffect } from "react";
import styles from "./boards.module.scss";
import { Navibar } from "../../components/navbar/navbar.component";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useBoard } from "../../store/action-creators/board.action.creator";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { BoardCard } from "../../components/board-card/board-card.component";
import { AddBoard } from "../../components/add-board/add-board.component";
import { getChunckedData } from "../../helpers/get-chucked.fuction";

export const Boards: FC = () => {
    const { boards } = useTypedSelector(state => state.boardReducer);
    const { user } = useTypedSelector(state => state.authReducer);
    const { getBoards, isReady } = useBoard();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch, getBoards])

    useEffect(() => {
    }, [boards]);

    if (!isReady) {
        return <div></div>;
    }

    return (
        <div className={styles.boards}>
            <Navibar />
            <div className={styles.boards_body}>
                <Container>
                    <div className="d-flex mt-4 mb-2">
                        <Person className="" size={40} />
                        <h3 className="mt-1">Personal Boards</h3>
                    </div>
                    {boards.length > 0 && getChunckedData(boards).map((chunk, index) => (
                        <Row key={index} className={styles.boards_row}>
                            {chunk.map((board) => (
                                <Col key={Math.random()} sm={12} md={4} xl={4}>
                                    <BoardCard board={board} boardClick={(board) => navigate(`/board/${board.id}`)} userId={user.id} />
                                </Col>
                            )
                            )}
                            {chunk.length < 3 ?
                                <Col sm={12} md={4} xl={4}>
                                    <AddBoard/>
                                </Col>
                                : <></>
                            }
                        </Row>
                    ))}
                    {boards.length % 3 === 0 ?
                        <Row className={styles.boards_row}>
                            <Col sm={12} md={4} xl={4}>
                                <AddBoard/>
                            </Col>
                        </Row> : <></>
                    }
                </Container>
            </div>
        </div>
    )
}