
'use client';
import Link from 'next/link';

export default function loginForm() {
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userLogin = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        };

        const response = await fetch("http://localhost:3050/account/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            // window.location.href = "registerForm.tsx";
        } else {
            console.error(data);
        };
    };
    
    return (
        <form 
            onSubmit={login}
            className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
        > 
            <h2 className="text-2xl font-bold mb-3">Login</h2>
            <input 
                name="email"
                type="email"
                placeholder="email"
                className="input input-primary w-full"
            />
            <input 
                name="password"
                type="password"
                placeholder="senha"
                className="input input-primary w-full"
            />
            <button className="btn btn-primary w-full bg-emerald-400" type="submit">Entrar</button>

            <span className="text-xs text-zinc-500">Não possui conta?
                <strong className="text-zinc-700">
                    <Link href="/register"> Registrar-se</Link>
                </strong>
            </span>
        </form>
    );
}