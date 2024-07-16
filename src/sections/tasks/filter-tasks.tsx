"use client"

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const FilterTasks = (props: Props) => {
  const router = useRouter();
  return (
    <Select onValueChange={(url)=>router.push('/qu')}>
      <SelectTrigger>
        <Button
          size="sm"
          className="rounded-3xl flex gap-2 border-primary h-8 text-primary hover:text-primary px-4 text-[.75rem]"
          variant="outline"
        >
          <span>
            <ListFilter size={20} />
          </span>
          <span className="md:block md:rounded-full hidden">Filters</span>
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="/">randy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterTasks;
