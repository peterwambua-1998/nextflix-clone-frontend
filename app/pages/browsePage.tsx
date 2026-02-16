import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  Star,
  Volume2,
  VolumeX,
  Plus,
  Check
} from 'lucide-react';
import MovieDetails from './movie-details';
import { NavLink } from "react-router";

const API_BASE_URL = 'http://localhost:3000/api';

const BrowsePage = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [muted, setMuted] = useState(true);
  const [myList, setMyList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Image base URLs from TMDB
  const IMG_BASE = 'https://image.tmdb.org/t/p';
  const POSTER_SIZE = '/w500';
  const BACKDROP_SIZE = '/original';

  useEffect(() => {
    fetchAllData();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch trending
      const trendingRes = await fetch(`${API_BASE_URL}/movies/trending?mediaType=movie&timeWindow=week`);
      const trendingData = await trendingRes.json();
      if (trendingData.success) {
        setTrending(trendingData.results);
        setFeaturedMovie(trendingData.results[0]);
      }

      // Fetch popular
      const popularRes = await fetch(`${API_BASE_URL}/movies/popular`);
      const popularData = await popularRes.json();
      if (popularData.success) setPopular(popularData.results);

      // Fetch top rated
      const topRatedRes = await fetch(`${API_BASE_URL}/movies/top-rated`);
      const topRatedData = await topRatedRes.json();
      if (topRatedData.success) setTopRated(topRatedData.results);

      // Fetch upcoming
      const upcomingRes = await fetch(`${API_BASE_URL}/movies/upcoming`);
      const upcomingData = await upcomingRes.json();
      if (upcomingData.success) setUpcoming(upcomingData.results);

      // Fetch genres
      const genresRes = await fetch(`${API_BASE_URL}/movies/genres`);
      const genresData = await genresRes.json();
      if (genresData.success) setGenres(genresData.genres);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleMyList = (movieId) => {
    setMyList(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const openMovieDetails = (movieId) => {
    setSelectedMovieId(movieId);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
    document.body.style.overflow = 'auto'; // Re-enable scroll
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}>
        <div className="px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          {/* Logo & Nav */}
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 text-2xl sm:text-3xl font-black tracking-tighter cursor-pointer"
              style={{ fontFamily: '"Bebas Neue", cursive' }}>
              STREAMFLIX
            </h1>
            <nav className="hidden lg:flex items-center gap-5 text-sm">
              <NavLink
                to={'/'}
                className={({ isActive }) => [
                  isActive ? "text-gray-300" : ""
                ].join(' ')}
              >Home</NavLink>
              <NavLink
                to={'/browse'}
                className={({ isActive }) => [
                  isActive ? "text-gray-300" : ""
                ].join(' ')}
              >
                Movies
              </NavLink>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-gray-300 transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="px-4 sm:px-8 lg:px-16 pb-4 animate-slide-down">
            <Input
              type="text"
              placeholder="Search for movies, TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md bg-black/80 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>
        )}
      </header>

      {/* Featured/Hero Section */}
      {featuredMovie && (
        <section className="relative h-[75vh] sm:h-[85vh] flex mt-16 items-end pb-24 sm:pb-32">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10"></div>
            <img
              src={`${IMG_BASE}${BACKDROP_SIZE}${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 px-4 sm:px-8 lg:px-16 max-w-2xl space-y-4 sm:space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              style={{ fontFamily: '"Bebas Neue", cursive' }}>
              {featuredMovie.title || featuredMovie.name}
            </h1>

            <div className="flex items-center gap-3 text-sm sm:text-base">
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                {featuredMovie.vote_average?.toFixed(1)}
              </span>
              <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-gray-200 max-w-xl">
              {truncateText(featuredMovie.overview, 200)}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => openMovieDetails(featuredMovie.id)}
                className="bg-white text-black hover:bg-white/90 font-bold px-6 sm:px-8 py-6 text-base sm:text-lg flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-black" />
                Play
              </Button>
              <Button
                onClick={() => openMovieDetails(featuredMovie.id)}
                className="bg-gray-500/70 hover:bg-gray-500/50 backdrop-blur font-bold px-6 sm:px-8 py-6 text-base sm:text-lg flex items-center gap-2"
              >
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </div>
          </div>

          {/* Mute Button */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-24 sm:bottom-32 right-4 sm:right-8 z-20 border-2 border-white/60 rounded-full p-2 hover:bg-white/20 transition"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </section>
      )}

      {/* Movie Rows */}
      <div className="relative z-10 space-y-8 sm:space-y-12 -mt-12 sm:-mt-24 pb-20">
        <MovieRow
          title="Trending Now"
          movies={trending}
          myList={myList}
          onToggleList={toggleMyList}
          onMovieClick={openMovieDetails}
        />
        <MovieRow
          title="Popular on StreamFlix"
          movies={popular}
          myList={myList}
          onToggleList={toggleMyList}
          onMovieClick={openMovieDetails}
        />
        <MovieRow
          title="Top Rated"
          movies={topRated}
          myList={myList}
          onToggleList={toggleMyList}
          onMovieClick={openMovieDetails}
        />
        <MovieRow
          title="Coming Soon"
          movies={upcoming}
          myList={myList}
          onToggleList={toggleMyList}
          onMovieClick={openMovieDetails}
        />
      </div>

      {/* Movie Details Modal */}
      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={closeMovieDetails}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Movie Row Component with Horizontal Scroll
const MovieRow = ({ title, movies, myList, onToggleList, onMovieClick }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const IMG_BASE = 'https://image.tmdb.org/t/p';
  const POSTER_SIZE = '/w500';

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.offsetWidth * 0.8;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 0);
      setShowRightArrow(
        rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.offsetWidth - 10
      );
    }
  };

  useEffect(() => {
    const ref = rowRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 sm:px-8 lg:px-16 group">
      <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: '"Bebas Neue", cursive' }}>
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInList={myList.includes(movie.id)}
              onToggleList={() => onToggleList(movie.id)}
              onClick={() => onMovieClick(movie.id)}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        )}
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, isInList, onToggleList, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const IMG_BASE = 'https://image.tmdb.org/t/p';
  const POSTER_SIZE = '/w500';

  const imageUrl = movie.poster_path
    ? `${IMG_BASE}${POSTER_SIZE}${movie.poster_path}`
    : movie.backdrop_path
      ? `${IMG_BASE}${POSTER_SIZE}${movie.backdrop_path}`
      : 'https://via.placeholder.com/500x750/333/fff?text=No+Image';

  return (
    <div
      className="flex-shrink-0 w-40 sm:w-48 md:w-56 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className={`relative rounded-md overflow-hidden transition-transform duration-300 ${hovered ? 'scale-110 z-20 shadow-2xl' : 'scale-100'
        }`}>
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />

        {/* Hover Overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 animate-fade-in">
            <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">
              {movie.title || movie.name}
            </h3>

            <div className="flex items-center gap-2 text-xs mb-3">
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3 h-3 fill-yellow-400" />
                {movie.vote_average?.toFixed(1)}
              </span>
              {movie.release_date && (
                <span className="text-gray-300">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This would play the movie
                }}
                className="bg-white text-black rounded-full p-2 hover:bg-white/80 transition"
              >
                <Play className="w-4 h-4 fill-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleList();
                }}
                className="border-2 border-white rounded-full p-2 hover:border-gray-300 transition"
              >
                {isInList ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="border-2 border-white rounded-full p-2 hover:border-gray-300 transition ml-auto"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title below (visible when not hovered) */}
      {!hovered && (
        <div className="mt-2 px-1">
          <p className="text-sm text-gray-300 line-clamp-1">
            {movie.title || movie.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
