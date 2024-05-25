'use client';
import Link from 'next/link';

export default function InicialForm() { 
        return (
            <form className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3">
                <div>
                    <label className="text-sm">
                        Bem-vindo ao 
                            <strong className='p-1 text-blue-800'> 
                                Desafio Jera
                            </strong>
                        </label>
                </div>
                
                <div className="flex gap-3">    
                    <Link href="/login"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </Link>
                    <Link href="/register"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Cadastro
                    </Link>
                </div>
            </form>
        );
};
