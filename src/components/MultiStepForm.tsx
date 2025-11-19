"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type Step = 1 | 2 | 3 | 4;

const baseInputClasses =
  "w-full rounded-lg bg-[#f5f5f5] border border-transparent px-4 py-3 text-base text-[#052e16] placeholder:text-[#052e16]/60 focus:bg-white focus:border-[#00c951] focus:outline-none transition-colors";

const textareaClasses = cx(baseInputClasses, "min-h-[96px] resize-none leading-6");

const buttonBaseClasses =
  "w-full rounded-full border border-green-950 bg-lime-300 px-6 py-3.5 text-center font-bold text-base text-green-950 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-950 shadow-[3px_3px_0_0_#000]";

interface CheckOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

function CheckOption({ label, description, selected, onClick }: CheckOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
        selected
          ? "border-[#052e16] bg-[#f5f5f5]"
          : "border-transparent bg-[#f5f5f5] hover:border-[#d4d4d4]"
      )}
    >
      <div className="flex flex-col">
        <span className="text-base font-medium text-[#052e16]">{label}</span>
        {description && (
          <span className="text-sm text-[#052e16] opacity-60">{description}</span>
        )}
      </div>
      <span
        className={cx(
          "inline-flex h-5 w-5 items-center justify-center rounded-full border",
          selected ? "border-[#052e16] bg-[#052e16]" : "border-[#d4d4d4] bg-white"
        )}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  html?: boolean;
  onTermsClick?: (type: "service" | "submission") => void;
}

function CheckboxField({ label, checked, onChange, html, onTermsClick }: CheckboxFieldProps) {
  const handleLabelClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if clicked element or its parent is a terms link
    const termsLink = target.closest('.terms-link') as HTMLElement;
    if (termsLink) {
      e.preventDefault();
      e.stopPropagation();
      const termsType = termsLink.getAttribute("data-terms-type");
      if (termsType === "service" || termsType === "submission") {
        onTermsClick?.(termsType as "service" | "submission");
      }
    }
  };

  return (
    <label className="flex items-start gap-3 text-base text-[#052e16]" onClick={handleLabelClick}>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-[#d4d4d4] text-[#052e16] focus:ring-[#00c951]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {html ? (
        <span
          className="leading-6"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      ) : (
        <span className="leading-6">{label}</span>
      )}
    </label>
  );
}

interface MultiStepFormProps {
  onExit: () => void;
}

interface FormState {
  videoTitle: string;
  videoDescription: string;
  filmedWhen: string;
  filmedWhere: string;
  peopleNames: string[];
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  age: string;
  socialHandle: string;
  includesPeople: boolean;
  filmedBy: string;
  companyAsked: boolean;
  companyName: string;
  sharedElsewhere: string;
  otherPlatform: string;
  howDidYouSubmit: string;
  anythingElse: string;
  agreedTerms: boolean;
  agreedSubmission: boolean;
  certifyRights: boolean;
  signatureConsent: boolean;
  signature: string;
}

const initialFormState: FormState = {
  videoTitle: "",
  videoDescription: "",
  filmedWhen: "",
  filmedWhere: "",
  peopleNames: [],
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phone: "",
  age: "Under 13",
  socialHandle: "",
  includesPeople: false,
  filmedBy: "I filmed it",
  companyAsked: true,
  companyName: "",
  sharedElsewhere: "No, this is the first place I'm submitting it",
  otherPlatform: "",
  howDidYouSubmit: "",
  anythingElse: "",
  agreedTerms: true,
  agreedSubmission: true,
  certifyRights: true,
  signatureConsent: false,
  signature: "",
};

