import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';
import { Link } from 'react-router-dom';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [content, setContent] = useState<Record<string, any>>({
    hero_title: { value: 'Яворский Дворъ Масел' },
    hero_description: { value: 'Сыродавленное масло ручной работы...' },
    history_title: { value: 'История нашего бренда' },
    history_subtitle: { value: 'Яворский Дворъ Масел — дань Роду' },
    features_title: { value: 'В чём наша особенность?' },
    features_subtitle: { value: 'Когда вы приходитесь к продуктам...' }
  });

  const [designSettings, setDesignSettings] = useState<Record<string, any>>({});
  const [oils, setOils] = useState<Array<{id: number; name: string; emoji: string; category_slug: string; description: string; audio_url: string}>>([]);

  useEffect(() => {
    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Ошибка загрузки контента:', err));

    fetch('https://functions.poehali.dev/5ae7cafb-acc2-4d01-88c2-62eb67af1638')
      .then(res => res.json())
      .then(data => setDesignSettings(data))
      .catch(err => console.error('Ошибка загрузки настроек дизайна:', err));

    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5?type=oils')
      .then(res => res.json())
      .then(data => setOils(data))
      .catch(err => console.error('Ошибка загрузки масел:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://functions.poehali.dev/387ebd4f-bd34-4c43-af39-7e58ad12cc46', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Спасибо за заявку! Мы скоро свяжемся с вами.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert('Ошибка отправки заявки. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Ошибка отправки заявки. Попробуйте позже.');
    }
  };

  const pinSize = designSettings['pin_icon_size']?.position_x || 128;
  const pinTop = designSettings['pin_icon_size']?.position_y || 12;
  const pinOffsetX = designSettings['pin_icon_size']?.margin_left || -30;
  const contentPaddingTop = designSettings['pin_icon_size']?.padding_top || 5;

  return (
    <div className="min-h-screen" style={{
      '--pin-size': `${pinSize}px`,
      '--pin-top': `${pinTop}px`,
      '--pin-offset-x': `${pinOffsetX}px`,
      '--content-padding-top': `${contentPaddingTop}px`
    } as React.CSSProperties}>
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-border/30 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors text-sm">{content.nav_catalog?.value || 'Каталог'}</a>
            <Link to="/videos" className="text-foreground hover:text-primary transition-colors text-sm">{content.nav_video?.value || 'Видео'}</Link>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors text-sm">{content.nav_contacts?.value || 'Контакты'}</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6">
            {content.btn_submit?.value || 'Оставить заявку'}
          </Button>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {content.hero_title?.value}
                </h1>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {content.hero_description?.value}
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full">
                    {content.btn_catalog?.value || 'Скачать каталог (PDF)'}
                  </Button>
                  <Button variant="ghost" className="border border-white/20 text-foreground hover:bg-white/5 rounded-full">
                    {content.btn_video?.value || 'Смотреть видео'}
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="sticker-pin bg-white rounded-2xl shadow-xl p-8 aspect-[4/3] w-full max-w-sm flex items-center justify-center">
                  <div className="text-7xl">🥜</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.history_title?.value}
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              {content.history_subtitle?.value}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="sticker-pin bg-white/95 p-6 rounded-xl">
                <p className="text-sm text-black leading-relaxed">
                  {content.history_text_1?.value}
                </p>
              </div>
              <div className="sticker-pin bg-white/95 p-6 rounded-xl">
                <p className="text-sm text-black leading-relaxed">
                  {content.history_text_2?.value}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.features_title?.value}
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              {content.features_subtitle?.value}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'feature_1', fallback: 'Ручной отжим' },
                { key: 'feature_2', fallback: 'Натуральные ингредиенты' },
                { key: 'feature_3', fallback: 'Семейные традиции' },
                { key: 'feature_4', fallback: 'Без примесей' }
              ].map((item, idx) => (
                <div key={idx} className="sticker-pin bg-white/95 p-6 rounded-xl flex items-center justify-center aspect-square">
                  <span className="text-lg font-bold text-black text-center leading-tight">
                    {content[item.key]?.value || item.fallback}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.video_section_title?.value || 'Как мы создаем наше масло?'}
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              {content.video_section_subtitle?.value}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <VideoPlayer 
                  url={content.video_main?.value || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                  className="aspect-video rounded-xl"
                />
                <div className="flex justify-center mt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6">
                    <Icon name="Play" size={24} className="mr-2" />
                    {content.btn_video?.value || 'Смотреть видео'}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  {['video_1', 'video_2', 'video_3', 'video_4'].map((key, idx) => (
                    <VideoPlayer 
                      key={idx}
                      url={content[key]?.value || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                      className="aspect-video rounded-lg"
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Link to="/videos">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-6">
                      <Icon name="PlayCircle" size={24} className="mr-2" />
                      Смотреть все видео
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.audio_section_title?.value || 'Послушать масло'}
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              {content.audio_section_subtitle?.value || 'Почувствуйте звук настоящего качества'}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {oils.slice(0, 6).map((oil) => (
                <div key={oil.id} className="sticker-pin bg-white/95 p-6 rounded-xl space-y-4">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">{oil.emoji}</span>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-black">{oil.name}</h3>
                      <p className="text-xs text-black/70 mt-1">{oil.description}</p>
                    </div>
                  </div>
                  <div className="bg-black/10 p-3 rounded-lg">
                    <audio 
                      controls 
                      className="w-full"
                      style={{ filter: 'invert(0.2) sepia(0.1)' }}
                    >
                      <source src={oil.audio_url} type="audio/mpeg" />
                      Ваш браузер не поддерживает аудио элемент.
                    </audio>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link to="/oils">
                <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-8 py-6 text-lg">
                  <Icon name="Music" size={24} className="mr-2" />
                  Послушать все масла ({oils.length})
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.order_title?.value || 'Как заказать?'}
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              {content.order_subtitle?.value}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: 1, key: 'order_step_1' },
                { step: 2, key: 'order_step_2' },
                { step: 3, key: 'order_step_3' }
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center gap-4">
                  <div className="sticker-pin bg-white/95 p-8 rounded-xl flex-1 aspect-[3/2] flex flex-col items-center justify-center gap-3 py-2.5">
                    <span className="text-4xl font-bold text-black">{item.step}</span>
                    <p className="text-sm text-black text-center font-medium">
                      {content[item.key]?.value || 'Шаг ' + item.step}
                    </p>
                  </div>
                  {idx < 2 && (
                    <Icon name="ArrowRight" className="hidden md:block text-foreground/40 absolute -right-8 top-1/2 -translate-y-1/2" size={32} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content.contact_title?.value || 'Оставить заявку'}
              </h2>
              <p className="text-sm text-foreground/70 mb-6">
                {content.contact_subtitle?.value}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/30 border-white/10 text-foreground placeholder:text-foreground/40 rounded-xl"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/30 border-white/10 text-foreground placeholder:text-foreground/40 rounded-xl"
                  required
                />
                <Textarea
                  placeholder="Сообщение"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/30 border-white/10 text-foreground placeholder:text-foreground/40 rounded-xl min-h-24"
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-medium rounded-full py-6">
                  {content.btn_submit?.value || 'Оставить заявку'}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] aspect-square"></Card>
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] aspect-[2/1]"></Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}