"use client";
import { useLoginMutation } from "@/app/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleSubmit = async () => {
    try {
      await login(form).unwrap();
      router.push(`/${params.locale}`); // ✅ الصح
    } catch (err) {
      console.error("فشل:", err);
    }
  };

  return (
    <div>
      <input
        value={form.identifier}
        onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        placeholder="الإيميل"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="الباسورد"
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "جاري الدخول..." : "دخول"}
      </button>
    </div>
  );
}