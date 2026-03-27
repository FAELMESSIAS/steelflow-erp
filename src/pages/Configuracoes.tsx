import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { defaultConfig } from '@/data/mockData';
import { SystemConfig } from '@/types';

const Configuracoes = () => {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Parâmetros do sistema de corte</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><SettingsIcon className="h-4 w-4" /> Parâmetros de Cálculo</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Valor por Minuto (R$)</Label>
              <Input type="number" step="0.1" value={config.pricePerMinute} onChange={e => setConfig({ ...config, pricePerMinute: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Custo por Pierce (R$)</Label>
              <Input type="number" step="0.1" value={config.pricePerPierce} onChange={e => setConfig({ ...config, pricePerPierce: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Margem de Lucro (%)</Label>
              <Input type="number" value={config.profitMargin} onChange={e => setConfig({ ...config, profitMargin: Number(e.target.value) })} />
            </div>
            <Button className="w-full gradient-laser"><Save className="mr-2 h-4 w-4" /> Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Tabela de Velocidades (mm/min)</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium text-muted-foreground">Material</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Espessura</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Velocidade</th>
              </tr></thead>
              <tbody>
                {config.speedTable.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">{s.material}</td>
                    <td className="p-3">{s.thickness}mm</td>
                    <td className="p-3 font-mono">{s.speed.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;
