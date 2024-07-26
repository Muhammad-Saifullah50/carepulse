"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { PatientFormSchema } from "@/validations/validations"
import { createUser, registerPatient } from "@/actions/patient.actions"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: { user: User }) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof PatientFormSchema>>({
        resolver: zodResolver(PatientFormSchema),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || ""
        },
    })

    async function onSubmit(values: z.infer<typeof PatientFormSchema>) {
        setIsLoading(true);

        let formData;

        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }
        try {

            const patientData = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                birthDate: new Date(values.birthDate),
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhysician: values.primaryPhysician,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies,
                currentMedication: values.currentMedication,
                familyMedicalHistory: values.familyMedicalHistory,
                pastMedicalHistory: values.pastMedicalHistory,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
                treatmentConsent: values.treatmentConsent,
                disclosureConsent: values.disclosureConsent,


            };
            // @ts-ignore
            const patient = await registerPatient(patientData);

            if (patient) router.push(`/patients/${user.$id}/new-appointment`);

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className=" space-y-4">
                    <h1 className="header">Welcome 👋 </h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>
                <section className=" space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="text-dark-700 sub-header">Personal Information</h2>
                    </div>

                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    placeholder="John Doe"
                    iconSrc={"/assets/icons/user.svg"}
                    iconAlt="user"
                    label="Full Name"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="email"
                        label="Email Address"
                        placeholder="abc@example.com"
                        iconSrc={"/assets/icons/email.svg"}
                        iconAlt="email"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="phone"
                        label="Phone Number"
                        placeholder="123 4567890"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                        placeholder="abc@example.com"
                        iconSrc={"/assets/icons/email.svg"}
                        iconAlt="email"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem
                                                value={option}
                                                id={option} />
                                            <Label htmlFor={option} className='cursor-pointer'>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="address"
                        placeholder="ABC Street XYZ City"
                        label="Address"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="occupation"
                        placeholder="Software Engineer"
                        label="Occupation"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="123 4567890"
                    />
                </div>

                <section className=" space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="text-dark-700 sub-header">Medical Information</h2>
                    </div>

                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="primaryPhysician"
                    label="Primary Physician"
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

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insuranceProvider"
                        placeholder="ABC Company"
                        label="Insurance provider"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insurancePolicyNumber"
                        placeholder="ABC123"
                        label="Insurance policy number"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="allergies"
                        placeholder="Peanuts, Penicillin etc"
                        label="Allergies (if any)"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="currentMedication"
                        placeholder="Paracetamol 500mg etc"
                        label="Current medication"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="familyMedicalHistory"
                        placeholder="Mother had sugar and father had weak eyesight"
                        label="Family medical history"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="pastMedicalHistory"
                        placeholder="Hypertension, Diabetes etc"
                        label="Past medical history"
                    />
                </div>

                <section className=" space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="text-dark-700 sub-header">Identification and Verification</h2>
                    </div>

                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="identificationType"
                    label="Identification type"
                    placeholder="Select Identification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem
                            key={type}
                            value={type}
                        >
                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="identificationNumber"
                    placeholder="123456789"
                    label="Identification number"
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="identificationDocument"
                    label="Scanned copy of identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                />

                <section className=" space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="text-dark-700 sub-header">Privacy Consent</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I agree to the treatment consent form"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I agree to the disclosure consent form"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I agree to the privacy consent form"
                />
                <SubmitButton
                    isLoading={isLoading}
                >
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )

}

export default RegisterForm