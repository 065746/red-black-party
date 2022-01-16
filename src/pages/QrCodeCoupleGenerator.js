import { useEffect, useState } from "react";
import QrCode from "qrcode"
import { useLocation } from "react-router-dom";
import { useStateValue } from "../context/StateProider";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function QrCodeCoupleGenerator() {
    const [imgUrl, setImgUrl] = useState(null)
    const [imgUrl2, setImgUrl2] = useState(null)
    const [hasQrCode1, setHasQrCode1] = useState(false)
    const [hasQrCode2, setHasQrCode2] = useState(false)
    const [confirmed1, setConfirmed1] = useState(false)
    const [confirmed2, setConfirmed2] = useState(false)
    const { state } = useLocation()
    const [{hide}, dispatch] = useStateValue()
    
    const generateQrCode1 = async () => {
        const fullName = state.user.reduce((_, v) => v.fullName, {})
        const email = state.user.reduce((_, v) => v.email, {})
        const phoneNumber = state.user.reduce((_, v) => v.phoneNumber, {})

         await QrCode.toDataURL(`
            First Person:
                Full Name: ${fullName} | Email: ${email} | Phone Number: ${phoneNumber}
        `).then((res) => setImgUrl(res))
          .catch((err) => console.log(err))

         setHasQrCode1(true)
    }

    const sendQrCode1 = async () => {
            const docRef = await getDoc(doc(db, 'Couple', state.id ))
            const imgRef = ref(storage, `qrcodes/Couple/${docRef.id}/qrcode`)
            
            await uploadString(imgRef, imgUrl, 'data_url').then(async () => {
              const downloadUrl = await getDownloadURL(imgRef)
              await updateDoc(doc(db, 'Couple', docRef.id), {
                  perso1:{
                    ...docRef.data().perso1,
                    qrcode1: downloadUrl,
                    isScand: false,
                  }
                })
          })

          setConfirmed1(true)
    }

    const generateQrCode2 = async () => {
      const fullName2 = state.user.reduce((_, v) => v.fullName2, {})
      const email2 = state.user.reduce((_, v) => v.email2, {})
      const phoneNumber2 = state.user.reduce((_, v) => v.phoneNumber2, {})
  
      await QrCode.toDataURL(`
          Second Person:
              Full Name: ${fullName2} | Email: ${email2} | Phone Number: ${phoneNumber2}
      `).then((res) => setImgUrl2(res))
        .catch((err) => console.log(err))

        setHasQrCode2(true)
  }

  const sendQrCode2 = async () => {
    const docRef = await getDoc(doc(db, 'Couple', state.id ))
    const imgRef = ref(storage, `qrcodes/Couple/${docRef.id}/qrcode2`)
    
    await uploadString(imgRef, imgUrl2, 'data_url').then(async () => {
      const downloadUrl = await getDownloadURL(imgRef)
      await updateDoc(doc(db, 'Couple', docRef.id), {
        perso2:{
          ...docRef.data().perso2,
          qrcode2: downloadUrl,
          isScand: false,
        }
    })

  })

  setConfirmed2(true)
}
    useEffect(() => {
      const unsabscribe = onSnapshot(doc(db, 'Couple', state.id), (docs) => {
        if(docs.data().perso1.qrcode1) {
           setImgUrl(docs.data().perso1.qrcode1)
           setHasQrCode1(true)
           setConfirmed1(true)
           return
        }
      })
      return () => unsabscribe()
    }, [state.id])

    useEffect(() => {
      const unsabscribe = onSnapshot(doc(db, 'Couple', state.id), (docs) => {
        if(docs.data().perso2.qrcode2) {
           setImgUrl2(docs.data().perso2.qrcode2)
           setHasQrCode2(true)
           setConfirmed2(true)
           return
        }
      })
      return () => unsabscribe()
    }, [state.id])
    return (
      <div className={`w-[calc(100%-300px)] ml-auto py-7 px-6 transition-all duration-200 ${hide && '!w-full'} `}>
        <div className="">
          <div className="py-4">
            <div className="">
            {state.user.map((item, index) => (
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
                    {!hasQrCode1 ? (
                      <div className="flex items-center space-x-2">
                        <button onClick={generateQrCode1} className='bg-blue-700 text-white px-5 py-2 hover:bg-blue-600 active:bg-blue-800'>Generate QR Code for {item.fullName} </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button onClick={confirmed1 ? null :sendQrCode1} className={`bg-purple-700 text-white px-5 py-2 hover:bg-purple-600 active:bg-purple-800 ${confirmed1 && '!bg-green-700 hover:!bg-green-600 active:!bg-green-800'}`}>{`${confirmed1 ? 'Qr Code Sent to' : 'Send Qrcode'} ${item.fullName}`}</button>
                      </div>
                    )}
                    <div className="mb-6"> 
                        <h3 className='text-lg font-medium'>Second Person</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{item.fullName2}</strong> </p>
                            <p>Email : <strong>{item.email2}</strong> </p>
                            <p>Phone Number : <strong>{item.phoneNumber2}</strong> </p>
                            <p>gender : <strong className='capitalize'>{item.gender2}</strong> </p>
                        </div>
                    </div>
                    {!hasQrCode2 ? (
                      <div className="flex items-center space-x-2">
                        <button onClick={generateQrCode2} className='bg-blue-700 text-white px-5 py-2 hover:bg-blue-600 active:bg-blue-800'>Generate QR Code for {item.fullName2} </button>
                      </div>
                    ):(
                      <div className="flex items-center space-x-2">
                        <button onClick={confirmed2 ? null : sendQrCode2} className={`bg-purple-700 text-white px-5 py-2 hover:bg-purple-600 active:bg-purple-800 ${confirmed2 && '!bg-green-700 hover:!bg-green-600 active:!bg-green-800'}`}>{`${confirmed2 ? 'Qr Code Sent to' : 'Send Qrcode'} ${item.fullName2}`}</button>
                      </div>
                    )}
                    <p>Status : <strong className='capitalize'>{item.status}</strong> </p>
                    <p className='mb-6'>Submitted at : <strong className='capitalize'>{item.timestamp}</strong> </p>
                </div>
                ))}
            </div>
            {imgUrl && (
              <div className="">
                <a href={imgUrl} download className='flex flex-col items-center justify-start'>
                  <img className='object-contain h-52' src={imgUrl} alt="" />
                  <span className="bg-green-700 text-white px-5 py-2 hover:bg-green-600 active:bg-green-800" >Download QR Code For {state.user.reduce((_, v) => v.fullName, {})} </span>
                </a>
              </div>
            )}
            {imgUrl2 && (
              <div className="">
                <a href={imgUrl2} download className='flex flex-col items-center justify-start'>
                  <img className='object-contain h-52' src={imgUrl2} alt="" />
                  <span className="bg-green-700 text-white px-5 py-2 hover:bg-green-600 active:bg-green-800" >Download QR Code For {state.user.reduce((_, v) => v.fullName2, {})}</span>
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
