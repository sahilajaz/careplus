import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegistryForm from '@/components/forms/RegistryForm'
import { getUser } from '@/lib/actions/patient.action'


const Registry = async ({params: {userId}} : SearchParamProps) => {
    const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
       <Image
        src="/Logo.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
       />
       <RegistryForm
        user={user}
       />
      <p className="copyright py-12">&copy; 2024 CarePulse</p>
      </div>
      </section>
      <Image
      src="/regitry.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Registry
