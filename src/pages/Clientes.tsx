import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { mockClients } from '@/data/mockData';
import { Client } from '@/types';

const Clientes = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.cnpj.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Cadastro e gestão de clientes</p>
        </div>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button className="gradient-laser"><Plus className="mr-2 h-4 w-4" /> Novo Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Novo Cliente</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-4">
              {['Nome / Razão Social', 'CNPJ', 'E-mail', 'Telefone', 'Endereço'].map(field => (
                <div key={field} className="space-y-1">
                  <Label>{field}</Label>
                  <Input placeholder={field} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Desconto (%)</Label><Input type="number" placeholder="0" /></div>
                <div className="space-y-1"><Label>Preço personalizado (R$/min)</Label><Input type="number" placeholder="Padrão" /></div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
                <Button className="gradient-laser" onClick={() => setShowNew(false)}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou CNPJ..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => (
          <Card key={c.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-1">{c.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{c.cnpj}</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📧 {c.email}</p>
                <p>📞 {c.phone}</p>
                <p>📍 {c.address}</p>
              </div>
              {c.discount ? <p className="mt-3 text-xs font-medium text-laser">Desconto: {c.discount}%</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
