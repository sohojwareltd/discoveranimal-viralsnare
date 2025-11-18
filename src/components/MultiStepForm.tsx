"use client";

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
}

function CheckboxField({ label, checked, onChange, html }: CheckboxFieldProps) {
  return (
    <label className="flex items-start gap-3 text-base text-[#052e16]">
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
  sharedElsewhere: "Yes, I submitted it through a website or form before",
  otherPlatform: "",
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

  const headerContent = useMemo(() => {
    if (step === 1) {
      return {
        title: "Tell us about your video",
        subtitle: "We just need a few quick details to complete your submission.",
        highlight: (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-[#dcfce7] px-4 py-3 text-sm text-[#052e16]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00c951] text-white">
              ✓
            </span>
            <div>
              <p className="font-semibold">Your video successfully submitted</p>
              <p>please fill all the information below to complete your submissions</p>
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
      {headerContent.highlight}
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
          <input
            type="text"
            className={baseInputClasses}
            value={formState.filmedWhere}
            onChange={handleInputChange("filmedWhere")}
            placeholder="Search or type address"
          />
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
      <label className="flex flex-col gap-2">
        <span className="text-base font-medium text-[#052e16]">
          How old are you? <span className="text-[#00c951]">*</span>
        </span>
        <select
          className={cx(baseInputClasses, "appearance-none")}
          value={formState.age}
          onChange={handleInputChange("age")}
        >
          <option>Under 13</option>
          <option>13-17</option>
          <option>18-24</option>
          <option>25-34</option>
          <option>35+</option>
        </select>
      </label>
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
              setFormState((prev) => ({ ...prev, includesPeople: false }))
            }
          />
          <CheckOption
            label="Yes"
            selected={formState.includesPeople}
            onClick={() =>
              setFormState((prev) => ({ ...prev, includesPeople: true }))
            }
          />
        </div>
      </div>
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
        <select
          className={cx(baseInputClasses, "appearance-none mt-3")}
          value={formState.sharedElsewhere}
          onChange={handleInputChange("sharedElsewhere")}
        >
          <option>No, this is the first place I’m submitting it</option>
          <option>Yes, I submitted it through a website or form before</option>
          <option>Yes, I emailed it to someone</option>
        </select>
        {formState.sharedElsewhere !== "No, this is the first place I’m submitting it" && (
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
      </div>
    </div>
  );

  const renderStepFour = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <CheckboxField
          label={`I agree to the <span class="underline font-semibold">Terms of Service</span>.`}
          checked={formState.agreedTerms}
          onChange={(value) => setFormState((prev) => ({ ...prev, agreedTerms: value }))}
          html
        />
        <CheckboxField
          label={`I agree to the <span class="underline font-semibold">Terms of Submission</span>.`}
          checked={formState.agreedSubmission}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, agreedSubmission: value }))
          }
          html
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
        <div className="mt-2 rounded-lg bg-[#f0fdf4] px-4 py-6 text-center font-['Alex_Brush',cursive] text-2xl text-[#052e16]">
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
      <header className="w-full border-b border-[rgba(5,46,22,0.1)] bg-white/80 backdrop-blur-sm">
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

      <main className="flex flex-1 justify-center px-6 py-8 md:px-[120px]">
        <div className="w-full max-w-[512px] rounded-2xl bg-white p-6 shadow-sm md:p-8">
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
          <div className="relative w-full max-w-[360px] rounded-2xl bg-white px-8 pb-10 pt-8 text-center shadow-lg">
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
    </div>
  );
}

