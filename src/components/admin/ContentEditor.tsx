import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ContentItem {
  key: string;
  value: string;
  section: string;
}

interface ContentEditorProps {
  items: Array<{ key: string } & ContentItem>;
  section: string;
  onSave: (key: string, value: string) => Promise<void>;
}

export default function ContentEditor({ items, section, onSave }: ContentEditorProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (key: string, currentValue: string) => {
    setEditingKey(key);
    setEditValue(currentValue);
  };

  const handleSave = async (key: string) => {
    await onSave(key, editValue);
    setEditingKey(null);
  };

  return (
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
  );
}
