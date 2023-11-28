import { Header } from "components/Header";

export const AppLayout = ({ children }) => (
  <>
    <div className="bg-slate-50 dark:bg-black h-screen antialiased">
      <Header />
      <div className="bg-white h-full dark:bg-zinc-900 font-lato text-gray-200 max-w-xl lg:max-w-6xl mx-auto pt-20">
        {children}
      </div>
    </div>
  </>
);
