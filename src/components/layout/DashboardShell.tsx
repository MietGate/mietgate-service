import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {

  return (

    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50">


      <div className="hidden md:block">
        <Sidebar />
      </div>



      <div className="flex min-w-0 flex-1 flex-col">


        <Topbar />


        <main className="w-full flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8">

          {children}

        </main>


      </div>


    </div>

  );
}