import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  className?: string;
}

export default function VideoPlayer({ url, thumbnail, className = '' }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer relative group overflow-hidden ${className}`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <Icon name="Video" size={48} className="text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
            <Icon name="PlayCircle" size={48} className="text-black" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-black border-white/10 p-0">
          <div className="aspect-video w-full">
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
