import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'in_progress' | 'completed';
}

export default function Admin() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      message: 'Хочу заказать масло грецкого ореха, 5 бутылок',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      phone: '+7 (999) 234-56-78',
      email: 'maria@example.com',
      message: 'Интересует кедровое масло. Есть ли скидки при оптовых заказах?',
      date: '2024-01-14',
      status: 'in_progress'
    },
    {
      id: 3,
      name: 'Алексей Кузнецов',
      phone: '+7 (999) 345-67-89',
      email: 'alexey@example.com',
      message: 'Спасибо за качественный продукт! Заказываю снова.',
      date: '2024-01-13',
      status: 'completed'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const statusLabels = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена'
  };

  const statusColors = {
    new: 'bg-primary text-primary-foreground',
    in_progress: 'bg-yellow-600 text-white',
    completed: 'bg-green-600 text-white'
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: number, newStatus: 'new' | 'in_progress' | 'completed') => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
      setApplications(apps => apps.filter(app => app.id !== id));
    }
  };

  const stats = {
    total: applications.length,
    new: applications.filter(a => a.status === 'new').length,
    in_progress: applications.filter(a => a.status === 'in_progress').length,
    completed: applications.filter(a => a.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Админпанель</h1>
            <p className="text-muted-foreground">Управление заявками Яворский Дворъ Масел</p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2"
          >
            <Icon name="Home" size={20} />
            На главную
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего заявок</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <Icon name="Inbox" size={32} className="text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Новые</p>
                <p className="text-3xl font-bold text-primary">{stats.new}</p>
              </div>
              <Icon name="AlertCircle" size={32} className="text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">В работе</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
              </div>
              <Icon name="Clock" size={32} className="text-yellow-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Завершены</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени, email или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                Все
              </Button>
              <Button
                variant={filterStatus === 'new' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('new')}
              >
                Новые
              </Button>
              <Button
                variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('in_progress')}
              >
                В работе
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
              >
                Завершены
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Сообщение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Заявки не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.date}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Phone" size={14} />
                          {app.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Mail" size={14} />
                          {app.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{app.message}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[app.status]}>
                        {statusLabels[app.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {app.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(app.id, 'in_progress')}
                          >
                            Взять в работу
                          </Button>
                        )}
                        {app.status === 'in_progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(app.id, 'completed')}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            Завершить
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteApplication(app.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
