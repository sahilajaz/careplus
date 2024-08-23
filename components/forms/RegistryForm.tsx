"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import { useState } from "react"

 

import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { userFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { FormFieldType } from "./PatientForm"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { RadioGroupItem } from "../ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"





export const RegistryForm = ({user} : {user : User} ) => {
  const router = useRouter()
  const[isLoading , setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

 
  const onSubmit = async ({name , email , phone}: z.infer<typeof userFormValidation>) => {
    setIsLoading(true)
    try {
        const userData = {name , email , phone}
        const user = await createUser(userData)
        if(user) {
           router.push(`/patients/${user.$id}/registry`)
        }
    }
    catch(error) {
      console.log(error)
    }
    
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
         <h1 className="header">Welcome 👋</h1>
         <p className="text-dark-700">
            Let us know more about yourself.
         </p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
         <h2 className="sub-header">
          Personal Information
         </h2>
          </div>
        </section>

         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="name"
         placeholder="Jhon Doe"
         iconSrc="/Lead Icon.svg"
         iconAlt="user"
         />

         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="email"
         label="Email"
         placeholder="JhonDoe@gmail.com"
         iconSrc="/msg.svg"
         iconAlt="email"
         />
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="phone"
         label="Phone Number"
         placeholder="(555) 123-4567"
         />
         </div>

         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.DATE_PICKER}
         control={form.control}
         name="birthdate"
         label="Date of Birth"
         />
         <CustomFormField
         fieldType={FormFieldType.SKELETON}
         control={form.control}
         name="gender"
         label="Gender"
         renderSkeleton={(field) => (
          <FormControl>
            <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
               {
                GenderOptions.map((option , index) => (
                   <div key={index} className="radio-group">
                     <RadioGroupItem
                     value={option}
                     id={option}
                     />
                     <Label htmlFor={option} className="cursor-pointer">
                      {option}
                     </Label>
                   </div>
                ))
               }
            </RadioGroup>
          </FormControl>
         )}
         />   
         </div>

         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="address"
         label="Address"
         placeholder="14th Street , New York"
         />
        <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="occupation"
         label="Occupation"
         placeholder="Software Engineer"
         />
         </div>

         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="emergencyContactName"
         label="Emergency Contact Name"
         placeholder="Guardian's name"
         />
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="emergencyContactNumber"
         label="Emergency Contact Number"
         placeholder="(555) 123-4567"
         />       
         </div>
         
         <section className="space-y-6">
          <div className="mb-9 space-y-1">
         <h2 className="sub-header">
          Medical Information
         </h2>
          </div>
        </section>

        <CustomFormField
         fieldType={FormFieldType.SELECT}
         control={form.control}
         name="primaryPhysician"
         label="Primary Physician"
         placeholder="Select a physician"
         >
          {
            Doctors.map((doctor) => (
               <SelectItem key={doctor.name} value={doctor.name}>
                      <div className="flex  cursor-pointer items-center gap-2">
                        <Image
                         src={doctor.image}
                         width={32}
                         height={32}
                         alt={doctor.name}
                         className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                      </div>
               </SelectItem>
            ))
          }
         </CustomFormField>
        
         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="insuranceProvider"
         label="Insurance Provider"
         placeholder="BlueCross BlueShield"
         />
        <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="insurancePolicyNumber"
         label="Insurance policy number"
         placeholder="ABC123456789"
         />       
         </div>

         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.TEXTAREA}
         control={form.control}
         name="allergies"
         label="Allergies (if any)"
         placeholder="Peanuts , Penicilin , Pollen"
         />
        <CustomFormField
         fieldType={FormFieldType.TEXTAREA}
         control={form.control}
         name="currentMedication"
         label="Current Medication (if any)"
         placeholder="Ibuprofen 200mg, Paracetamol 500mg"
         />   
         </div>
         <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
         fieldType={FormFieldType.TEXTAREA}
         control={form.control}
         name="familyMedicalHistory"
         label="Family medical history"
         placeholder="Mother had diabetes , father had heart disease"
         />
        <CustomFormField
         fieldType={FormFieldType.TEXTAREA}
         control={form.control}
         name="pastMedicalHistory"
         label="Past medical history"
         placeholder="Appendectomy , Tonsillectomy"
         />   
         </div>

         
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
         <h2 className="sub-header">
          Identification and  Verification
         </h2>
          </div>
        </section>  

        <CustomFormField
         fieldType={FormFieldType.SELECT}
         control={form.control}
         name="identificationType"
         label="Identification type"
         placeholder="Select an identification type"
         >
          {
            IdentificationTypes.map((type) => (
               <SelectItem key={type} value={type}>
                      {type}
               </SelectItem>
            ))
          }
         </CustomFormField>

         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="identicationNumber"
         label="Identification number"
         placeholder="123456789"
         />

        <CustomFormField
         fieldType={FormFieldType.SKELETON}
         control={form.control}
         name="identificationDocument"
         label="Scanned copy of indetification document"
         renderSkeleton={(field) => (
          <FormControl>
            <FileUploader
            files={field.value}
            onChange={field.onChange}
            />
          </FormControl>
         )}
         />

          <section className="space-y-6">
          <div className="mb-9 space-y-1">
         <h2 className="sub-header">
          Consent and Privacy
         </h2>
          </div>
        </section>

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="treatmentConsent"
        label="I consent to treatment"
        />
        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="disclosureConsent"
        label="I consent to disclosure of information"
        />
        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="privacyConsent"
        label="I consent to privacy policy"
        />
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegistryForm