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
      <nav className="fixed top-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#d4af7a]/20 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <a href="#catalog" className="text-[#d4af7a] hover:text-[#d4af7a]/70 transition-colors text-sm">{content.nav_catalog?.value || 'Каталог'}</a>
            <Link to="/videos" className="text-[#d4af7a] hover:text-[#d4af7a]/70 transition-colors text-sm">{content.nav_video?.value || 'Видео'}</Link>
            <a href="#contacts" className="text-[#d4af7a] hover:text-[#d4af7a]/70 transition-colors text-sm">{content.nav_contacts?.value || 'Контакты'}</a>
          </div>
          <Button className="bg-[#d4af7a] hover:bg-[#d4af7a]/90 text-black font-medium rounded-full px-6">
            {content.btn_submit?.value || 'Оставить заявку'}
          </Button>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {content.hero_title?.value}
              </h1>
              <p className="text-lg text-[#d4af7a]/70 leading-relaxed">
                {content.hero_description?.value}
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="sticker-pin bg-white rounded-2xl shadow-2xl p-0 aspect-[3/4] w-full max-w-md overflow-hidden">
                {content.hero_image?.value ? (
                  <img 
                    src={content.hero_image.value} 
                    alt="Яворский Дворъ Масел" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">🥜</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {content.history_title?.value}
            </h2>
            <p className="text-lg text-[#d4af7a]/70">
              {content.history_subtitle?.value}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#d4af7a]/20 p-8 rounded-xl">
              <p className="text-white/90 leading-relaxed">
                {content.history_text_1?.value}
              </p>
            </div>
            <div className="border border-[#d4af7a]/20 p-8 rounded-xl">
              <p className="text-white/90 leading-relaxed">
                {content.history_text_2?.value}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" id="catalog">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {content.features_title?.value}
            </h2>
            <p className="text-lg text-[#d4af7a]/70">
              {content.features_subtitle?.value}
            </p>
          </div>
          <div className="text-center">
            <Link to="/oils">
              <Button className="bg-[#d4af7a] hover:bg-[#d4af7a]/90 text-black font-medium rounded-full px-8 py-6 text-lg">
                <Icon name="Book" size={24} className="mr-2" />
                Посмотреть каталог масел
              </Button>
            </Link>
          </div>
        </div>
      </section>





      <section className="py-16 px-6 pb-24" id="contacts">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {content.contact_title?.value || 'Оставить заявку'}
            </h2>
            <p className="text-lg text-[#d4af7a]/70">
              {content.contact_subtitle?.value}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 border border-[#d4af7a]/20 p-8 rounded-xl">
            <Input
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/30 border-[#d4af7a]/20 text-white placeholder:text-white/40 rounded-xl h-14"
              required
            />
            <Input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-black/30 border-[#d4af7a]/20 text-white placeholder:text-white/40 rounded-xl h-14"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/30 border-[#d4af7a]/20 text-white placeholder:text-white/40 rounded-xl h-14"
              required
            />
            <Textarea
              placeholder="Сообщение"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-black/30 border-[#d4af7a]/20 text-white placeholder:text-white/40 rounded-xl min-h-32"
            />
            <Button type="submit" className="w-full bg-[#d4af7a] hover:bg-[#d4af7a]/90 text-black font-medium rounded-full py-6 text-lg">
              {content.btn_submit?.value || 'Отправить заявку'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}