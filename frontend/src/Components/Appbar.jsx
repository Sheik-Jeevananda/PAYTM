import { useNavigate } from "react-router-dom";

function Appbar(){
  const navigate =  useNavigate();
  return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
                 
            </div>
             <button
                onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/")
                }}
              className="px-4 py-1.5
             w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-12 w-12 me-2 mb-2
    
            transition-colors">
                   LogOut
                </button>
        </div>
    </div>
}

export default Appbar;

