import { Instagram, WhatsApp } from '@mui/icons-material'

function Contact() {
    return (
        <div id="contact" className="bg-[#2d2d2d] flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold mb-5 text-white  relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">Contact</h2>
            <div className="flex w-full mt-6 flex-col justify-center md:justify-between space-y-4 mx-auto py-8 lg:space-x-6 px-32 lg:space-y-0 lg:flex-row ">
                <div className="max-w-xs flex flex-col justify-start space-y-3 mt-16">
                    <h3 className="text-4xl font-bold text-white">Contact info</h3>
                    <h4 className="text-xl text-gray-200 font-semibold">Amazing Company, Inc.</h4>
                    <div className="text-base text-gray-200 space-x-2 flex justify-center">
                        <a href="https://www.instagram.com/red_blackparty/" target={'_blank'}>
                            <Instagram style={{
                                fontSize: '40px'
                            }} />
                        </a>
                        <a href="https://wa.me/00212767524320" target={'_blank'}>
                            <WhatsApp style={{
                                color: '#fff',
                                fontSize: '40px'
                            }} />
                        </a>
                    </div>
                </div> 
                <form className="flex flex-col flex-grow xl:max-w-4xl space-y-3 sm:w-[500px] lg:w-[600px] ">
                    <input className="bg-transparent py-3 px-4 border text-white focus:ring-4 ring-blue-400 outline-none transition-all duration-200 rounded-sm" placeholder="Full name" type="text" />
                    <input className="bg-transparent py-3 px-4 border text-white  focus:ring-4 ring-blue-400 outline-none transition-all duration-200 rounded-sm" placeholder="Email" type="email" />
                    <textarea className="bg-transparent py-2 px-4 border text-white w-full h-72 focus:ring-4 ring-blue-400 outline-none transition-all duration-200 rounded-sm" placeholder="Message" name="" id=""></textarea>
                <div className="flex justify-end w-full">
                    <button className="bg-purple-800 text-white text-lg capitalize px-6 py-3 hover:bg-purple-700 active:bg-purple-900">Send</button>
                </div>
                </form>
            </div>
        </div>
    )
}



export default Contact
