import logo from "@/assets/logo-penal-bahia.jpg";

export interface CardData {
  nome: string;
  cargo?: string;
  matricula: string;
  cpf: string;
  rg: string;
  validade: string;
  fotoUrl?: string;
}

interface Props {
  data: CardData;
  variant: "member" | "officer";
}

export function MemberCard({ data, variant }: Props) {
  const isOfficer = variant === "officer";

  return (
    <div className="relative w-[340px] h-[540px] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] font-sans">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isOfficer ? "var(--gradient-card-officer)" : "var(--gradient-card)",
        }}
      />

      {/* Guilloché pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`guilloche-${variant}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="38" fill="none" stroke="white" strokeWidth="0.4" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="white" strokeWidth="0.4" />
            <circle cx="40" cy="40" r="18" fill="none" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#guilloche-${variant})`} />
      </svg>

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={logo} alt="" className="w-[80%] opacity-[0.06]" />
      </div>

      {/* Sheen */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-sheen)" }} />

      {/* Top gold bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "var(--gradient-gold)" }} />

      {/* Content */}
      <div className="relative h-full flex flex-col p-5 text-white">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Penal Bahia" className="w-14 h-14 object-contain drop-shadow-lg" />
          <div className="flex-1 leading-tight">
            <p className="text-[8px] tracking-[0.18em] opacity-80">REPÚBLICA FEDERATIVA DO BRASIL</p>
            <p className="text-[8px] tracking-[0.18em] opacity-80">ESTADO DA BAHIA</p>
            <h1 className="text-[15px] font-bold tracking-wider mt-0.5">ASSOCIAÇÃO PENAL</h1>
            <p
              className="text-[10px] font-semibold tracking-[0.25em]"
              style={{ color: "oklch(0.85 0.14 85)" }}
            >
              {isOfficer ? "DIRETORIA" : "ASSOCIADO"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px my-4" style={{ background: "var(--gradient-gold)", opacity: 0.6 }} />

        {/* Photo + role */}
        <div className="flex gap-4">
          <div
            className="w-[110px] h-[140px] rounded-lg overflow-hidden flex-shrink-0 border-2"
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
          <div className="flex-1 flex flex-col justify-end">
            {isOfficer && data.cargo && (
              <div
                className="px-2 py-1 rounded text-[9px] font-bold tracking-wider mb-2 inline-block w-fit"
                style={{ background: "var(--gradient-gold)", color: "oklch(0.18 0.08 262)" }}
              >
                {data.cargo.toUpperCase()}
              </div>
            )}
            <p className="text-[8px] tracking-[0.2em] opacity-70">MATRÍCULA</p>
            <p className="text-sm font-mono font-semibold">{data.matricula || "—"}</p>
          </div>
        </div>

        {/* Name */}
        <div className="mt-4">
          <p className="text-[8px] tracking-[0.2em] opacity-70">NOME</p>
          <p className="text-base font-bold leading-tight uppercase">{data.nome || "—"}</p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
          <div>
            <p className="text-[8px] tracking-[0.2em] opacity-70">CPF</p>
            <p className="text-xs font-mono">{data.cpf || "—"}</p>
          </div>
          <div>
            <p className="text-[8px] tracking-[0.2em] opacity-70">RG</p>
            <p className="text-xs font-mono">{data.rg || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[8px] tracking-[0.2em] opacity-70">VÁLIDA ATÉ</p>
            <p className="text-xs font-mono">{data.validade || "—"}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/15 flex items-center justify-between">
          <div>
            <p className="text-[7px] tracking-[0.25em] opacity-60">VÁLIDA EM TODO</p>
            <p className="text-[7px] tracking-[0.25em] opacity-60">TERRITÓRIO NACIONAL</p>
          </div>
          <p
            className="text-lg font-black tracking-widest"
            style={{ color: "oklch(0.78 0.14 80)" }}
          >
            APB
          </p>
        </div>
      </div>
    </div>
  );
}
