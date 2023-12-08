import React from 'react';

const Sidebar = () => {
    return (
<div class="barra-lateral col-12 col-sm-auto">
    <div class="logo">
        <h2>Dashboard Comuna 17</h2>
    </div>
    <ul class="menu list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn align-items-center rounded" data-bs-toggle="" data-bs-target="#home-collapse">
          <a style="margin-left: 0px !important;" href="index.html"><i class="icon-home"></i><span>Home</span></a>
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#barrios-collapse">
            <i class="icon-building"></i><span>Barrios</span>
        </button>
        <div class="collapse" id="barrios-collapse">
          <ul class="btn-toggle-nav list-unstyled">
            <li><a href="dashboard-cataya.html" class="link rounded">- Gran Limonar - Cataya</a></li>
            <li><a href="dashboard-gran-limonar.html" class="link rounded">- Gran Limonar</a></li>
            <li><a href="dashboard-la-hacienda.html" class="link rounded">- La Hacienda</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded">
            <i class="icon-cinema"></i><span>Cineclubes</span>
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#elecciones-collapse">
            <i class="icon-angellist"></i><span>Elecciones Regionales 2023</span>
        </button>
        <div class="collapse" id="elecciones-collapse">
          <ul class="btn-toggle-nav list-unstyled">
            <li><a href="concejo.html" class="link rounded">- Concejo</a></li>
            <li><a href="ediles.html" class="link rounded">- Ediles</a></li>
            <li><a href="alcaldia.html" class="link rounded">- Alcaldía</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse">
            <i class="icon-sun"></i><span>Configuración</span>
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Sugerencias</a></li>
            <li><a href="#" class="link-dark rounded">Acerca de</a></li>
            <li><a href="#" class="link-dark rounded">Sube tu queja</a></li>
          </ul>
        </div>
      </li>
    </ul>
    
</div>
    );
  }
  
  export default Sidebar;