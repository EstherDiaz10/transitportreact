import { useState } from "react";

const FormAdd = () => {
  const [form, setForm] = useState({
    id_grua: "",
    tipo_grua: "sts",
    zona_asig: "1",
    estado_grua: "ocupada",
    operario: "",
    observacion: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <h2>Detalles de la grúa</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id_grua">ID grúa</label>
        <input
          id="id_grua"
          type="text"
          name="id_grua"
          value={form.id_grua}
          onChange={handleChange}
        />

        <label htmlFor="tipo_grua">Tipo grúa</label>
        <select name="tipo_grua" value={form.tipo_grua} onChange={handleChange}>
          <option value="sts">STS</option>
          <option value="sc">SC</option>
        </select>

        <label htmlFor="zona_asig">Zona asignada</label>
        <select name="zona_asig" value={form.zona_asig} onChange={handleChange}>
          <option value="1">ZD-01</option>
          <option value="2">ZD-02</option>
          <option value="3">ZD-03</option>
          <option value="4">ZD-04</option>
          <option value="5">ZD-05</option>
        </select>

        <label htmlFor="estado_grua">Estado</label>
        <select name="estado_grua" value={form.estado_grua} onChange={handleChange}>
          <option value="ocupada">🔴 Ocupada</option>
          <option value="disponible">🟢 Disponible</option>
        </select>

        <label htmlFor="operario">Operario asignado</label>
        <input 
            type="text" 
            name="operario" 
            id="operario" 
            value={form.operario} 
            onChange={handleChange} 
        
        />

        <label htmlFor="observacion">Observación</label>
        <input 
            type="text" 
            name="observacion" 
            id="observacion" 
            value={form.observacion}
            onChange={handleChange}    
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormAdd;
