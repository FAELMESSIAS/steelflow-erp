import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { mockFinancial } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Financeiro = () => {
  const income = mockFinancial.filter(f => f.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expenses = mockFinancial.filter(f => f.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const profit = income - expenses;

  const cashFlowData = [
    { dia: '01', saldo: 0 },
    { dia: '05', saldo: -2500 },
    { dia: '10', saldo: -3300 },
    { dia: '12', saldo: -2850 },
    { dia: '14', saldo: -4050 },
    { dia: '16', saldo: -2250 },
    { dia: '19', saldo: -450 },
  ];

  const categoryData = [
    { name: 'Vendas', valor: income },
    { name: 'Material', valor: 2500 },
    { name: 'Gás', valor: 800 },
    { name: 'Manutenção', valor: 1200 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <p className="text-muted-foreground">Controle financeiro e fluxo de caixa</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="rounded-xl bg-success/10 p-3"><TrendingUp className="h-5 w-5 text-success" /></div>
            <div><p className="text-xs text-muted-foreground">Entradas</p><p className="text-xl font-bold text-success">R$ {income.toLocaleString('pt-BR')}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="rounded-xl bg-destructive/10 p-3"><TrendingDown className="h-5 w-5 text-destructive" /></div>
            <div><p className="text-xs text-muted-foreground">Saídas</p><p className="text-xl font-bold text-destructive">R$ {expenses.toLocaleString('pt-BR')}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="rounded-xl bg-laser/10 p-3"><DollarSign className="h-5 w-5 text-laser" /></div>
            <div><p className="text-xs text-muted-foreground">Lucro</p><p className={`text-xl font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>R$ {profit.toLocaleString('pt-BR')}</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Fluxo de Caixa</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="saldo" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-1))' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Despesas por Categoria</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Bar dataKey="valor" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><ArrowUpDown className="h-4 w-4" /> Movimentações</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-medium text-muted-foreground">Data</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Descrição</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Categoria</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Tipo</th>
              <th className="p-3 text-right font-medium text-muted-foreground">Valor</th>
            </tr></thead>
            <tbody>
              {mockFinancial.map(e => (
                <tr key={e.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-muted-foreground">{e.date}</td>
                  <td className="p-3">{e.description}</td>
                  <td className="p-3 text-muted-foreground">{e.category}</td>
                  <td className="p-3"><Badge variant={e.type === 'income' ? 'default' : 'secondary'} className={e.type === 'income' ? 'bg-success' : ''}>
                    {e.type === 'income' ? 'Entrada' : 'Saída'}
                  </Badge></td>
                  <td className={`p-3 text-right font-semibold ${e.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                    {e.type === 'income' ? '+' : '-'} R$ {e.amount.toLocaleString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financeiro;
