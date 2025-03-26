import Image from 'next/image'
import React from 'react'

export default function FinalCOPD2() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center rounded-md border'>
        <Image
          src="/FinalCOPD2/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final COPD Image 1"
        />
        <Image
          src="/FinalCOPD2/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final COPD Image 2"
        />
        <Image
          src="/FinalCOPD2/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final COPD Image 3"
        />
        <Image
          src="/FinalCOPD2/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final COPD Image 4"
        />
        <Image
          src="/FinalCOPD2/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final COPD Image 5"
        />
      </div>
    </>
  )
}
