import PasskeyModal from "@/components/PasskeyModal";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";


export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen  ">

      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <div className="flex justify-between w-fit gap-3 mt-3 mb-7">
            <Image src='/assets/icons/logo-icon.svg' height={1000} width={1000} alt="logo" className="h-10 w-fit" />
            <h1 className="header">Caring</h1>
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left ">  © 2024 CarePulse</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image
        height={1000}
        width={1000}
        src={"/assets/images/bg.jpg"}
        className="side-img max-w-[50%]"
        alt="machine"
      />
    </div>
  );
}
