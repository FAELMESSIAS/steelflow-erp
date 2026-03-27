import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Orcamentos from "./pages/Orcamentos";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Producao from "./pages/Producao";
import Financeiro from "./pages/Financeiro";
import NotasFiscais from "./pages/NotasFiscais";
import WhatsAppPage from "./pages/WhatsAppPage";
import Configuracoes from "./pages/Configuracoes";
import Nesting from "./pages/Nesting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orcamentos" element={<Orcamentos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/producao" element={<Producao />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/notas-fiscais" element={<NotasFiscais />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/nesting" element={<Nesting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
