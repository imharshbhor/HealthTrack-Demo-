import Image from 'next/image'
import React from 'react'

export default function FinalDiabetes() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center border rounded-md'>
        <Image
          src="/FinalDiabetes/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Diabetes Image 1"
        />
        <Image
          src="/FinalDiabetes/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Diabetes Image 2"
        />
        <Image
          src="/FinalDiabetes/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Diabetes Image 3"
        />
        <Image
          src="/FinalDiabetes/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Diabetes Image 4"
        />
        <Image
          src="/FinalDiabetes/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Diabetes Image 5"
        />
      </div>
    </>
  )
}
