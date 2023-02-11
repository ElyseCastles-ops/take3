import { useDispatch, useSelector } from "react-redux";
import { RootState } from "..";
import { closeErrorModal } from "./errorActions";


const ErrorModal = () => {

    const dispatch = useDispatch();

    const {errorModalOpen, errorTitle, errorMsg} = useSelector((state: RootState) => state.errorReducer);

    const handleClose = () => {
        dispatch(closeErrorModal());
    }


    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${errorModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between">
                    {errorTitle}
                    <div className="mb-button-secondary" onClick={handleClose}>x</div>
                </div>
                <div className="mb-modal-body no-scroll error-modal mb-d-flex mb-align-items-center">
                    <div className="align-modal-content">
                        <p>{errorMsg}</p>
                    </div>
                    
                </div>
                <div className="mb-modal-footer mb-d-flex mb-justify-end mb-align-items-center">
                    <div className="mb-d-flex">
                        <div className="mb-button-primary" onClick={handleClose}><p>Close</p></div>

                    </div>
                </div>
            </div>
            
                
        </div>
    )
}

export default ErrorModal;