import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

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

interface DesignSettingsProps {
  designSettings: Record<string, DesignSettingsType>;
  onUpdate: (elementKey: string, settings: Partial<DesignSettingsType>) => Promise<void>;
}

export default function DesignSettings({ designSettings, onUpdate }: DesignSettingsProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
      <h2 className="text-2xl font-bold mb-6">Настройки дизайна</h2>
      <div className="space-y-6">
        {/* Размер кнопок-иконок */}
        <Card className="bg-black/30 border-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Pin" size={20} />
            Красные кнопки на карточках
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm text-foreground/70 mb-2 block">Размер кнопки (px)</label>
              <Input
                type="number"
                value={designSettings['pin_icon_size']?.position_x || 128}
                onChange={(e) => onUpdate('pin_icon_size', {
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
                onChange={(e) => onUpdate('pin_icon_size', {
                  position_y: parseInt(e.target.value) || 12
                })}
                className="bg-black/30 border-white/10"
              />
            </div>
            <div>
              <label className="text-sm text-foreground/70 mb-2 block">Смещение по горизонтали (px)</label>
              <Input
                type="number"
                value={designSettings['pin_icon_size']?.margin_left || 0}
                onChange={(e) => onUpdate('pin_icon_size', {
                  margin_left: parseInt(e.target.value) || 0
                })}
                className="bg-black/30 border-white/10"
                placeholder="0 = по центру"
              />
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <label className="text-sm text-foreground/70 mb-2 block">Отступ контента внутри карточек (px)</label>
            <Input
              type="number"
              value={designSettings['pin_icon_size']?.padding_top || 5}
              onChange={(e) => onUpdate('pin_icon_size', {
                padding_top: parseInt(e.target.value) || 5
              })}
              className="bg-black/30 border-white/10 max-w-xs"
              placeholder="5"
            />
            <p className="text-xs text-foreground/50 mt-2">
              Сдвигает текст и контент вниз, не затрагивая кнопки
            </p>
          </div>
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                      onChange={(e) => onUpdate(item.key, {
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
                  onClick={() => onUpdate(section.key, {
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
  );
}