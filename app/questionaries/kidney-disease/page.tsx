import Image from 'next/image'
import React from 'react'

export default function CKD2() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center rounded-md border'>
        <Image
          src="/CKD2/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="CKD Image 1"
        />
        <Image
          src="/CKD2/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="CKD Image 2"
        />
        <Image
          src="/CKD2/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="CKD Image 3"
        />
        <Image
          src="/CKD2/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="CKD Image 4"
        />
      </div>
    </>
  )
}
