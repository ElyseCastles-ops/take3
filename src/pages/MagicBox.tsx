import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import Box from "./boxes/box";
import { loadAllBoxes } from "./boxes/boxActions";
import Boxes from "./boxes/boxCategory";
import DeleteBoxModal from "./boxes/deleteBoxModal";
import NewBoxModal from "./boxes/newBoxModal";
//import { useDispatch } from "react-redux";


const MagicBox = () => {

  const {getBoxes, user} = useAuth();
  const dispatch = useDispatch();

  //const user = useSelector((state: RootState) => state.userManagement.user);

  useEffect(() => {
    if(user) {
        getBoxes(dispatch)
        .then((boxList: Box[]) => {
          dispatch(loadAllBoxes(boxList))
        })
    }
  }, [])

    return (
        <div className="page-content">
          {/* {!user &&
            <div>no user</div>
          } */}
          {/* {user &&  */}
            <div className="mb-home-logged-in">
              <Boxes starred category="STARRED" />
              <Boxes category="ALL" />
              {/* TODO: Refactor the boxes component */}
            </div>
          <NewBoxModal />
          <DeleteBoxModal />
        </div>
    )
}

export default MagicBox;