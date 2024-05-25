
'use client';

export default function ProfileSelect() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`http://18.219.160.242:3050/${id}/list-profiles`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            // const objectElements = data.map((object, index) => (
            //     <div key={index}>
            //         <h2>{object.name}</h2>
            //         <p>{object.description}</p>
            //     </div>
            // ));

            // // Render the JSX elements
            // ReactDOM.render(objectElements, document.getElementById('object-container'));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return (
        <form className="bg-white p-6 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3">
            <h1>Esse é o ID: {id}</h1>
        </form>
    );
}