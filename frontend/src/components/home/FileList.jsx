import FileItem from "./FileItem";

export default function FileList({ files, removeFile, clearFiles }) {
  if (!files.length) return null;

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Uploaded Files</h2>

        <button onClick={clearFiles} className="text-red-600 hover:underline">
          Remove All
        </button>
      </div>

      <div className="space-y-4">
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            index={index}
            removeFile={removeFile}
          />
        ))}
      </div>
    </div>
  );
}
