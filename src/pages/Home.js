import About from "../components/About"
import Banner from "../components/Banner"
import Contact from "../components/Contact"
import Header from "../components/Header"
import Tickets from "../components/Tickets"

function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <About />
            <Tickets />
            <Contact />
        </div>
    )
}

export default Home
