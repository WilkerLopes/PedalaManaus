import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="bg-gray-50">
      <div
        class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
      >
        <div class="mx-auto max-w-xl text-center">
          <h1
            class="bg-gradient-to-r from-primary-500 via-blue-700 to-violet-900 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Encontre uma bicicleta.

            <span class="sm:block"> Pedala Manaus. </span>
          </h1>

          <p class="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full cursor-pointer rounded bg-primary-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring active:bg-primary-500 sm:w-auto"
              routerLink="/localizar-estacoes"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
            >
              Ver estações
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent {}
