const section = document.querySelector('.tipoHabitaciones')

let url = 'https://www.mockachino.com/1f7dc420-4592-4b/habHotel'


fetch(url)
    .then((response) => {
       
        return response.json()
    })

    .then((json) => {
        console.log(json)

        const rooms = json.habitaciones

        rooms.forEach(room => {
            const { id, nombreHabitacion, imagen, valor, descripcion } = room

            section.innerHTML += ` <article class="caja">
              
                                    <div class="imagen">
                                        <img src="${imagen}" alt="${nombreHabitacion}">
                                    </div>

                                    <div class="description">
                                        <h3>${nombreHabitacion}</h3>
                                        <p>${descripcion}</p>
                                        <p>Valor $ ${valor}</p>
                                        <div class="boton boton-${id}">Reservar</div>
                                        <input type="hidden" class='info-id' value="${id}">
                                    </div>
                            </article>`



            let storage = []

            function imprimirDetalle(id, insertBox) {
                let habitacion = rooms[id - 1]

                const { nombreHabitacion, descripcion, valor, maximaOcupacion } = habitacion

                console.log(habitacion)


                insertBox.innerHTML = `<div>
                           <h2 class= "name">${nombreHabitacion}</h2>
                            <p>${descripcion}</p>
                
                            <div class="cantidadPasajeros">
                                <h3>Cantidad de Pasajeros</h3>
                                <div class="click">
                                    <span class="lessP">-</span>
                                    <span class="resultadoP">0</span>
                                    <span class="moreP">+</span>
                                </div>
                            </div>
                
                            <div class="cantidadNoches">
                                <h3>Cantidad de Noches</h3>
                                <div class="click">
                                    <span class="lessN">-</span>
                                    <span class="resultadoN">0</span>
                                    <span class="moreN">+</span>
                                </div>
                            </div>
                
                            <div class="valorHab">
                                <h3>El valor por habitación por día es de <strong> $ ${valor}</strong></h3>
                            </div>
                           
                            <div class = "valorFinal">
                            <h4>El valor total de la estadía es de </h4>       
                            <div class="botonCalcular">Calcular</div>
                            <div class="resultadoTotal d-none"><strong> </strong></div>
                            </div>
                              
                                
                        
                            <div class="botones">
                            <div class="botonCarrito">Agregar</div>
                            <div class="closePopup">Salir</div>
                            
                                                     </div>`


                const botonCalcular = document.querySelector('.botonCalcular')
                const closePopup = document.querySelector('.closePopup')

                const moreP = document.querySelector('.moreP')
                const lessP = document.querySelector('.lessP')

                const moreN = document.querySelector('.moreN')
                const lessN = document.querySelector('.lessN')

                const resultadoN = document.querySelector('.resultadoN')
                const resultadoP = document.querySelector('.resultadoP')
                const resultadoE = document.querySelector('.resultadoTotal')



                const agregarCarrito = document.querySelector('.botonCarrito')

                let contadorN = 0
                let contadorP = 0
                let rdoTotal = 0

                moreP.onclick = () => {
                    contadorP++
                    contadorP = contadorP > maximaOcupacion ? maximaOcupacion : contadorP
                    resultadoP.innerText = contadorP
                }

                lessP.onclick = () => {
                    contadorP--
                    //console.log(contador)
                    contadorP = contadorP < 0 ? 0 : contadorP
                    resultadoP.innerText = contadorP
                }


                moreN.onclick = () => {
                    contadorN++
                    resultadoN.innerText = contadorN
                }

                lessN.onclick = () => {
                    contadorN--
                    contadorN = contadorN < 0 ? 0 : contadorN
                    resultadoN.innerText = contadorN
                }

                closePopup.onclick = () => {
                    popup.classList.add('d-none')
                }

                /* calcular total de noches */
                botonCalcular.onclick = () => {


                    if (contadorP && contadorN != 0) {
                        resultadoE.classList.remove('d-none')
                        rdoTotal = contadorN * valor
                        resultadoE.innerText = "$" + rdoTotal


                    }
                    else {

                        swal({
                            title: 'Error!',
                            text: 'Debe ingresar al menos 1 pasajero y 1 noche',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                    }

                }

                /* carrito */

                agregarCarrito.onclick = () => {
                    if (resultadoE && contadorP && contadorN != 0) {
                        habitacion.agregadoAlCarrito = rdoTotal
                        storage.push(habitacion)
                        sessionStorage.setItem('carrito', JSON.stringify(storage))


                        swal({
                            title: `Agregaste la habitacion ${nombreHabitacion} a tu carrito!`,
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    } else {
                        //no agregues al carrito - mensaje error
                        swal({
                            title: 'Error!',
                            text: 'Por favor revise los datos ingresados',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                    }
                }


            }

            const botonesVerDetalle = document.querySelectorAll('.boton')
            const popup = document.querySelector('.popupDetalle')

            for (verDetalle of botonesVerDetalle) {
                verDetalle.onclick = (e) => {
                    /* console.log(e) */
                    popup.classList.remove('d-none')
                    let id = e.target.nextElementSibling.value
                    imprimirDetalle(id, popup)
                }
            }

            let recuperoStorage = JSON.parse (sessionStorage.getItem('carrito'))
            console.log(recuperoStorage)



        })

    })








/*
    ventana.innerHTML = `<div>
                           <h2>${nombreHabitacion}</h2>
                            <p>${descripcion}</p>
                
                            <div class="cantidadPasajeros">
                                <h3>Cantidad de Noches</h3>
                                <div class="click">
                                    <span class="less">-</span>
                                    <span class="resultado">0</span>
                                    <span class="more">+</span>
                                </div>
                            </div>
                
                            <div class="cantidadNoches">
                                <h3>Cantidad de Noches</h3>
                                <div class="click">
                                    <span class="less">-</span>
                                    <span class="resultado">0</span>
                                    <span class="more">+</span>
                                </div>
                            </div>
                
                            <div class="valorFinal">
                                <h3>El valor por habitación por día es de ${valor}</h3>
                                <h4>El valor total de la estadía es de </h4>
                            </div>
                
                            <div class="botonCarrito">Agregar</div>
                            <div class="closePopup">Salir</div>
                        </div>`
}

const botonesReservar = document.querySelectorAll('.boton')
const popup = document.querySelector('.popupDetalle')

for (botonReservar of botonesReservar) {
    botonReservar.onclick = (e) => {
        console.log(e)
        //popup.style.display = 'flex'
        popup.classList.remove('d-none')
        let id = e.target.nextElementSibling.value
        ventanaDetalle(id, popup)
    }

}
})

.catch((error) => console.log(error))

*/














/*

const botonesVerDetalle = document.querySelectorAll('.boton')

const popup = document.querySelector('.popupDetalle')

popup.innerHTML = `<div class="popUp">
    
                                <div>  
                                    <h2>${nombreHabitacion}</h2>
                                    <p>${descripcion}</p>
                        
                                    <div class="cantidadPasajeros">
                                        <h3>Cantidad de Noches</h3>
                                        <div class="click">
                                            <span class="less">-</span>
                                            <span class="resultado">0</span>
                                            <span class="more">+</span>
                                        </div>
                                    </div>
                        
                                    <div class="cantidadNoches">
                                        <h3>Cantidad de Noches</h3>
                                        <div class="click">
                                            <span class="less">-</span>
                                            <span class="resultado">0</span>
                                            <span class="more">+</span>
                                        </div>
                                    </div>
                        
                                    <div class="valorFinal">
                                        <h3>El valor por habitación por día es de ${valor}</h3>
                                        <h4>El valor total de la estadía es de </h4>
                                    </div>
                        
                                    <div class="botonCarrito">Agregar</div>
                                    <div class="closePopup">Salir</div>
                                </div>
                            </div> ` */







/* insertBox.innerHTML = `<div class="popUp">
        
                                    <div>  
                                        <h2>${nombreHabitacion}</h2>
                                        <p>${descripcion}</p>
                            
                                        <div class="cantidadPasajeros">
                                            <h3>Cantidad de Noches</h3>
                                            <div class="click">
                                                <span class="less">-</span>
                                                <span class="resultado">0</span>
                                                <span class="more">+</span>
                                            </div>
                                        </div>
                            
                                        <div class="cantidadNoches">
                                            <h3>Cantidad de Noches</h3>
                                            <div class="click">
                                                <span class="less">-</span>
                                                <span class="resultado">0</span>
                                                <span class="more">+</span>
                                            </div>
                                        </div>
                            
                                        <div class="valorFinal">
                                            <h3>El valor por habitación por día es de ${valor}</h3>
                                            <h4>El valor total de la estadía es de </h4>
                                        </div>
                            
                                        <div class="botonCarrito">Agregar</div>
                                        <div class="closePopup">Salir</div>
                                    </div>
                                </div> `
}

}) */
/* 

            insertBox.innerHTML = `<div class="popUp">
                    
                                                <div>  
                                                    <h2>${nombreHabitacion}</h2>
                                                    <p>${descripcion}</p>
                                        
                                                    <div class="cantidadPasajeros">
                                                        <h3>Cantidad de Noches</h3>
                                                        <div class="click">
                                                            <span class="less">-</span>
                                                            <span class="resultado">0</span>
                                                            <span class="more">+</span>
                                                        </div>
                                                    </div>
                                        
                                                    <div class="cantidadNoches">
                                                        <h3>Cantidad de Noches</h3>
                                                        <div class="click">
                                                            <span class="less">-</span>
                                                            <span class="resultado">0</span>
                                                            <span class="more">+</span>
                                                        </div>
                                                    </div>
                                        
                                                    <div class="valorFinal">
                                                        <h3>El valor por habitación por día es de ${valor}</h3>
                                                        <h4>El valor total de la estadía es de </h4>
                                                    </div>
                                        
                                                    <div class="botonCarrito">Agregar</div>
                                                    <div class="closePopup">Salir</div>
                                                </div>
                                            </div> `

          
 */











