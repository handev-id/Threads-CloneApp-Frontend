export const Loading = () => {
  return (
    <main className="fixed left-0 top-0 w-full h-screen bg-[#101010]/50 flex justify-center items-center z-50">
      <div className="spinner"></div>
    </main>
  );
};

export const LoadingSmall = () => {
  return <div className="spinner2"></div>;
};
