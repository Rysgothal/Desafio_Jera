
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IData {
    profileName: string;
    id: Number,
    idAccount: Number,
    mainProfile: boolean;
}

export default function WelcomeForm() {
    const router = useRouter();
    const [data, setData] = useState<IData>({} as IData);
    
    useEffect(() => {
        const param = new URLSearchParams(window.location.search);
        const encodedData = param.get('data');

        if (encodedData) {
            const decodedData = decodeURIComponent(encodedData);
            const jsonData = JSON.parse(decodedData);
            setData(jsonData);
        };

    }, []);
    const getSearchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = e.currentTarget.movieName.value;
        
        if (name === '') {
            alert('Por favor, insira ao menos 1 caracter!');
            return;
        }

        router.push(`/home/search/?name=${name}`);
    };

    const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    const getMoviesOfWeek = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/home/list`);
    }

    return (
        <form
            onSubmit={getSearchMovies} 
            className="bg-white p-7 rounded-lg"> 
            <h1 className="text-2xl font-bold">Bem-vindo! {data.profileName}</h1>
            <div className='gap-3'>
                <label htmlFor="name">Buscar filme:</label>
                <input type="text" id="name" name="movieName" className="border border-gray-300 rounded-md"/>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Pesquisar
                </button>
            </div>
            <div className='flex flex-col gap-2 py-2'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name='listMovies' 
                    onClick={getMoviesOfWeek}>
                    Melhores Filmes
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={goBack}>
                    Voltar
                </button>
            </div>
            
        </form>
    );
}