# Prueba técnica con TypeScript y React

La configuracion del linter parte de la base de la configuracion default de vite, pero con algunas normas incluidas para que se parezca un poco a standard

Partiendo del video de midudev, dejo de verlo casi al principio y a base de pensar, buscar en google, hablar con chat gpt, mirar su repo y la web resultado, termino con este 'clon' que se comporta igual, salvo que ademas de ordenar usando las cabeceras tambien desordena, pero la estructura es completamente distinta usando reducer nativo de React y contexto, sin pasar ni una prop, ni uso el useRef, uso un useState que maneja el estado del fetch incial

Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.

El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: https://midu-react-11.surge.sh/. Para lograr esto, debe usar la API proporcionada por https://randomuser.me/.

Los pasos a seguir:

- [x] Fetch 100 rows of data using the API.
- [x] Display the data in a table format, similar to the example.
- [x] Provide the option to color rows as shown in the example.
- [x] Allow the data to be sorted by country as demonstrated in the example.
- [x] Enable the ability to delete a row as shown in the example.
- [x] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [x] Implement a feature that allows the user to filter the data by country.
- [x] Avoid sorting users again the data when the user is changing filter by country.
- [x] Sort by clicking on the column header.
- [] Handle any potential errors that may occur.
