
import ResponsiveImage from '@/components/ui/ResponsiveImage'

interface Playlist {
  id: number
  title: string
  description: string
  image: string
}

interface PlaylistGridProps {
  playlists: Playlist[]
}

// Client Component - ResponsiveImage 때문에 필요
export default function PlaylistGrid({ playlists }: PlaylistGridProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">추천 플레이리스트</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id}
            className="group bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <ResponsiveImage
              src={playlist.image}
              alt={playlist.title}
              className="mb-4 group-hover:shadow-lg transition-shadow duration-300"
              aspectRatio="square"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
              {playlist.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {playlist.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
