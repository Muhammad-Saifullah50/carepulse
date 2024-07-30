import { getRecentAppointmentsList } from "@/actions/appointment.actions";
import StatCard from "@/components/StatCard"
import { columns } from "@/components/table/Columns";
import DataTable from "@/components/table/DataTable";
import Image from "next/image"
import Link from "next/link"

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();

  return (
    <div className="mx-auto flex flex-col max-w-7xl space-y-14 ">
      <header className="admin-header">
        <Link href={"/"} className="cursor-pointer">
          <div className="flex justify-between w-fit gap-3 mt-3 mb-7">
            <Image src='/assets/icons/logo-icon.svg' height={1000} width={1000} alt="logo" className="h-10 w-fit" />
            <h1 className="header">Caring</h1>
          </div>
        </Link>

        <p className="text-16-semibold"> Admin Dashboard</p>
      </header>

      <main className="admin-main ">
        <section className="w-full space-y-4">
          <h1 className="header">
            Welcome 👋
          </h1>
          <p className="text-dark-700 "> Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled Appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending Appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled Appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable
          data={appointments.documents}
          columns={columns}
        />
      </main>
    </div>
  )
}

export default AdminPage
