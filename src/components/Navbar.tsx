import Link from "next/link";
import MaxwidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LogoutLink,
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.id === process.env.ADMIN_USER;

  return (
    <nav className="sticky z-[100] h-14 inset-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxwidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>{" "}
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <LogoutLink>
                  <Button variant="ghost" size="sm">
                    Sign out
                  </Button>
                </LogoutLink>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <RegisterLink>
                  <Button variant="ghost" size="sm">
                    Sign up
                  </Button>
                </RegisterLink>
                <LoginLink>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </LoginLink>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  );
};

export default Navbar;
