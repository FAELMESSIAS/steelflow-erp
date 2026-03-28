import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileUp, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DxfResult {
  lines: number;
  circles: number;
  message: string;
}

async function enviarDXF(file: File): Promise<DxfResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/upload-dxf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

const DxfUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DxfResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await enviarDXF(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar arquivo DXF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-dashed border-2 border-primary/30 bg-muted/30">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Upload de Arquivo DXF</p>
              <p className="text-xs text-muted-foreground">Selecione um arquivo .dxf para análise automática</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".dxf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Selecionar Arquivo DXF
                </>
              )}
            </Button>
            {fileName && !loading && (
              <p className="text-xs text-muted-foreground">Arquivo: {fileName}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="font-semibold text-sm text-destructive">Erro no upload</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Resultado da Análise DXF
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg bg-background p-3 text-center">
                <p className="text-2xl font-bold text-primary">{result.lines}</p>
                <p className="text-xs text-muted-foreground">Linhas</p>
              </div>
              <div className="rounded-lg bg-background p-3 text-center">
                <p className="text-2xl font-bold text-primary">{result.circles}</p>
                <p className="text-xs text-muted-foreground">Círculos</p>
              </div>
              <div className="rounded-lg bg-background p-3 text-center flex items-center justify-center">
                <p className="text-xs text-muted-foreground">{result.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DxfUpload;
