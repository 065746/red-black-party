import { createRef } from 'react'
import Pdf from 'react-to-pdf'

const ref = createRef()

function PDF({name, id, type, timestamp, qrcode}) {
    return ( 
        <div className="">
            <div className="flex bg-gray-900 max-w-3xl mx-auto mt-20 shadow-md" ref={ref} >
                <div className="bg-gray-50 px-8 py-16 rounded-tr-[50%] rounded-br-[50%]">
                    <p className="font-thin text-xl text-center">RED&BLACK</p>
                    <h2 className='text-4xl font-bold text-center uppercase tracking-wide'>Party</h2>
                </div>
                <div className='text-gray-50 flex-grow py-5'>
                    <div className=' text-center'>
                        <h2 className='text-2xl font-semibold'>Party Starts at 21:00PM</h2>
                        <h3 className='text-xl font-semibold'>Located: Rabat</h3>
                    </div>
                    <div className='flex justify-evenly font-light mt-7'>
                        <div className="">
                            <p>ISSUED TO</p>
                            <span>{name}</span>
                        </div>
                        <div className="">
                            <p>ORDER NUMBER</p>
                            <span className='text-xs'>{id}</span>
                            <p>Registered</p>
                            <span>{timestamp}</span>
                        </div>
                        <div className='text-gray-50'>
                            <p>TICKET TYPE</p>
                            <span>{type}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center px-3">
                  <img className='object-contain h-44' src={qrcode} alt="" />
                </div>
            </div>
            <Pdf targetRef={ref} filename={`${id}.pdf`} >
                {({toPdf}) => 
                            <div className="flex justify-center mt-3">
                                <button className='bg-blue-700 hover:bg-blue-600 px-5 py-2 text-white' onClick={toPdf} >Capture as Pdf</button>
                            </div> } 
            </Pdf>
        </div>
    )
}

export default PDF
