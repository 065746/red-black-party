import Ticket from "./Ticket"

function Tickets() {
    return (
        <div id="tickets" className="bg-black flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold mb-5 text-white  relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">Tickets</h2>
            <p className="text-gray-300 max-w-2xl text-center text-2xl font-medium ">
                Book Your Ticket
            </p>
            <div className="flex px-7 xl:space-x-10 py-6 flex-wrap justify-center">
                <Ticket price={400} type={'One Person'}  />
                <Ticket price={600} type={'Couple'}  />
                <Ticket price={1400} type={'4 Girls'} />
                <Ticket price={1500} type={'4 Boys'} />
            </div>
        </div>
    )
}

export default Tickets
