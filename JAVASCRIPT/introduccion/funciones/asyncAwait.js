/**
 * Async / Await
 * código asíncrono es el que no para la ejecución del código
 */


// definición de promesa
const fetchPost = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const posts = ['posts1', 'posts2', 'posts3']
            const error = true
            if(error){
                reject('Hubo un error')
            } else {
                resolve(posts)
            }

        },2000)
    })
}

const mostrarPosts = async()=>{ // función asíncrona
    try{
        // espere sin ejecutar código a que termine para continuar la ejecución ->
        const posts = await fetchPost() //<--- esto es lo que espera con await
        console.log(posts)
    }catch(error){
        console.log(error)
    }

}
mostrarPosts()


/*
fetchPost()
    .then((posts)=>{ // si la promesa se cumple
        console.log(posts)
    })
    .catch((error)=>{  // si la promesa falla o hay un error
        console.log(error)
    })
*/