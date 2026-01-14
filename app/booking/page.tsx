"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  cityName: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
  society: z.string().min(1, {
    message: "Please select a society.",
  }),
  plotSize: z.string().min(1, {
    message: "Please select a plot size.",
  }),
  paymentPlan: z.enum(["cash", "installments"], {
    required_error: "Please select a payment plan.",
  }),
  whatsappNo: z.string().min(10, {
    message: "Please enter a valid WhatsApp number.",
  }),
  contactNo: z.string().min(10, {
    message: "Please enter a valid contact number.",
  }),
  contactTime: z.string().optional(),
})

import { submitBooking } from "@/app/actions/booking"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const defaultSize = searchParams.get("size")
  const defaultSociety = searchParams.get("society") || "Faisal Town Phase 2"

  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: "",
      cityName: "",
      country: "",
      society: defaultSociety,
      plotSize: defaultSize || "",
      paymentPlan: "installments",
      whatsappNo: "",
      contactNo: "",
      contactTime: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Manual validation
    const result = formSchema.safeParse(values)
    if (!result.success) {
       result.error.issues.forEach((issue) => {
         form.setError(issue.path[0] as any, { message: issue.message })
       })
       return
    }

    setIsSubmitting(true)
    
    try {
      const response = await submitBooking(values)
      
      if (response.success) {
        toast({
          title: "Booking Request Submitted!",
          description: "Our representative will contact you shortly.",
        })
        form.reset()
      } else {
        toast({
          title: "Submission Failed",
          description: response.message,
          variant: "destructive", // Assuming there is a destructive variant
        })
      }
    } catch (error) {
       toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Booking Request</CardTitle>
          <CardDescription>
            Fill out the form below to book your plot in {defaultSociety}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="whatsappNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp No</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact No</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="society"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Society</FormLabel>
                     <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Faisal Town Phase 2">Faisal Town Phase 2</option>
                          <option value="Blue World City">Blue World City</option>
                          <option value="Capital Smart City">Capital Smart City</option>
                          <option value="Rudn Enclave">Rudn Enclave</option>
                          <option value="Eighteen Islamabad">Eighteen Islamabad</option>
                        </select>
                     </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plotSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot Size</FormLabel>
                    <FormControl>
                        <select
                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                           {...field}
                        >
                          <option value="" disabled>Select a plot size</option>
                          <option value="5.56 Marla">5.56 Marla</option>
                          <option value="8 Marla">8 Marla</option>
                          <option value="10.89 Marla">10.89 Marla</option>
                          <option value="14.22 Marla">14.22 Marla</option>
                          <option value="1 Kanal">1 Kanal</option>
                          <option value="2 Kanal">2 Kanal</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="paymentPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Plan</FormLabel>
                    <FormControl>
                       <div className="flex gap-6 pt-2">
                         <label className="flex items-center space-x-2 cursor-pointer">
                           <input 
                              type="radio" 
                              value="installments" 
                              checked={field.value === 'installments'} 
                              onChange={field.onChange} 
                              className="w-4 h-4 text-primary"
                           />
                           <span>Installments</span>
                         </label>
                         <label className="flex items-center space-x-2 cursor-pointer">
                           <input 
                              type="radio" 
                              value="cash" 
                              checked={field.value === 'cash'} 
                              onChange={field.onChange} 
                              className="w-4 h-4 text-primary"
                           />
                           <span>Cash</span>
                         </label>
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 9 AM - 5 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Booking Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
