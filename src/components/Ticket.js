import { useNavigate } from "react-router-dom"

function Ticket({price, info, type}) {
    const navigate = useNavigate()
    const orderTicket = () => {
        navigate({
            pathname:'/order',
            search: `?ticketType=${type}&ticketPrice=${price}`
        })
    }
    return (
        <div className="text-white flex flex-col items-center transform px-4 pt-4 hover:scale-105 transition-all duration-300 shadow-md bg-gray-800 max-w-[250px] ml-3 mb-3 xl:m-0 border-4 border-gray-900">
            <div className="bg-purple-900 text-center py-16  space-y-8 w-full border border-gray-900">
                <h2 className="text-3xl">{price} DHS</h2>
                <p>{type}</p>
            </div>
            <p className="text-center p-3">
                {info}
            </p>
            <button onClick={orderTicket} className="bg-purple-900 px-8 py-2 text-white my-4 border-2 border-gray-900 hover:bg-purple-700">Order Now</button>
        </div>
    )
}

export default Ticket
