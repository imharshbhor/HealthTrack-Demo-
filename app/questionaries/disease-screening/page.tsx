import Image from 'next/image'
import React from 'react'

export default function HDS() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center border rounded-md'>
        <Image
          src="/HDS/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 1"
        />
        <Image
          src="/HDS/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 2"
        />
        <Image
          src="/HDS/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 3"
        />
        <Image
          src="/HDS/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 4"
        />
        <Image
          src="/HDS/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 5"
        />
        <Image
          src="/HDS/6.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 6"
        />
        <Image
          src="/HDS/7.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Health Disease Screening Image 7"
        />
      </div>
    </>
  )
}
