import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ClipboardList, Users, Package,
  Factory, DollarSign, Receipt, MessageCircle, Settings,
  ChevronLeft, ChevronRight, Zap, LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/NavLink';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { title: 'Orçamentos', icon: FileText, path: '/orcamentos' },
  { title: 'Pedidos', icon: ClipboardList, path: '/pedidos' },
  { title: 'Clientes', icon: Users, path: '/clientes' },
  { title: 'Estoque', icon: Package, path: '/estoque' },
  { title: 'Produção', icon: Factory, path: '/producao' },
  { title: 'Financeiro', icon: DollarSign, path: '/financeiro' },
  { title: 'Notas Fiscais', icon: Receipt, path: '/notas-fiscais' },
  { title: 'WhatsApp', icon: MessageCircle, path: '/whatsapp' },
  { title: 'Configurações', icon: Settings, path: '/configuracoes' },
];

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-laser">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-accent-foreground">
              Laser<span className="text-laser">Flow</span>
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-0"
                )}
                activeClassName="bg-sidebar-accent text-laser"
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-laser")} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          <button
            onClick={() => navigate('/')}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
