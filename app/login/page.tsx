import type { Metadata } from "next"
import { LoginPage } from "@/components/login-page"

export const metadata: Metadata = {
  title: "Login | University Portal",
  description: "Login to the University Portal and Management System",
}

export default function Login() {
  return <LoginPage />
}
