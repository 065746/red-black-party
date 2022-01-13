import { useRef, useState } from "react";
import QrCode from "qrcode"
import { useLocation } from "react-router-dom";
import { useStateValue } from "../context/StateProider";

function QrCodeCoupleGenerator() {
    const [imgUrl, setImgUrl] = useState(null)
    const [scanResult, setScanResult] = useState(null)
    const qrCodeRef = useRef()

    const [{hide}, dispatch] = useStateValue()
    
    const { state } = useLocation()
    
    const generateQrCode = async () => {
        const fullName = state.reduce((_, v) => v.fullName, {})
        const email = state.reduce((_, v) => v.email, {})
        const phoneNumber = state.reduce((_, v) => v.phoneNumber, {})

        const fullName2 = state.reduce((_, v) => v.fullName2, {})
        const email2 = state.reduce((_, v) => v.email2, {})
        const phoneNumber2 = state.reduce((_, v) => v.phoneNumber2, {})
      try {
        const response = await QrCode.toDataURL(`
            First Person:
                Full Name: ${fullName} | Email: ${email} | Phone Number: ${phoneNumber}

            Second Person:
                Full Name: ${fullName2} | Email: ${email2} | Phone Number: ${phoneNumber2}
        `)
        setImgUrl(response)
        
      } catch (error) {
        console.log(error);
      }
    }
    console.log(imgUrl)
    return (
      <div className={`w-[calc(100%-300px)] ml-auto py-7 px-6 transition-all duration-200 ${hide && '!w-full'} `}>
        <div className="">
          <div className="py-4">
            <div className="">
            {state.map((item, index) => (
                <div key={index}>
                        <h3 className="text-xl font-semibold capitalize">{`Generate and Send QrCode to ${item.fullName}`}</h3>
                    <div className="mb-3">
                        <h3 className='text-lg font-medium'>First Person</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{item.fullName}</strong> </p>
                            <p>Email : <strong>{item.email}</strong> </p>
                            <p>Phone Number : <strong>{item.phoneNumber}</strong> </p>
                            <p>gender : <strong className='capitalize'>{item.gender}</strong> </p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className='text-lg font-medium'>Second Person</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{item.fullName2}</strong> </p>
                            <p>Email : <strong>{item.email2}</strong> </p>
                            <p>Phone Number : <strong>{item.phoneNumber2}</strong> </p>
                            <p>gender : <strong className='capitalize'>{item.gender2}</strong> </p>
                        </div>
                    </div>
                            <p>Status : <strong className='capitalize'>{item.status}</strong> </p>
                            <p className='mb-6'>Submitted at : <strong className='capitalize'>{item.timestamp}</strong> </p>
                </div>
                ))}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={generateQrCode} className='bg-blue-700 text-white px-5 py-2 hover:bg-blue-600 active:bg-blue-800'>Generate QR Code</button>
            </div>
            {imgUrl && (
              <div className="">
                <a href={imgUrl} download className='flex flex-col items-center justify-start'>
                  <img src={imgUrl} alt="" />
                  <span className="bg-green-700 text-white px-5 py-2 hover:bg-green-600 active:bg-green-800" >Download QR Code</span>
                </a>
              </div>
            )}
          </div>
          {/*  */}
        </div>
      </div>
    );
}

export default QrCodeCoupleGenerator
