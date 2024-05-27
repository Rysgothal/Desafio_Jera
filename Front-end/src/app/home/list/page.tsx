import ListMoviesForm from '../../../components/listMoviesForm';

export default function Home() {
  return(
    <main>
      <div className="h-screen flex justify-center items-center bg-gray-600 px-5">
        <ListMoviesForm />
      </div>
    </main>
  )
}
