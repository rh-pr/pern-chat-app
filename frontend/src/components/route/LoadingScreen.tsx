const LoadingScreen = ({ bg }: { bg: string }) => (
  <div className="h-screen w-screen flex justify-center items-center"
       style={{ backgroundImage: `url(${bg})` }}>
    loading...
  </div>
);

export default LoadingScreen;