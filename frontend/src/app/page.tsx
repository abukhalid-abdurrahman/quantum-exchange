import SwapForm from "@/components/SwapForm";

export default function page() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/bg3.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute -z-10 inset-0"
      ></div>
      <div className="max-w-[512px] mx-auto mt-36">
        <div className="mx-auto">
          <SwapForm />
        </div>
      </div>
    </>
  );
}
