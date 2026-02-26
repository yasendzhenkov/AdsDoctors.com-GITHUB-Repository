import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="grid-page" />}>
      <AdminLoginForm />
    </Suspense>
  );
}

