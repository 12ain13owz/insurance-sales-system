"use client";

import LoginForm from "@/app/components/forms/admin/LoginForm";
import { login } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formSubmit = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { token } = await login(email, password);
      localStorage.setItem("token", token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Internal server error");
    }
  };

  useEffect(() => {
    setError("Test Error");
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-200 relative">
      <header className="absolute  bg-cyan-950 w-full text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 bg-white p-3 rounded-md"
          >
            <Image
              src="/images/tokio-marine-logo.png"
              alt="Tokio Marine"
              width={148}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          <Link href="/" className="text-white hover:text-cyan-200 transition">
            หน้าแรก
          </Link>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white  rounded shadow-md w-full max-w-md">
          <div className="bg-cyan-800 px-6 py-8 text-center">
            <h2 className="text-2xl font-bold text-white">สำหรับผู้ดูแลระบบ</h2>
            <p className="mt-2 text-cyan-100">
              กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูลประกันภัย
            </p>
          </div>

          <div className="px-6 py-8">
            <LoginForm />

            {error && (
              <p className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
