import React from "react";
import Link from "next/link";
import { type SidenavType } from "@/interfaces/sidenav-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sun,
  Moon,
  Menu,
  EllipsisVertical,
  MoveRight,
} from "lucide-react";
import { SideNavSm } from "./side-nav-sm";
import { FlexBox } from "@/components/common/flex-box";
import { authSignIn } from "@/actions/auth/sigin-action";
import { authSignOut } from "@/actions/auth/signout-action";

const SignOutHelper = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex justify-center px-2 py-2 items-center cursor-pointer hover:bg-accent rounded-md">
          <EllipsisVertical size={23} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="py-1 px-2 w-auto">
        <form action={authSignOut}>
          <button
            className="py-1 px-2 rounded-md flex items-center gap-3 text-sm font-medium text-foreground/80"
            type="submit"
          >
            <span>
              <MoveRight size={12} />
            </span>
            Sign out
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

const BreadCrumbsHelper = ({ path = [] }: { path: SidenavType["title"][] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.slice(0, 2).map((ctx, index) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={index} className="capitalize">
              <Link
                className={`text-[.75rem] ${
                  ctx !== path[0]
                    ? "text-foreground/95 pointer-events-none"
                    : "text-foreground/70"
                }  tracking-tight font-semibold `}
                href={`/${ctx}`}
              >
                {ctx}
              </Link>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const Header = ({
  breadcrumbsPath,
  themeToggler,
  currentTheme,
  routes,
  routerPaths,
}: {
  breadcrumbsPath: any;
  themeToggler: () => void;
  currentTheme: string | undefined;
  routes: SidenavType[];
  routerPaths: SidenavType["href"][];
}) => {
  return (
    <header className="h-[75px] items-center flex justify-between">
      <FlexBox alignItems="center" flexDirection="row" className="gap-2">
        <SideNavSm
          routerPaths={routerPaths}
          routes={routes}
          className="block md:hidden px-2 py-2 cursor-pointer hover:bg-accent"
        >
          <Menu size={20} />
        </SideNavSm>

        <BreadCrumbsHelper path={breadcrumbsPath} />
      </FlexBox>
      <div className="flex justify-center items-center">
        {/* <GithubIcon size={37} className="px-2 py-2 hover:bg-accent rounded-md" /> */}
        <span
          className="cursor-pointer py-2 px-2 hover:bg-accent rounded-md"
          onClick={themeToggler}
        >
          {currentTheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
        </span>
        <SignOutHelper />
      </div>
    </header>
  );
};
