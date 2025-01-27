"use client";

import { useState } from "react";
import { mockFiles } from "../lib/mock-data";
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== null) {
      const folder = mockFiles.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder(null)}
              variant="ghost"
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Button>
            {getBreadcrumbs().map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {getCurrentFiles().map((file) => (
              <li
                key={file.id}
                className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
              >
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-6 flex items-center">
                    {file.type === "folder" ? (
                      <button
                        onClick={() => handleFolderClick(file.id)}
                        className="flex items-center text-gray-100 hover:text-blue-400"
                      >
                        <Folder className="mr-3" size={20} />
                        {file.name}
                      </button>
                    ) : (
                      <Link
                        href={file.url ?? "#"}
                        className="flex items-center text-gray-100 hover:text-blue-400"
                      >
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                      </Link>
                    )}
                  </div>
                  <div className="col-span-3 text-gray-400">
                    {file.type === "folder" ? "Folder" : "File"}
                  </div>
                  <div className="col-span-3 text-gray-400">
                    {file.type === "folder" ? "--" : "2 MB"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
