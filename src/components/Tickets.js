import { useState } from "react"
import Formulaire from "./Formulaire"
import Ticket from "./Ticket"

function Tickets() {
    const [hideForm, setHideForm] = useState(false)
    return (
        <div className="bg-black flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold mb-5 text-white  relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">Tickets</h2>
            <p className="text-gray-200 max-w-2xl text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa
                semper aliquam quis mattis quam.
            </p>
            {hideForm 
                      ? <Formulaire />
                      : (
                <div className="flex px-7 xl:space-x-10 py-6 flex-wrap justify-center">
                    <Ticket price={400} setHideForm={setHideForm} type={'One Person'} info={''}  />
                    <Ticket price={600} setHideForm={setHideForm} type={'Couple'} info={''}  />
                    <Ticket price={1400} setHideForm={setHideForm} type={'4-Girls'} info={''} />
                    <Ticket price={1600} setHideForm={setHideForm} type={'4-Boys'} info={''} />
                </div>
                      )}
        </div>
    )
}

export default Tickets
