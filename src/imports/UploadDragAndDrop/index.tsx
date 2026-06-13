import svgPaths from "./svg-as9ga1j7pm";

function Icon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p1d295c80} fill="var(--fill-0, #3DBF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Roboto_Flex:Regular',sans-serif] font-normal gap-[4px] items-center leading-[0] not-italic overflow-clip relative shrink-0 text-center w-full" data-name="Text Wrapper">
      <div className="flex flex-col justify-center relative shrink-0 text-[#343e5a] text-[16px] tracking-[0.4px] w-full" style={{ fontVariationSettings: '"GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712, "wdth" 100' }}>
        <p className="leading-[28px]">Tap Here to upload your cover image</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#808db0] text-[14px] tracking-[0.25px] w-full" style={{ fontVariationSettings: '"GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712, "wdth" 100' }}>
        <p className="leading-[24px]">Support for a single or bulk upload.</p>
      </div>
    </div>
  );
}

export default function UploadDragAndDrop() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col gap-[16px] items-center p-[20px] relative rounded-[8px] size-full" data-name="Upload / Drag and Drop">
      <div aria-hidden className="absolute border border-[#d6dcec] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Icon />
      <TextWrapper />
    </div>
  );
}