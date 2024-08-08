import MaxwidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxwidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxwidthWrapper>
  );
};

export default Layout;
