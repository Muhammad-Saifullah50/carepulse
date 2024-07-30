import { getPatient, getUser } from '@/actions/patient.actions'
import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Sentry from "@sentry/nextjs";
import { redirect } from 'next/navigation'

const PatientRegisterPage = async ({ params: { userId } }: SearchParamProps) => {

  const user = await getUser(userId)
  const patient = await getPatient(userId)

  Sentry.metrics.set("user_view_register", user!?.name);

  if (patient) redirect(`/patients/${userId}/new-appointment`)
  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex justify-between w-fit gap-3 mt-3 mb-7">
            <Image src='/assets/icons/logo-icon.svg' height={1000} width={1000} alt="logo" className="h-10 w-fit" />
            <h1 className="header">Caring</h1>
          </div>

          <RegisterForm user={user as any} />

          <p className="copyright py-12 justify-items-end text-dark-600 xl:text-left">  © 2024 CarePulse</p>

        </div>
      </section>

      <Image
        height={1000}
        width={1000}
        src={"/assets/images/register-img.png"}
        className="side-img max-w-[390px]"
        alt="machine"
      />
    </div>
  )
}

export default PatientRegisterPage
