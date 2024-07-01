import CreateTicket from "../CreateTicket/CreateTicket"
import Sidebar from "../Sidebar/Sidebar"
import "./AskForHelp.css"

function AskForHelp(){

    return(
        <div className="askforhelp-component-container">
            <Sidebar></Sidebar>
            <CreateTicket></CreateTicket>
        </div>
    )

}

export default AskForHelp