"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
 
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f5f4] flex items-center justify-center px-4">
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -left-30 top-0 h-105 w-105 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-25 -bottom-10 h-80 w-[320px] rounded-full bg-indigo-200/30 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex w-full justify-center">
          <div className="w-full max-w-sm text-center">
            {/* Logo / Brand */}
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
                <Image
                  src="/icons/logoIcon.png"
                  alt="MoneyManager Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>

              <h1 className="text-[28px] font-extrabold tracking-[-0.02em] text-slate-900">
                MoneyManager
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Your money at a glance
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-left shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Welcome Back
              </h2>

              <form className="mt-5 space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-slate-600"
                  >
                    Email
                  </label>
                  <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-indigo-500 focus-within:bg-white">
                    <Image
                      src="/icons/email.png"
                      alt="Email Icon"
                      width={16}
                      height={16}
                      className="mr-2 opacity-60"
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-slate-600"
                    >
                      Password
                    </label>

                    <Link
                      href="#"
                      className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forget?
                    </Link>
                  </div>

                  <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-indigo-500 focus-within:bg-white">
                    <Image
                      src="/icons/lock.png"
                      alt="Lock Icon"
                      width={16}
                      height={16}
                      className="mr-2 opacity-60 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="ml-2 inline-flex items-center justify-center"
                    >
                      <Image
                        src={
                          showPassword
                            ? "/icons/eye-off.png"
                            : "/icons/eye.png"
                        }
                        alt="Toggle Password Visibility"
                        width={24}
                        height={24}
                        className="opacity-60"
                      />
                    </button>
                  </div>
                </div>

                {/* Sign In button */}
                <button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Social login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Image
                    src="/icons/googleicon.png"
                    alt="Google Icon"
                    width={16}
                    height={16}
                  />
                  Google
                </button>

                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Image
                    src="/icons/apple.png"
                    alt="Apple Icon"
                    width={16}
                    height={16}
                  />
                  Apple
                </button>
              </div>
            </div>

            {/* Footer text */}
            <p className="mt-6 text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}