import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Send } from 'lucide-react';
import { mockInvoices } from '@/data/mockData';

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  pending: { label: 'Pendente', variant: 'secondary' },
  issued: { label: 'Emitida', variant: 'default' },
  cancelled: { label: 'Cancelada', variant: 'destructive' },
};

const NotasFiscais = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Notas Fiscais</h1>
      <p className="text-muted-foreground">Emissão simulada de notas fiscais</p>
    </div>
    <Card className="shadow-card">
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-muted/50">
            <th className="p-3 text-left font-medium text-muted-foreground">Número</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Cliente</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Pedido</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Valor</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="p-3 text-left font-medium text-muted-foreground">Ações</th>
          </tr></thead>
          <tbody>
            {mockInvoices.map(nf => {
              const st = statusMap[nf.status];
              return (
                <tr key={nf.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono text-xs">{nf.number}</td>
                  <td className="p-3 font-medium">{nf.clientName}</td>
                  <td className="p-3 text-muted-foreground">{nf.orderId}</td>
                  <td className="p-3 font-semibold">R$ {nf.amount.toLocaleString('pt-BR')}</td>
                  <td className="p-3"><Badge variant={st.variant} className={nf.status === 'issued' ? 'bg-success' : ''}>{st.label}</Badge></td>
                  <td className="p-3">
                    {nf.status === 'pending' && <Button size="sm" className="gradient-laser"><Send className="mr-1 h-3 w-3" /> Emitir</Button>}
                    {nf.status === 'issued' && <Button size="sm" variant="outline"><FileText className="mr-1 h-3 w-3" /> Ver</Button>}
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

export default NotasFiscais;
