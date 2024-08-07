import './sass/main.scss'
import Handlebars from 'handlebars'

const start = async () => {

  //console.log("Hola mundo!")

  try {

    const respuesta = await fetch ('templates/card.hbs')

    if( !respuesta.ok ) {
      throw new Error('No se pudo obtener la plantilla')
    }

    const plantilla = await respuesta.text()

    //console.log(plantilla)

    const template = Handlebars.compile(plantilla)

    /*const respuestaBack = await fetch('http://localhost:8080/productos')*/
    const respuestaBack = await fetch('https://66a6f42e23b29e17a1a3ccb9.mockapi.io/productos/')

    if (!respuestaBack.ok) {
      throw new Error ('Algo paso con la respuesta!', respuestaBack.status)
    }

    const dataProductos = await respuestaBack.json()

    const data = { productos: dataProductos }

    //console.log(data)
    
    const html = template(data);

    //console.log(html)

    const containerCards = document.querySelector('#container-cards')

    containerCards.innerHTML = html

  } catch ( Error ) {
        console.log('Hubo un error l-50')
  }
}



window.addEventListener('DOMContentLoaded', start)