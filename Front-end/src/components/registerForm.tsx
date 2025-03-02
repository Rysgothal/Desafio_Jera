
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const router = useRouter();
    
    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userLogin = {
            nameUser: e.currentTarget.nameUser.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            birthDate: e.currentTarget.birthDate.value
        };

        const response = await fetch("http://18.219.160.242:3050/account/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            const account = data.account;
            router.push(`/profile-select?id=${account.id}`);
        } else {
            const jsonData = JSON.stringify(data);
            const errorMessage = JSON.parse(jsonData).message;
            alert(errorMessage);
        };
    };

    return (
        <form 
            onSubmit={register}
            className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
        > 
            <h2 className="text-2xl font-bold mb-3">Criar uma conta</h2>
            <label htmlFor="nameUser" className="text-sm">Nome</label>
            <input 
                name="nameUser"
                type="name"
                placeholder="  Nome"
                className="input input-primary w-full"
            />
            <label htmlFor="email" className="text-sm">Email</label>
            <input 
                name="email"
                type="email"
                placeholder="  Email"
                className="input input-primary w-full"
            />
            <label htmlFor="password" className="text-sm">Senha</label>
            <input 
                name="password"
                type="password"
                placeholder="  Senha"
                className="input input-primary w-full"
            />
            <label htmlFor="birthDate" className="text-sm">Data de Nascimento</label>
            <input 
                name="birthDate"
                type="date"
                placeholder="  Data de Nascimento"
                className="input input-primary w-full"
            />
            <button className="btn btn-primary w-full bg-emerald-400" type="submit">Cadastrar</button>
            
            <span className="text-xs text-zinc-500">Já possui conta?
                <strong className="text-zinc-700">
                    <Link href="/login"> Entrar</Link>
                </strong>
            </span>
        </form>
    );
}