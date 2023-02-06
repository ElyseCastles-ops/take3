import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { useAuth } from "../../context/AuthContext";

import Card from "../cards/card";

import Box, { boxTypes } from "./box";
import { closeNewBoxModal, loadAllBoxes } from "./boxActions";

// interface BoxProps {
//     starred?: boolean;
//     box: any;
// }


const NewBoxModal = () => {

    const dispatch = useDispatch();

    const { createNewBox, getBoxes, createNewCommanderBox } = useAuth()

    const newBoxModalOpen = useSelector((state: RootState) => state.boxReducer.newBoxModalOpen);

    const [boxType, setBoxType] = useState("");
    const [boxCapacity, setBoxCapacity] = useState(boxTypes[0].capacity);
    const [boxName, setBoxName] = useState("");

    const [commander, setCommander] = useState("");
    const [commanderFoil, setCommanderFoil] = useState(false);
    
    const [colorRed, setColorRed] = useState(false);
    const [colorBlue, setColorBlue] = useState(false);
    const [colorBlack, setColorBlack] = useState(false);
    const [colorWhite, setColorWhite] = useState(false);
    const [colorGreen, setColorGreen] = useState(false);

    // const [errorMsg, setErrorMsg] = useState("");

    // const CAPACITY_ERROR = "Error: Unable to add card(s). Quantity exceeded the boxes/decks max capacity.";
    // const COLOR_ERROR = "Error: Card colors do not match box colors";
    // const QUANTITY_ERROR = "Error: To add a card to a box it must have a non-zero quantity or foil quantity.";
    // const CARD_ERROR = "Error: MTG card not found.";

    const handleClose = () => {
        dispatch(closeNewBoxModal());
        clearBoxValues()
    }

    const handleCreateNewBox = () => {
        //TODO: Update category and custom id fields
        if (boxType !== "commander" ) {
            const colors = [colorRed, colorBlue, colorBlack, colorWhite, colorGreen];
            const box = new Box(boxName, false, boxType, colors, 0, boxCapacity, undefined, undefined);
            createNewBox(box).then((timestamp: Timestamp) => {
                getBoxes().then((boxList: Box[])=> {
                    dispatch(loadAllBoxes(boxList))
                })
            });
            handleClose();
        } else {
            if (boxType === "commander" && commander !== "") {
                const colors = [colorRed, colorBlue, colorBlack, colorWhite, colorGreen];
                const box = new Box(boxName, false, boxType, colors, 1, boxCapacity, undefined, undefined);
                const quantity = !commanderFoil ? 1 : 0;
                const foil = commanderFoil ? 1 : 0;
                const cmd = new Card(commander, quantity, foil, true);

                createNewCommanderBox(box, cmd).then((timestamp: Timestamp) => {
                    getBoxes().then((boxList: Box[]) => {
                        dispatch(loadAllBoxes(boxList))
                    })
                })
                setTimeout(() => {
                    handleClose();
                  }, 1000);
            } else {
                console.log("Commander required to make box")
                //TODO: way to display error message for user
            }
            
        }
        
    }

    const handleBoxTypeChange = (event: any) => {
        setBoxType(event.target.value)
        let cap = boxTypes.find(element => element.key === event.target.value);
        setBoxCapacity(cap?.capacity || 255)
    }


    const clearBoxValues = () => {
        setBoxName("")
        setBoxType("storage")
        setBoxCapacity(boxTypes[0].capacity)
        setColorRed(false)
        setColorBlue(false)
        setColorBlack(false)
        setColorWhite(false)
        setColorGreen(false)
        setCommander("")
        setCommanderFoil(false)
    }


    useEffect(() => {
        console.log("Box type changed", boxType)
    }, [boxType])

    // TODO: Upload csv of cards to add

    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${newBoxModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between">
                    New Box
                    <div className="mb-button-secondary" onClick={handleClose}>x</div>
                </div>
                <div className="mb-modal-body">
                    <div className="mb-mx-60 mb-mb-20 mb-input-long mb-d-flex mb-flex-col">
                        <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Box Name</p></div>   
                        <input value={boxName} onChange={event => setBoxName(event.target.value)} />
                    </div>
                    <div className="mb-mx-60 mb-mb-20 mb-d-flex">
                        <div className="mb-d-flex mb-flex-col mb-input-short mb-short-l mb-mb-0">
                            <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Box Type</p></div>
                            <select className="mb-modal-box-type-select" value={boxType} onChange={handleBoxTypeChange}>
                                {boxTypes.map((boxType, index) => (
                                    <option key={boxType.name} value={boxType.key}>{boxType.name}</option>
                                ))}
                            </select>
                        </div>
                        {
                            boxType === "commander" &&
                                <div className="mb-d-flex mb-flex-col mb-input-short mb-short-r mb-mb-0">
                                    <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Commander</p></div>
                                    <input value={commander} onChange={event => setCommander(event.target.value)}/>
                                </div> 
                                
                        }
                                
                    </div>
                    {boxType === "commander" && 
                        <div className="mb-mx-60 mb-mb-20 mb-d-flex mb-flex-col">
                            <div className="mb-d-flex mb-flex-row mb-input-long mb-mb-0">
                                <div className="mb-d-flex mb-align-items-left mb-input-label check-button-text">Is {commander !== "" ? commander : "your commander"} a foil card?</div>
                                <input type="checkbox" className="check-button" checked={commanderFoil} onChange={() => setCommanderFoil(!commanderFoil)}/>
                            </div>
                        </div>
                    }
                    <div className="mb-mx-60 mb-mb-20 mb-d-flex mb-flex-col">
                        <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Box Colors</p></div>
                        <div className="mb-d-flex mb-flex-row mb-flex-wrap mb-justify-start mb-gap-10">
                            <div className={`mb-button red ${colorRed ? "selected" : ""}`} onClick={() => setColorRed(!colorRed)}><p>Red</p></div>
                            <div className={`mb-button blue ${colorBlue ? "selected" : ""}`} onClick={() => setColorBlue(!colorBlue)}><p>Blue</p></div>
                            <div className={`mb-button black ${colorBlack ? "selected" : ""}`} onClick={() => setColorBlack(!colorBlack)}><p>Black</p></div>
                            <div className={`mb-button white ${colorWhite ? "selected" : ""}`} onClick={() => setColorWhite(!colorWhite)}><p>White</p></div>
                            <div className={`mb-button green ${colorGreen ? "selected" : ""}`} onClick={() => setColorGreen(!colorGreen)}><p>Green</p></div>
                        </div>
                    </div>
                    
                </div>
                <div className="mb-modal-footer mb-d-flex mb-justify-end mb-align-items-center">
                    <div className="mb-d-flex">
                        <div className="mb-button-secondary" onClick={handleClose}><p>Cancel</p></div>
                        <div className="mb-button-primary" onClick={handleCreateNewBox}><p>Create</p></div>

                    </div>
                </div>
            </div>
            
                
        </div>
    )
}

export default NewBoxModal;