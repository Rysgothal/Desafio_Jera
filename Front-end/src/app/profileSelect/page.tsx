import ProfileSelectForm from "@/components/profileSelectForm";

export default function Home() {
  const id = "1";

  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-gray-600 px-5">
        <ProfileSelectForm idAccount={id} /> 
      </div>
    </main>
  );
}
