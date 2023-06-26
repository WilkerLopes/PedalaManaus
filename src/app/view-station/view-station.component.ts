import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

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
  selector: 'app-view-station',
  template: `
    <section class="overflow-hidden shadow-2xl md:grid md:grid-cols-3">
      <img
        alt="Trainer"
        src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
        class="h-32 w-full object-cover md:h-full"
      />

      <div class=" flex flex-col p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
        <p class="text-sm text-primary-300">Bicicletário</p>

        <h2 class="mt-6 text-3xl font-bold">
          {{ data.location.name }}
        </h2>

        <p class="mt-4 text-gray-500 text-sm">
          {{ data.location.description }}
        </p>

        <div class="flex flex-col items-center justify-end grow">
          <p class="mt-4 flex items-center gap-1.5 type-{{ bikesColor }}">
            <span class="inline-block h-1.5 w-1.5 rounded-full bullet"></span>
            <span class="text-xs font-medium">
              {{
                data.location.bikes == 0
                  ? 'Nenhuma bicicleta disponível'
                  : data.location.bikes + ' bicletas disponíveis'
              }}
            </span>
          </p>
          <button
            class="flex items-center justify-center w-full rounded-lg bg-primary-500 px-10 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            [mat-dialog-close]="data.location"
            cdkFocusInitial
          >
            Reservar Bicicleta
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .type-success {
        @apply text-green-500;
        .bullet {
          @apply bg-green-500;
        }
      }
      .type-alert {
        @apply text-yellow-500;
        .bullet {
          @apply bg-yellow-500;
        }
      }
      .type-error {
        @apply text-red-500;
        .bullet {
          @apply bg-red-500;
        }
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule],
})
export class ViewStationComponent {
  public bikesColor = 'success';

  constructor(
    public dialogRef: MatDialogRef<ViewStationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationDialog
  ) {
    if (data.location.bikes == 0) this.bikesColor = 'error';
    if (data.location.bikes > 0 && data.location.bikes <= 10)
      this.bikesColor = 'alert';
  }

  onNoClick(): void {
    this.dialogRef.close('oi');
  }
}
