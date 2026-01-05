import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';

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

  useEffect(() => {
    fetch('https://functions.poehali.dev/ad9cff9d-6114-484b-910f-65b2c139b8a5')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Ошибка загрузки контента:', err));
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

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-border/30 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors text-sm">Каталог</a>
            <a href="#video" className="text-foreground hover:text-primary transition-colors text-sm">Видео</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors text-sm">Контакты</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6">
            Оставить заявку
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
                    Скачать каталог (PDF)
                  </Button>
                  <Button variant="ghost" className="border border-white/20 text-foreground hover:bg-white/5 rounded-full">
                    Смотреть видео
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
                  Яворский Дворъ Масел создаёт в честь рода моего деда. Яворского Константина. 
                  В тяжёлые послевоенные времена мои дети не могли носить его фамилию. Сегодня имя возвращено с честью.
                </p>
              </div>
              <div className="sticker-pin bg-white/95 p-6 rounded-xl">
                <p className="text-sm text-black leading-relaxed">
                  Возрождаем связь поколений через ремесло. Каждый продукт — это познание традиций, 
                  воплощённые в живых маслах и традиционных формах. Это почтение Роду и возвращение родовой силы в повседневность.
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
                { title: 'ТЕКСТ' },
                { title: 'ТЕКСТ' },
                { title: 'ТЕКСТ' },
                { title: 'ТЕКСТ' }
              ].map((item, idx) => (
                <div key={idx} className="sticker-pin bg-white/95 p-6 rounded-xl flex items-center justify-center aspect-square">
                  <span className="text-2xl font-bold text-black">{item.title}</span>
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
              Как мы создаем наше масло?
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              Посмотрите весь путь — от натуральных орехов и семян до густого, ароматного масла 
              сыродавленного о масла в вашей тарелке.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <VideoPlayer 
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="sticker-pin aspect-video rounded-xl"
              />
              <div className="grid grid-cols-2 gap-3">
                {[
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                ].map((url, idx) => (
                  <VideoPlayer 
                    key={idx}
                    url={url}
                    className="sticker-pin aspect-video rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full">
                Смотреть видео
              </Button>
              <Button variant="ghost" className="border border-white/20 text-foreground hover:bg-white/5 rounded-full">
                Скачать каталог (PDF)
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как заказать?
            </h2>
            <p className="text-sm text-foreground/70 mb-8">
              Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, 
              отжатые вручную с заботой о вкусе и пользе.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: 1 },
                { step: 2 },
                { step: 3 }
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center gap-4">
                  <div className="sticker-pin bg-white/95 p-8 rounded-xl flex-1 aspect-[3/2] flex items-center justify-center">
                    <span className="text-4xl font-bold text-black">{item.step}</span>
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
                Оставить заявку
              </h2>
              <p className="text-sm text-foreground/70 mb-6">
                Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, 
                отжатые вручную с заботой о вкусе и пользе.
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
                  Оставить заявку
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