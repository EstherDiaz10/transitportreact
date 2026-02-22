function PagUsuarios() {
  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <iframe
        //src="http://18.232.225.15/listadoUsuarios"
        src="http://192.168.1.42/listadoUsuarios"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default PagUsuarios;
