"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import { useState } from "react"

 

import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { userFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { FormFieldType } from "./PatientForm"





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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
         <h1 className="header">Hi there 👋</h1>
         <p className="text-dark-700">
            Schedule your first appointment.
         </p>
        </section>
         <CustomFormField
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="name"
         label="Full Name"
         placeholder="Jhon Doe"
         iconSrc="/Lead Icon.svg"
         iconAlt="user"
         />
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegistryForm