import React from "react";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { FlexBox } from "@/components/common/flex-box";
import { SampleType } from "@/interfaces/get-sample-type";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays } from "date-fns";
import { Icons } from "@/constants/icons";

type UpcomingTaskProps = {
  tasks: SampleType;
};

const UpcomingTask2 = ({ tasks }: UpcomingTaskProps) => {
  return (
        <FlexBox flexDirection="col">
                {
                    tasks.map((task)=><FlexBox>
                        
                    </FlexBox>)
                }
        </FlexBox>
  );
};

export default UpcomingTask2;
