export const AppLayout = ({ children }) => {
  return (
    <div className="bg-black h-screen">
      <div className="font-lato text-gray-200 max-w-xl lg:max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};
