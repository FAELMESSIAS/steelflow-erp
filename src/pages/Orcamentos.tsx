import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Calculator, Send } from 'lucide-react';
import { mockQuotes, mockMaterials, mockClients, defaultConfig } from '@/data/mockData';
import DxfUpload from '@/components/DxfUpload';
import { Quote, QuotePiece } from '@/types';

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Rascunho', variant: 'secondary' },
  sent: { label: 'Enviado', variant: 'outline' },
  approved: { label: 'Aprovado', variant: 'default' },
  rejected: { label: 'Rejeitado', variant: 'destructive' },
};

const Orcamentos = () => {
  const [quotes] = useState<Quote[]>(mockQuotes);
  const [showNew, setShowNew] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [pieces, setPieces] = useState<Partial<QuotePiece>[]>([
    { id: '1', name: '', width: 0, height: 0, quantity: 1, cuttingLength: 0, pierces: 1 }
  ]);

  const addPiece = () => {
    setPieces([...pieces, { id: String(pieces.length + 1), name: '', width: 0, height: 0, quantity: 1, cuttingLength: 0, pierces: 1 }]);
  };

  const removePiece = (idx: number) => {
    setPieces(pieces.filter((_, i) => i !== idx));
  };

  const updatePiece = (idx: number, field: string, value: string | number) => {
    const updated = [...pieces];
    (updated[idx] as any)[field] = value;
    // Auto-calc cutting length from dimensions
    if (field === 'width' || field === 'height') {
      const w = Number(updated[idx].width) || 0;
      const h = Number(updated[idx].height) || 0;
      updated[idx].cuttingLength = (w + h) * 2;
    }
    setPieces(updated);
  };

  const calculateTotal = () => {
    let totalTime = 0;
    let totalPierces = 0;
    pieces.forEach(p => {
      const cutLen = (p.cuttingLength || 0) * (p.quantity || 1);
      totalTime += cutLen / 6000; // simplified speed
      totalPierces += (p.pierces || 0) * (p.quantity || 1);
    });
    const cost = totalTime * defaultConfig.pricePerMinute + totalPierces * defaultConfig.pricePerPierce;
    const price = cost * (1 + defaultConfig.profitMargin / 100);
    return { totalTime: totalTime.toFixed(1), cost: cost.toFixed(2), price: price.toFixed(2) };
  };

  const calc = calculateTotal();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground">Crie e gerencie orçamentos de corte a laser</p>
        </div>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button className="gradient-laser"><Plus className="mr-2 h-4 w-4" /> Novo Orçamento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Orçamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger><SelectValue placeholder="Selecionar cliente" /></SelectTrigger>
                    <SelectContent>
                      {mockClients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Material / Espessura</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger><SelectValue placeholder="Selecionar material" /></SelectTrigger>
                    <SelectContent>
                      {mockMaterials.map(m => <SelectItem key={m.id} value={m.id}>{m.name} - {m.thickness}mm</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Upload DXF */}
              <DxfUpload />

              {/* Pieces */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Peças (DXF simulado)</Label>
                  <Button variant="outline" size="sm" onClick={addPiece}><Plus className="mr-1 h-3 w-3" /> Peça</Button>
                </div>
                {pieces.map((piece, idx) => (
                  <div key={idx} className="grid grid-cols-6 gap-2 items-end rounded-lg border p-3">
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">Nome</Label>
                      <Input placeholder="Ex: Flange" value={piece.name} onChange={e => updatePiece(idx, 'name', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Larg. (mm)</Label>
                      <Input type="number" value={piece.width} onChange={e => updatePiece(idx, 'width', Number(e.target.value))} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Alt. (mm)</Label>
                      <Input type="number" value={piece.height} onChange={e => updatePiece(idx, 'height', Number(e.target.value))} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Qtd</Label>
                      <Input type="number" value={piece.quantity} onChange={e => updatePiece(idx, 'quantity', Number(e.target.value))} />
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="space-y-1 flex-1">
                        <Label className="text-xs">Pierces</Label>
                        <Input type="number" value={piece.pierces} onChange={e => updatePiece(idx, 'pierces', Number(e.target.value))} />
                      </div>
                      {pieces.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removePiece(idx)} className="text-destructive h-9 w-9">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculation */}
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="h-4 w-4 text-laser" />
                    <span className="font-semibold text-sm">Cálculo Automático</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tempo de Corte</p>
                      <p className="text-lg font-bold">{calc.totalTime} min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Custo</p>
                      <p className="text-lg font-bold">R$ {calc.cost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preço Final</p>
                      <p className="text-lg font-bold text-laser">R$ {calc.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
                <Button className="gradient-laser" onClick={() => setShowNew(false)}>
                  <Send className="mr-2 h-4 w-4" /> Salvar Orçamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium text-muted-foreground">Nº</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Cliente</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Material</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Peças</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Valor</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const st = statusMap[q.status];
                  return (
                    <tr key={q.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-mono text-xs">{q.id}</td>
                      <td className="p-3 font-medium">{q.clientName}</td>
                      <td className="p-3 text-muted-foreground">{q.materialName} - {q.thickness}mm</td>
                      <td className="p-3">{q.pieces.length} peça(s)</td>
                      <td className="p-3 font-semibold">R$ {q.totalPrice.toLocaleString('pt-BR')}</td>
                      <td className="p-3"><Badge variant={st.variant}>{st.label}</Badge></td>
                      <td className="p-3 text-muted-foreground">{q.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orcamentos;
