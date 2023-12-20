import { FC } from "react";
import { Card } from "react-bootstrap";
import { IBoard } from "../../models/board.interface";
import { CircleFill } from "react-bootstrap-icons";
import styles from "./board-card.module.scss";

interface IBoardCard {
    board: IBoard;
    boardClick: (board: IBoard) => void;
    userId: string;
}
export const BoardCard: FC<IBoardCard> = ({ board, boardClick, userId }) => {
    return (
        <Card className={styles.board_card} onClick={() => boardClick(board)}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{ wordBreak: "break-word"}}>
                        <h4>
                            {board.name}
                        </h4>
                    </div>
                    <div className="d-flex align-items-start" style={{ alignSelf: "stretch", marginTop:"0.4rem"}}>
                        {board.userId === userId && <CircleFill color="white" />}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}