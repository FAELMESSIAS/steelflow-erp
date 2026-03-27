import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';
import laserBg from '@/assets/laser-cutting-bg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16 xl:px-24 gradient-steel">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-laser shadow-laser">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
                  Laser<span className="text-gradient-laser">Flow</span>
                </h1>
              </div>
            </div>
            <p className="text-sm text-steel">
              ERP Industrial — Corte a Laser
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-steel">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground placeholder:text-steel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-steel">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground placeholder:text-steel"
              />
            </div>
            <Button type="submit" className="h-12 w-full text-base font-semibold gradient-laser shadow-laser hover:opacity-90 transition-opacity">
              Entrar
            </Button>
          </form>

          <p className="text-center text-xs text-steel">
            © 2024 LaserFlow — Sistema de gestão industrial
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={laserBg}
          alt="Máquina de corte a laser em operação"
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={1536}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-steel-dark/80" />
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="text-4xl font-bold text-primary-foreground mb-3">
            Precisão em cada <span className="text-gradient-laser">corte</span>
          </h2>
          <p className="text-lg text-steel">
            Gerencie orçamentos, produção e estoque com eficiência industrial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
