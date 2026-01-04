import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentItem {
  key: string;
  value: string;
  section: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
      return;
    }

    fetchContent();
  }, [navigate]);

  const fetchContent = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Ошибка загрузки контента:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (key: string, currentValue: string) => {
    setEditingKey(key);
    setEditValue(currentValue);
  };

  const handleSave = async (key: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value: editValue }),
      });

      if (response.ok) {
        setContent({
          ...content,
          [key]: {
            ...content[key],
            value: editValue
          }
        });
        setEditingKey(null);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const contentBySection = Object.entries(content).reduce((acc, [key, item]) => {
    const section = item.section || 'other';
    if (!acc[section]) acc[section] = [];
    acc[section].push({ key, ...item });
    return acc;
  }, {} as Record<string, Array<{ key: string } & ContentItem>>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Админпанель</h1>
            <p className="text-foreground/70">Редактирование контента сайта</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Icon name="Home" size={20} />
              На главную
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <Icon name="LogOut" size={20} />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-black/40 border border-white/10">
            <TabsTrigger value="hero">Главная</TabsTrigger>
            <TabsTrigger value="about">О бренде</TabsTrigger>
            <TabsTrigger value="features">Особенности</TabsTrigger>
          </TabsList>

          {Object.entries(contentBySection).map(([section, items]) => (
            <TabsContent key={section} value={section}>
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
                <h2 className="text-2xl font-bold mb-6 capitalize">{section}</h2>
                <div className="space-y-6">
                  {items.map(({ key, value }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground/70">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        {editingKey !== key ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(key, value)}
                            className="flex items-center gap-2"
                          >
                            <Icon name="Pencil" size={16} />
                            Редактировать
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSave(key)}
                              className="bg-primary hover:bg-primary/90 text-black"
                            >
                              <Icon name="Check" size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingKey(null)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                      {editingKey === key ? (
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-black/30 border-white/10 text-foreground min-h-24"
                        />
                      ) : (
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                          <p className="text-foreground">{value}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
