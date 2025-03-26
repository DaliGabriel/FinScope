import { Header } from "./Header";
import { Sidebar } from "./Sidebar/SideBar";
import { navItems } from "../../lib/navigation";

export const GeneralLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Finscope" />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar navItems={navItems} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};
