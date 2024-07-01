import "./Homepage.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SingleHelp from "../SingleHelp/SingleHelp.jsx";
import UserProvider from "../../Context/UserContext.jsx";

function Homepage() {
    return (
        <div className="homepage-component-container">
            <UserProvider>
                <div className="homepage-layout">
                    <Sidebar />
                    <SingleHelp />
                </div>
            </UserProvider>
        </div>
    );
}

export default Homepage;