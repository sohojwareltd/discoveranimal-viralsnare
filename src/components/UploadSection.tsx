"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

export type UploadState = "initial" | "uploading" | "completed";

interface UploadSectionProps {
  onSubmit?: (file: File, videoLink?: string) => void;
  onUploadStateChange?: (state: UploadState) => void;
  onSubmitSuccess?: () => void;
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-[4px] w-full relative overflow-hidden bg-[#eef2ff] rounded-full">
      <div
        className="absolute bottom-0 left-0 top-0 bg-black transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-6 h-6 relative shrink-0">
      <Image
        src="/spinner.svg"
        alt=""
        fill
        className="object-contain animate-spin"
      />
    
    </div>
  );
}

export default function UploadSection({ onSubmit, onUploadStateChange, onSubmitSuccess }: UploadSectionProps) {
  const [uploadState, setUploadState] = useState<UploadState>("initial");
  
  const updateUploadState = useCallback((newState: UploadState) => {
    setUploadState(newState);
    onUploadStateChange?.(newState);
  }, [onUploadStateChange]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "Kb", "Mb", "Gb"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const simulateUpload = useCallback((file: File) => {
    setSelectedFile(file);
    updateUploadState("uploading");
    setTotalBytes(file.size);
    setUploadedBytes(0);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedBytes((prev) => {
        const newValue = Math.min(prev + file.size / 50, file.size);
        setUploadProgress((newValue / file.size) * 100);
        
        if (newValue >= file.size) {
          clearInterval(interval);
          setTimeout(() => {
            updateUploadState("completed");
          }, 500);
          return file.size;
        }
        return newValue;
      });
    }, 50);
  }, [updateUploadState]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("video/")) {
      simulateUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeVideo = () => {
    updateUploadState("initial");
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalBytes(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || uploadState !== "completed") return;
    
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      onSubmit?.(selectedFile, videoLink);
      setIsSubmitting(false);
      onSubmitSuccess?.();
    }, 2000);
  };

  // Initial state - Upload area
  if (uploadState === "initial") {
    return (
      <div className="flex flex-col gap-3 items-start w-full">
        <div
          className={`bg-[#615fff] border-2 border-[#052e16] border-dashed flex flex-col gap-3 h-[216px] md:h-[240px] items-center justify-center px-8 md:px-10 py-9 rounded-lg w-full ${
            isDragOver ? "border-solid" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col gap-2 items-center w-full">
            <div className="w-8 h-8 relative">
              <Image
                src="/video-icon.svg"
                alt="Video icon"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm md:text-base leading-5 md:leading-6 text-[#faf5ff] text-center">
              Drop your pet&apos;s video here! We&apos;ll review it and contact you if it&apos;s selected 💬
            </p>
          </div>

          {/* Or separator */}
          <div className="flex gap-2 items-center justify-center w-full">
            <div className="h-0 w-8 relative">
            <div className="w-[32px] h-[1px] relative bg-[#faf5ff]"></div>
            </div>
            <p className="text-sm md:text-base leading-5 md:leading-6 text-[#faf5ff] text-center whitespace-pre">
              or
            </p>
            <div className="h-0 w-8 relative">
            <div className="w-[32px] h-[1px] relative bg-[#faf5ff]"></div>
            </div>
          </div>

          {/* Select Video Button */}
          <button
            onClick={handleSelectClick}
            className="flex gap-[10px] items-center justify-center px-4 py-[10px] w-full transition-colors cursor-pointer"
            style={{
              borderRadius: "var(--radius-full, 9999px)",
              border: "1px solid var(--color-green-950, #052E16)",
              background: "var(--color-white, #FFF)",
              boxShadow: "3px 3px 0 0 #000",
              transition: "box-shadow 0.18s cubic-bezier(.4, .2, .2, 1), background 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "6px 6px 0 0 #000";
              (e.currentTarget as HTMLButtonElement).style.background = "#BBF451";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0 0 #000";
              (e.currentTarget as HTMLButtonElement).style.background = "#FFF";
            }}
          >
            <div className="w-4 h-4 relative">
              <Image
                src="/upload-icon.svg"
                alt="Upload"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-bold text-sm leading-5 text-[#052e16] text-center whitespace-pre">
              Select Video
            </p>
          </button>
        </div>

        {/* Pro Tip */}
        <div className="bg-[#c6d2ff] flex gap-[10px] items-center justify-center p-3 rounded-lg w-full">
          <p className="text-sm text-[#052e16] leading-5">
            <span className="font-bold">Pro Tip:</span>
            <span> Raw clips get selected 3× more often! No edits, no filters — just your pet&apos;s natural actions. 🐾</span>
          </p>
        </div>
      </div>
    );
  }

  // Uploading state
  if (uploadState === "uploading") {
    const progressPercentage = Math.round(uploadProgress);
    const uploadedFormatted = formatBytes(uploadedBytes);
    const totalFormatted = formatBytes(totalBytes);

    return (
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="bg-[#615fff] border-2 border-[#052e16] border-dashed flex flex-col gap-3 h-[216px] md:h-[240px] items-center justify-center px-8 md:px-10 py-9 rounded-lg w-full">
          <div className="flex flex-col gap-3 md:gap-6 items-start w-full pt-3 md:pt-8 pb-0">
            <ProgressBar progress={progressPercentage} />
            <div className="flex flex-col gap-1 md:gap-2 items-center justify-center w-full">
              <p className="font-medium text-base leading-6 text-[#eef2ff] text-center w-full">
                Please wait, we&apos;re uploading your video...
              </p>
              <div className="flex gap-1 items-start font-medium text-sm leading-5 text-[#a3b3ff] text-center whitespace-pre">
                <p className="relative shrink-0 lowercase">
                  {uploadedFormatted.toLowerCase()}/{totalFormatted.toLowerCase()} uploaded
                </p>
                <p className="relative shrink-0">
                  {progressPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed state - Form
  return (
    <div className="flex flex-col gap-5 items-start w-full pb-6">
      <div className="flex flex-col gap-5 items-start w-full">
        {/* Video File Display */}
        <div className="flex flex-col gap-2 items-start justify-center rounded-lg w-full">
          <div className="flex flex-col gap-[2px] items-start">
            <div className="flex gap-[2px] items-start">
              <p className="font-medium leading-6 text-[#052e16] text-base text-nowrap whitespace-pre">
                Your video
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#09090b] flex gap-3 items-center pl-4 pr-[10px] py-[10px] rounded-lg w-full">
            <p className="basis-0 grow font-medium leading-6 text-[#052e16] text-base min-w-0 truncate">
              {selectedFile?.name || "videonamefile.mp4"}
            </p>
            <button
              onClick={handleChangeVideo}
              className="bg-[#052e16] flex gap-2 items-center justify-center px-[10px] py-2 rounded-lg shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-4 h-4 relative shrink-0">
                <Image
                  src="/edit-icon.svg"
                  alt="Edit"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-medium leading-5 text-white text-sm text-center text-nowrap whitespace-pre">
                Change
              </p>
            </button>
          </div>
        </div>

        {/* Video Link Input */}
        <div className="flex flex-col gap-[6px] items-start w-full">
          <div className="flex flex-col gap-2 items-start w-full">
            <div className="flex flex-col gap-[2px] items-start w-full">
              <div className="flex gap-[2px] items-start w-full">
                <p className="basis-0 grow font-medium leading-6 text-[#052e16] text-base min-w-0">
                  Share with us a link to your video (optional)
                </p>
              </div>
            </div>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=9S5m4NDitwI"
              className="bg-white border border-[#09090b] flex gap-3 items-center px-[14px] py-3 rounded-lg w-full font-normal leading-6 text-[#052e16] text-base"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || uploadState !== "completed" || !selectedFile}
        className="bg-[#bbf451] border border-[#052e16] flex gap-4 items-center justify-center px-6 py-3.5 rounded-full w-full md:w-[560px] max-w-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          boxShadow: "3px 3px 0 0 #000",
          transition: "box-shadow 0.18s cubic-bezier(.4, .2, .2, 1), background 0.18s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "6px 6px 0 0 #000";
          (e.currentTarget as HTMLButtonElement).style.background = "#bbf451";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0 0 #000";
          (e.currentTarget as HTMLButtonElement).style.background = "#bbf451";
        }}
      >
        <p className="font-bold text-base leading-6 text-[#052e16] text-center whitespace-pre">
          {isSubmitting ? "Submitting Video" : "Submit & Get Rewarded"}
        </p>
        {isSubmitting && <Spinner />}
      </button>
    </div>
  );
}

