import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";


export default function NewAppointmentPage() {
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

          <AppointmentForm />

            <p className="justify-items-end text-dark-600 xl:text-left py-4">  © 2024 CarePulse</p>
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
