import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send } from 'lucide-react';
import { mockClients, mockQuotes } from '@/data/mockData';

const WhatsApp = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedQuote, setSelectedQuote] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<Array<{ to: string; msg: string; time: string }>>([
    { to: 'Metalúrgica São Paulo', msg: 'Orçamento ORC-001 enviado. Valor: R$ 1.800,00. Aguardamos retorno!', time: '15/03/2024 14:30' },
  ]);

  const sendMessage = () => {
    const client = mockClients.find(c => c.id === selectedClient);
    if (!client || !message) return;
    setSentMessages([{ to: client.name, msg: message, time: new Date().toLocaleString('pt-BR') }, ...sentMessages]);
    setMessage('');
  };

  const generateQuoteMsg = () => {
    const quote = mockQuotes.find(q => q.id === selectedQuote);
    if (!quote) return;
    setMessage(`Olá! Segue orçamento ${quote.id}.\n\nMaterial: ${quote.materialName} ${quote.thickness}mm\nPeças: ${quote.pieces.map(p => `${p.name} (${p.quantity}un)`).join(', ')}\nValor: R$ ${quote.totalPrice.toLocaleString('pt-BR')}\n\nAguardamos seu retorno! 🔥`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">WhatsApp</h1>
        <p className="text-muted-foreground">Envio de mensagens e orçamentos</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><MessageCircle className="h-4 w-4 text-success" /> Enviar Mensagem</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger><SelectValue placeholder="Selecionar cliente" /></SelectTrigger>
                <SelectContent>{mockClients.map(c => <SelectItem key={c.id} value={c.id}>{c.name} — {c.phone}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Orçamento (opcional)</Label>
              <div className="flex gap-2">
                <Select value={selectedQuote} onValueChange={setSelectedQuote}>
                  <SelectTrigger><SelectValue placeholder="Vincular orçamento" /></SelectTrigger>
                  <SelectContent>{mockQuotes.map(q => <SelectItem key={q.id} value={q.id}>{q.id} — {q.clientName}</SelectItem>)}</SelectContent>
                </Select>
                <Button variant="outline" onClick={generateQuoteMsg} disabled={!selectedQuote}>Gerar</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mensagem</Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Digite a mensagem..."
              />
            </div>
            <Button className="w-full gradient-laser" onClick={sendMessage} disabled={!selectedClient || !message}>
              <Send className="mr-2 h-4 w-4" /> Enviar via WhatsApp (Simulado)
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Mensagens Enviadas</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {sentMessages.map((m, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{m.to}</span>
                  <span>{m.time}</span>
                </div>
                <p className="text-sm whitespace-pre-line">{m.msg}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsApp;
