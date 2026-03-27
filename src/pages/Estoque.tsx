import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { mockMaterials, mockStockMovements } from '@/data/mockData';
import { Material } from '@/types';

const Estoque = () => {
  const [materials] = useState<Material[]>(mockMaterials);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">Controle de chapas e materiais</p>
        </div>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button className="gradient-laser"><Plus className="mr-2 h-4 w-4" /> Adicionar Material</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Novo Material</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-4">
              {[['Material', 'text'], ['Espessura (mm)', 'number'], ['Largura (mm)', 'number'], ['Altura (mm)', 'number'], ['Preço/kg (R$)', 'number'], ['Quantidade', 'number'], ['Estoque Mínimo', 'number']].map(([label, type]) => (
                <div key={label as string} className="space-y-1">
                  <Label>{label as string}</Label>
                  <Input type={type as string} placeholder={label as string} />
                </div>
              ))}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
                <Button className="gradient-laser" onClick={() => setShowNew(false)}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Materials Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map(m => {
          const isLow = m.quantity <= m.minStock;
          return (
            <Card key={m.id} className={`shadow-card ${isLow ? 'border-warning/50' : ''}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.thickness}mm — {m.width}x{m.height}mm</p>
                  </div>
                  {isLow && <AlertTriangle className="h-5 w-5 text-warning" />}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Quantidade</p>
                    <p className={`font-bold text-lg ${isLow ? 'text-warning' : ''}`}>{m.quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Mín.</p>
                    <p className="font-semibold">{m.minStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">R$/kg</p>
                    <p className="font-semibold">R$ {m.pricePerKg.toFixed(2)}</p>
                  </div>
                </div>
                {isLow && <Badge variant="outline" className="mt-3 text-warning border-warning">Estoque Baixo</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Movements */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><ArrowUpDown className="h-4 w-4" /> Histórico de Movimentações</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium text-muted-foreground">Data</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Material</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Tipo</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Qtd</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {mockStockMovements.map(mv => (
                <tr key={mv.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-muted-foreground">{mv.date}</td>
                  <td className="p-3">{mv.materialName}</td>
                  <td className="p-3">
                    <Badge variant={mv.type === 'in' ? 'default' : 'secondary'} className={mv.type === 'in' ? 'bg-success' : ''}>
                      {mv.type === 'in' ? 'Entrada' : 'Saída'}
                    </Badge>
                  </td>
                  <td className="p-3 font-semibold">{mv.quantity}</td>
                  <td className="p-3 text-muted-foreground">{mv.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estoque;
