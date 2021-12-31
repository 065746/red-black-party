function About() {
    return (
        <div className="bg-[#2d2d2d] flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold mb-5 text-white  relative before:content-[''] before:absolute before:bottom-[-10px] before:w-full before:h-2 before:bg-purple-900">About</h2>
            <p className="text-gray-200 max-w-2xl text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa
                semper aliquam quis mattis quam.
            </p>
            <div className="flex max-w-5xl flex-col justify-center space-y-4 mx-auto py-8 lg:space-x-6 px-6 lg:space-y-0 lg:flex-row ">
                <img className="object-contain h-96" src="https://webthemez.com/demo/rockon-free-music-bootstrap-web-template/images/about.png" alt="" />
                <div className="">
                    <h3 className="text-3xl relative text-white font-semibold after:content-[''] after:absolute after:bottom-[-10px] after:left-1 after:w-[40%] after:border-b after:border-gray-900
                    before:content-[''] before:absolute before:bottom-[-10px] before:left-1 before:w-[60%] before:border-b before:border-gray-200">High Quality Process</h3>
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
