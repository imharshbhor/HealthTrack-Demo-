import Image from 'next/image'
import React from 'react'

export default function FinalBreastCancer() {
  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center rounded-md border'>
        <Image
          src="/FinalBreastCancer/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 1"
        />
        <Image
          src="/FinalBreastCancer/2.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 2"
        />
        <Image
          src="/FinalBreastCancer/3.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 3"
        />
        <Image
          src="/FinalBreastCancer/4.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 4"
        />
        <Image
          src="/FinalBreastCancer/5.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 5"
        />
        <Image
          src="/FinalBreastCancer/6.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Final Breast Cancer Image 6"
        />
      </div>
    </>
  )
}
