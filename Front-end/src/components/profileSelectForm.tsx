
'use client';

export default function ProfileSelectForm(idAccount: string) { 
        return (
            <form className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3">
               
                <p>The value passed through the URL is: {idAccount}</p>
               
            </form>
        );
};
