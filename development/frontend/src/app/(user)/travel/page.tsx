// src/app/(main)/insurance/travel/purchase/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// สถานะของแบบฟอร์มซื้อประกัน
interface InsuranceFormState {
  step: number;
  travelType: "single" | "annual" | null;
  destination: "domestic" | "international" | null;
  countries: string[];
  startDate: string;
  endDate: string;
  travelers: {
    adults: number;
    children: number;
  };
  insuredPersons: {
    firstName: string;
    lastName: string;
    idNumber: string;
    birthdate: string;
    email: string;
    phone: string;
    address: string;
    beneficiary: string;
    relationship: string;
  }[];
  planType: string;
  addOns: string[];
  promoCode: string;
}

// ข้อมูลแผนประกัน
const insurancePlans = [
  {
    id: "basic",
    name: "แผนพื้นฐาน",
    price: 599,
    coverage: {
      medical: "1,000,000 บาท",
      accident: "1,500,000 บาท",
      tripCancellation: "30,000 บาท",
      luggageLoss: "20,000 บาท",
    },
    icon: "🛡️",
  },
  {
    id: "standard",
    name: "แผนมาตรฐาน",
    price: 899,
    coverage: {
      medical: "2,000,000 บาท",
      accident: "2,000,000 บาท",
      tripCancellation: "50,000 บาท",
      luggageLoss: "30,000 บาท",
    },
    recommended: true,
    icon: "✈️",
  },
  {
    id: "premium",
    name: "แผนพรีเมียม",
    price: 1299,
    coverage: {
      medical: "3,500,000 บาท",
      accident: "3,000,000 บาท",
      tripCancellation: "100,000 บาท",
      luggageLoss: "50,000 บาท",
    },
    icon: "🌟",
  },
];

// Add-on options
const addonOptions = [
  {
    id: "covid",
    name: "ความคุ้มครองโควิด-19",
    price: 150,
    description: "ค่ารักษาพยาบาลสำหรับโควิด-19 สูงสุด 500,000 บาท",
  },
  {
    id: "sports",
    name: "กีฬาผาดโผน",
    price: 300,
    description: "คุ้มครองกิจกรรมผจญภัยเช่น ดำน้ำ ปีนเขา พายเรือ",
  },
  {
    id: "gadget",
    name: "อุปกรณ์อิเล็กทรอนิกส์",
    price: 250,
    description:
      "คุ้มครองความเสียหายของกล้อง โน้ตบุ๊ก แท็บเล็ต สูงสุด 30,000 บาท",
  },
];

