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
    <div>
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
                <button className="boton botonDetalles">
                    Detalles
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path></svg>
                </button>
            </div>
        </div>
      ))}
    </div>

    <div className="botonesAnyadir">
        <button className="boton botonAnyadir" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg> 
            <span>Añadir buque</span>
        </button>
        <button className="boton botonAnyadir" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg> 
            Eliminar buque
        </button>
    </div>
    </div>
  )
}

export default Listado;