import { BarChart, ListTodo } from "lucide-react";
import { type SidenavType } from "@/interfaces/sidenav-types";


export const SidenavData: SidenavType[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: BarChart
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: ListTodo
    }
] 