import { FC, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";
import { useDispatch } from "react-redux";
import { useBoard } from "../../store/action-creators/board.action.creator";
import { useNavigate } from "react-router-dom";
import { ListColumnsReverse } from "react-bootstrap-icons";
import { useActivity } from "../../store/action-creators/activity.action.creator";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "./sidebar-menu.module.scss";
import { SubmitModal } from "../submit-modal/submit-modal.component";
import { IBoard } from "../../models/board.interface";
import getExistTime from "../../helpers/get-exist-time.function";

interface ISidebarMenu {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    placement: OffcanvasPlacement;
    board: IBoard;
}

export const SidebarMenu: FC<ISidebarMenu> = ({ show, setShow, placement, board }) => {
    const [showSubmitDeleteModal, setShowSubmitDeleteModal] = useState<boolean>(false);
    const { deleteBoard } = useBoard();
    const { getActivitiesByBoard } = useActivity();
    const { activities } = useTypedSelector(state => state.activityReducer);
    const { user } = useTypedSelector(state => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (board.id) {
            dispatch(getActivitiesByBoard(board.id));
        }
    }, [board.id, dispatch, getActivitiesByBoard]);

    useEffect(() => {
    }, [activities])

    const deleteBoardClick = () => {
        dispatch(deleteBoard(board.id));
        navigate('/');
    }

    const handleClose = () => setShow(false);

    return (
        <Offcanvas className={styles.sidebar_menu} show={show} placement={placement} scroll={true} backdrop={false} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <div className="w-100 d-flex justify-content-center">
                    <Offcanvas.Title>
                        Menu
                    </Offcanvas.Title>
                </div>
            </Offcanvas.Header>
            {user.id == board.userId && <><hr />
                <div className="d-flex align-items-center px-5 py-3">
                    <h5 onClick={() => setShowSubmitDeleteModal(true)} className={styles.sidebar_menu_button}>Remove Board</h5>
                </div></>}
            <hr />
            <div className="d-flex flex-column px-3">
                <div className="d-flex gap-3">
                    <ListColumnsReverse size={30}/>
                    <h5>Activity</h5>
                </div>
                <div style={{maxHeight:"40rem", overflow:"scroll"}}>
                {activities.length > 0 &&
                    activities.map((activity, index) => (
                        <div key={index} className="d-flex align-items-center mt-2">
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
                </div>
            </div>
            {showSubmitDeleteModal && <SubmitModal
                handleConfirm={deleteBoardClick}
                setShow={setShowSubmitDeleteModal}
                show={showSubmitDeleteModal}
                text="Do you really want to delete this board?" />}
        </Offcanvas>
    )
}