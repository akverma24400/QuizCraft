import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

export default function UploadCard({ addFiles }) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".txt"];

  const handleFiles = (selectedFiles) => {
    const files = Array.from(selectedFiles);

    const validFiles = files.filter((file) => {
      const extension = "." + file.name.split(".").pop().toLowerCase();

      return allowedTypes.includes(extension);
    });

    if (validFiles.length) {
      addFiles(validFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${dragging ? "border-blue-600 bg-blue-50" : "border-slate-300 bg-white"}
      `}
      onClick={() => inputRef.current.click()}
    >
      <div className="py-20 px-10 flex flex-col items-center">
        <div
          className={`rounded-full p-6 transition
          ${dragging ? "bg-blue-100" : "bg-slate-100"}`}
        >
          <UploadCloud
            className={`w-16 h-16
            ${dragging ? "text-blue-600" : "text-slate-600"}`}
          />
        </div>

        <h2 className="text-3xl font-bold mt-8">Upload Documents</h2>

        <p className="text-slate-500 mt-3 text-center">
          Drag & Drop your study material here
          <br />
          or click to browse
        </p>

        <div className="flex gap-3 mt-8 flex-wrap justify-center">
          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">
            PDF
          </span>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            DOCX
          </span>

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
            PPT
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            TXT
          </span>
        </div>

        <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition">
          Browse Files
        </button>

        <div className="mt-8 flex items-center gap-2 text-slate-400">
          <FileText className="w-5 h-5" />

          <span>Multiple files supported</span>
        </div>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