export default function MultiStepForm({ onExit }: MultiStepFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [termsModal, setTermsModal] = useState<"service" | "submission" | null>(null);

  const headerContent = useMemo(() => {
    if (step === 1) {
      return {
        title: "Tell us about your video",
        subtitle: "We just need a few quick details to complete your submission.",
        highlight: (
          <div className="mb-6 flex items-center gap-4 rounded-lg bg-[#dcfce7] px-4 py-3 text-sm text-[#052e16]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#00C951" />
              <path d="M14.6663 6.5L8.24967 12.9167L5.33301 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold leading-5">
                Your video successfully submitted
              </p>
              <p className="text-sm leading-5">
                please fill all the informations below to complete your submissions
              </p>
            </div>
          </div>
        ),
      };
    }
    if (step === 2) {
      return {
        title: "Tell us about you",
        subtitle: "We’ll use your information if your video is selected or licensed.",
      };
    }
    if (step === 3) {
      return {
        title: "Rights Verification",
        subtitle: "Confirm rights & permissions of your video.",
      };
    }
    return {
      title: "You're Almost Done — Just Confirm & Sign Below",
      subtitle: "",
    };
  }, [step]);

  const handleInputChange = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleBack = () => {
    if (step === 1) {
      onExit();
    } else {
      setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
    }
  };

  const handleContinue = () => {
    if (step === 4) {
      setShowSuccess(true);
      return;
    }
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onExit();
    setStep(1);
    setFormState(initialFormState);
  };

  const renderStepOne = () => (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            What’s the title of your video? <span className="text-[#00c951]">*</span>
          </span>
          <span className="text-sm text-[#052e16] opacity-60">
            Feel free to suggest one — we can help improve it later
          </span>
          <input
            type="text"
            className={baseInputClasses}
            value={formState.videoTitle}
            onChange={handleInputChange("videoTitle")}
            placeholder="Add your title"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            Tell us what's happening in the video <span className="text-[#00c951]">*</span>
          </span>
          <textarea
            className={textareaClasses}
            value={formState.videoDescription}
            onChange={handleInputChange("videoDescription")}
            placeholder="Share a short description of the moment. Be as clear as possible"
          />
        </label>
        <div className="h-px w-full bg-[#e5e5e5]" />
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            When was the video filmed? <span className="text-[#00c951]">*</span>
          </span>
          <input
            type="text"
            className={baseInputClasses}
            value={formState.filmedWhen}
            onChange={handleInputChange("filmedWhen")}
            placeholder="2 days ago"
          />
        </label>
        <div className="h-px w-full bg-[#e5e5e5]" />
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            Where was it filmed? <span className="text-[#00c951]">*</span>
          </span>
          <div className="flex items-center gap-3 rounded-lg bg-[#f5f5f5] px-[14px] py-3">
            <Image src="/search.svg" alt="search" width={25} height={25} />
            <input
              type="text"
              className="w-full bg-transparent text-base text-[#052e16] placeholder:text-[#052e16]/60 focus:outline-none"
              value={formState.filmedWhere}
              onChange={handleInputChange("filmedWhere")}
              placeholder="search or type address"
            />
          </div>
        </label>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex w-full flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            What’s your first name? <span className="text-[#00c951]">*</span>
          </span>
          <input
            type="text"
            className={baseInputClasses}
            value={formState.firstName}
            onChange={handleInputChange("firstName")}
          />
        </label>
        <label className="flex w-full flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            And your last name? <span className="text-[#00c951]">*</span>
          </span>
          <input
            type="text"
            className={baseInputClasses}
            value={formState.lastName}
            onChange={handleInputChange("lastName")}
          />
        </label>
      </div>
      <div className="h-px w-full bg-[#e5e5e5]" />
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          What’s the best email to reach you at? <span className="text-[#00c951]">*</span>
        </span>
        <input
          type="email"
          className={baseInputClasses}
          value={formState.email}
          onChange={handleInputChange("email")}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          Please confirm your email <span className="text-[#00c951]">*</span>
        </span>
        <input
          type="email"
          className={baseInputClasses}
          value={formState.confirmEmail}
          onChange={handleInputChange("confirmEmail")}
        />
      </label>
      <div className="h-px w-full bg-[#e5e5e5]" />
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          What’s your phone number?
        </span>
        <span className="text-sm text-[#052e16] opacity-60">
          Only if you’d like faster updates by SMS or WhatsApp
        </span>
        <input
          type="tel"
          className={baseInputClasses}
          value={formState.phone}
          onChange={handleInputChange("phone")}
        />
      </label>
      <div className="h-px w-full bg-[#e5e5e5]" />
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          How old are you? <span className="text-[#00c951]">*</span>
        </span>
        <div className="relative w-full">
          <select
            className={cx(baseInputClasses, "appearance-none pr-10")}
            value={formState.age}
            onChange={handleInputChange("age")}
          >
            <option>Under 13</option>
            <option>13-17</option>
            <option>18-24</option>
            <option>25-34</option>
            <option>35+</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src="/dropdown.svg"
              alt=""
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </label>
      <div className="h-px w-full bg-[#e5e5e5]" />
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          What’s your social media @username?
        </span>
        <span className="text-sm text-[#052e16] opacity-60">
          Helps us credit you and tag you if needed
        </span>
        <input
          type="text"
          className={baseInputClasses}
          value={formState.socialHandle}
          onChange={handleInputChange("socialHandle")}
          placeholder="@username"
        />
      </label>
    </div>
  );

  const renderStepThree = () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-base font-medium text-[#052e16]">
          Does the video include other people? <span className="text-[#00c951]">*</span>
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <CheckOption
            label="No"
            selected={!formState.includesPeople}
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                includesPeople: false,
                peopleNames: [],
              }))
            }
          />
          <CheckOption
            label="Yes"
            selected={formState.includesPeople}
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                includesPeople: true,
                peopleNames: prev.peopleNames.length ? prev.peopleNames : [""],
              }))
            }
          />
        </div>
      </div>
      <div className="h-px w-full bg-[#d4d4d4]" />
      {formState.includesPeople && (
        <div className="rounded-lg border border-[#d4d4d4] bg-white p-4">
          <label className="flex flex-col gap-2">
            <span className="text-base font-medium text-[#052e16]">
              Please list their first names <span className="text-[#00c951]">*</span>
            </span>
            <div className="flex flex-col gap-3">
              {formState.peopleNames.map((name, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    className={`${baseInputClasses} bg-[#f5f5f5] border-[#d4d4d4] focus:bg-white`}
                    value={name}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFormState((prev) => {
                        const next = [...prev.peopleNames];
                        next[index] = value;
                        return { ...prev, peopleNames: next };
                      });
                    }}
                    placeholder="Michael"
                  />
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ff3b30] text-[#ff3b30]"
                    aria-label="Remove person"
                    onClick={() =>
                      setFormState((prev) => ({
                        ...prev,
                        peopleNames: prev.peopleNames.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 text-base font-medium text-[#052e16]"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    peopleNames: [...prev.peopleNames, ""],
                  }))
                }
              >
                <span className="text-xl">＋</span>
                Add more
              </button>
            </div>
          </label>
        </div>
      )}
      <div className="h-px w-full bg-[#d4d4d4]" />
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          Who filmed this video? <span className="text-[#00c951]">*</span>
        </span>
        <select
          className={cx(baseInputClasses, "appearance-none")}
          value={formState.filmedBy}
          onChange={handleInputChange("filmedBy")}
        >
          <option>I filmed it</option>
          <option>Friend or family member</option>
          <option>Professional videographer</option>
        </select>
      </label>
      <div className="h-px w-full bg-[#d4d4d4]" />
      <div>
        <p className="text-base font-medium text-[#052e16]">
          Has any company or creator asked to license or repost this video?{" "}
          <span className="text-[#00c951]">*</span>
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <CheckOption
            label="No"
            selected={!formState.companyAsked}
            onClick={() =>
              setFormState((prev) => ({ ...prev, companyAsked: false }))
            }
          />
          <CheckOption
            label="Yes"
            selected={formState.companyAsked}
            onClick={() =>
              setFormState((prev) => ({ ...prev, companyAsked: true }))
            }
          />
        </div>
        {formState.companyAsked && (
          <div className="mt-4 rounded-lg border border-[#d4d4d4] bg-white p-4">
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#052e16]">
                Please share their name with us <span className="text-[#00c951]">*</span>
              </span>
              <input
                type="text"
                className={baseInputClasses}
                value={formState.companyName}
                onChange={handleInputChange("companyName")}
              />
            </label>
          </div>
        )}
      </div>
      <div className="h-px w-full bg-[#d4d4d4]" />
      <div>
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-[#052e16]">
            Have you shared or submitted this video anywhere else?
          </span>
          <span className="text-sm text-[#052e16] opacity-60">
            This includes emailing it, submitting a form, signing with a company, or posting to a licensing platform
          </span>
        </label>
        <div className="relative w-full mt-3">
          <select
            className={cx(baseInputClasses, "appearance-none pr-10")}
            value={formState.sharedElsewhere}
            onChange={handleInputChange("sharedElsewhere")}
          >
            <option>No, this is the first place I'm submitting it</option>
            <option>Yes, I submitted it through a website or form before</option>
            <option>Yes, I allowed someone else to use it, but I still own the rights</option>
            <option>Yes, I gave full rights to another company (exclusive)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src="/dropdown.svg"
              alt=""
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
        {formState.sharedElsewhere === "Yes, I submitted it through a website or form before" && (
          <div className="mt-4 rounded-lg border border-[#d4d4d4] bg-white p-4">
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#052e16]">
                Which company or platform? <span className="text-[#00c951]">*</span>
              </span>
              <input
                type="text"
                className={baseInputClasses}
                value={formState.otherPlatform}
                onChange={handleInputChange("otherPlatform")}
              />
            </label>
          </div>
        )}
        {formState.sharedElsewhere === "Yes, I allowed someone else to use it, but I still own the rights" && (
          <div className="mt-4 rounded-lg border border-[#d4d4d4] bg-white p-4">
            <label className="flex flex-col gap-2">
              <div className="flex flex-col gap-[2px]">
                <span className="text-base font-medium text-[#052e16]">
                  How did you submit it? <span className="text-[#00c951]">*</span>
                </span>
                <span className="text-sm text-[#052e16] opacity-60">
                  Form, DM, email, etc
                </span>
              </div>
              <input
                type="text"
                className={baseInputClasses}
                value={formState.howDidYouSubmit}
                onChange={handleInputChange("howDidYouSubmit")}
              />
            </label>
          </div>
        )}
        {formState.sharedElsewhere === "Yes, I gave full rights to another company (exclusive)" && (
          <div className="mt-4 rounded-lg border border-[#d4d4d4] bg-white p-4">
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#052e16]">
                Anything else we should know? <span className="text-[#00c951]">*</span>
              </span>
              <textarea
                className={textareaClasses}
                value={formState.anythingElse}
                onChange={handleInputChange("anythingElse")}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepFour = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <CheckboxField
          label={`I agree to the <span class="underline font-semibold terms-link cursor-pointer" data-terms-type="service">Terms of Service</span>.`}
          checked={formState.agreedTerms}
          onChange={(value) => setFormState((prev) => ({ ...prev, agreedTerms: value }))}
          html
          onTermsClick={setTermsModal}
        />
        <CheckboxField
          label={`I agree to the <span class="underline font-semibold terms-link cursor-pointer" data-terms-type="submission">Terms of Submission</span>.`}
          checked={formState.agreedSubmission}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, agreedSubmission: value }))
          }
          html
          onTermsClick={setTermsModal}
        />
        <CheckboxField
          label="I certify that I am the rights holder or have authority to grant rights to this video, and that all information I provided is accurate."
          checked={formState.certifyRights}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, certifyRights: value }))
          }
        />
        <CheckboxField
          label="I understand that typing my name below counts as my electronic signature."
          checked={formState.signatureConsent}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, signatureConsent: value }))
          }
        />
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          Type your full name to sign <span className="text-[#00c951]">*</span>
        </span>
        <span className="text-sm text-[#052e16] opacity-60">
          your typed name is your electronic signature
        </span>
        <input
          type="text"
          className={baseInputClasses}
          value={formState.signature}
          onChange={handleInputChange("signature")}
          placeholder="John Doe"
        />
      </label>
      <div>
        <p className="text-sm text-[#052e16]">Signature Preview</p>
        <div className="mt-2 rounded-lg bg-[#f0fdf4] px-4 py-6 text-center text-[32px] text-[#052e16]" style={{ fontFamily: 'var(--font-alex-brush), cursive' }}>
          {formState.signature || "Sample Signature"}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      case 4:
        return renderStepFour();
      default:
        return null;
    }
  };

  const stepLabel = step === 4 ? "FINAL STEP" : `STEP ${step}/4`;

  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{
        background: "linear-gradient(114deg, #CDFEE5 30.62%, #CFF17E 89.55%)",
      }}
    >
      <header className="w-full border-b border-[rgba(5,46,22,0.1)] bg-white backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 py-4 md:px-[120px]">
          <button
            type="button"
            className="flex items-center gap-2 text-base font-semibold text-[#052e16]"
            onClick={handleBack}
          >
            <span className="text-xl">&lt;</span>
            Back
          </button>
          <p className="text-base text-[#052e16]">{stepLabel}</p>
        </div>
        <div className="flex h-1 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cx(
                "flex-1",
                index < step ? "bg-[#00c951]" : "bg-[#dcfce7]"
              )}
            />
          ))}
        </div>
      </header>

      <main
        className="flex flex-1 justify-center px-6 py-8 md:px-[120px]"
        style={{ background: "var(--color-green-50, #F0FDF4)" }}
      >
        <div className="w-full max-w-[512px] rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {step === 1 ? headerContent.highlight : null}
          <div className="flex flex-col gap-2 pb-6">
            <h1 className="text-2xl font-bold text-[#052e16]">{headerContent.title}</h1>
            {headerContent.subtitle && (
              <p className="text-base text-[#052e16] opacity-60">
                {headerContent.subtitle}
              </p>
            )}
          </div>


          {renderCurrentStep()}
          <div className="mt-8">
            <button type="button" className={buttonBaseClasses} onClick={handleContinue}>
              {step === 4 ? "Agree & Submit Video" : "Continue"}
            </button>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-[360px] rounded-2xl bg-white px-8 pb-10 pt-8 text-center shadow-lg animate-slide-up">
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#052e16] text-white transition-opacity hover:opacity-80"
              onClick={handleCloseSuccess}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mx-auto mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full overflow-hidden">
              <img
                src="/success.gif"
                alt="Success"
                className="h-[120px] w-[120px] object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#052e16]">
              Video Submission Successful!
            </h2>
            <p className="mt-2 text-sm text-[#71717b]">
              Congratulations! Your video has been successfully submitted. Our team will review it shortly.
            </p>
            <button
              type="button"
              className={cx(buttonBaseClasses, "mt-6")}
              onClick={handleCloseSuccess}
            >
              Submit another video
            </button>
          </div>
        </div>
      )}

      {termsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-[800px] max-h-[90vh] rounded-2xl bg-white flex flex-col shadow-lg animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
              <h2 className="text-xl font-semibold text-[#052e16]">
                {termsModal === "service" ? "Terms Of Services" : "Terms Of Submission"}
              </h2>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#052e16] text-white transition-opacity hover:opacity-80"
                onClick={() => setTermsModal(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#052e16]">User Submissions</h3>
                  <div className="text-sm text-[#71717b] text-justify leading-5 space-y-3">
                    <p>
                      By posting, uploading or submitting User Submissions to the Site, you are agreeing to these Terms of Service, the ViralSnare licensing terms (including the grant of Licensed Rights) and the user representations and warranties in connection with the User Submissions as further set forth below. In particular, you are representing and warranting that you own or control all rights to the User Submissions, including the requisite clearances, releases and authorizations for the use of any content, likeness, music tracks or other materials contained, included or depicted in the User Submissions.
                    </p>
                    <p>
                      In accordance with the Acceptability Guidelines, no ViralSnare user, including without limitation its members, shall post, upload or submit User Submissions which include any of the following: (i) invasion of privacy/publicity, including content which reveals the personal information of a third party; (ii) violence or physical abuse of any kind; (iii) defamation, slander or libel; (iv) illegal activities of any kind; (v) depictions of discrimination or discriminatory content; (vi) fraudulent or misleading content (including tags, titles and descriptions); (vii) pornographic, lewd or sexually explicit content; (viii) content which is clearly inappropriate for children; (ix) content involving harassment, intimidation, threats and other inappropriate predatory behavior; (x) content which is intended to disgust or shock; (xi) and intellectual property or other proprietary content or rights belonging to third parties, including without limitation the use of any third party likeness for which the user has failed to obtain the requisite releases, clearances and authorizations.
                    </p>
                    <p>
                      We reserve the right to remove any User Submissions for any reason, particularly if the User Submissions contain(s) any content in violation of these Acceptability Guidelines or which we otherwise deem to be inappropriate or unacceptable. We further reserve the right to terminate your ViralSnare membership and/or your access to the Site based on the seriousness or repeated nature of such violative, inappropriate or unacceptable User Submissions.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#052e16]">Termination Clause</h3>
                  <p className="text-sm text-[#71717b] text-justify leading-5">
                    I understand that participation in the ViralSnare video system is at will and you agree that this license may only be terminated by mutual agreement between all the parties.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#052e16]">Ownership; License and Granted Rights to User Submissions</h3>
                  <p className="text-sm text-[#71717b] text-justify leading-5">
                    Upon uploading, submitting, emailing, posting, publishing or otherwise transmitting any User Submissions to the Site, you retain ownership of any intellectual property rights you hold in and to the User Submissions; however, you grant ViralSnare an exclusive, worldwide, assignable and sublicensable, perpetual and irrevocable right and license to use, reproduce, modify, adapt, rearrange, promote, market, prepare derivative works based on, perform, display, publish, distribute, transmit, stream, broadcast and otherwise exploit such User Submissions in any form, method, medium, platform or technology now known or later developed, including without limitation on the Site and third party websites, podcast, video game consoles and services, mobile apps, video-on-demand and television (the "Licensed Rights"). ViralSnare shall further be granted the right to assign at their discretion the Licensed Rights in accordance with these Terms of Service. You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to grant the foregoing Licensed Rights to ViralSnare and you further license to us all patent, trademark, trade secret, copyright or other proprietary rights in and to such User Submissions. You acknowledge and agree that we shall own all rights, title and interest in and to all derivative works and compilations of User Submissions that are created by us, including without limitation all worldwide intellectual property rights therein. You agree to execute and deliver such documents and provide all assistance reasonably requested by us, at our expense, to give us the full benefit of these Terms of Service, including without limitation the License Agreement. You acknowledge that you are solely responsible for all User Submissions you upload, post or otherwise transmit using this Site. We do not endorse any User Submissions or any information, opinion, recommendation, or advice expressed therein. You represent and warrant that any User Submissions posted, uploaded or submitted by you are original to you and/or that you own and/or control all of the materials, content, and intellectual property contained therein, including without limitation the necessary licenses, releases, rights, consents, and permissions to grant ViralSnare the Licensed Rights and all other rights and licenses set forth in this Terms of Service agreement. Without limiting the foregoing, you represent and warrant that you have obtained the written consent, release and/or permission of each person who is identifiable in each of your User Submissions to use the name and likeness of each such person in your User Submissions in the manner contemplated by these terms. You further represent and warrant that your User Submissions (i) do not and will not, directly or indirectly, violate, infringe or breach any duty toward or rights of any person or entity, including without limitation any copyright, trademark, service mark, trade secret, other intellectual property, publicity or privacy right and will not require any costs or payments for their use by ViralSnare or its licensees and assignees; (ii) are not fraudulent, misleading, tortuous, defamatory, slanderous, libelous, abusive, violent, threatening or obscene; (iii) do not harass others, promote bigotry, racism, hatred or harm against any individual or group, promote discrimination based on race, sex, religion, nationality, sexual orientation or age; (iv) are not illegal and do not promote illegal or harmful activities or substances; (v) do not contain any computer programming routines or viruses (including without limitation: time bombs, Trojan Horses, worms, Easter Eggs, drop dead devices or cancelbots) that are intended to damage, interfere with, intercept or expropriate any system data or personal information, permit unauthorized access to the Site or disable, damage or erase any portion of the Content stored therein; and/or (vi) do not otherwise violate the ViralSnare Acceptability Guidelines.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#052e16]">Payment to Copyright holder for License</h3>
                  <p className="text-sm text-[#71717b] text-justify leading-5">
                    Licensee will pay to Licensor 60% of the profit actually received from the Work (the "Payment(s)"). Licensee shall process the Payment to Licensor within fifteen (15) days after the end of each month; however, if the amount owed Licensor is less than fifty US dollars ($50 USD) in any given month, Licensee reserves the right to carry the Payment over until the amount exceeds fifty US dollars ($50 USD). If the amount never exceeds fifty US dollars ($50 USD) or if the Licensee ceases license acquisition operations, then no Payment will come due. Licensee will have no obligation to make any Payments which are reasonably suspected by Licensee, in its sole discretion, to have resulted from fraudulent, misleading or false activities by Licensor. Licensee shall not be responsible for any payments to Licensor for revenue earned in connection with the Licensed Rights but not received by Licensee for any reason (for example due to non-payment or where Licensee does not receive adequate reporting so as to enable Licensee to assign revenue). Licensor may choose to be paid via PayPal, paper check, or electronic bank transfer (the "Payment Method"). Any electronic bank transfer fees will be deducted from the Licensor's Payment prior to sending. Licensor agrees to provide Licensee all the necessary and accurate information required to process payment (the "Payment Details') via their preferred Payment Method. Licensor further understands that Payments may be subject to Withholding Tax which will be paid on behalf of Licensor to the appropriate Tax Authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

