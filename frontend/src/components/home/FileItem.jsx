import { FileText, X } from "lucide-react";

export default function FileItem({ file, index, removeFile }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
      <div className="flex items-center gap-4">
        <FileText className="text-blue-600" />

        <div>
          <h3 className="font-semibold">{file.name}</h3>

          <p className="text-sm text-slate-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>

      <button
        onClick={() => removeFile(index)}
        className="rounded-full p-2 hover:bg-red-100"
      >
        <X className="text-red-500" />
      </button>
    </div>
  );
}
