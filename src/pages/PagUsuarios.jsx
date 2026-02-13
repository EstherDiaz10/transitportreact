function PagUsuarios() {
  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <iframe
        src="http://localhost/listadoUsuarios"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default PagUsuarios;
