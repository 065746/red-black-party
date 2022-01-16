import { useEffect, useState } from "react";
import QrCode from "qrcode"
import { useLocation } from "react-router-dom";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";
import { useStateValue } from "../context/StateProider";

function QrCodeGenrator() {
    const [imgUrl, setImgUrl] = useState(null)
    const [hasQrCode, setHasQrCode] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const { state } = useLocation()

    const [ id ] = state.map((item,_) => item.id)
    const [{hide}, dispatch] = useStateValue()
    
    const generateQrCode = async () => {
        const fullName = state.reduce((_, v) => v.fullName, {})
        const email = state.reduce((_, v) => v.email, {})
        const phoneNumber = state.reduce((_, v) => v.phoneNumber, {})

        await QrCode.toDataURL(`
        First Person:
            Full Name: ${fullName} | Email: ${email} | Phone Number: ${phoneNumber}
    `).then((res) => setImgUrl(res))
      .catch((err) => console.log(err))

      setHasQrCode(true)
    }

    const sendQrCode = async () => {
      const docRef = await getDoc(doc(db, 'One Person', id ))
      const imgRef = ref(storage, `qrcodes/One Person/${docRef.id}/qrcode`)
      
      await uploadString(imgRef, imgUrl, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imgRef)
        await updateDoc(doc(db, 'One Person', docRef.id), {
            perso1:{
              ...docRef.data().perso1,
              qrcode: downloadUrl,
              isScand: false,
            }
          })
    })

    setConfirmed(true)
}
useEffect(() => {
  const unsabscribe = onSnapshot(doc(db, 'One Person', id ), (docs) => {
    if(docs.data().perso1.qrcode) {
       setImgUrl(docs.data().perso1.qrcode)
       setHasQrCode(true)
       setConfirmed(true)
       return
    }
  })
  return () => unsabscribe()
}, [id])

  
    return (
      <div className={`w-[calc(100%-300px)] ml-auto py-7 transition-all duration-200 pl-6 ${hide && '!w-full'}`}>
        <div className="">
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
                    {!hasQrCode ? (
                      <div className="flex items-center space-x-2">
                        <button onClick={generateQrCode} className='bg-blue-700 text-white px-5 py-2 hover:bg-blue-600 active:bg-blue-800'>Generate QR Code</button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                      <button 
                        onClick={confirmed ? null : sendQrCode} 
                        className={`bg-purple-700 text-white px-5 py-2 hover:bg-purple-600 active:bg-purple-800 ${confirmed && '!bg-green-700 hover:!bg-green-600 active:!bg-green-800'}`}
                      >
                        {`${confirmed ? 'Qr Code Sent to' : 'Send Qrcode'} ${item.fullName}`}
                      </button>
                    </div>
                    )}
                </div>
                ))}
            </div>
            {imgUrl && (
              <div className="">
                <a href={imgUrl} download className='flex flex-col items-center'>
                  <img className='object-contain h-52' src={imgUrl} alt="" />
                  <span className="bg-green-700 text-white px-5 py-2 hover:bg-green-600 active:bg-green-800" >Download QR Code</span>
                </a>
              </div>
            )}
            {/* <div className="max-w-sm mt-4 p-6 flex flex-col items-center space-y-3">
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
            </div> */}
          </div>
        </div>
      </div>
    );
}

export default QrCodeGenrator
