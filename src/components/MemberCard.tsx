import logo from "@/assets/logo-penal-bahia.png";

export interface CardData {
  nome: string;
  cargo?: string;
  matricula: string;
  cpf: string;
  rg: string;
  filiacao?: string;
  naturalidade?: string;
  nascimento?: string;
  sangue?: string;
  doador?: string;
  validade: string;
  fotoUrl?: string;
}

interface Props {
  data: CardData;
  variant: "member" | "officer";
  side?: "front" | "back";
}

function CardShell({
  isOfficer,
  variant,
  children,
}: {
  isOfficer: boolean;
  variant: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-[340px] h-[540px] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] font-sans">
      <div
        className="absolute inset-0"
        style={{ background: isOfficer ? "var(--gradient-card-officer)" : "var(--gradient-card)" }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`g-${variant}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="38" fill="none" stroke="white" strokeWidth="0.4" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="white" strokeWidth="0.4" />
            <circle cx="40" cy="40" r="18" fill="none" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${variant})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={logo} alt="" className="w-[85%] opacity-[0.05]" />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-sheen)" }} />
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "var(--gradient-gold)" }} />
      <div className="relative h-full flex flex-col p-5 text-white">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[8px] tracking-[0.2em] opacity-70">{label}</p>
      <p className="text-xs font-mono">{value || "—"}</p>
    </div>
  );
}

function Brand({ isOfficer, compact = false }: { isOfficer: boolean; compact?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{ background: "var(--gradient-gold)" }}
        />
        <img
          src={logo}
          alt="Penal Bahia"
          className={`relative ${compact ? "w-20 h-20" : "w-28 h-28"} object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
        />
      </div>
      <h1
        className={`${compact ? "text-xl" : "text-2xl"} font-black tracking-[0.18em] mt-2 leading-none`}
        style={{ color: "oklch(0.92 0.13 85)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
      >
        PENAL BAHIA
      </h1>
      <p className="text-[8px] tracking-[0.2em] opacity-70 mt-1.5">ASSOCIAÇÃO DOS POLICIAIS PENAIS</p>
      <p className="text-[9px] font-semibold tracking-[0.18em] opacity-95">
        E SERVIDORES DO SISTEMA PENITENCIÁRIO
      </p>
      {isOfficer && (
        <p
          className="text-[10px] font-bold tracking-[0.3em] mt-1.5"
          style={{ color: "oklch(0.85 0.14 85)" }}
        >
          DIRETORIA
        </p>
      )}
    </div>
  );
}

export function MemberCard({ data, variant, side = "front" }: Props) {
  const isOfficer = variant === "officer";

  if (side === "back") {
    return (
      <CardShell isOfficer={isOfficer} variant={`${variant}-b`}>
        <Brand isOfficer={isOfficer} compact />
        <div className="h-px my-3" style={{ background: "var(--gradient-gold)", opacity: 0.5 }} />

        <div className="space-y-3">
          <Field label="FILIAÇÃO" value={data.filiacao} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="NATURALIDADE" value={data.naturalidade} />
            <Field label="NASCIMENTO" value={data.nascimento} />
            <Field label="G. SANGUÍNEO" value={data.sangue} />
            <Field label="DOADOR" value={data.doador} />
            <Field label="MATRÍCULA" value={data.matricula} />
            <Field label="CPF" value={data.cpf} />
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/15 flex items-center justify-between">
          <p className="text-[7px] tracking-[0.25em] opacity-60">VÁLIDA ATÉ {data.validade || "—"}</p>
          <p className="text-lg font-black tracking-widest" style={{ color: "oklch(0.85 0.14 85)" }}>
            APB
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell isOfficer={isOfficer} variant={variant}>
      <Brand isOfficer={isOfficer} />

      <div className="h-px my-3" style={{ background: "var(--gradient-gold)", opacity: 0.5 }} />

      <div className="flex gap-4">
        <div
          className="w-[100px] h-[130px] rounded-lg overflow-hidden flex-shrink-0 border-2"
          style={{ borderColor: "oklch(0.78 0.14 80)" }}
        >
          {data.fotoUrl ? (
            <img src={data.fotoUrl} alt={data.nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40 text-xs">
              FOTO
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-end min-w-0">
          {isOfficer && data.cargo && (
            <div
              className="px-2 py-1 rounded text-[9px] font-bold tracking-wider mb-2 inline-block w-fit"
              style={{ background: "var(--gradient-gold)", color: "oklch(0.18 0 0)" }}
            >
              {data.cargo.toUpperCase()}
            </div>
          )}
          <p className="text-[8px] tracking-[0.2em] opacity-70">MATRÍCULA</p>
          <p className="text-sm font-mono font-semibold">{data.matricula || "—"}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[8px] tracking-[0.2em] opacity-70">NOME</p>
        <p className="text-sm font-bold leading-tight uppercase">{data.nome || "—"}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2">
        <Field label="CPF" value={data.cpf} />
        <Field label="RG" value={data.rg} />
        <div className="col-span-2">
          <Field label="VÁLIDA ATÉ" value={data.validade} />
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-white/15 flex items-center justify-between">
        <p className="text-[7px] tracking-[0.25em] opacity-60">CARTEIRA DE ASSOCIADO</p>
        <p className="text-lg font-black tracking-widest" style={{ color: "oklch(0.85 0.14 85)" }}>
          APB
        </p>
      </div>
    </CardShell>
  );
}
