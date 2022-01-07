function About() {
    return (
        <div id="about" className="bg-[#2d2d2d] flex flex-col items-center py-6 space-y-6">
            <h2 className="text-4xl font-bold mb-5 text-white  relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">About</h2>
            <div className="flex max-w-5xl flex-col justify-center space-y-4 mx-auto py-8 lg:space-x-6 px-6 lg:space-y-0 lg:flex-row ">
                <img className="object-contain h-96" src="https://images.unsplash.com/photo-1541126274323-dbac58d14741?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                <div className="">
                    <h3 className="text-3xl relative text-white font-semibold after:content-[''] after:absolute after:bottom-[-10px] after:left-1 after:w-[40%] after:border-b after:border-gray-900
                    before:content-[''] before:absolute before:bottom-[-10px] before:left-1 before:w-[60%] before:border-b before:border-gray-200">Party Process</h3>
                    <ul className='py-7  text-xl font-normal text-gray-400'>
                        <li className='py-1 '>FOR THE SHOW DJ-DANCER-NEON-FUMIGENE.</li>
                        <li className='py-1 '>ALCOHOL AND BUFFET AT WILL.</li>
                        <li className='py-1 '>DOORS WILL BE OPEN FROM 9PM AND THE PARTY WILL END AT 5AM.</li>
                        <li className='py-1'>A PROFESSIONAL SERVICE AND SURPRISES ARE WAITING FOR YOU.</li>
                        <li className='py-1'>ALL YOU HAVE TO DO IS TO ENJOYTHE NIGHT AS MUCH AS YOU WANT.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About
