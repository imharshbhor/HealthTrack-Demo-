"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Cookies from "js-cookie";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { Eye, EyeOffIcon } from "lucide-react"
import { useUserStore } from "@/store/userStore"
import { loginUser } from "@/services/user-service"; // Import the loginUser service

import { Particles } from "@/components/magicui/particles";
import { AuroraText } from "@/components/magicui/aurora-text"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export default function LoginPage() {
  const router = useRouter()
  const callbackUrl = "/dashboard"
  const [error, setError] = useState<string | null>(() => null);
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { user, setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const data = await loginUser(values.email, values.password); // Use the loginUser service

      setUser({
        id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        role: data.user.role,
        phone: data.user.phone,
        department: data.user.department,
        specialization: data.user.specialization,
        status: data.user.status
      });

      Cookies.set("token", data.token, { expires: 1, path: "/" }); // Expires in 1 day

      router.push('/dashboard');
      router.refresh()
    } catch (error) {
      setError("Wrong Credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full gap-10">
         <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"black"}
        refresh
      />
        <div className="hidden md:block">
        <Image src="/assets/illustrations/Doctors-bro.png" className="z-10" alt="Illustration" width={430} height={430}  />
      </div>
      <Card className="w-full md:max-w-[22rem] lg:max-w-md z-10 shadow-md">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold">Health<AuroraText speed={2}>Track</AuroraText></CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="doctor@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOffIcon /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full relative" disabled={isLoading}>
                {isLoading && (
                  <span className="pr-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  </span>
                )}
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">

        </CardFooter>

      </Card>
    </div>
  )
}
