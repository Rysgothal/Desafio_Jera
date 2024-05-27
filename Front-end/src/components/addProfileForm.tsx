'use client';
import { useRouter } from "next/navigation";

export default function AddProfileForm () {
    const router = useRouter();

    const goBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    async function addProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        const newProfile = {
            profileName: e.currentTarget.profileName.value,
            idAccount: id,
            mainProfile: e.currentTarget.mainProfile.checked
        };

        if (newProfile.profileName === '') {
            alert('Por favor, insira ao menos 1 caracter!');
            return;
        }

        const response = await fetch("http://localhost:3050/profile/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            router.push(`profile-select?id=${id}`);
        } else {
            alert(data.message);
            router.back();
        };
    };
  
    return (
        <form
            onSubmit={addProfile} 
            className="bg-white p-6 rounded-lg">
            <div className="flex gap-2">
                <input type="text" placeholder="Nome do perfil" name="profileName"/>
                <input type="checkbox" id="perfilPrincipal" name="mainProfile" style={{ transform: "scale(1.5)" }} />
                <label htmlFor="perfilPrincipal">Perfil principal</label>
            </div>
            <div className="w-96 max-w-full flex flex-col py-2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Adicionar
                </button>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={goBack}>
                    Voltar
                </button>
            </div>
        </form>
    );
}
