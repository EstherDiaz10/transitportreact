const Filtrado = () => {
  return (
    <div>
      <select name="tipoBuque" id="buque">
        <option value="tipo">Tipo buque</option>
        <option value="portacontenedores">Portacontenedores</option>
      </select>
      <select name="estado" id="estadoBuque">
        <option value="estado">Estado</option>
        <option value="espera">En espera</option>
        <option value="atracado">Atracado</option>
        <option value="salido">Salido</option>
      </select>
    </div>
  )
}

export default Filtrado;