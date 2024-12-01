
 function formularioT(){
const d= document;
const $inputs = d.querySelectorAll(".formulario [required]")
const $form = d.querySelector(".formulario")
// const $iAsunto = d.querySelector("#asunto")
// const $Email = d.querySelector("#email")
// const $Campo = d.querySelector("#campo"), 
const $enviar = d.querySelector(".enviar");

const objeto ={
    nombre:"",
    asunto:"",
    email:"",
    campo:""
}

$inputs.forEach(e=>{
    const $span = d.createElement("span");
    $span.id = e.name;
    $span.textContent = e.title;
    $span.classList.add("contact-form-error","none");
    e.insertAdjacentElement("afterend",$span)
})

const escribir=(n)=>{

   
  //  nuevo.textContent = n.id;
  
       

}

let numeros = /^[0-9]$/g
console.log($enviar)
    
    d.addEventListener("input",e=>{
          if(e.target.matches(".formulario [required]")){
            let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
            // console.log($input,pattern)

            if(pattern && $input.value !== ""){
                let expres = new RegExp(pattern);
               return  !expres.exec($input.value)? d.querySelector(`#${$input.name}`).classList.add("is-active"): d.querySelector(`#${$input.name}`).classList.remove("is-active");

                // console.log("tiene patron")
            }

            if(!pattern){
                console.log("NO tiene patron")
                return  $input.value=== ""? d.querySelector(`#${$input.name}`).classList.add("is-active"): d.querySelector(`#${$input.name}`).classList.remove("is-active");

            }


          }

    }) ;

   
    d.addEventListener("submit",e=>{
     e.preventDefault()
     alert("eviando formulario");
     const $loader = d.querySelector(".contact-form-loader"),
     $enviados = d.querySelector(".contact-response");
     const options = {
        method: "POST",
        body: new FormData(e.target)
    }
     fetch("https://formsubmit.co/ajax/miguelrafaellso081@gmail.com",options)
     .then(res=>res.ok?res.json():Promise.reject(res))
     .then(res=>{
        console.log(res);
        
        $loader.classList.add("none");
        $enviados.innerHTML =`<p>${res.message}</p>`;
        $enviados.classList.remove("none")
        $form.reset(); //para resetear un formulario
       
     })
     .catch(err=>{
        let message = err.statusText| "Ocurrio un error";
        $enviados.innerHTML = `<p>Error: ${err.status}: ${message}</p>`
        console.log(err)
     })
     .finally(()=>{
        setTimeout(() => $enviados.classList.add("none"), 3000);
        $enviados.innerHTML = "";
     })
    
     $loader.classList.remove("none")


    //  setTimeout(() => {
       
    //     setTimeout(() => $enviados.classList.add("none"), 3000);
    //  }, 3000);

    
    })


}

formularioT();
    
