import Image from 'next/image'
import React from 'react'

export default function FinalHypertension() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center rounded-md border'>
        <Image
          src="/FinalHypertension/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Hypertension Image 1"
        />
        <Image
          src="/FinalHypertension/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Hypertension Image 2"
        />
        <Image
          src="/FinalHypertension/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Hypertension Image 3"
        />
        <Image
          src="/FinalHypertension/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Hypertension Image 4"
        />
        <Image
          src="/FinalHypertension/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Hypertension Image 5"
        />
      </div>
    </>
  )
}
