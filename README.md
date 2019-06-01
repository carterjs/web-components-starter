# Web Components Starter

A starting point for apps built with Web Components using Lit Element, TypeScript, Sass, and Webpack.

## Workflow

Start the development server with the ```npm start``` command. The server will hot-reload for changes made within the "src" directory, but not for changes to the configuration files (including the Webpack and TypeScript configutations)

Build the project with ```npm run build```. The built project is put into the "dist" directory. Building is a relatively slow process and it will only get slower as the project grows. It is recommended that you do this only when checking the structure or deploying the app.

------------------------------------------------------------

## To-dos

- [x] Find a way to split modules
- [x] Add TypeScript and Sass to project
- [x] Load Sass as template literals
- [x] Include web components polyfill
- [x] Add Redux
- [x] Find and include a font
- [x] Add routing and other pwa-helper states to app reducer
- [ ] Add support for optional url parameters
- [ ] Allow numerical parameters
- [ ] Write documentation for adding routes, pages
- [ ] Add a testing framework
- [ ] Add a custom material theme
- [ ] Supplement MWCs with wrapped MDCs
- [ ] Make mock UI with customized material components
- [ ] Add authentication and data demos