import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign, FileText, ClipboardList, Package, Factory, TrendingUp, TrendingDown, AlertTriangle
} from 'lucide-react';
import { mockQuotes, mockOrders, mockMaterials, mockFinancial, mockProduction } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const totalRevenue = mockFinancial.filter(f => f.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpenses = mockFinancial.filter(f => f.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const pendingQuotes = mockQuotes.filter(q => q.status === 'sent' || q.status === 'draft').length;
  const activeOrders = mockOrders.filter(o => o.status !== 'finished').length;
  const lowStockItems = mockMaterials.filter(m => m.quantity <= m.minStock).length;
  const inProduction = mockProduction.filter(p => p.status === 'cutting').length;

  const revenueData = [
    { month: 'Jan', receita: 12500, custo: 8200 },
    { month: 'Fev', receita: 18300, custo: 11400 },
    { month: 'Mar', receita: totalRevenue, custo: totalExpenses },
  ];

  const orderStatusData = [
    { name: 'Aguardando', value: mockOrders.filter(o => o.status === 'waiting').length, color: 'hsl(45, 90%, 50%)' },
    { name: 'Produção', value: mockOrders.filter(o => o.status === 'production').length, color: 'hsl(25, 95%, 53%)' },
    { name: 'Finalizado', value: mockOrders.filter(o => o.status === 'finished').length, color: 'hsl(150, 60%, 45%)' },
  ];

  const stats = [
    { title: 'Receita Mensal', value: `R$ ${totalRevenue.toLocaleString('pt-BR')}`, icon: DollarSign, trend: '+12%', trendUp: true, color: 'text-success' },
    { title: 'Orçamentos Pendentes', value: pendingQuotes, icon: FileText, trend: `${mockQuotes.length} total`, trendUp: null, color: 'text-laser' },
    { title: 'Pedidos Ativos', value: activeOrders, icon: ClipboardList, trend: `${inProduction} cortando`, trendUp: null, color: 'text-chart-2' },
    { title: 'Estoque Baixo', value: lowStockItems, icon: lowStockItems > 0 ? AlertTriangle : Package, trend: `${mockMaterials.length} materiais`, trendUp: null, color: lowStockItems > 0 ? 'text-warning' : 'text-steel' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema LaserFlow</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.trendUp !== null && (stat.trendUp ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />)}
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className={`rounded-xl bg-muted p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Receita vs Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="receita" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Receita" />
                <Bar dataKey="custo" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Custos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Status Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {orderStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Produção Ativa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockProduction.filter(p => p.status !== 'done').map((prod) => (
              <div key={prod.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{prod.pieceName}</p>
                  <p className="text-xs text-muted-foreground">{prod.clientName} — {prod.quantity} un</p>
                </div>
                <Badge variant={prod.status === 'cutting' ? 'default' : 'secondary'} className={prod.status === 'cutting' ? 'gradient-laser' : ''}>
                  {prod.status === 'cutting' ? '🔥 Cortando' : 'Na fila'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Últimas Movimentações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockFinancial.slice(-4).reverse().map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{entry.description}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
                <span className={`text-sm font-semibold ${entry.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                  {entry.type === 'income' ? '+' : '-'} R$ {entry.amount.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
