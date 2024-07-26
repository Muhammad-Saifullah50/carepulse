"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { UserFormSchema, getAppointmentSchema } from "@/validations/validations"
import { createUser } from "@/actions/patient.actions"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment } from "@/actions/appointment.actions"

interface AppointmentFormsProps {
    type: 'create' | 'cancel' | 'schedule'
    userId: string
    patientId: string
}
const AppointmentForm = ({ type, userId, patientId }: AppointmentFormsProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const formValidationSchema = getAppointmentSchema(type)
    const form = useForm<z.infer<typeof formValidationSchema>>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            primaryPhysician: '',
            schedule: new Date(),
            reason: '',
            note: '',
            cancellationReason: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formValidationSchema>) {
        setIsLoading(true);

        let status;

        switch (type) {
            case "schedule":
                status = "scheduled"
                break;
            case 'cancel':
                status = "cancelled"
            default:
                status = "pending"
                break;
        }

        try {

            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status
                }

                const appointment = await createAppointment(appointmentData)

                if (appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment'
            break;
        case 'create':
            buttonLabel = 'Request Appointment'
            break;

        case 'schedule':
            buttonLabel = 'Schedule Appointment'
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in 10 sec onds</p>
                </section>

                {type !== 'cancel' && (
                    <>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.SELECT}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a physician"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem
                                    key={doctor.name}
                                    value={doctor.name}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            height={32}
                                            width={32}
                                            alt="doctor"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>


                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                placeholder="Enter reason for appointment"
                                label="Reason for appointment"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                placeholder="Enter notes"
                                label="Notes"
                            />

                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="cancellationReason"
                        placeholder="Enter reason for cancellation"
                        label="Reason for cancellation"
                    />
                )}


                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} hover:opacity-90 w-full`}
                >

                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    )

}

export default AppointmentForm