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

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface DesignSettings {
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
  const [designSettings, setDesignSettings] = useState<Record<string, DesignSettings>>({});
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
    fetchApplications();
    fetchDesignSettings();
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

  const fetchDesignSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5ae7cafb-acc2-4d01-88c2-62eb67af1638');
      const data = await response.json();
      setDesignSettings(data);
    } catch (error) {
      console.error('Ошибка загрузки настроек дизайна:', error);
    }
  };

  const updateDesignSetting = async (elementKey: string, settings: Partial<DesignSettings>) => {
    try {
      const currentSettings = designSettings[elementKey] || {
        position_x: 0,
        position_y: 0,
        width: null,
        height: null,
        rotation: 0,
        scale: 1.0,
        z_index: 1,
        is_visible: true
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
            <TabsTrigger value="design">Дизайн</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-6">Заявки с сайта</h2>
              {applications.length === 0 ? (
                <p className="text-foreground/70 text-center py-8">Заявок пока нет</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="bg-black/30 border-white/5 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{app.name}</h3>
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                app.status === 'new' 
                                  ? 'bg-primary text-black' 
                                  : app.status === 'in_progress'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-green-500 text-white'
                              }`}
                            >
                              <option value="new">Новая</option>
                              <option value="in_progress">В работе</option>
                              <option value="completed">Завершена</option>
                            </select>
                          </div>
                          <div className="space-y-1 text-sm text-foreground/70">
                            <p className="flex items-center gap-2">
                              <Icon name="Phone" size={14} />
                              {app.phone}
                            </p>
                            {app.email && (
                              <p className="flex items-center gap-2">
                                <Icon name="Mail" size={14} />
                                {app.email}
                              </p>
                            )}
                            {app.message && (
                              <p className="mt-2 text-foreground">{app.message}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-foreground/50">
                          {new Date(app.created_at).toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

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

          <TabsContent value="design">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-6">Настройки дизайна</h2>
              <div className="space-y-6">
                {/* Размер кнопок-иконок */}
                <Card className="bg-black/30 border-white/5 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Pin" size={20} />
                    Размер красных кнопок на карточках
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-foreground/70 mb-2 block">Ширина (px)</label>
                      <Input
                        type="number"
                        value={designSettings['pin_icon_size']?.position_x || 128}
                        onChange={(e) => updateDesignSetting('pin_icon_size', {
                          position_x: parseInt(e.target.value) || 128
                        })}
                        className="bg-black/30 border-white/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-foreground/70 mb-2 block">Отступ сверху (px)</label>
                      <Input
                        type="number"
                        value={designSettings['pin_icon_size']?.position_y || 12}
                        onChange={(e) => updateDesignSetting('pin_icon_size', {
                          position_y: parseInt(e.target.value) || 12
                        })}
                        className="bg-black/30 border-white/10"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-foreground/50 mt-3">
                    Текущий размер: {designSettings['pin_icon_size']?.position_x || 128}x{designSettings['pin_icon_size']?.position_x || 128}px
                  </p>
                </Card>

                {/* Настройки текстовых элементов */}
                <Card className="bg-black/30 border-white/5 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Type" size={20} />
                    Размеры текста и отступы
                  </h3>
                  <div className="space-y-6">
                    {[
                      { key: 'section_titles', label: 'Заголовки секций', defaultFont: 48 },
                      { key: 'section_text', label: 'Основной текст', defaultFont: 16 },
                      { key: 'hero_title', label: 'Главный заголовок', defaultFont: 64 },
                      { key: 'hero_description', label: 'Описание героя', defaultFont: 18 }
                    ].map(item => (
                      <div key={item.key} className="border-b border-white/10 pb-4 last:border-0">
                        <h4 className="font-medium mb-3">{item.label}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Размер шрифта</label>
                            <Input
                              type="number"
                              placeholder={item.defaultFont.toString()}
                              value={designSettings[item.key]?.font_size || ''}
                              onChange={(e) => updateDesignSetting(item.key, {
                                font_size: parseInt(e.target.value) || null
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Отступ слева</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.margin_left || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                margin_left: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Отступ справа</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.margin_right || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                margin_right: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Отступ сверху</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.margin_top || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                margin_top: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Настройки карточек */}
                <Card className="bg-black/30 border-white/5 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Layout" size={20} />
                    Карточки и блоки
                  </h3>
                  <div className="space-y-6">
                    {[
                      { key: 'white_cards', label: 'Белые карточки' },
                      { key: 'feature_cards', label: 'Карточки особенностей' },
                      { key: 'order_cards', label: 'Карточки заказа' }
                    ].map(item => (
                      <div key={item.key} className="border-b border-white/10 pb-4 last:border-0">
                        <h4 className="font-medium mb-3">{item.label}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Padding слева</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.padding_left || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                padding_left: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Padding справа</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.padding_right || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                padding_right: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Отступ между</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.margin_right || 0}
                              onChange={(e) => updateDesignSetting(item.key, {
                                margin_right: parseInt(e.target.value) || 0
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-foreground/70 mb-1 block">Ширина (px)</label>
                            <Input
                              type="number"
                              value={designSettings[item.key]?.width || ''}
                              onChange={(e) => updateDesignSetting(item.key, {
                                width: parseInt(e.target.value) || null
                              })}
                              className="bg-black/30 border-white/10 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Видимость секций */}
                <Card className="bg-black/30 border-white/5 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    Видимость секций
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'hero_section', label: 'Главный экран' },
                      { key: 'about_section', label: 'О бренде' },
                      { key: 'features_section', label: 'Особенности' },
                      { key: 'video_section', label: 'Видео' },
                      { key: 'order_section', label: 'Как заказать' },
                      { key: 'contact_section', label: 'Контакты' }
                    ].map(section => (
                      <div key={section.key} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                        <span className="text-foreground">{section.label}</span>
                        <Button
                          size="sm"
                          variant={designSettings[section.key]?.is_visible !== false ? 'default' : 'outline'}
                          onClick={() => updateDesignSetting(section.key, {
                            is_visible: !(designSettings[section.key]?.is_visible !== false)
                          })}
                        >
                          {designSettings[section.key]?.is_visible !== false ? (
                            <><Icon name="Eye" size={16} className="mr-2" /> Видно</>
                          ) : (
                            <><Icon name="EyeOff" size={16} className="mr-2" /> Скрыто</>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300 flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    После изменения настроек обновите главную страницу, чтобы увидеть результат
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}