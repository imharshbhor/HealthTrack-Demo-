import Image from "next/image";
import React from "react";

export default function CKD2() {
  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center rounded-md border">
        <div className="my-10 flex flex-col justify-center items-center px-10">
          <span className="text-xl font-bold">
            WHO/ISH Risk Prediction Chart
          </span>
          <span className="text-gray-500 pt-2">
            {" "}
            10-year risk of a fatal or non-fatal cardiovascular event by gender,
            age, systolic blood pressure, smoking status and presence or absence
            of diabetes mellitus.
          </span>
        </div>
        <Image
          src="/RiskPredChart/1.jpg"
          width={1000}
          height={1000}
          quality={100}
          alt="Risk Prediction Chart"
        />
      </div>
    </>
  );
}
