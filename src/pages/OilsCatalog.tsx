import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  image_url?: string;
  benefits?: string[];
}

export default function OilsCatalog() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [oils, setOils] = useState<Oil[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentOilIndex, setCurrentOilIndex] = useState(0);

  useEffect(() => {
    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Ошибка загрузки категорий:', err));

    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=oils')
      .then(res => res.json())
      .then(data => setOils(data))
      .catch(err => console.error('Ошибка загрузки масел:', err));
  }, []);

  const filteredOils = selectedCategory 
    ? oils.filter(oil => oil.category_slug === selectedCategory)
    : oils;

  const currentOil = filteredOils[currentOilIndex];

  const goToNext = () => {
    setCurrentOilIndex((prev) => (prev + 1) % filteredOils.length);
  };

  const goToPrev = () => {
    setCurrentOilIndex((prev) => (prev - 1 + filteredOils.length) % filteredOils.length);
  };

  const defaultBenefits = [
    'Мягкое антибактериальное и противогрибковое действие',
    'Снижает уровень сахара в крови',
    'Очистка организма от паразитов',
    'Успокоение кожи при высыпаниях и воспалениях',
    'Баланс гормональной системы',
    'Поддержка иммунитета'
  ];

  if (!currentOil) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/70">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2a2a2a] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+)',
          backgroundSize: '100px 100px'
        }}
      />

      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#d4af7a] hover:text-[#d4af7a]/80"
          >
            <Icon name="ArrowLeft" size={20} />
            На главную
          </Button>
          <div className="flex gap-2">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(cat.slug === selectedCategory ? '' : cat.slug);
                  setCurrentOilIndex(0);
                }}
                className={selectedCategory === cat.slug 
                  ? 'bg-[#d4af7a] text-black hover:bg-[#d4af7a]/90' 
                  : 'border-[#d4af7a]/30 text-[#d4af7a] hover:bg-[#d4af7a]/10'}
                size="sm"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-[#d4af7a] mb-4 leading-tight">
                  {currentOil.name}
                </h1>
                <p className="text-xl text-[#d4af7a]/70">
                  сыродавленное масло
                </p>
              </div>

              <div className="border border-[#d4af7a]/20 rounded-xl p-8 space-y-6">
                {(currentOil.benefits || defaultBenefits).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#d4af7a] mt-2 flex-shrink-0" />
                    <p className="text-white/90 leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={goToPrev}
                  variant="outline"
                  size="icon"
                  className="border-[#d4af7a]/30 text-[#d4af7a] hover:bg-[#d4af7a]/10 h-12 w-12"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <div className="flex-1 text-center">
                  <p className="text-[#d4af7a]/70 text-sm">
                    {currentOilIndex + 1} из {filteredOils.length}
                  </p>
                </div>
                <Button
                  onClick={goToNext}
                  variant="outline"
                  size="icon"
                  className="border-[#d4af7a]/30 text-[#d4af7a] hover:bg-[#d4af7a]/10 h-12 w-12"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="sticker-pin bg-white rounded-2xl shadow-2xl p-6 aspect-[3/4] flex items-center justify-center overflow-hidden">
                {currentOil.image_url ? (
                  <img 
                    src={currentOil.image_url} 
                    alt={currentOil.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-9xl">
                    {currentOil.emoji}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
