import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LayoutGrid, Maximize } from 'lucide-react';
import { mockMaterials } from '@/data/mockData';

interface NestingPiece {
  id: string;
  name: string;
  width: number;
  height: number;
  qty: number;
  color: string;
}

const COLORS = ['hsl(25,95%,53%)', 'hsl(200,70%,50%)', 'hsl(150,60%,45%)', 'hsl(280,60%,55%)', 'hsl(340,65%,55%)', 'hsl(45,90%,50%)'];

const Nesting = () => {
  const [sheetMaterial, setSheetMaterial] = useState('');
  const [pieces] = useState<NestingPiece[]>([
    { id: '1', name: 'Flange A', width: 200, height: 200, qty: 8, color: COLORS[0] },
    { id: '2', name: 'Suporte B', width: 150, height: 100, qty: 12, color: COLORS[1] },
    { id: '3', name: 'Placa C', width: 300, height: 250, qty: 4, color: COLORS[2] },
  ]);
  const [optimized, setOptimized] = useState(false);

  const selectedMat = mockMaterials.find(m => m.id === sheetMaterial);
  const sheetW = selectedMat?.width || 3000;
  const sheetH = selectedMat?.height || 1500;
  const scale = 0.18;

  // Simplified nesting simulation
  const getPositions = () => {
    const positions: Array<{ x: number; y: number; w: number; h: number; color: string; name: string }> = [];
    let curX = 10, curY = 10, rowH = 0;
    pieces.forEach(p => {
      for (let i = 0; i < p.qty; i++) {
        if (curX + p.width > sheetW - 10) {
          curX = 10;
          curY += rowH + 10;
          rowH = 0;
        }
        if (curY + p.height <= sheetH - 10) {
          positions.push({ x: curX, y: curY, w: p.width, h: p.height, color: p.color, name: p.name });
          curX += p.width + (optimized ? 5 : 15);
          rowH = Math.max(rowH, p.height);
        }
      }
    });
    return positions;
  };

  const positions = getPositions();
  const totalArea = pieces.reduce((a, p) => a + p.width * p.height * p.qty, 0);
  const sheetArea = sheetW * sheetH;
  const utilization = ((totalArea / sheetArea) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Nesting</h1>
        <p className="text-muted-foreground">Otimização de aproveitamento de chapas</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Configuração</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Chapa</Label>
              <Select value={sheetMaterial} onValueChange={setSheetMaterial}>
                <SelectTrigger><SelectValue placeholder="Selecionar chapa" /></SelectTrigger>
                <SelectContent>{mockMaterials.map(m => <SelectItem key={m.id} value={m.id}>{m.name} {m.thickness}mm ({m.width}x{m.height})</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Peças no layout</Label>
              {pieces.map(p => (
                <div key={p.id} className="flex items-center gap-2 text-sm rounded border p-2">
                  <div className="h-3 w-3 rounded" style={{ background: p.color }} />
                  <span className="flex-1">{p.name}</span>
                  <span className="text-muted-foreground">{p.width}x{p.height}mm</span>
                  <span className="font-semibold">x{p.qty}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-muted text-sm space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Aproveitamento</span><span className="font-bold text-laser">{utilization}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Peças posicionadas</span><span className="font-bold">{positions.length}</span></div>
            </div>
            <Button className="w-full gradient-laser" onClick={() => setOptimized(!optimized)}>
              <Maximize className="mr-2 h-4 w-4" /> {optimized ? 'Reset Layout' : 'Otimizar Layout'}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><LayoutGrid className="h-4 w-4" /> Visualização da Chapa</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-lg border bg-steel-dark/20 p-4">
              <svg width={sheetW * scale} height={sheetH * scale} className="mx-auto">
                {/* Sheet */}
                <rect x={0} y={0} width={sheetW * scale} height={sheetH * scale} fill="hsl(var(--steel-dark))" stroke="hsl(var(--steel))" strokeWidth={2} rx={4} />
                {/* Pieces */}
                {positions.map((p, i) => (
                  <g key={i}>
                    <rect
                      x={p.x * scale} y={p.y * scale}
                      width={p.w * scale} height={p.h * scale}
                      fill={p.color} fillOpacity={0.7}
                      stroke={p.color} strokeWidth={1}
                      rx={2}
                    />
                    {p.w * scale > 30 && (
                      <text x={(p.x + p.w / 2) * scale} y={(p.y + p.h / 2) * scale} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="white" fontWeight="600">
                        {p.name}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nesting;
