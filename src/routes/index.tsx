import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MemberCard, type CardData } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/")({
  component: Index,
});

const CARGOS = [
  "Presidente",
  "Vice-Presidente",
  "Secretário",
  "Tesoureiro",
  "Conselheiro Fiscal",
  "Coordenador",
];

function Index() {
  const [variant, setVariant] = useState<"member" | "officer">("member");
  const [data, setData] = useState<CardData>({
    nome: "João da Silva Santos",
    cargo: "Presidente",
    matricula: "APB-2025-0001",
    cpf: "000.000.000-00",
    rg: "00.000.000-0 SSP/BA",
    filiacao: "Maria Santos e José Santos",
    naturalidade: "Salvador/BA",
    nascimento: "01/01/1985",
    sangue: "O+",
    doador: "SIM",
    validade: "12/2028",
    fotoUrl: "",
  });

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, fotoUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10 text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2">ASSOCIAÇÃO PENAL BAHIA</p>
          <h1 className="text-4xl font-bold tracking-tight">Carteira de Associado</h1>
          <p className="text-muted-foreground mt-2">Modelos modernos para membros e diretoria</p>
        </header>

        <Tabs value={variant} onValueChange={(v) => setVariant(v as "member" | "officer")}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="member">Associado</TabsTrigger>
            <TabsTrigger value="officer">Com Cargo</TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <div className="space-y-4 order-2 lg:order-1">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" value={data.nome} onChange={(e) => setData({ ...data, nome: e.target.value })} />
              </div>

              <TabsContent value="officer" className="m-0">
                <Label htmlFor="cargo">Cargo</Label>
                <Select value={data.cargo} onValueChange={(v) => setData({ ...data, cargo: v })}>
                  <SelectTrigger id="cargo"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CARGOS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </TabsContent>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input id="matricula" value={data.matricula} onChange={(e) => setData({ ...data, matricula: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="validade">Validade</Label>
                  <Input id="validade" placeholder="MM/AAAA" value={data.validade} onChange={(e) => setData({ ...data, validade: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" value={data.cpf} onChange={(e) => setData({ ...data, cpf: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="rg">RG / Órgão</Label>
                  <Input id="rg" value={data.rg} onChange={(e) => setData({ ...data, rg: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="foto">Foto</Label>
                <Input id="foto" type="file" accept="image/*" onChange={handleFoto} />
              </div>

              <Button className="w-full" onClick={() => window.print()}>Imprimir / Exportar PDF</Button>
            </div>

            {/* Preview */}
            <div className="order-1 lg:order-2 flex justify-center sticky top-8">
              <MemberCard data={data} variant={variant} />
            </div>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
