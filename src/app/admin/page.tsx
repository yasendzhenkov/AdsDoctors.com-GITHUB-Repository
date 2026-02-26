"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminDashboardPage() {
  return (
    <div className="grid-page space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="heading-hover text-2xl font-semibold">
          Admin dashboard
        </h1>
        <p className="text-sm text-black/70">
          Бърз достъп до Sanity Studio и ключови страници.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="heading-hover text-base font-semibold">
          Съдържание
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/studio"
            className="card-3d block p-[1px]"
          >
            <div className="rounded-[0.95rem] bg-black/90 px-5 py-5 text-left text-white md:px-6 md:py-6">
              <h3 className="heading-hover text-sm font-semibold">
                Отвори Sanity Studio
              </h3>
              <p className="mt-2 text-xs text-white/80">
                Редактирай глобални настройки, страници и секции.
              </p>
            </div>
          </Link>
          <Link
            href="/studio/structure"
            className="card-3d block p-[1px]"
          >
            <div className="rounded-[0.95rem] bg-black/90 px-5 py-5 text-left text-white md:px-6 md:py-6">
              <h3 className="heading-hover text-sm font-semibold">
                Основни страници
              </h3>
              <p className="mt-2 text-xs text-white/80">
                Home, Dental Marketing, Plastic Surgery, In-House, Guides,
                Contact, Privacy, Terms.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="heading-hover text-base font-semibold">
          Сесия
        </h2>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn-outline text-xs"
        >
          Изход
        </button>
      </section>
    </div>
  );
}

