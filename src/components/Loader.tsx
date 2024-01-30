type LoaderProps = {
  width?: string;
  length?: number;
};

function Loader({ width = "unset", length = 4 }: LoaderProps) {
  // console.log(length);

  const loadingBars = Array.from({ length }, (_, index) => (
    <div
      key={index}
      className={`w-${width} h-4 bg-stone-300 rounded mb-2`}
    ></div>
  ));
  // console.log(loadingBars);

  return (
    <div className={`width-${width} p-4 animate-pulse`}>{loadingBars}</div>
  );
}

export default Loader;
