import { Link } from "react-scroll"
import Clock from "./Clock"


function Banner() {
    return (
        <div id="home" className="relative bg-gray-200 bg-opacity-70">
            <img className="filter brightness-50 object-cover w-full min-h-[600px]" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <div className="absolute top-[20%] flex flex-col justify-center items-center w-full text-white sm:top-[30%]  lg:top-[25%]" >
                <div className="border-2 text-center ">
                    <h1 className=' p-6 text-center caret-white text-2xl uppercase md:text-4xl lg:text-6xl'>Red&Black party</h1>
                    
                </div>
            </div>
            {/* <Clock /> */}
            <div id="event" className="bg-black text-white text-center px-32 py-20 space-y-9 flex flex-col items-center">
                <h2 className="text-4xl font-bold relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">Don't Miss This Event</h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg"> 
                    MAKE SURE TO TRY THIS EXPERIENCE WITH US, WE ARE MAKING ALL THE FUN FOR YOU, A HOUSE PARTY WITH ALL THE NEEDS.
                </p>
                <button className="font-semibold border text-xl hover:bg-purple-900 transition-all duration-200 px-6 py-3 uppercase tracking-wider" >
                    <Link to='about' smooth={true} duration={1000}>Events</Link>
                </button>
            </div>
        </div>
    )
}

export default Banner
