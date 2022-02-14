# NgDenoServer

This project is composed by two parts:

- **Angular**: it follows the classical Angular project structure. A service exposes all CRUD operations available to the app and the data is displayed using a mat-table.

- **Deno server**: inside the `webServer` folder. Provides endpoints to a generic client and allows to decouple the client app from eventual local JSON mocks.

## Context

This is the practical demo for the [Dev article](https://dev.to/paco_ita/create-an-angular-rest-api-mock-with-deno-598b) I wrote. Feel free to have a look at it for more details.

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--zaxNbWmc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/7lxybbz4tj6o0ax1w9ox.png" alt="app_layout">
</p> 

## Run the Angular app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run Deno mock server

From the `webServer` folder, run `deno run --allow-net server.ts` to start the server (you might want to add Deno to your env variables if you want to run it from any path). By default, it will listen on PORT 8280. <br>If you change it, align the PORT value with the variable used by Angular in the `environments` folder (within the Angular app scope). 

