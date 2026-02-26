"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError("Невалидна парола.");
      setSubmitting(false);
      return;
    }

    if (result?.url) {
      window.location.href = result.url;
    } else {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid-page flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-black/10 bg-black/80 p-6 text-center text-white">
        <h1 className="heading-hover text-lg font-semibold">
          Админ вход
        </h1>
        <p className="text-sm text-white/80">
          Въведете паролата, за да влезете в админ панела.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1 text-left text-xs">
            <label className="block text-white/80" htmlFor="password">
              Парола
            </label>
            <input
              id="password"
              type="password"
              className="input-base"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="text-xs text-red-400">{error}</p>
          ) : null}
          <button
            type="submit"
            className="btn-primary w-full text-xs"
            disabled={submitting}
          >
            {submitting ? "Влизане..." : "Вход"}
          </button>
        </form>
      </div>
    </div>
  );
}

