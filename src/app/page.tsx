import Image from "next/image";
import DashboardLayout from "@/layout/dashboard/layout";
import { redirect } from "next/navigation";

export default function Home(): never {

  // redirect to /dashobard
  redirect("/dashboard")
}
