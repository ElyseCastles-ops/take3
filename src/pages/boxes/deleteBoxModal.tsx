import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { useAuth } from "../../context/AuthContext";
import Box from "./box";
import { closeDeleteBoxModal, loadAllBoxes } from "./boxActions";



const DeleteBoxModal = () => {

    const dispatch = useDispatch();

    const {deleteBox, getBoxes} = useAuth();

    const deleteBoxModalOpen = useSelector((state: RootState) => state.boxReducer.deleteBoxModalOpen);
    const boxToDelete = useSelector((state: RootState) => state.boxReducer.box);

    const handleClose = () => {
        dispatch(closeDeleteBoxModal())
    }

    const handleDelete = () => {
        if (boxToDelete) {
            deleteBox(boxToDelete).then(() => {
                getBoxes().then((boxList: Box[])=> {
                    dispatch(loadAllBoxes(boxList))
                })
            })
        }
        //TODO: handle error if no box
        handleClose()
    }


    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${deleteBoxModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between ">
                    <div className="mb-d-flex mb-flex-row">
                        <div className="mb-d-flex mb-align-items-center">Confirmation</div>
                    </div>
                    
                    <div className="mb-button-secondary" onClick={handleClose}>x</div>
                </div>
                
                <div className="mb-mx-60 mb-mb-20 mb-input-long mb-d-flex mb-flex-col">
                    <div className="mb-d-flex mb-align-items-left"><p>Are you sure you want to delete the following box?</p></div>
                    <div className="mb-d-flex mb-align-items-left"><p>{boxToDelete ? boxToDelete.name : ""}</p></div>
                    <div className="mb-d-flex mb-align-items-left"><p>Deleting this box will also delete its contents.</p></div>
                </div>
                
                
                <div className="mb-d-flex mb-justify-between mb-align-items-center mb-modal-footer">

                    <div className="footer-context"></div>
                    <div className="mb-d-flex">
                        <div className="mb-button-secondary" onClick={handleClose}><p>Cancel</p></div>
                        <div className="mb-button-primary" onClick={handleDelete}><p>Delete</p></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteBoxModal;

