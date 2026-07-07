import { useState } from "react";

import UploadCard from "./UploadCard";
import FileList from "./FileList";
import SettingsPanel from "./SettingsPanel";

export default function UploadSection() {
  const [files, setFiles] = useState([]);

  const addFiles = (selectedFiles) => {
    const newFiles = [];

    selectedFiles.forEach((file) => {
      const exists = files.some(
        (item) => item.name === file.name && item.size === file.size,
      );

      if (!exists) {
        newFiles.push(file);
      }
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="lg:col-span-2 space-y-8">
            <UploadCard addFiles={addFiles} />

            {files.length > 0 && (
              <FileList
                files={files}
                removeFile={removeFile}
                clearFiles={clearFiles}
              />
            )}
          </div>

          {/* Right */}

          <SettingsPanel files={files} />
        </div>
      </div>
    </section>
  );
}
