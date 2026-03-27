import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';
import { mockOrders } from '@/data/mockData';
import { Order } from '@/types';

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  waiting: { label: 'Aguardando', variant: 'secondary' },
  production: { label: 'Em Produção', variant: 'default' },
  finished: { label: 'Finalizado', variant: 'outline' },
};

const Pedidos = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const startProduction = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'production' as const } : o));
  };
  const finishOrder = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'finished' as const, finishedAt: new Date().toISOString().split('T')[0] } : o));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie pedidos de produção</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium text-muted-foreground">Nº</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Cliente</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Material</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Valor</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const st = statusMap[o.status];
                return (
                  <tr key={o.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3 font-medium">{o.clientName}</td>
                    <td className="p-3 text-muted-foreground">{o.materialName}</td>
                    <td className="p-3 font-semibold">R$ {o.totalPrice.toLocaleString('pt-BR')}</td>
                    <td className="p-3"><Badge variant={st.variant} className={o.status === 'production' ? 'gradient-laser' : ''}>{st.label}</Badge></td>
                    <td className="p-3 flex gap-2">
                      {o.status === 'waiting' && <Button size="sm" variant="outline" onClick={() => startProduction(o.id)}><Play className="mr-1 h-3 w-3" /> Iniciar</Button>}
                      {o.status === 'production' && <Button size="sm" className="gradient-laser" onClick={() => finishOrder(o.id)}><CheckCircle className="mr-1 h-3 w-3" /> Finalizar</Button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pedidos;
