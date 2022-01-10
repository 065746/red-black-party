import { useRef, useState } from "react";
import QrCode from "qrcode"
import QrReader from 'react-qr-reader'
import { useLocation } from "react-router-dom";

function QrCodeGenrator() {
    const [imgUrl, setImgUrl] = useState(null)
    const [scanResult, setScanResult] = useState(null)
    const qrCodeRef = useRef()

    const { state } = useLocation()
  
    const generateQrCode = async () => {
        const fullName = state.reduce((_, v) => v.fullName, {})
        const email = state.reduce((_, v) => v.email, {})
        const phoneNumber = state.reduce((_, v) => v.phoneNumber, {})
      try {
        const response = await QrCode.toDataURL(`Full Name: ${fullName} | Email: ${email} | Phone Number: ${phoneNumber}`)
        setImgUrl(response)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleScan = (res) => {
      if(res){
        setScanResult(res)
      }
    }
  
    const onScanFile = () => {
      qrCodeRef.current.openImageDialog()
    }
  
    return (
      <div className="max-w-3xl ml-auto py-7">
        <div className="">
          {/* <h2 className='text-center py-5 bg-yellow-700 text-white'>Generate & Send a QR code to {} </h2> */}
          <div className="py-4">
            <div className="">
            {state.map((item, index) => (
                <div  key={index} className="mb-6">
                    <h3 className="text-xl font-semibold capitalize">{`Generate and Send QrCode to ${item.fullName}`}</h3>
                    <div className="px-2">
                        <p>Full Name : <strong>{item.fullName}</strong> </p>
                        <p>Email : <strong>{item.email}</strong> </p>
                        <p>Phone Number : <strong>{item.phoneNumber}</strong> </p>
                        <p>gender : <strong className='capitalize'>{item.gender}</strong> </p>
                        <p>Status : <strong className='capitalize'>{item.status}</strong> </p>
                        <p>Submitted at : <strong className='capitalize'>{item.timestamp}</strong> </p>
                    </div>
                </div>
                ))}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={generateQrCode} className='bg-blue-700 text-white px-5 py-2 hover:bg-blue-600 active:bg-blue-800'>Generate QR Code</button>
            </div>
            {imgUrl && (
              <div className="">
                <a href={imgUrl} download className='flex flex-col items-center'>
                  <img src={imgUrl} alt="" />
                  <span className="bg-green-700 text-white px-5 py-2 hover:bg-green-600 active:bg-green-800" >Download QR Code</span>
                </a>
              </div>
            )}
            <div className="max-w-sm mt-4 p-6 flex flex-col items-center space-y-3">
              <button onClick={onScanFile} className="bg-purple-700 text-white px-5 py-2 hover:bg-purple-600 active:bg-purple-800">Scan QR Code</button>
              <QrReader 
                 ref={qrCodeRef}
                 delay={300}
                 style={{ width: '100%'}}
                 onError={(err) => console.log(err)}
                 onScan={handleScan}
                 legacyMode
              />
              <h3>Scan result file : {scanResult} </h3>
            </div>
          </div>
        </div>
      </div>
    );
}

export default QrCodeGenrator
