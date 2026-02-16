import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  VolumeX,
  X,
  Star,
  Calendar,
  Clock,
  ChevronLeft,
  Check,
  Share2,
  Download
} from 'lucide-react';

const API_BASE_URL = 'https://streamflix-six-self.vercel.app/api';

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [muted, setMuted] = useState(true);
  const [inMyList, setInMyList] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Image base URLs from TMDB
  const IMG_BASE = 'https://image.tmdb.org/t/p';
  const BACKDROP_SIZE = '/original';
  const POSTER_SIZE = '/w500';
  const PROFILE_SIZE = '/w185';

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/movies/${movieId}?append=credits,videos,similar`);
      const result = await response.json();

      if (result.success) {
        setMovie(result.data);

        // Find trailer or teaser
        const trailers = result.data.videos?.results?.filter(
          video => video.type === 'Trailer' || video.type === 'Teaser'
        );
        if (trailers && trailers.length > 0) {
          setSelectedVideo(trailers[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
        <p>Movie not found</p>
      </div>
    );
  }

  // Get cast and crew
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const writers = movie.credits?.crew?.filter(person =>
    person.job === 'Writer' || person.job === 'Screenplay'
  ).slice(0, 3) || [];

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-black/80 hover:bg-black rounded-full p-2 transition-all hover:scale-110"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Hero Section with Trailer */}
      <section className="relative h-[85vh] flex items-end">
        {/* Background Image or Video */}
        <div className="absolute inset-0">
          {playingTrailer && selectedVideo ? (
            <div className="w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img
                src={`${IMG_BASE}${BACKDROP_SIZE}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative z-20 px-8 lg:px-16 pb-24 max-w-3xl space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
              style={{ fontFamily: '"Bebas Neue", cursive' }}>
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl sm:text-2xl text-gray-300 italic">
                "{movie.tagline}"
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-base sm:text-lg">
            <span className="flex items-center gap-2 text-yellow-400 font-bold">
              <Star className="w-5 h-5 fill-yellow-400" />
              {movie.vote_average?.toFixed(1)} / 10
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {formatRuntime(movie.runtime)}
            </span>
            <span className="border border-gray-400 px-3 py-1 text-sm">
              {movie.adult ? '18+' : 'PG-13'}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="bg-red-600/20 border border-red-600 px-4 py-1.5 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => setPlayingTrailer(!playingTrailer)}
              className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 text-lg flex items-center gap-2"
            >
              <Play className="w-6 h-6 fill-black" />
              {playingTrailer ? 'Stop Preview' : 'Play Preview'}
            </Button>

            <Button
              onClick={() => setInMyList(!inMyList)}
              className="bg-gray-700/70 hover:bg-gray-700/90 backdrop-blur font-semibold px-8 py-6 text-lg flex items-center gap-2"
            >
              {inMyList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              My List
            </Button>

            <Button
              onClick={() => setLiked(!liked)}
              className="bg-gray-700/70 hover:bg-gray-700/90 backdrop-blur font-semibold px-6 py-6"
            >
              <ThumbsUp className={`w-6 h-6 ${liked ? 'fill-white' : ''}`} />
            </Button>

            <Button className="bg-gray-700/70 hover:bg-gray-700/90 backdrop-blur font-semibold px-6 py-6">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mute/Unmute Button */}
        {playingTrailer && (
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-24 right-8 z-30 border-2 border-white/60 rounded-full p-3 hover:bg-white/20 transition"
          >
            {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        )}
      </section>

      {/* Details Section */}
      <section className="bg-[#141414] px-8 lg:px-16 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-black mb-4" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                Overview
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-3xl font-black mb-6" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                  Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="space-y-2">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                        {person.profile_path ? (
                          <img
                            src={`${IMG_BASE}${PROFILE_SIZE}${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{person.name}</p>
                        <p className="text-xs text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos/Trailers */}
            {movie.videos?.results && movie.videos.results.length > 0 && (
              <div>
                <h2 className="text-3xl font-black mb-6" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                  Videos & Trailers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.videos.results.slice(0, 4).map(video => (
                    <div
                      key={video.id}
                      className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer group"
                      onClick={() => {
                        setSelectedVideo(video);
                        setPlayingTrailer(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                        <Play className="w-16 h-16 fill-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="font-semibold">{video.name}</p>
                        <p className="text-xs text-gray-400">{video.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Additional Info */}
            <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">More Info</h3>

              {director && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Director</p>
                  <p className="font-semibold">{director.name}</p>
                </div>
              )}

              {writers.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Writers</p>
                  <p className="font-semibold">{writers.map(w => w.name).join(', ')}</p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-1">Original Language</p>
                <p className="font-semibold uppercase">{movie.original_language}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className="font-semibold">{movie.status}</p>
              </div>

              {movie.budget > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Budget</p>
                  <p className="font-semibold">{formatCurrency(movie.budget)}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Revenue</p>
                  <p className="font-semibold">{formatCurrency(movie.revenue)}</p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-1">Vote Count</p>
                <p className="font-semibold">{movie.vote_count?.toLocaleString()} votes</p>
              </div>

              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Production</p>
                  <p className="font-semibold">{movie.production_companies[0].name}</p>
                </div>
              )}
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Production Companies</h3>
                <div className="space-y-3">
                  {movie.production_companies.slice(0, 4).map(company => (
                    <div key={company.id} className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-3">
                      {company.logo_path ? (
                        <img
                          src={`${IMG_BASE}/w92${company.logo_path}`}
                          alt={company.name}
                          className="h-8 object-contain bg-white rounded p-1"
                        />
                      ) : (
                        <div className="w-12 h-8 bg-gray-800 rounded"></div>
                      )}
                      <span className="text-sm">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ fontFamily: '"Bebas Neue", cursive' }}>
              More Like This
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.similar.results.slice(0, 12).map(similar => (
                <div
                  key={similar.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    // This would navigate to the new movie details
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
                    <img
                      src={similar.poster_path
                        ? `${IMG_BASE}${POSTER_SIZE}${similar.poster_path}`
                        : 'https://via.placeholder.com/500x750/333/fff?text=No+Image'
                      }
                      alt={similar.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-semibold line-clamp-2">{similar.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {similar.vote_average?.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
