import DashboardShell from "@/components/layout/DashboardShell";
import PersonalDataForm from "./components/PersonalDataForm";

export default function ProfilPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Mein Profil
          </h1>

          <p className="mt-3 text-slate-600">
            Hinterlege alle Informationen für deine automatischen
            Mietbewerbungen.
          </p>
        </div>

        <PersonalDataForm />

      </div>
    </DashboardShell>
  );
}