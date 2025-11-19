"use client";

import Image from "next/image";
import { useState } from "react";
import UploadSection, { type UploadState } from "@/components/UploadSection";
import MultiStepForm from "@/components/MultiStepForm";

function Footer() {
  return (
    <footer className="flex items-center justify-center pb-3 pt-5 px-5 md:px-[120px] w-full max-w-[1440px]">
      <p className="opacity-50 text-center text-sm text-[#052e16] font-normal leading-5 whitespace-pre-wrap">
        © 2025 Discover Animal | How It Works | Terms Of Submission
      </p>
    </footer>
  );
}

export default function Home() {
  const [uploadState, setUploadState] = useState<UploadState>("initial");
  const [isMultiStepActive, setIsMultiStepActive] = useState(false);

  const handleSubmit = (file: File, videoLink?: string) => {
    console.log("File submitted:", file.name);
    if (videoLink) {
      console.log("Video link:", videoLink);
    }
    // Handle submission logic here
  };

  const handleUploadStateChange = (state: UploadState) => {
    setUploadState(state);
  };

  const handleSubmissionComplete = () => {
    setIsMultiStepActive(true);
  };

  const handleMultiStepExit = () => {
    setIsMultiStepActive(false);
    setUploadState("initial");
  };

  if (isMultiStepActive) {
    return <MultiStepForm onExit={handleMultiStepExit} />;
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen w-full overflow-x-hidden"
      style={{
        background: "linear-gradient(114deg, #CDFEE5 30.62%, #CFF17E 89.55%)",
      }}
    >
      {/* Header */}
      <header
        className="border-b border-[rgba(5,46,22,0.1)] flex flex-col gap-[10px] items-start px-5 md:px-[120px] py-4 w-full backdrop-blur-sm"
        style={{
          background: "linear-gradient(114deg, #CDFEE5 30.62%, #CFF17E 89.55%)"
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-3 items-center">
            <div className="border-2 border-[#052e16] rounded-full shrink-0 w-[42px] h-[42px] md:w-12 md:h-12 relative overflow-hidden">
              <Image
                src="/logo.png"
                alt="Discover Animal Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <p className="font-black md:font-bold text-base md:text-xl leading-[20px] md:leading-[22px] text-[#052e16]">
              Discover <br /> Animal
            </p>
          </div>
          {/* Hamburger menu on mobile, Instagram on desktop */}
          <button className="w-8 h-8 relative hover:opacity-70 transition-opacity md:hidden">
            <Image
              src="/hamburger-menu.svg"
              alt="Menu"
              fill
              className="object-contain"
            />
          </button>
          <button className="hidden md:block w-8 h-8 relative hover:opacity-70 transition-opacity">
            <Image
              src="/instagram-icon.svg"
              alt="Instagram"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between grow px-6 md:px-[120px] py-6 md:py-14 w-full max-w-[1440px] gap-6 md:gap-8 overflow-y-auto">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:gap-8 items-start max-w-[560px] grow w-full md:w-auto">
          {/* Upload Section - Desktop - Hide after upload */}

          <div className="hidden md:flex flex-col gap-[10px] items-start w-full relative">
            <div className="flex flex-col gap-4 items-start w-full">
              <h1 className="font-bold text-[48px] leading-[48px] text-[#052e16] w-full">
                Upload your cutest animal video 🐶
              </h1>
              <p className="text-xl leading-7 text-[#052e16] w-full">
                <span className="font-bold text-[#615fff]">Upload it and get paid</span>
                <span> when your clip goes viral! Join thousands of pet lovers sharing their happiest moments.</span>
              </p>
            </div>

            {/* Arrow decoration - desktop only */}
            <div className="absolute left-[-87px] top-[133px] opacity-80 z-[1]">
              <div className="w-[128px] h-[130px] relative">
                <Image
                  src="/arrow-part1.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>


          {/* Mobile Header Section - Hide after upload */}
          {uploadState !== "completed" && (
            <div className="relative w-full md:hidden flex items-start gap-0 pb-4 shrink-0">
              {/* Text Section - Mobile (Left Column) */}
              <div className="flex flex-col gap-4 grow items-start min-w-0">
                <h1 className="font-black text-2xl leading-[32px] text-[#052e16] w-full text-left">
                  Upload your cutest animal video 🐶
                </h1>
                <p className="text-sm leading-5 text-[#052e16] w-full text-left">
                  <span className="font-bold text-[#615fff]">Upload it and get paid</span>
                  <span> when your clip goes viral! Join thousands of pet lovers sharing their happiest moments.</span>
                </p>
              </div>

              {/* Arrow decoration - mobile positioning */}
              <div className="absolute left-[117px] top-[211px] rotate-45 opacity-80 z-10">
                <div className="w-[128px] h-[130px] relative">
                  <Image
                    src="/arrow-part1.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Animal illustration on mobile (Right Column) */}
              <div className="h-[228px] w-[160px] relative shrink-0">
                <Image
                  src="/bg-animals.png"
                  alt="Animals illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Primary Actions */}
          <div className="flex flex-col items-start w-full px-0 md:px-0 z-[10]" >
            <UploadSection
              onSubmit={handleSubmit}
              onUploadStateChange={handleUploadStateChange}
              onSubmitSuccess={handleSubmissionComplete}
            />
          </div>
        </div>

        {/* Right Section - Background Image - Desktop only */}
        <div className="hidden md:block h-[600px] w-[420px] relative shrink-0">
          <Image
            src="/bg-animals.png"
            alt="Animals illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
