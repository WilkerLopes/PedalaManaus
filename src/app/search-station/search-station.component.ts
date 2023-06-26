import { Component, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as L from 'leaflet';
import { ViewStationComponent } from '../view-station/view-station.component';

const pinCurrent = L.icon({
  iconUrl: '/assets/images/currentUser.png',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [12, 12],
});
const pinFull = L.icon({
  iconUrl: '/assets/images/pinRed.png',
  iconSize: [27, 43],
  iconAnchor: [13, 43],
  popupAnchor: [13, 43],
});
const pin = L.icon({
  iconUrl: '/assets/images/pin.png',
  iconSize: [27, 43],
  iconAnchor: [13, 43],
  popupAnchor: [13, 43],
});

export interface Location {
  name: string;
  description: string;
  bikes: number;
  location: L.LatLngExpression;
}
export interface LocationDialog {
  event: L.LeafletMouseEvent;
  location: Location;
}

@Component({
  selector: 'app-search-station',
  template: `
    <div class="relative">
      <div class="fixed-search">
        <div class="relative">
          <label for="Search" class="sr-only"> Pesquisar por endereço </label>
          <input
            type="text"
            ng-model="pesquisa"
            id="Search"
            placeholder="Pesquisar por endereço"
            class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" class="text-gray-600 hover:text-gray-700">
              <span class="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div id="map"></div>
    </div>
  `,
  styles: [
    `
      #map {
        height: calc(100vh - 64px);
        width: 100%;
        z-index: 1;
      }
      .fixed-search {
        z-index: 2;
        position: absolute;
        top: 10px;
        left: 50px;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule],
})
export class SearchStationComponent implements AfterViewInit {
  public locations: Location[] = [
    {
      name: 'BCP0001 - Bicicletário do Shopping Manauara',
      description:
        'Localizado no Shopping Manauara que fica na Avenida Mário Ypiranga - Adrianopolis, Manaus/AM, conta com 77 vagas em ganchos individuais, cobertas, situadas no G4 (Terreo), necessita de corrente e cadeado para prender bicicleta.',
      bikes: 77,
      location: [-3.1045582, -60.012742300000006],
    },
    {
      name: 'BCP0002 - Paraciclo do Shopping Ponta Negra',
      description:
        'Localizado no Shopping Ponta Negra que fica na Avenida Coronel Teixeira - Ponta Negra, Manaus/AM. O espaço fica na entrada principal do shopping, no estacionamento externo do 1º piso (L1), possui cerca de 40 vagas e necessita de corrente e cadeado para prender a bicicleta.',
      bikes: 32,
      location: [-3.0849772, -60.072700399999995],
    },
    {
      name: 'BCP0003 - Paraciclo Parque dos Bilhares',
      description: '',
      bikes: 0,
      location: [-3.1019282, -60.0272316],
    },
    {
      name: 'BCP0004 - Paraciclo no Hotel Go Inn Manaus',
      description: '',
      bikes: 2,
      location: [-3.129057, -60.024465999999954],
    },
    {
      name: 'BCP0005 - Bicicletário no Restaurante Fish Maria Amazonia',
      description: '',
      bikes: 25,
      location: [-3.060471, -59.99247100000002],
    },
    {
      name: 'BCP0006 - Bicicletário na Loja Bemol Camapuã',
      description: '',
      bikes: 0,
      location: [-3.036511, -59.94109900000001],
    },
    {
      name: 'BCP0007 - Bicicletário na Drogaria Medicamentos Manaus',
      description: '',
      bikes: 31,
      location: [-3.119276, -60.02688499999999],
    },
    {
      name: 'BCP0008 - Bicicletário no Manaus Plaza Shopping',
      description: '',
      bikes: 3,
      location: [-3.097499, -60.022159999999985],
    },
  ];
  public pesquisa!: string;
  private markers: L.Marker[] = [];
  private map!: L.Map;
  public userPosition!: L.LatLngExpression;

  public async ngAfterViewInit() {
    await this.getLocation();
    this.initMap();
  }

  constructor(public dialog: MatDialog) {}

  private initMap() {
    this.map = L.map('map').setView(this.userPosition, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 5,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    L.marker(this.userPosition, { icon: pinCurrent })
      .addTo(this.map)
      .bindPopup('<p>Você está em um raio aproximado de 16m.</p>');
    L.circle(this.userPosition, {
      color: '#6393F280',
      fillColor: '#6393F280',
      fillOpacity: 0.5,
      radius: 16,
    }).addTo(this.map);

    this.updateMarkers(this.locations);
    this.watchPesquisa();
  }

  private viewLocation(location: LocationDialog): void {
    const dialogRef = this.dialog.open(ViewStationComponent, {
      data: location,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  private getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              this.userPosition = [
                position.coords.latitude,
                position.coords.longitude,
              ];
              resolve(true);
            }
          },
          (error) => reject(error)
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  }

  private watchPesquisa() {
    this.pesquisa = '';
    this.map.on('moveend', () => {
      const bounds = this.map.getBounds();
      const filteredLocais = this.locations.filter((local) =>
        bounds.contains(local.location)
      );
      this.updateMarkers(filteredLocais);
    });
    console.log('oli', this.pesquisa);
  }

  private updateMarkers(locations: Location[]) {
    this.clearMarkers();
    locations.forEach((location) => {
      const marker = L.marker(location.location, {
        icon: location.bikes === 0 ? pinFull : pin,
      })
        .addTo(this.map)
        .on('click', (event) => {
          this.viewLocation({ event, location });
        });
      this.markers.push(marker);
    });
  }

  private clearMarkers() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];
  }
}
