import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "./box";
import trash from "../../assets/icons/trash.svg";
import { goToBoxPage, loadAllBoxes, openDeleteBoxModal, openNewBoxModal } from "./boxActions";
import { useAuth } from "../../context/AuthContext";
import { loadCards } from "../cards/cardActions";
import Card from "../cards/card";
import { openErrorModal } from "../../error/errorActions";


interface BoxesProps  {
    starred?: boolean;
    category: string;
}

const Boxes = (props: BoxesProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {getCards, getBoxes, updateBox} = useAuth();

    // const starred = props.starred;
    const category = props.category;

    const [showBoxes, setShowBoxes] = useState(true);

    const boxes = useSelector((state: RootState) => state.boxReducer.boxes);
    const numBoxes = boxes.length
    let filteredBoxes = boxes;
    const boxLimit = useSelector((state: RootState) => state.userReducer.boxLimit);
    //TODO: Fix to include all potential categories in the future
    if (category !== "ALL") {
        filteredBoxes = boxes.filter(box => box.category === category)
    }
    
    

    const handleShowToggle = () => {
        setShowBoxes(!showBoxes);
    }

    const handleNewBox = () => {
        if (boxLimit >= numBoxes + 1) {
            dispatch(openNewBoxModal())
        } else {
            dispatch(openErrorModal("Box Limit Reached", `You have reached your box limit of ${boxLimit}.`))
        }
        
    }

    const handleBoxNavigate = (box: Box) => {
        getCards(box.id).then((cardList: Card[]) => {
            dispatch(loadCards(cardList))
        })
        dispatch(goToBoxPage(box))
        navigate("/box")
    }

    const handleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, box: Box) => {
        e.stopPropagation();
        updateBox(box, {starred: !box.starred}, getBoxes, undefined).then(() => {
            getBoxes().then((boxList: Box[]) =>{
                dispatch(loadAllBoxes(boxList))
            })
        })
    }

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>, box: Box) => {
        e.stopPropagation();
        
        dispatch(openDeleteBoxModal(box))
    }

    return (
        <div className="box-category">
            <div className="mb-d-flex mb-justify-between mb-align-items-center" >
                <div className="mb-d-flex mb-align-items-center boxes-title" onClick={handleShowToggle} >
                    <h2>{ category === "STARRED" ? "Favorite Boxes" : "All Boxes"}</h2>
                    <span className="dropdown-arrow"><i className={showBoxes ? "arrow down" : "arrow right"}></i></span>
                </div>
                {
                    category === "STARRED" && <div className="mb-d-flex mb-align-items-center">
                        <div className="mb-button-primary" onClick={handleNewBox}><p>Add New Box</p></div>
                        <div>{numBoxes}/{boxLimit}</div>
                    </div>
                }
                
            </div>
            <div className={`box-list mb-d-flex mb-flex-row mb-flex-wrap ${showBoxes ? "show" : "hide"}`}>
                {
                    filteredBoxes.map((box, index) => (
                        <div key={index} className="box mb-d-flex mb-flex-col mb-justify-between" onClick={event => handleBoxNavigate(box)}>
                            <div className="mb-d-flex mb-flex-row mb-justify-between">
                                <div className="box-name mb-d-flex mb-flex-row"><span>{box.name}</span></div>
                                <div className="mb-star-icon box-star" onClick={event => handleFavorite(event, box)}>
                                    {box.starred ? <p>&#9733;</p> : <p>&#9734;</p>}
                                </div>
                            </div>
                            
                            <div className="mb-d-flex mb-justify-between">
                                <div className="box-footer mb-d-flex">{box.fill}/{box.capacity}</div>
                                <div className="box-trash" onClick={event => handleDelete(event, box)}><img className="trash-icon large" alt="trash icon" src={trash} /></div>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Boxes;


