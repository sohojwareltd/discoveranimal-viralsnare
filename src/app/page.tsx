"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [isDragOver, setIsDragOver] = useState(false);

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
    // Handle file drop logic here
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen w-full"
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
              Discover Animal
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
      <main className="flex flex-col md:flex-row items-center justify-between grow px-6 md:px-[120px] py-6 md:py-14 w-full max-w-[1440px] gap-6 md:gap-8">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:gap-8 items-start max-w-[560px] grow w-full md:w-auto">
          {/* Upload Section - Desktop */}
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
            <div className="absolute left-[-87px] top-[133px] opacity-80">
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

          {/* Mobile Header Section */}
          <div className="relative w-full md:hidden flex items-center gap-0 pb-4">
            {/* Text Section - Mobile (Left Column) */}
            <div className="flex flex-col gap-4 grow items-start min-w-0 pb-4">
              <h1 className="font-black text-2xl leading-[32px] text-[#052e16] w-full text-left">
                Upload your cutest animal video 🐶
              </h1>
              <p className="text-sm leading-5 text-[#052e16] w-full text-left">
                <span className="font-bold text-[#615fff]">Upload it and get paid</span>
                <span> when your clip goes viral! Join thousands of pet lovers sharing their happiest moments.</span>
              </p>
            </div>
            
            {/* Arrow decoration - mobile positioning */}
            <div className="absolute left-[135px] top-[211px] rotate-45 opacity-80 z-10">
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

          {/* Primary Actions */}
          <div className="flex flex-col items-start w-full px-0 md:px-0">
            <div className="flex flex-col gap-5 md:gap-5 items-start w-full pb-6">
              {/* Upload Container */}
              <div className="flex flex-col gap-3 items-start w-full">
                <div
                  className={`bg-[#615fff] border-2 border-[#052e16] border-dashed flex flex-col gap-3 h-[216px] md:h-[240px] items-center justify-center px-8 md:px-10 py-9 rounded-lg w-full ${
                    isDragOver ? "border-solid" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
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
                      Drop your pet's video here! We'll review it and contact you if it's selected 💬
                    </p>
                  </div>

                  {/* Or separator */}
                  <div className="flex gap-2 items-center justify-center w-full">
                    <div className="h-0 w-8 relative">
                      <Image
                        src="/line.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm md:text-base leading-5 md:leading-6 text-[#faf5ff] text-center whitespace-pre">
                      or
                    </p>
                    <div className="h-0 w-8 relative">
                      <Image
                        src="/line.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Select Video Button */}
                  <button
                    className="flex gap-[10px] items-center justify-center px-4 py-[10px] w-full hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{
                      borderRadius: "var(--radius-full, 9999px)",
                      border: "1px solid var(--color-green-950, #052E16)",
                      background: "var(--color-white, #FFF)",
                      boxShadow: "3px 3px 0 0 #000",
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
            </div>

            {/* Submit Button */}
            <button
              disabled
              className="bg-[#bbf451] border border-[#052e16] flex gap-4 items-center justify-center px-6 py-3.5 rounded-full opacity-10 cursor-not-allowed w-full md:w-[560px] max-w-full"
              aria-label="Button disabled until the video uploaded"
            >
              <p className="font-bold text-base leading-6 text-[#052e16] text-center whitespace-pre">
                Submit & Get Rewarded
              </p>
            </button>
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
