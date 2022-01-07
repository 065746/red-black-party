import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

function FourGirlsGroup() {
    const [group, setGroup] = useState([])
    const { id } = useParams()
    const { state } = useLocation()
    useEffect(() => {
        const findGroup = state.userRows.find(row => row.id === id)
        setGroup([findGroup])
    } , [id])
    console.log(group)
    return (
        <div className='w-[calc(100%-300px)] px-10 py-7 ml-auto'>
            {group?.map((row, index) => (
                <div key={index} className="space-y-8">
                    <div className="">
                        <h3 className="text-xl font-semibold">First Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso1.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso1.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso1.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Second Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso2.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso2.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso2.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Third Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso3.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso3.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso3.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Fourth Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso4.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso4.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso4.phoneNumber}</strong> </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FourGirlsGroup
