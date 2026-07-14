"use client";

import { useState } from "react";

export default function ViewingActions({
  id,
}: {
  id: string;
}) {

  const [loading, setLoading] = useState(false);

  async function updateStatus(status: string) {

    setLoading(true);

    await fetch("/api/admin/viewings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    window.location.reload();
  }


  return (
    <div className="flex flex-col gap-2">

      <button
        disabled={loading}
        onClick={() => updateStatus("accepted")}
        className="rounded-xl bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
      >
        Zusage setzen
      </button>


      <button
        disabled={loading}
        onClick={() => updateStatus("declined")}
        className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Absage setzen
      </button>


      <button
        disabled={loading}
        onClick={() => updateStatus("pending")}
        className="rounded-xl border px-4 py-2 hover:bg-slate-50"
      >
        Offen setzen
      </button>

    </div>
  );
}