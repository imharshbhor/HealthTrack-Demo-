import Image from 'next/image'
import React from 'react'

export default function FinalOralCancer() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center rounded-md border'>
        <Image
          src="/FinalOralCancer/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Oral Cancer Image 1"
        />
        <Image
          src="/FinalOralCancer/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Oral Cancer Image 2"
        />
        <Image
          src="/FinalOralCancer/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Oral Cancer Image 3"
        />
        <Image
          src="/FinalOralCancer/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Oral Cancer Image 4"
        />
        <Image
          src="/FinalOralCancer/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Oral Cancer Image 5"
        />
      </div>
    </>
  )
}
