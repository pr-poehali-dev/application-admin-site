import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
    alert('Спасибо за заявку! Мы скоро свяжемся с вами.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen texture-concrete">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Яворский Дворъ Масел</h1>
          <div className="flex gap-6 items-center">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="hover:text-primary transition-colors">О бренде</a>
            <a href="#production" className="hover:text-primary transition-colors">Производство</a>
            <a href="#order" className="hover:text-primary transition-colors">Как заказать</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Оставить заявку
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-border p-12 rounded-3xl relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
                  Яворский Дворъ Масел
                </h2>
                <p className="text-lg text-muted-foreground">
                  Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, 
                  отжатые вручную с заботой и вкусе и пользе.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                    Скачать каталог (PDF)
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
                    Смотреть видео
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="sticker-pin bg-white rounded-lg shadow-2xl p-6 aspect-[4/3] flex items-center justify-center">
                  <div className="text-6xl">🥜</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
            История нашего бренда
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Яворский Дворъ Масел — дань Роду. Память, которая оживает в каждом продукте
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl sticker-pin">
              <p className="text-lg leading-relaxed">
                Яворский Дворъ Масел создаёт в честь рода моего деда. Яворского Константина. 
                В тяжёлые послевоенные времена мои дети не могли носить его фамилию. Сегодня имя возвращено с честью.
              </p>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl sticker-pin">
              <p className="text-lg leading-relaxed">
                Возрождаем связь поколений через ремесло. Каждый продукт — это познание традиций, 
                воплощённые в живых маслах и традиционных формах. Это почтение Роду и возвращение родовой силы в повседневность.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
            В чём наша особенность?
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Когда вы приходитесь к продуктам Яворского Двора Масел, вы прикасаетесь к истории рода, 
            восстановленной с честью
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🌱', title: 'НАТУРАЛЬНО', desc: 'Только органические орехи и семена' },
              { icon: '🤲', title: 'РУЧНАЯ РАБОТА', desc: 'Каждая бутылка отжата вручную' },
              { icon: '🏺', title: 'ТРАДИЦИИ', desc: 'Древние методы сыродавления' },
              { icon: '💚', title: 'С ЛЮБОВЬЮ', desc: 'Забота о здоровье и вкусе' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl text-center sticker-pin hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="production" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
            Как мы создаём наше масло?
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Посмотрите весь путь — от натуральных орехов и семян до густого, ароматного масла 
            сыродавленного о масла в вашей тарелке.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center sticker-pin">
              <Icon name="PlayCircle" size={80} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="aspect-video bg-muted rounded-lg sticker-pin"></div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Смотреть видео
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Скачать каталог (PDF)
            </Button>
          </div>
        </div>
      </section>

      <section id="order" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
            Как заказать?
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, 
            отжатые вручную с заботой о вкусе и пользе.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', icon: '📋', title: 'Заполните форму', desc: 'Оставьте заявку на сайте' },
              { step: '2', icon: '💬', title: 'Мы свяжемся', desc: 'Подтвердим заказ и детали' },
              { step: '3', icon: '📦', title: 'Получите масло', desc: 'Доставим в удобное время' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <Card className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl text-center sticker-pin">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
                {item.step !== '3' && (
                  <Icon name="ArrowRight" className="hidden md:block absolute top-1/2 -right-12 text-primary" size={40} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Оставить заявку
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, 
                отжатые вручную с заботой о вкусе и пользе.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-border"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-input border-border"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-input border-border"
                  required
                />
                <Textarea
                  placeholder="Сообщение"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-input border-border min-h-32"
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                  Оставить заявку
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl sticker-pin">
                <h3 className="text-2xl font-bold text-primary mb-4">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Адрес производства</p>
                      <p className="text-muted-foreground">Россия, Московская область</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@yavorsky-oil.ru</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl sticker-pin">
                <h3 className="text-2xl font-bold text-primary mb-4">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Сб-Вс: Выходной</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card/50 border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Яворский Дворъ Масел. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
