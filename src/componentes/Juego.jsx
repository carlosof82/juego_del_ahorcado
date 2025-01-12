import { useContext, useEffect, useState } from 'react'
import { PALABROS } from '../assets/palabros'
import { useNavigate } from 'react-router-dom'
import Contexto from '../contexto/Contexto'
import imagen1 from '../assets/el_ahorcado1.png'

const Juego = () => {    
    const navegacion = useNavigate()
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    const misColores = [{ backgroundColor: "white" }, { backgroundColor: "green" }, { backgroundColor: "red" }]
    const letras_array = letras.split("")
    const {escribirCorrecta} = useContext(Contexto)
    const [azar, setAzar] = useState(0)
    const [palabra, setPalabra] = useState([])
    const [misLetras, setMisLetras] = useState([])
    const [correctas, setCorrectas] = useState([])
    const [erroneas, setErroneas] = useState([])
    const [imagen, setImagen] = useState(1)
    
    useEffect(() => {
        setAzar(Math.floor(Math.random() * PALABROS.length))
    }, [])
    useEffect(() => {
        setPalabra(PALABROS[azar].palabro.split(""))
        escribirCorrecta(PALABROS[azar].palabro)
    }, [azar])

    const pulsado = (e) => {
        const letra = e.target.innerHTML
        setMisLetras([...misLetras, (letra)])
        if (palabra.indexOf(letra) >= 0) {
            setCorrectas([...correctas, (letra)])
        } else {
            setErroneas([...erroneas, (letra)])
            setImagen(imagen + 1)
            if(imagen > 5) {
                navegacion("/final")
            }
        }
    }

    useEffect(() => {
      let noEncontrado = 0
      palabra.map(p => {
        if(misLetras.find(e => e === p) === undefined) {
            noEncontrado ++
        }
      })
      if(noEncontrado === 0 && correctas.length > 0) {
        navegacion("/ganado")
      }    
     
    }, [correctas])   
       
    return (
        <>
            <div className="pregunta">
                {PALABROS[azar].pregunta}
            </div>
            <div className="palabra">
                {
                    palabra.map((letra, i) => (
                        misLetras.indexOf(letra) === -1
                            ?
                            <div className="palo" key={i}></div>
                            :
                            <div className="palo" key={i}>{letra.toUpperCase()}</div>
                    ))
                }
            </div>
            <div className="boton">
                {
                    letras_array.map((letra) => (
                        (correctas.find(e => e === letra))
                        ?
                        <button style={misColores[1]} key={letra}>{letra}</button>
                        :
                        (erroneas.find(e => e === letra))
                        ?
                        <button style={misColores[2]} key={letra}>{letra}</button>
                        :
                        <button style={misColores[0]} key={letra} onClick={pulsado}>{letra}</button>
                    ))
                }
            </div>
            <div className="imagen">
               <img src={imagen1} alt="inicia" />
            </div>

        </>
    )
}

export default Juego