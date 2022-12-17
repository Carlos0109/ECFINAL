export default function ComponenteMenu(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Api - PublicidadRyR</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" 
          aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/clientes">Cliente</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/usuarios">Usuario</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/productos">Producto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categoria">Categoria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ventas">Ventas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dventas">D-Ventas</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}