export default function TravelInsurancePurchase() {
  const router = useRouter();
  const [formState, setFormState] = useState<InsuranceFormState>({
    step: 1,
    travelType: null,
    destination: null,
    countries: [],
    startDate: "",
    endDate: "",
    travelers: {
      adults: 1,
      children: 0,
    },
    insuredPersons: [
      {
        firstName: "",
        lastName: "",
        idNumber: "",
        birthdate: "",
        email: "",
        phone: "",
        address: "",
        beneficiary: "",
        relationship: "",
      },
    ],
    planType: "",
    addOns: [],
    promoCode: "",
  });

  // คำนวณจำนวนวันเดินทาง
  const calculateTravelDays = () => {
    if (!formState.startDate || !formState.endDate) return 0;
    const start = new Date(formState.startDate);
    const end = new Date(formState.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // คำนวณราคาประกัน
  const calculatePrice = () => {
    if (!formState.planType) return 0;

    const plan = insurancePlans.find((p) => p.id === formState.planType);
    if (!plan) return 0;

    const basePricePerPerson = plan.price;
    const numberOfDays = calculateTravelDays();
    const numberOfPeople =
      formState.travelers.adults + formState.travelers.children;

    let addonTotal = 0;
    formState.addOns.forEach((addonId) => {
      const addon = addonOptions.find((a) => a.id === addonId);
      if (addon) {
        addonTotal += addon.price * numberOfPeople;
      }
    });

    // คำนวณราคาตามประเภทการเดินทางและจำนวนวัน
    let totalPrice = 0;
    if (formState.travelType === "single") {
      totalPrice = basePricePerPerson * numberOfPeople;
      // ปรับราคาตามจำนวนวัน
      if (numberOfDays > 7) {
        totalPrice += (numberOfDays - 7) * 50 * numberOfPeople; // เพิ่ม 50 บาทต่อวันต่อคนหลังจาก 7 วัน
      }
    } else {
      // แผนรายปี - ราคาคงที่
      totalPrice = basePricePerPerson * 6 * numberOfPeople; // ประมาณ 6 เท่าของแผนเดี่ยว
    }

    return totalPrice + addonTotal;
  };

  // การเปลี่ยนขั้นตอน
  const goToStep = (step: number) => {
    setFormState((prev) => ({
      ...prev,
      step,
    }));
    window.scrollTo(0, 0);
  };

  // การอัปเดตข้อมูลของแบบฟอร์ม
  const updateForm = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // การเพิ่ม/ลบ Add-on
  const toggleAddon = (addonId: string) => {
    setFormState((prev) => {
      if (prev.addOns.includes(addonId)) {
        return {
          ...prev,
          addOns: prev.addOns.filter((id) => id !== addonId),
        };
      } else {
        return {
          ...prev,
          addOns: [...prev.addOns, addonId],
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="bg-cyan-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            {[
              "ข้อมูลการเดินทาง",
              "เลือกแผนประกัน",
              "ข้อมูลผู้เดินทาง",
              "ตรวจสอบและชำระเงิน",
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    formState.step > index + 1
                      ? "bg-green-500"
                      : formState.step === index + 1
                      ? "bg-cyan-500"
                      : "bg-gray-300"
                  }`}
                >
                  {formState.step > index + 1 ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <span className="text-white font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs text-center ${
                    formState.step === index + 1
                      ? "text-white font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <div
              className={`h-1 ${
                formState.step >= 1 ? "bg-cyan-500" : "bg-gray-300"
              } rounded-l-full`}
            ></div>
            <div
              className={`h-1 ${
                formState.step >= 2 ? "bg-cyan-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1 ${
                formState.step >= 3 ? "bg-cyan-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1 ${
                formState.step >= 4 ? "bg-cyan-500" : "bg-gray-300"
              } rounded-r-full`}
            ></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Step 1: ข้อมูลการเดินทาง */}
        {formState.step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-cyan-900 mb-6">
              ข้อมูลการเดินทาง
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                ประเภทการเดินทาง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg flex items-center ${
                    formState.travelType === "single"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => updateForm("travelType", "single")}
                >
                  <div className="bg-cyan-100 rounded-full p-3 mr-3">
                    <svg
                      className="w-6 h-6 text-cyan-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">แบบรายเที่ยว</h4>
                    <p className="text-sm text-gray-500">
                      สำหรับการเดินทางครั้งเดียว
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className={`p-4 border rounded-lg flex items-center ${
                    formState.travelType === "annual"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => updateForm("travelType", "annual")}
                >
                  <div className="bg-cyan-100 rounded-full p-3 mr-3">
                    <svg
                      className="w-6 h-6 text-cyan-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">แบบรายปี</h4>
                    <p className="text-sm text-gray-500">
                      สำหรับการเดินทางหลายครั้งใน 1 ปี
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                จุดหมายปลายทาง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg flex items-center ${
                    formState.destination === "domestic"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => updateForm("destination", "domestic")}
                >
                  <div className="bg-cyan-100 rounded-full p-3 mr-3">
                    <svg
                      className="w-6 h-6 text-cyan-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 21l18-9L3 3v7l12 2-12 2v7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">ภายในประเทศ</h4>
                    <p className="text-sm text-gray-500">
                      การเดินทางในประเทศไทย
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className={`p-4 border rounded-lg flex items-center ${
                    formState.destination === "international"
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => updateForm("destination", "international")}
                >
                  <div className="bg-cyan-100 rounded-full p-3 mr-3">
                    <svg
                      className="w-6 h-6 text-cyan-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">ต่างประเทศ</h4>
                    <p className="text-sm text-gray-500">
                      การเดินทางนอกประเทศไทย
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {formState.destination === "international" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเทศปลายทาง
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  value={formState.countries[0] || ""}
                  onChange={(e) => updateForm("countries", [e.target.value])}
                >
                  <option value="">เลือกประเทศปลายทาง</option>
                  <option value="asia">เอเชีย</option>
                  <option value="europe">ยุโรป</option>
                  <option value="america">อเมริกา</option>
                  <option value="australia">ออสเตรเลีย/นิวซีแลนด์</option>
                  <option value="worldwide">ทั่วโลก</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันที่เริ่มต้นเดินทาง
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  value={formState.startDate}
                  onChange={(e) => updateForm("startDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {formState.travelType === "single" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    วันที่สิ้นสุดการเดินทาง
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    value={formState.endDate}
                    onChange={(e) => updateForm("endDate", e.target.value)}
                    min={formState.startDate}
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                จำนวนผู้เดินทาง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <div>
                    <h4 className="font-medium">ผู้ใหญ่</h4>
                    <p className="text-sm text-gray-500">อายุ 16 ปีขึ้นไป</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
                      onClick={() => {
                        if (formState.travelers.adults > 1) {
                          updateForm("travelers", {
                            ...formState.travelers,
                            adults: formState.travelers.adults - 1,
                          });
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="mx-4 font-medium">
                      {formState.travelers.adults}
                    </span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center"
                      onClick={() => {
                        updateForm("travelers", {
                          ...formState.travelers,
                          adults: formState.travelers.adults + 1,
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <div>
                    <h4 className="font-medium">เด็ก</h4>
                    <p className="text-sm text-gray-500">อายุไม่เกิน 15 ปี</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
                      onClick={() => {
                        if (formState.travelers.children > 0) {
                          updateForm("travelers", {
                            ...formState.travelers,
                            children: formState.travelers.children - 1,
                          });
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="mx-4 font-medium">
                      {formState.travelers.children}
                    </span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center"
                      onClick={() => {
                        updateForm("travelers", {
                          ...formState.travelers,
                          children: formState.travelers.children + 1,
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg shadow-md transition duration-200"
                onClick={() => goToStep(2)}
                disabled={
                  !formState.travelType ||
                  !formState.destination ||
                  !formState.startDate ||
                  (formState.travelType === "single" && !formState.endDate)
                }
              >
                ถัดไป: เลือกแผนประกัน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
