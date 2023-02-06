import { useSelector } from "react-redux";
import { RootState } from "..";


const SearchPage = () => {

    const boxes = useSelector((state: RootState) => state.boxReducer.boxes);
    
    return (
        <div className="page-content">
            Test search page



            <div className={`box-list mb-d-flex mb-flex-row mb-flex-wrap`}>
                {
                    boxes.map((box, index) => (
                        <div key={index} className="box mb-d-flex mb-flex-col mb-justify-between">
                            <div className="mb-d-flex mb-flex-row mb-justify-between">
                                <div className="box-name mb-d-flex mb-flex-row"><span>{box.name}</span></div>
                                <div className="mb-star-icon box-star">
                                    {box.starred ? <p>&#9733;</p> : <p>&#9734;</p>}
                                </div>
                            </div>
                            
                            <div className="mb-d-flex mb-justify-between">
                                <div className="box-footer mb-d-flex">{box.fill}/{box.capacity}</div>
                                {/* <div className="box-trash" onClick={event => handleDelete(event, box)}><img className="trash-icon large" alt="trash icon" src={trash} /></div> */}
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
        
    )
}

export default SearchPage;