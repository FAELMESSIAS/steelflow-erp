import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle, Clock } from 'lucide-react';
import { mockProduction } from '@/data/mockData';
import { ProductionOrder } from '@/types';

const statusColors: Record<string, string> = {
  queued: '',
  cutting: 'gradient-laser',
  done: 'bg-success',
};
const statusLabels: Record<string, string> = {
  queued: 'Na Fila',
  cutting: '🔥 Cortando',
  done: '✅ Concluído',
};

const Producao = () => {
  const [production, setProduction] = useState<ProductionOrder[]>(mockProduction);

  const startCutting = (id: string) => {
    setProduction(production.map(p => p.id === id ? { ...p, status: 'cutting' as const, startedAt: new Date().toISOString() } : p));
  };
  const finish = (id: string) => {
    setProduction(production.map(p => p.id === id ? { ...p, status: 'done' as const, completedAt: new Date().toISOString() } : p));
  };

  const totalTime = production.reduce((a, b) => a + b.estimatedTime, 0);
  const doneTime = production.filter(p => p.status === 'done').reduce((a, b) => a + b.estimatedTime, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Produção</h1>
        <p className="text-muted-foreground">Controle de ordens de produção</p>
      </div>

      {/* Summary */}
      <Card className="shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">{doneTime}/{totalTime} min</span>
          </div>
          <Progress value={(doneTime / totalTime) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Orders */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {production.map(p => (
          <Card key={p.id} className={`shadow-card ${p.status === 'cutting' ? 'border-laser/50' : ''}`}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{p.pieceName}</h3>
                  <p className="text-xs text-muted-foreground">{p.clientName}</p>
                </div>
                <Badge className={statusColors[p.status]}>{statusLabels[p.status]}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Quantidade</p>
                  <p className="font-semibold">{p.quantity} un</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="h-3 w-3" /> Tempo Est.</p>
                  <p className="font-semibold">{p.estimatedTime} min</p>
                </div>
              </div>
              <div className="flex gap-2">
                {p.status === 'queued' && <Button size="sm" variant="outline" className="w-full" onClick={() => startCutting(p.id)}><Play className="mr-1 h-3 w-3" /> Iniciar Corte</Button>}
                {p.status === 'cutting' && <Button size="sm" className="w-full gradient-laser" onClick={() => finish(p.id)}><CheckCircle className="mr-1 h-3 w-3" /> Finalizar</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Producao;
