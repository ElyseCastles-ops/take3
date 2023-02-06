import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { boxTypes } from "./box";
import { closeEditBoxModal } from "./boxActions";

interface BoxProps {
    
}


const EditBoxModal = (props: BoxProps) => {

    const dispatch = useDispatch();

    

    const editBoxModalOpen = useSelector((state: RootState) => state.boxReducer.editBoxModalOpen);
    const cards = useSelector((state: RootState) => state.cardReducer.cards);

    const box = useSelector((state: RootState) => state.boxReducer.box);
    const [boxName, setBoxName] = useState(box ? box.name : "");
    const [boxType, setBoxType] = useState(box ? box.type : "");
    const commanderCard = cards.find(element => element.commander === true);
    //console.log(commanderCard, "COMMANDER CARD", cards, commanderCard)
    const [commander, setCommander] = useState("");
    const [commanderFoil, setCommanderFoil] = useState(false)
    
    

    const [colorRed, setColorRed] = useState(box?.colors[0]);
    const [colorBlue, setColorBlue] = useState(box?.colors[1]);
    const [colorBlack, setColorBlack] = useState(box?.colors[2]);
    const [colorWhite, setColorWhite] = useState(box?.colors[3]);
    const [colorGreen, setColorGreen] = useState(box?.colors[4]);

    const handleBoxTypeChange = (event: any) => {
        setBoxType(event.target.value)
    }

    const handleClose = () => {
        dispatch(closeEditBoxModal())
    }

    const handleSave = () => {
        //TODO: add update box and commander card
        let inBox = cards.find(element => element.name === commander);
        if (inBox == undefined){
            if (commanderCard?.name !== commander || (commanderCard?.foil === 1 && commanderFoil === false) || (commanderCard?.foil === 0 && commanderFoil === true)) {
                if (commanderCard && box) {
                    //updateSingleCard(commanderCard, box, {name: commander, foil: commanderFoil === true ? 1 : 0, quantity: commanderFoil === false ? 1 : 0});
                    //getCards(box.id, dispatch)
                }
            }
        } else {
            //TODO: real error catching and user notification
            console.log("Commander already in deck try again")
        }
        
        
        handleClose()
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCommander(commanderCard?.name || "");
            setCommanderFoil(commanderCard?.foil === 1 ? true : false)
          }, 1000);
          return () => clearTimeout(timeout);
    }, [editBoxModalOpen])

    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${editBoxModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between ">
                    <div className="mb-d-flex mb-flex-row">
                        <div className="mb-d-flex mb-align-items-center">Edit Box</div>
                    </div>
                    
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
                                    <input value={commander} onChange={event => setCommander(event.target.value) }/>
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
                <div className="mb-d-flex mb-justify-between mb-align-items-center mb-modal-footer">

                    <div className="footer-context"></div>
                    <div className="mb-d-flex">
                        <div className="mb-button-secondary" onClick={handleClose}><p>Cancel</p></div>
                        <div className="mb-button-primary" onClick={handleSave}><p>Save</p></div>

                    </div>
                </div>
                
            </div>
            
                
        </div>
    )
}

export default EditBoxModal;