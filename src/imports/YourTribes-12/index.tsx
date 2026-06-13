import svgPaths from "./svg-zpu0p4xbt9";

function DotsVertical() {
  return (
    <div className="absolute left-[291px] size-[24px] top-[62px]" data-name="dots-vertical">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="dots-vertical">
          <path d={svgPaths.pfd68700} fill="var(--fill-0, black)" id="Union" />
          <rect fill="var(--fill-0, #C4C4C4)" height="24" id="Rectangle 1" opacity="0" width="24" />
        </g>
      </svg>
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

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Publish tribe</p>
    </div>
  );
}

function IconSet1() {
  return (
    <div className="absolute contents inset-0" data-name="icon set">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow right">
          <g id="Rectangle" />
          <path d="M19 11.5H5.39904" id="line" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3a32d900} id="arrow" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Page1() {
  return (
    <div className="absolute contents inset-0" data-name="Page 1">
      <IconSet1 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow-right">
      <Page1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-start left-[138px] top-[721px]">
      <Frame />
      <ArrowRight />
    </div>
  );
}

function LoginBtnPrimary() {
  return (
    <div className="absolute contents left-[33px] top-[705px]" data-name="Login BTN / Primary">
      <div className="absolute h-[56px] left-[33px] rounded-[4px] top-[705px] w-[326px]" style={{ backgroundImage: "linear-gradient(260.253deg, rgb(56, 176, 0) 0%, rgb(61, 191, 0) 0%, rgb(52, 163, 0) 100%)" }} />
      <Frame1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[61px] top-[121px]">
      <div className="absolute left-[61px] size-[44px] top-[121px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="url(#paint0_linear_18_6332)" id="Ellipse 14" r="22" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_18_6332" x1="42" x2="22" y1="2" y2="53.5">
              <stop offset="0.0164915" stopColor="#3DBF00" />
              <stop offset="1" stopColor="#10441D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[82.5px] not-italic text-[14px] text-center text-white top-[131px] whitespace-nowrap">1</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[168px] top-[122px]">
      <div className="absolute left-[168px] size-[44px] top-[122px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="url(#paint0_linear_18_6330)" id="Ellipse 15" r="22" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_18_6330" x1="42" x2="22" y1="2" y2="53.5">
              <stop offset="0.0164915" stopColor="#3DBF00" />
              <stop offset="1" stopColor="#10441D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[189.5px] not-italic text-[14px] text-center text-white top-[131px] whitespace-nowrap">2</p>
    </div>
  );
}

function ActiveStepper() {
  return (
    <div className="absolute contents left-[168px] top-[122px]" data-name="Active stepper">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[286px] top-[121px]">
      <div className="absolute left-[286px] size-[44px] top-[121px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" id="Ellipse 14" r="19.5" stroke="var(--stroke-0, #3DBF00)" strokeWidth="5" />
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[307.5px] not-italic text-[#10451d] text-[14px] text-center top-[131px] whitespace-nowrap">3</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute left-[283px] size-[50px] top-[118px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="Group 51" opacity="0.3">
          <circle cx="25" cy="25" id="Ellipse 14" r="23.5" stroke="var(--stroke-0, #3DBF00)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute left-[280px] size-[56px] top-[115px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Group 52" opacity="0.3">
          <circle cx="28" cy="28" id="Ellipse 14" r="26.5" stroke="var(--stroke-0, #3DBF00)" strokeOpacity="0.5" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ActiveStepper1() {
  return (
    <div className="absolute contents left-[280px] top-[115px]" data-name="Active stepper">
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Handle() {
  return (
    <div className="drop-shadow-[0px_2px_2px_rgba(0,35,11,0.2)] overflow-clip relative shrink-0 size-[18px]" data-name="Handle">
      <div className="-translate-y-1/2 absolute bg-white h-[18px] left-0 right-0 rounded-[16px] top-1/2" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[313px]">
      <button className="bg-[#3dbf00] content-stretch cursor-pointer flex items-center justify-end pl-[24px] pr-[2px] py-[2px] relative rounded-[16px] shrink-0" data-name="Switch / Basic">
        <Handle />
      </button>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#10451d] text-[14px] text-center whitespace-nowrap">Change in turns</p>
    </div>
  );
}

function Handle1() {
  return (
    <div className="drop-shadow-[0px_2px_2px_rgba(0,35,11,0.2)] overflow-clip relative shrink-0 size-[18px]" data-name="Handle">
      <div className="-translate-y-1/2 absolute bg-white h-[18px] left-0 right-0 rounded-[16px] top-1/2" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[369px]">
      <button className="bg-[#3dbf00] content-stretch cursor-pointer flex items-center justify-end pl-[24px] pr-[2px] py-[2px] relative rounded-[16px] shrink-0" data-name="Switch / Basic">
        <Handle1 />
      </button>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#10451d] text-[14px] text-center whitespace-nowrap">{`Messages in the wall `}</p>
    </div>
  );
}

function Handle2() {
  return (
    <div className="drop-shadow-[0px_2px_2px_rgba(0,35,11,0.2)] overflow-clip relative shrink-0 size-[18px]" data-name="Handle">
      <div className="-translate-y-1/2 absolute bg-white h-[18px] left-0 right-0 rounded-[16px] top-1/2" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[425px]">
      <button className="bg-[#3dbf00] content-stretch cursor-pointer flex items-center justify-end pl-[24px] pr-[2px] py-[2px] relative rounded-[16px] shrink-0" data-name="Switch / Basic">
        <Handle2 />
      </button>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#10451d] text-[14px] text-center whitespace-nowrap">A completed cycle</p>
    </div>
  );
}

function Handle3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Handle">
      <div className="bg-white col-1 ml-0 mt-0 relative rounded-[16px] row-1 size-[18px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[481px]">
      <div className="bg-[#b3bdd8] content-stretch flex items-center pl-[2px] pr-[24px] py-[2px] relative rounded-[20px] shrink-0" data-name="Switch / Basic">
        <Handle3 />
      </div>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#10451d] text-[14px] text-center whitespace-nowrap">Delay in cycle completion after</p>
    </div>
  );
}

function Handle4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Handle">
      <div className="bg-white col-1 ml-0 mt-0 relative rounded-[16px] row-1 size-[18px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[577px]">
      <div className="bg-[#b3bdd8] content-stretch flex items-center pl-[2px] pr-[24px] py-[2px] relative rounded-[20px] shrink-0" data-name="Switch / Basic">
        <Handle4 />
      </div>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#10451d] text-[14px] text-center whitespace-nowrap">Reported tribe member</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-[90px] px-[16px] rounded-[4px] top-[514px] w-[127px]">
      <div aria-hidden className="absolute border border-[#cee1d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-[24px] min-w-px not-italic relative text-[#91bd9c] text-[12px] text-center">Type number</p>
    </div>
  );
}

export default function YourTribes() {
  return (
    <div className="bg-white relative size-full" data-name="Your tribes">
      <div className="absolute bg-white h-[844px] left-0 top-0 w-[390px]" />
      <DotsVertical />
      <ArrowLeft />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-[132.5px] not-italic text-[#10451d] text-[16px] text-center top-[62px] whitespace-nowrap">Create new tribe</p>
      <div className="absolute left-[334px] overflow-clip size-[24px] top-[61px]" data-name="pencil-01">
        <div className="absolute inset-[9.05%_9.05%_10.42%_10.42%]" data-name="Icon">
          <div className="absolute inset-[-5.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3285 21.3285">
              <path d={svgPaths.p17e80a80} id="Icon" stroke="var(--stroke-0, #10451D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <LoginBtnPrimary />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[83px] not-italic text-[#10451d] text-[12px] text-center top-[174px] whitespace-nowrap">General</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[188px] not-italic text-[#10451d] text-[12px] text-center top-[174px] whitespace-nowrap">Members</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[306px] not-italic text-[#10451d] text-[12px] text-center top-[174px] whitespace-nowrap">Notifications</p>
      <Group />
      <div className="absolute h-0 left-[113px] top-[143px] w-[41px]">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 2">
            <line id="Line 2" stroke="var(--stroke-0, #3DBF00)" strokeLinecap="round" strokeWidth="2" x1="1" x2="40" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[231px] top-[143px] w-[41px]">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 2">
            <line id="Line 3" stroke="var(--stroke-0, #91BD9C)" strokeLinecap="round" strokeWidth="2" x1="1" x2="40" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <ActiveStepper />
      <ActiveStepper1 />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[0] left-[38px] not-italic text-[#10441d] text-[16px] top-[229px] whitespace-nowrap">
        <p className="leading-[24px] mb-0 whitespace-pre">{`Decide how you want general `}</p>
        <p className="leading-[24px] whitespace-pre">notifications in the tribe</p>
      </div>
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame2 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-[242.5px] not-italic text-[#10451d] text-[14px] text-center top-[524px] whitespace-nowrap">days</p>
    </div>
  );
}