import { FC } from "react";
import { Card } from "react-bootstrap";
import { ICard } from "../../models/card.interface";

interface IListCard {
    card: ICard;
    cardClick:(card:ICard)=>void;
}

export const ListCard: FC<IListCard> = ({ card, cardClick }) => {
    const onClickHandler = () => {
        cardClick(card);
    }

    return (
        <Card className="mb-2" bg="white" onClick={onClickHandler}>
            <Card.Body>
                <h4>{card.name}</h4>
            </Card.Body>
        </Card>
    )
}