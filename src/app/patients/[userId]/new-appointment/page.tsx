import { getPatient } from "@/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";

import * as Sentry from "@sentry/nextjs";
export default async function NewAppointmentPage({ params: { userId } }: SearchParamProps) {

  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new_appointment", patient?.name);

  return (
    <div className="flex h-screen max-h-screen  ">
      <section className=" remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient?.$id}


          />

            <p className="copyright mt-10 py-12">  © 2024 CarePulse</p>
        </div>
      </section>

      <Image
        height={1000}
        width={1000}
        src={"/assets/images/appointment-img.png"}
        className="side-img max-w-[390px] bg-bottom"
        alt="appointment image"
      />
    </div>
  );
}
