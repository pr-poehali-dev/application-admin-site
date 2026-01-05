import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Oil {
  id: number;
  name: string;
  emoji: string;
  category_slug: string;
  description: string;
  audio_url: string;
}

export default function OilsCatalog() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [oils, setOils] = useState<Oil[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [designSettings, setDesignSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Ошибка загрузки категорий:', err));

    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=oils')
      .then(res => res.json())
      .then(data => setOils(data))
      .catch(err => console.error('Ошибка загрузки масел:', err));

    fetch('https://functions.poehali.dev/5ae7cafb-acc2-4d01-88c2-62eb67af1638')
      .then(res => res.json())
      .then(data => setDesignSettings(data))
      .catch(err => console.error('Ошибка загрузки настроек дизайна:', err));
  }, []);

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev => 
      prev.includes(categorySlug) 
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const filteredOils = selectedCategories.length === 0 
    ? oils 
    : oils.filter(oil => selectedCategories.includes(oil.category_slug));

  const pinSize = designSettings['pin_icon_size']?.position_x || 128;
  const pinOffsetX = designSettings['pin_icon_size']?.margin_left || -30;

  return (
    <div className="min-h-screen" style={{
      '--pin-size': `${pinSize}px`,
      '--pin-offset-x': `${pinOffsetX}px`
    } as React.CSSProperties}>
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-border/30 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            На главную
          </Button>
          <h1 className="text-2xl font-bold">Каталог масел</h1>
          <div className="w-32"></div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Послушать наши масла
              </h2>
              <p className="text-sm text-foreground/70">
                Каждое масло имеет свой уникальный звук отжима. Выберите категорию или слушайте все сорта.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64 space-y-6">
                <div className="bg-black/30 p-6 rounded-xl space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon name="Filter" size={20} />
                    Категории
                  </h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={() => toggleCategory(category.slug)}
                          className="w-5 h-5 rounded border-2 border-foreground/30 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-xl border border-primary/30">
                  <div className="flex items-start gap-3">
                    <Icon name="Music" size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Почему звук важен?</h4>
                      <p className="text-xs text-foreground/90 leading-relaxed">
                        Каждая капля масла создается с любовью. Послушайте звук настоящего качества.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredOils.map((oil) => (
                    <div key={oil.id} className="sticker-pin bg-white/95 p-6 rounded-xl space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{oil.emoji}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-black">{oil.name}</h3>
                          <p className="text-sm text-black/70">{oil.description}</p>
                        </div>
                      </div>
                      <div className="bg-black/10 p-4 rounded-lg">
                        <audio 
                          controls 
                          className="w-full"
                          style={{ filter: 'invert(0.2) sepia(0.1)' }}
                        >
                          <source src={oil.audio_url} type="audio/mpeg" />
                          Ваш браузер не поддерживает аудио элемент.
                        </audio>
                        <p className="text-xs text-black/60 text-center mt-2">
                          Звук отжима
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredOils.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/70">Не найдено масел в выбранных категориях</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}