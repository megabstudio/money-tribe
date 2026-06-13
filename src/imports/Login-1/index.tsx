import svgPaths from "./svg-85v4ggpwlg";

function MoneyTribeLogo1() {
  return (
    <div className="absolute left-[122.15px] size-[146.7px] top-[211px]" data-name="Money Tribe logo 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146.7 146.7">
        <g clipPath="url(#clip0_4_202)" id="Money Tribe logo 1">
          <path clipRule="evenodd" d={svgPaths.p709dc80} fill="var(--fill-0, #38B000)" fillRule="evenodd" id="Path 1" />
        </g>
        <defs>
          <clipPath id="clip0_4_202">
            <rect fill="white" height="146.7" width="146.7" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MoneyTribeLogo() {
  return (
    <div className="absolute contents left-[114px] top-[211px]" data-name="Money Tribe logo">
      <MoneyTribeLogo1 />
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[0] left-[195.5px] not-italic text-[#10451d] text-[48.9px] text-center top-[371.96px] whitespace-nowrap">
        <p className="leading-[48.9px] mb-0">Money</p>
        <p className="leading-[48.9px]">Tribe</p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-white relative size-full" data-name="Login">
      <MoneyTribeLogo />
    </div>
  );
}