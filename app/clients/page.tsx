import Sidebar from "@/app/components/sidebar";
import Actionbar, {VictimsBar} from "@/app/dashboard/actionbar";

const Clients = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-8">
                <h1 className="text-3xl font-bold mb-4">Clients</h1>
                <div className="flex-grow overflow-y-auto">
                    <VictimsBar/>
                </div>
            </div>
        </div>
    )
}
export default Clients;