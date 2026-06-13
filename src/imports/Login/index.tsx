import svgPaths from "./svg-grybny3axk";

function Email() {
  return (
    <div className="absolute contents left-[31px] top-[231px]" data-name="Email">
      <div className="absolute bg-white border border-[rgba(121,173,134,0.73)] border-solid h-[44px] left-[31px] rounded-[4px] top-[257px] w-[326px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[53px] not-italic text-[#10451d] text-[14px] text-center top-[231px] whitespace-nowrap">Email</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[111px] not-italic text-[#91bd9c] text-[12px] text-center top-[267px] whitespace-nowrap">Type your email here</p>
    </div>
  );
}

function IconSet() {
  return (
    <div className="absolute contents inset-0" data-name="icon set">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="eye">
          <g id="Rectangle" />
          <path clipRule="evenodd" d={svgPaths.p38fc4600} fillRule="evenodd" id="Vector" stroke="var(--stroke-0, #10451D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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

function Eye() {
  return (
    <div className="absolute left-[319px] overflow-clip size-[24px] top-[354px]" data-name="eye">
      <Page />
    </div>
  );
}

function Password() {
  return (
    <div className="absolute contents left-[31px] top-[318px]" data-name="Password">
      <div className="absolute bg-white border border-[#9dc3a7] border-solid h-[44px] left-[31px] rounded-[4px] top-[344px] w-[326px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[65px] not-italic text-[#10451d] text-[14px] text-center top-[318px] whitespace-nowrap">Password</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[124.5px] not-italic text-[#91bd9c] text-[12px] text-center top-[354px] whitespace-nowrap">Type your password here</p>
      <Eye />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[31px] top-[388px]">
      <div className="absolute h-[44px] left-[31px] top-[388px] w-[327px]" data-name="safe area" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[292.5px] not-italic text-[#10451d] text-[14px] text-center top-[398px] whitespace-nowrap">Forgot password ?</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[31px] top-[568px]">
      <div className="absolute h-[44px] left-[31px] top-[568px] w-[327px]" data-name="safe area" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[194.5px] not-italic text-[#10451d] text-[14px] text-center top-[578px] whitespace-nowrap">Don’t have an account ?</p>
    </div>
  );
}

function LoginBtnPrimary() {
  return (
    <div className="absolute contents left-[31px] top-[480px]" data-name="Login BTN / Primary">
      <div className="absolute h-[56px] left-[31px] rounded-[4px] top-[480px] w-[326px]" style={{ backgroundImage: "linear-gradient(260.253deg, rgb(56, 176, 0) 0%, rgb(61, 191, 0) 0%, rgb(52, 163, 0) 100%)" }} />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-[194.5px] not-italic text-[14px] text-center text-white top-[496px] whitespace-nowrap">Login</p>
    </div>
  );
}

function LoginBtnPrimary1() {
  return (
    <div className="absolute contents left-[31px] top-[612px]" data-name="Login BTN / Primary">
      <div className="absolute bg-[#6ede8a] h-[56px] left-[31px] rounded-[8px] top-[612px] w-[326px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-[194px] not-italic text-[#10451d] text-[14px] text-center top-[628px] whitespace-nowrap">Register</p>
    </div>
  );
}

function MoneyTribeLogo1() {
  return (
    <div className="absolute left-[159px] size-[72px] top-[60px]" data-name="Money Tribe logo 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g clipPath="url(#clip0_4_193)" id="Money Tribe logo 1">
          <path clipRule="evenodd" d={svgPaths.p362e71f0} fill="var(--fill-0, #38B000)" fillRule="evenodd" id="Path 1" />
        </g>
        <defs>
          <clipPath id="clip0_4_193">
            <rect fill="white" height="72" width="72" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MoneyTribeLogo() {
  return (
    <div className="absolute contents left-[155px] top-[60px]" data-name="Money Tribe logo">
      <MoneyTribeLogo1 />
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[0] left-[195px] not-italic text-[#10451d] text-[24px] text-center top-[139px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Money</p>
        <p className="leading-[24px]">Tribe</p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-white relative size-full" data-name="Login">
      <Email />
      <Password />
      <Group />
      <Group1 />
      <LoginBtnPrimary />
      <LoginBtnPrimary1 />
      <MoneyTribeLogo />
    </div>
  );
}