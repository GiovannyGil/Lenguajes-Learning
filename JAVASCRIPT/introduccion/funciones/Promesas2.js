// definicion de promesa
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


fetchPost()
    .then((posts)=>{ // si la promesa se cumple
        console.log(posts)
    })
    .catch((error)=>{  // si la promesa falla o hay un error
        console.log(error)
    })
