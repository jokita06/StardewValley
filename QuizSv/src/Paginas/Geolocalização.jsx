import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export function Geolocalizacao() {
  const mapRef = useRef(null);
  const routeRef = useRef(null);

  const [form, setForm] = useState({
    lat1: "",
    lng1: "",
    lat2: "",
    lng2: "",
  });

  const [errors, setErrors] = useState({});

  // Inicializa o mapa
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([-25.55, -46.63], 15);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Ajusta o mapa quando a janela é redimensionada
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Validação dos campos
  function validarCampos() {
    let temp = {};
    if (!form.lat1) temp.lat1 = "Informe a latitude da origem.";
    if (!form.lng1) temp.lng1 = "Informe a longitude da origem.";
    if (!form.lat2) temp.lat2 = "Informe a latitude do destino.";
    if (!form.lng2) temp.lng2 = "Informe a longitude do destino.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  }

  // Gerar rota
  function gerarRota(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const p1 = L.latLng(parseFloat(form.lat1), parseFloat(form.lng1));
    const p2 = L.latLng(parseFloat(form.lat2), parseFloat(form.lng2));

    if (routeRef.current) {
      routeRef.current.remove();
    }

    routeRef.current = L.Routing.control({
      waypoints: [p1, p2],
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: { 
        addWaypoints: false,
        styles: [{ color: '#4a6fa5', weight: 5, opacity: 0.7 }]
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      })
    }).addTo(mapRef.current);

    // Ajusta o zoom para mostrar toda a rota
    const bounds = L.latLngBounds(p1, p2);
    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  }

  // Pegar localização atual - Origem
  function pegarLocalizacaoOrigem() {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          lat1: pos.coords.latitude.toFixed(6),
          lng1: pos.coords.longitude.toFixed(6),
        });
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        alert("Não foi possível obter sua localização");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Pegar localização atual - Destino
  function pegarLocalizacaoDestino() {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          lat2: pos.coords.latitude.toFixed(6),
          lng2: pos.coords.longitude.toFixed(6),
        });
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        alert("Não foi possível obter sua localização");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Limpar rota
  function limparRota() {
    if (routeRef.current) {
      routeRef.current.remove();
      routeRef.current = null;
    }
    
    // Limpar campos
    setForm({
      lat1: "",
      lng1: "",
      lat2: "",
      lng2: "",
    });
    
    setErrors({});
    
    // Resetar vista do mapa
    if (mapRef.current) {
      mapRef.current.setView([-25.55, -46.63], 15);
    }
  }

  return (
    <div className="geolocalizacao-container">
      {/* Painel de Controles (Esquerda) */}
      <div className="controles-painel">
        <div className="painel-header">
          <h2>Gerador de Rotas</h2>
        </div>

        <form className="geolocalizacao-form" onSubmit={gerarRota}>
          {/* Seção ORIGEM */}
          <div className="form-secao">
            <h3 className="secao-titulo">
              Origem
            </h3>
            
            <div className="coordenadas">
              <div className="input-group">
                <label htmlFor="lat1">
                  Latitude
                </label>
                <input
                  id="lat1"
                  type="number"
                  name="lat1"
                  step="any"
                  value={form.lat1}
                  onChange={(e) => setForm({ ...form, lat1: e.target.value })}
                  placeholder="Ex: -23.550520"
                  className={errors.lat1 ? "input-error" : ""}
                />
                {errors.lat1 && <p className="error-message">{errors.lat1}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="lng1">
                  Longitude
                </label>
                <input
                  id="lng1"
                  type="number"
                  name="lng1"
                  step="any"
                  value={form.lng1}
                  onChange={(e) => setForm({ ...form, lng1: e.target.value })}
                  placeholder="Ex: -46.633308"
                  className={errors.lng1 ? "input-error" : ""}
                />
                {errors.lng1 && <p className="error-message">{errors.lng1}</p>}
              </div>
            </div>

            <button
              type="button"
              className="btn-stardew"
              onClick={pegarLocalizacaoOrigem}
            >
              Usar Minha Localização
            </button>
          </div>

          {/* Seção DESTINO */}
          <div className="form-secao">
            <h3 className="secao-titulo">
            Destino
            </h3>
            
            <div className="coordenadas">
              <div className="input-group">
                <label htmlFor="lat2">
                  Latitude
                </label>
                <input
                  id="lat2"
                  type="number"
                  name="lat2"
                  step="any"
                  value={form.lat2}
                  onChange={(e) => setForm({ ...form, lat2: e.target.value })}
                  placeholder="Ex: -23.551512"
                  className={errors.lat2 ? "input-error" : ""}
                />
                {errors.lat2 && <p className="error-message">{errors.lat2}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="lng2">
                  Longitude
                </label>
                <input
                  id="lng2"
                  type="number"
                  name="lng2"
                  step="any"
                  value={form.lng2}
                  onChange={(e) => setForm({ ...form, lng2: e.target.value })}
                  placeholder="Ex: -46.634308"
                  className={errors.lng2 ? "input-error" : ""}
                />
                {errors.lng2 && <p className="error-message">{errors.lng2}</p>}
              </div>
            </div>

            <button
              type="button"
              className="btn-stardew"
              onClick={pegarLocalizacaoDestino}
            >
              Usar Minha Localização
            </button>
          </div>

          {/* Botões de Ação */}
          <div className="botoes-acao">
            <button type="submit" className="btn-stardew">
              Gerar Rota
            </button>
            
            <button 
              type="button" 
              className="btn-stardew"
              onClick={limparRota}
            >
              Limpar
            </button>
          </div>

        </form>
      </div>

      {/* Mapa (Direita) */}
      <div className="mapa-painel">
        <div className="mapa-header">
          <h3>Mapa Interativo</h3>
        </div>
        <div id="map" className="geolocalizacao-mapa"></div>
      </div>
    </div>
  );
}