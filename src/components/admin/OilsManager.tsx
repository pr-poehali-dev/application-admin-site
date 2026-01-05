import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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

interface OilsManagerProps {
  categories: Category[];
  oils: Oil[];
  onRefresh: () => void;
}

export default function OilsManager({ categories, oils, onRefresh }: OilsManagerProps) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showOilForm, setShowOilForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newOil, setNewOil] = useState({
    name: '',
    emoji: '🌾',
    category: '',
    description: '',
    audioUrl: ''
  });

  const handleAddCategory = async () => {
    try {
      await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      setNewCategory({ name: '', slug: '' });
      setShowCategoryForm(false);
      onRefresh();
    } catch (error) {
      console.error('Ошибка добавления категории:', error);
    }
  };

  const handleAddOil = async () => {
    try {
      await fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=oils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOil)
      });
      setNewOil({ name: '', emoji: '🌾', category: '', description: '', audioUrl: '' });
      setShowOilForm(false);
      onRefresh();
    } catch (error) {
      console.error('Ошибка добавления масла:', error);
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
      <h2 className="text-2xl font-bold mb-6">Управление каталогом масел</h2>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Icon name="FolderTree" size={20} />
              Категории
            </h3>
            <Button 
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-black"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить категорию
            </Button>
          </div>

          {showCategoryForm && (
            <Card className="bg-black/30 border-white/5 p-4 mb-4">
              <div className="space-y-3">
                <Input
                  placeholder="Название категории"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <Input
                  placeholder="Slug (английские буквы)"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddCategory} className="bg-primary hover:bg-primary/90 text-black">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => setShowCategoryForm(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-3">
            {categories.map(cat => (
              <Card key={cat.id} className="bg-black/30 border-white/5 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{cat.name}</h4>
                    <p className="text-sm text-foreground/60">slug: {cat.slug}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Icon name="Droplets" size={20} />
              Масла
            </h3>
            <Button 
              onClick={() => setShowOilForm(!showOilForm)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-black"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить масло
            </Button>
          </div>

          {showOilForm && (
            <Card className="bg-black/30 border-white/5 p-4 mb-4">
              <div className="space-y-3">
                <Input
                  placeholder="Название масла"
                  value={newOil.name}
                  onChange={(e) => setNewOil({ ...newOil, name: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <Input
                  placeholder="Emoji (🌾)"
                  value={newOil.emoji}
                  onChange={(e) => setNewOil({ ...newOil, emoji: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <select
                  value={newOil.category}
                  onChange={(e) => setNewOil({ ...newOil, category: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <Textarea
                  placeholder="Описание"
                  value={newOil.description}
                  onChange={(e) => setNewOil({ ...newOil, description: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <Input
                  placeholder="URL аудиофайла"
                  value={newOil.audioUrl}
                  onChange={(e) => setNewOil({ ...newOil, audioUrl: e.target.value })}
                  className="bg-black/30 border-white/10"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddOil} className="bg-primary hover:bg-primary/90 text-black">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => setShowOilForm(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-3">
            {oils.map(oil => (
              <Card key={oil.id} className="bg-black/30 border-white/5 p-4">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{oil.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{oil.name}</h4>
                    <p className="text-sm text-foreground/70">{oil.description}</p>
                    <p className="text-xs text-foreground/50 mt-1">
                      Категория: {categories.find(c => c.slug === oil.category_slug)?.name}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
