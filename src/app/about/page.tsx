import React from "react";
import DashboardLayout from "@/components/layout/dashboard/layout";
import AuthProvider from "@/provider/AuthProviders";

import { FlexBox } from "@/components/common/flex-box";
type Props = {};

const techUsed = [
  "tailwindcss for styling",
  "authjs for authentication",
  "zod for schema validation",
  "react-hook-form for form handling and validations",
  "next-safe-action for type-safe server actions",
  "shadcn/ui for ui component library",
  "prisma for db migration and ORM",
  "postgresql as db server",
];

const page = (props: Props) => {
  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 flex items-center text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          About Taskifier
        </h1>
        <FlexBox
          justifyContent="center"
          flexDirection="col"
          alignItems="center"
        >
          <FlexBox className="max-w-xl mt-8">
            <h5 className="text-foreground/90">
              I built this something nonsense using Nextjs on top of
              react-typescript. My main purpose for developing this application
              is to elevate my knowledge and skills in different libraries that is
              well-known in javascript ecosystem <span>&#128513;</span>.
            </h5>
          </FlexBox>
          <FlexBox
            flexDirection="col"
            className="text-start max-w-2xl mt-4 ml-5  text-foreground/85"
          >
            <h5>Credits to these libraries:</h5>
            <ul>
              {techUsed.map((tech) => (
                <li key={tech} className="list-disc">
                  {tech}
                </li>
              ))}
            </ul>
          </FlexBox>
          <FlexBox className="max-w-2xl mt-5">
            <p>
              Built by Rex Hernandez with <span>&#128151;</span>.
            </p>
          </FlexBox>
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default page;
