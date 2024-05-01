import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Sidebar = () => {
  const getSidebarStatus = useSelector(
    (state: RootState) => state.sidebar.isSideBarOn
  );

  console.log(getSidebarStatus);
  return <div>Sidebar</div>;
};

export default Sidebar;
