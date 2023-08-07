import Scale from "@/components/ui/loading/scale-loader";

export default function SuggestionsLoading() {
  return (
    <div>
      <div className="flex justify-center pb-4">
        <Scale />
      </div>
      <span className="text-center font-bold">Analysing liked tracks...</span>
    </div>
  );
}
