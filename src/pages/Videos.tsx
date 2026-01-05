import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: string;
  views: number;
  published_at: string;
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://functions.poehali.dev/debc6a76-c0c6-4d54-b06c-634645e654c1')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        if (data.length > 0) {
          setSelectedVideo(data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading videos:', err);
        setLoading(false);
      });
  }, []);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} мес. назад`;
    return `${Math.floor(diffDays / 365)} г. назад`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Icon name="ArrowLeft" size={24} />
            <span className="text-xl font-bold">Наши Видео</span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Загрузка видео...</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2 space-y-4">
              {selectedVideo && (
                <>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video bg-black">
                      <iframe
                        src={selectedVideo.video_url}
                        title={selectedVideo.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </Card>
                  
                  <div className="space-y-3">
                    <h1 className="text-2xl font-bold">{selectedVideo.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        <span>{formatViews(selectedVideo.views)} просмотров</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{formatDate(selectedVideo.published_at)}</span>
                      </div>
                    </div>
                    <Card className="p-4">
                      <p className="text-foreground/80 leading-relaxed">
                        {selectedVideo.description}
                      </p>
                    </Card>
                  </div>
                </>
              )}
            </div>

            {/* Video List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="PlaySquare" size={20} />
                Все видео
              </h2>
              <div className="space-y-3">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative flex-shrink-0 w-40 aspect-video rounded overflow-hidden">
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                          {video.title}
                        </h3>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>{formatViews(video.views)} просмотров</p>
                          <p>{formatDate(video.published_at)}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}