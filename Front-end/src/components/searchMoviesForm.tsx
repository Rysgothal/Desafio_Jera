
"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Movie } from '../interfaces/movie';

export default function SearchMoviesForm() {
    const router = useRouter(); 
    const [movies, setMovies] = useState<Movie[]>([]); 
    const [addedMovies, setAddedMovies] = useState<string[]>([]);
    const param = new URLSearchParams(window.location.search);
    const nameParam = param.get('name');

    useEffect(() => {
        const param = new URLSearchParams(window.location.search);
        const name = param.get('name');
        
        fetch(`http://localhost:3050/movies/list/${name}`)
            .then(response => response.json())
            .then(data => setMovies(data.results));

        console.log('Movies:', movies);
    }, []);

    const getPosterImage = (posterPath: string) => {
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        return `${baseUrl}${posterPath}`;
    };   

    const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    const handleAddToList = (movieId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (addedMovies.includes(movieId)) {
            setAddedMovies(addedMovies.filter(id => id !== movieId));
        } else {
            setAddedMovies([...addedMovies, movieId]);
        }
    };
    
    return (
        <form className="bg-white p-7 rounded-lg" style={{ margin: 'auto', maxWidth: '90vw' }}>
            <div>
                <label className='p-2'>
                    Você buscou por 
                    <strong className='p-2'>{nameParam}</strong>
                </label>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                {movies.map((movie, index) => (
                    <div key={index} className="bg-blue-200 p-4 rounded-lg mb-4 flex">
                        <img src={getPosterImage(movie.poster_path)} alt={movie.original_title} className="w-32 h-auto float-left mr-4" />
                        <div>
                            <h2>Nome: {movie.original_title}</h2>
                            <p>Linguagem: {movie.original_language}, Indicação {movie.adult ? 'Adulto' : 'Livre'}</p> 
                            <p>Popularidade: {movie.popularity.toString()}</p>
                            <p>Nota: {movie.vote_average.toString()}</p>
                            <p>Data de lançamento: {movie.release_date}</p>
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={(event) => handleAddToList(movie.id.toString(), event)}>
                                {addedMovies.includes(movie.id.toString()) ? 'Remover da Lista' : 'Adicionar à Lista'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={goBack}>
                Voltar
            </button>
        </form>
    );
}