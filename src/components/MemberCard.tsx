import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/logo-penal-bahia.png";

export interface CardData {
  nome: string;
  cargo?: string;
  unidade?: string;
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

/** Deterministic digital-camo style pattern in shades of gray */
function DigitalCamo({ id }: { id: string }) {
  // pseudo-random but deterministic 16x26 grid of gray tiles
  const cols = 16;
  const rows = 26;
  const tile = 22;
  const shades = ["#1f2227", "#2a2e34", "#353a41", "#42474f", "#22262b"];
  const rects: React.ReactElement[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const c = shades[Math.floor(rand() * shades.length)];
      rects.push(<rect key={`${x}-${y}`} x={x * tile} y={y * tile} width={tile} height={tile} fill={c} />);
    }
  }
  // small accent pixels
  for (let i = 0; i < 60; i++) {
    const x = Math.floor(rand() * cols) * tile;
    const y = Math.floor(rand() * rows) * tile;
    rects.push(<rect key={`a-${i}`} x={x} y={y} width={tile / 2} height={tile / 2} fill="#4a4f57" />);
  }
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${cols * tile} ${rows * tile}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g id={id}>{rects}</g>
    </svg>
  );
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
      {/* base dark gray */}
      <div className="absolute inset-0" style={{ background: "#1a1d22" }} />
      {/* digital camo */}
      <DigitalCamo id={`camo-${variant}`} />
      {/* darken vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* faint emblem watermark — B&W negative */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={logo}
          alt=""
          className="w-[95%] opacity-30"
          style={{
            filter:
              "grayscale(1) contrast(1.4) brightness(1.6) invert(1) drop-shadow(0 0 18px rgba(0,0,0,0.7))",
            mixBlendMode: "screen",
          }}
        />
      </div>
      {/* sheen */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-sheen)" }} />
      {/* gold top bar — slightly thicker for officer */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: isOfficer ? 8 : 4, background: "var(--gradient-gold)" }}
      />
      <div className="relative h-full flex flex-col p-5 text-white">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[8px] tracking-[0.2em] opacity-70 font-bold">{label}</p>
      <p className="text-xs font-mono">{value || "—"}</p>
    </div>
  );
}

function PBMark({ size = "sm" }: { size?: "sm" | "lg" | "xl" }) {
  const cls = size === "xl" ? "text-3xl" : size === "lg" ? "text-xl" : "text-sm";
  return (
    <p
      className={`${cls} font-black tracking-[0.18em]`}
      style={{ color: "oklch(0.85 0.14 85)" }}
    >
      PENAL BAHIA
    </p>
  );
}


function Brand({ compact = false, textOnly = false }: { isOfficer?: boolean; compact?: boolean; textOnly?: boolean }) {
  if (textOnly) {
    return (
      <div className="w-full">
        <p
          className="text-[15px] font-black uppercase leading-[1.15] w-full"
          style={{
            color: "oklch(0.88 0.14 85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "justify",
            textAlignLast: "justify",
            wordSpacing: "-0.04em",
            letterSpacing: "-0.005em",
          }}
        >
          Associação dos Policiais Penais e servidores do sistema penitenciário do estado da Bahia
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-stretch gap-3">
      <div className="relative flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{ background: "var(--gradient-gold)" }}
        />
        <img
          src={logo}
          alt="Penal Bahia"
          className={`relative ${compact ? "w-24 h-24" : "w-32 h-32"} object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p
          className="text-[15px] font-black uppercase leading-[1.1] w-full"
          style={{
            color: "oklch(0.88 0.14 85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "justify",
            textAlignLast: "justify",
            wordSpacing: "-0.04em",
            letterSpacing: "-0.01em",
          }}
        >
          Associação dos
        </p>
        <p
          className="text-[13px] font-black uppercase leading-[1.15] w-full mt-1"
          style={{
            color: "oklch(0.88 0.14 85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "justify",
            textAlignLast: "justify",
            wordSpacing: "-0.05em",
            letterSpacing: "-0.01em",
          }}
        >
          Policiais Penais e servidores do sistema penitenciário do estado da Bahia
        </p>
      </div>

    </div>
  );
}



function QR({ value, size = 72 }: { value: string; size?: number }) {
  return (
    <QRCodeSVG
      value={value || "PENAL-BAHIA"}
      size={size}
      level="M"
      bgColor="transparent"
      fgColor="#f5e6b8"
    />
  );
}

export function MemberCard({ data, variant, side = "front" }: Props) {
  const isOfficer = variant === "officer";
  const qrValue = `APB|${data.matricula || "—"}|${data.nome || ""}|${data.cpf || ""}`;

  if (side === "back") {
    return (
      <CardShell isOfficer={isOfficer} variant={`${variant}-b`}>
        <Brand isOfficer={isOfficer} textOnly />
        <div className="h-px my-3" style={{ background: "var(--gradient-gold)", opacity: 0.5 }} />

        <div className="space-y-3">
          {isOfficer ? (
            <div>
              <p
                className="text-center text-[11px] font-black tracking-[0.2em] mb-2 whitespace-nowrap"
                style={{ color: "oklch(0.85 0.14 85)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                REPRESENTANTE INSTITUCIONAL
              </p>
              <Field label="FUNÇÃO/CARGO" value={data.cargo} />
            </div>
          ) : null}
          <Field label="MATRÍCULA" value={data.matricula} />
          <Field label="FILIAÇÃO" value={data.filiacao} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="NATURALIDADE" value={data.naturalidade} />
            <Field label="NASCIMENTO" value={data.nascimento} />
            <Field label="G. SANGUÍNEO" value={data.sangue} />
            <Field label="DOADOR" value={data.doador} />
          </div>
          {isOfficer ? (
            <p
              className="text-[10px] leading-[1.35] text-white/85 italic"
              style={{ textAlign: "justify", textAlignLast: "justify" }}
            >
              Esta credencial identifica seu portador como representante institucional da Penal Bahia, investindo-o nas atribuições inerentes ao cargo ou função nela especificados.
            </p>
          ) : null}
          <Field label="VALIDADE" value={data.validade} />
        </div>


        <div className="mt-auto pt-3 border-t border-white/15 flex items-center justify-center">
          <PBMark size="xl" />
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
        <div className="flex-1 flex items-center justify-center min-w-0">
          <QR value={qrValue} size={126} />
        </div>
      </div>

      <div className="mt-3">
        <Field label="NOME" value={data.nome?.toUpperCase()} />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2">
        <Field label="CPF" value={data.cpf} />
        <Field label="RG" value={data.rg} />
      </div>

      <div className="mt-2">
        <Field label="UNIDADE" value={data.unidade} />
      </div>

      <div className="mt-auto flex flex-col items-center">
        <p
          className="text-[10px] tracking-[0.2em] text-center font-semibold pb-2"
          style={{ color: "oklch(0.85 0.14 85)" }}
        >
          VÁLIDA EM TODO TERRITÓRIO NACIONAL
        </p>
        <div className="w-full border-t border-white/15 pt-2 flex justify-center">
          <PBMark size="xl" />
        </div>
      </div>
    </CardShell>
  );
}
