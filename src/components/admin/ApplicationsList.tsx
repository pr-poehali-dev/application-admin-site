import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface ApplicationsListProps {
  applications: Application[];
  onUpdateStatus: (id: number, status: string) => void;
}

export default function ApplicationsList({ applications, onUpdateStatus }: ApplicationsListProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
      <h2 className="text-2xl font-bold mb-6">Заявки с сайта</h2>
      {applications.length === 0 ? (
        <p className="text-foreground/70 text-center py-8">Заявок пока нет</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="bg-black/30 border-white/5 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{app.name}</h3>
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'new' 
                          ? 'bg-primary text-black' 
                          : app.status === 'in_progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      <option value="new">Новая</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершена</option>
                    </select>
                  </div>
                  <div className="space-y-1 text-sm text-foreground/70">
                    <p className="flex items-center gap-2">
                      <Icon name="Phone" size={14} />
                      {app.phone}
                    </p>
                    {app.email && (
                      <p className="flex items-center gap-2">
                        <Icon name="Mail" size={14} />
                        {app.email}
                      </p>
                    )}
                    {app.message && (
                      <p className="mt-2 text-foreground">{app.message}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-foreground/50">
                  {new Date(app.created_at).toLocaleString('ru-RU')}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
