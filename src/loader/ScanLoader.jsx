import { Oval } from "react-loader-spinner";

export default function ScanLoader({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      <Oval
        height={60}
        width={60}
        color="#10b981"
        secondaryColor="#d1fae5"
        strokeWidth={4}
        strokeWidthSecondary={4}
        visible={true}
        ariaLabel="oval-loading"
      />

      <p className="mt-4 text-emerald-600 font-medium">
        Scanning receipt...
      </p>

      {progress !== null && (
        <p className="mt-2 text-sm text-gray-500">
          {progress}%
        </p>
      )}

    </div>
  );
}
