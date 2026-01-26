import data from '../data/db.json';
import {useState} from 'react';

const Listado = () => {
    
    const colorEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'en espera':
                return '#925152';
            case 'atracado':
                return '#E0AE74';
            case 'salido':
                return '#87A884';
        }
    }
  return(

    <div className="listadoElementos">
      {data.buques.map((buque) => (
        <div key={buque.id} className="elementoListado">
            <div className="iconoBuque">
                <i className="fa-solid fa-ship"></i>
            </div>
            <div className="infoBuque">
                <p><strong>ID Buque: </strong>B - {buque.id}</p>
                <p><strong>Nombre: </strong>{buque.nombre}</p>
                <p><strong>Tipo: </strong>{buque.tipo}</p>
                <div className="estado">
                    <p><strong>Estado: </strong>{buque.estado}</p>
                    <div style={{backgroundColor: colorEstado(buque.estado), width: '20px', height: '20px', borderRadius: '50%', marginLeft: '10px'}}></div>
                </div>
            </div>
            <div>
                <button className="botonDetalles">Detalles
                    <i className="fa-regular fa-note-sticky" style={{fontSize: '1.5em'}}></i>
                </button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Listado;