import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/4738e7cb-8565-4f67-aa3b-105a210de3ca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.error || 'Ошибка авторизации');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const response = await fetch('https://functions.poehali.dev/4738e7cb-8565-4f67-aa3b-105a210de3ca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email,
          googleAuth: true,
          uid: user.uid,
          displayName: user.displayName
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.error || 'Ошибка авторизации');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка входа через Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Вход в админпанель
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/30 border-white/10 text-foreground placeholder:text-foreground/40 rounded-xl"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-black font-medium rounded-full py-6"
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black/40 text-foreground/60">или</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          variant="outline"
          className="w-full border-white/20 hover:bg-white/5 font-medium rounded-full py-6 flex items-center justify-center gap-3"
        >
          <Icon name="Chrome" size={20} />
          Войти через Google
        </Button>
      </Card>
    </div>
  );
}