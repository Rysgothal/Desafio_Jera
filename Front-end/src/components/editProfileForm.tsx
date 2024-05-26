'use client';
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditProfileForm () {
    const router = useRouter();

    useEffect(() => {
        const param = new URLSearchParams(window.location.search);
        const json = JSON.parse(decodeURIComponent(param.get("data") as string));
        
        const inputProfileName = document.querySelector('input[name="profileName"]') as HTMLInputElement;
        inputProfileName.value = json.profileName;

        const inputMainProfile = document.querySelector('input[name="mainProfile"]') as HTMLInputElement;
        inputMainProfile.checked = json.mainProfile;
    }, []);

    async function editProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const param = new URLSearchParams(window.location.search);
        const json = JSON.parse(decodeURIComponent(param.get("data") as string));

        const editedProfile = {
            profileName: e.currentTarget.profileName.value,
            mainProfile: e.currentTarget.mainProfile.value === "on" ? true : false,
            id: json.id
        };

        const response = await fetch("http://18.219.160.242:3050/profile/edit", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(editedProfile)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            router.push(`profile-select?id=${json.idAccount}`);
        } else {
            alert(data.message);
        };
    };
  
    return (
        <form
            onSubmit={editProfile} 
            className="bg-white p-6 rounded-lg">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Nome do perfil" 
                    name="profileName"  
                />
                <input 
                    type="checkbox" 
                    id="perfilPrincipal" 
                    name="mainProfile" 
                    style={{ transform: "scale(1.5)" }}
                    />
                <label htmlFor="perfilPrincipal">Perfil principal</label>
            </div>
            <div className="w-96 max-w-full flex flex-col py-2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Confirmar
                </button>
            </div>
        </form>
    );
}
