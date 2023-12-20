import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

interface ISubmitModal {
    text: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirm: () => void;
}

export const SubmitModal: FC<ISubmitModal> = ({ text, show, setShow, handleConfirm }) => {
    const confirmClickHandler = () => {
        handleConfirm();
        setShow(false);
    }

    return (
        <Modal show={show} onHide={() => { setShow(false) }}>
            <Modal.Header closeButton>
                <Modal.Title><h3>{text}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="success" onClick={confirmClickHandler}>Submit</Button>
                <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}