import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationsList from '@/components/admin/ApplicationsList';
import ContentEditor from '@/components/admin/ContentEditor';
import DesignSettings from '@/components/admin/DesignSettings';
import OilsManager from '@/components/admin/OilsManager';

interface ContentItem {
  key: string;
  value: string;
  section: string;
}

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface DesignSettingsType {
  position_x: number;
  position_y: number;
  width: number | null;
  height: number | null;
  rotation: number;
  scale: number;
  z_index: number;
  is_visible: boolean;
  margin_left: number;
  margin_right: number;
  margin_top: number;
  margin_bottom: number;
  padding_left: number;
  padding_right: number;
  padding_top: number;
  padding_bottom: number;
  font_size: number | null;
  line_height: number | null;
}

export default function Admin() {
  const navigate = useNavigate();
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [applications, setApplications] = useState<Application[]>([]);
  const [designSettings, setDesignSettings] = useState<Record<string, DesignSettingsType>>({});
  const [categories, setCategories] = useState<Array<{id: number; name: string; slug: string}>>([]);
  const [oils, setOils] = useState<Array<{id: number; name: string; emoji: string; category_slug: string; description: string; audio_url: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
      return;
    }

    fetchContent();
    fetchApplications();
    fetchDesignSettings();
    fetchOils();
    fetchCategories();
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

  const fetchApplications = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/387ebd4f-bd34-4c43-af39-7e58ad12cc46');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  };

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/387ebd4f-bd34-4c43-af39-7e58ad12cc46', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status } : app
        ));
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
    }
  };

  const handleSaveContent = async (key: string, value: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      if (response.ok) {
        setContent({
          ...content,
          [key]: {
            ...content[key],
            value
          }
        });
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const fetchDesignSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5ae7cafb-acc2-4d01-88c2-62eb67af1638');
      const data = await response.json();
      setDesignSettings(data);
    } catch (error) {
      console.error('Ошибка загрузки настроек дизайна:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const fetchOils = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=oils');
      const data = await response.json();
      setOils(data);
    } catch (error) {
      console.error('Ошибка загрузки масел:', error);
    }
  };

  const handleRefreshOils = () => {
    fetchOils();
    fetchCategories();
  };

  const updateDesignSetting = async (elementKey: string, settings: Partial<DesignSettingsType>) => {
    try {
      const currentSettings = designSettings[elementKey] || {
        position_x: 0,
        position_y: 0,
        width: null,
        height: null,
        rotation: 0,
        scale: 1.0,
        z_index: 1,
        is_visible: true,
        margin_left: 0,
        margin_right: 0,
        margin_top: 0,
        margin_bottom: 0,
        padding_left: 0,
        padding_right: 0,
        padding_top: 0,
        padding_bottom: 0,
        font_size: null,
        line_height: null
      };

      const response = await fetch('https://functions.poehali.dev/5ae7cafb-acc2-4d01-88c2-62eb67af1638', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          element_key: elementKey,
          ...currentSettings,
          ...settings
        }),
      });

      if (response.ok) {
        setDesignSettings({
          ...designSettings,
          [elementKey]: {
            ...currentSettings,
            ...settings
          }
        });
      }
    } catch (error) {
      console.error('Ошибка обновления настроек:', error);
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

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-black/40 border border-white/10">
            <TabsTrigger value="applications">
              Заявки
              {applications.filter(a => a.status === 'new').length > 0 && (
                <span className="ml-2 bg-primary text-black rounded-full px-2 py-0.5 text-xs">
                  {applications.filter(a => a.status === 'new').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="hero">Главная</TabsTrigger>
            <TabsTrigger value="about">О бренде</TabsTrigger>
            <TabsTrigger value="features">Особенности</TabsTrigger>
            <TabsTrigger value="video">Видео</TabsTrigger>
            <TabsTrigger value="oils">Каталог масел</TabsTrigger>
            <TabsTrigger value="design">Дизайн</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <ApplicationsList 
              applications={applications}
              onUpdateStatus={updateApplicationStatus}
            />
          </TabsContent>

          {Object.entries(contentBySection).map(([section, items]) => (
            <TabsContent key={section} value={section}>
              <ContentEditor
                items={items}
                section={section}
                onSave={handleSaveContent}
              />
            </TabsContent>
          ))}

          <TabsContent value="oils">
            <OilsManager
              categories={categories}
              oils={oils}
              onRefresh={handleRefreshOils}
            />
          </TabsContent>

          <TabsContent value="design">
            <DesignSettings
              designSettings={designSettings}
              onUpdate={updateDesignSetting}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}