import svgPaths from "./svg-n34ntm55ok";

function Email() {
  return (
    <div className="absolute contents left-[31px] top-[231px]" data-name="Email">
      <div className="absolute bg-white border border-[rgba(121,173,134,0.73)] border-solid h-[44px] left-[31px] rounded-[4px] top-[257px] w-[326px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[53px] not-italic text-[#10451d] text-[14px] text-center top-[231px] whitespace-nowrap">Email</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[111px] not-italic text-[#91bd9c] text-[12px] text-center top-[267px] whitespace-nowrap">Type your email here</p>
    </div>
  );
}

function LoginBtnPrimary() {
  return (
    <div className="absolute contents left-[31px] top-[333px]" data-name="Login BTN / Primary">
      <div className="absolute h-[56px] left-[31px] rounded-[4px] top-[333px] w-[326px]" style={{ backgroundImage: "linear-gradient(260.253deg, rgb(56, 176, 0) 0%, rgb(61, 191, 0) 0%, rgb(52, 163, 0) 100%)" }} />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-[194px] not-italic text-[14px] text-center text-white top-[349px] whitespace-nowrap">Reset password</p>
    </div>
  );
}

function IconSet() {
  return (
    <div className="absolute contents inset-0" data-name="icon set">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow left">
          <g id="Rectangle" />
          <path d="M6.18444 12H19.101" id="line" stroke="var(--stroke-0, #10451D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pce28800} id="arrow" stroke="var(--stroke-0, #10451D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Page() {
  return (
    <div className="absolute contents inset-0" data-name="Page 1">
      <IconSet />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="absolute left-[32px] overflow-clip size-[24px] top-[62px]" data-name="arrow-left">
      <Page />
    </div>
  );
}

export default function ForgotYourPassword() {
  return (
    <div className="bg-white relative size-full" data-name="Forgot your password ?">
      <Email />
      <LoginBtnPrimary />
      <ArrowLeft />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-[123px] not-italic text-[#10451d] text-[16px] text-center top-[62px] whitespace-nowrap">Registration</p>
      <div className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[0] left-[32px] not-italic text-[#10451d] text-[24px] top-[151px] whitespace-nowrap">
        <p className="leading-[30px] mb-0">Set a new</p>
        <p className="leading-[30px]">password</p>
      </div>
    </div>
  );
}