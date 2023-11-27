export const AppLayout = ({ children }) => {
  return (
    <div className="bg-black h-screen">
      <div className="font-lato text-gray-100 max-w-xl lg:max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};
