import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center pb-4">
        <ScaleLoader loading={true} color="white" height={18} width={12} />
      </div>
      <span className="text-center font-bold">Analysing liked tracks...</span>
    </div>
  );
}
