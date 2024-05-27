
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileSelectForm () {
    const router = useRouter();
    const [profiles, setProfiles] = useState<{ id: number }[]>([]);

    const params = new URLSearchParams(window.location.search);
    const idAccount = Number(params.get("id"));

    const editProfile = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const element = document.getElementById('profile') as HTMLSelectElement;
        const selectedProfile = profiles.find(profile => profile.id === Number(element.value));
        const json = JSON.stringify(selectedProfile);
        router.push(`/edit-profile?data=${encodeURIComponent(json)}`);
    });

    const addProfile = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push(`/add-profile?id=${idAccount}`);
    });

    useEffect(() => {
        fetch(`http://localhost:3050/${idAccount}/list-profiles`)
        .then(async response => {
            const data = await response.json();
            setProfiles(data.profiles);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [idAccount]);

    const exitAccount = ((e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        router.push('/');
    });

    const enterProfile = ((e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const element = document.getElementById('profile') as HTMLSelectElement;
        const selectedProfile = profiles.find(profile => profile.id === Number(element.value));
        const json = JSON.stringify(selectedProfile);
        router.push(`/home?data=${encodeURIComponent(json)}`);
    });

    return (
        <form className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3">
            <h1 className="text-2xl font-bold">Selecione seu Perfil</h1>
            <select 
                name="profile" 
                id='profile'
                className="w-full p-2 border border-gray-300 rounded-lg">
                    {profiles.map((profile: any) => (
                        <option key={profile.id} value={profile.id}>
                            {profile.profileName}
                            {profile.mainProfile ? ' (Principal)' : ''}
                        </option>
                    ))}
            </select>
            <div className='flex gap-2'>
                <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={enterProfile}>Entrar</button>
                <button className="bg-red-500 text-white p-2 rounded-lg" onClick={exitAccount}>Sair</button>
            </div>
            <h2 className="text-2xl font-bold">Opções:</h2>
            <div className='flex gap-2'>
                <button className="bg-green-500 text-white p-2 rounded-lg" onClick={addProfile}>Adicionar</button>
                <button className="bg-green-500 text-white p-2 rounded-lg" onClick={editProfile}>Editar</button>
            </div>
        </form>
    );
}