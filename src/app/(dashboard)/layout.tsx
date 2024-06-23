import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex h-full flex-1">{children}</section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
