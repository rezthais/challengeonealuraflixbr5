const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const viteExpress = require('vite-express');

// Configuração do Express
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

// Configuração do Json-server
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const jsonServerPort = 3000; // Porta do json-server

app.use(middlewares);
app.use('/categories', router);

// Configuração do Vite
module.exports = defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: true,
    port: 3001, // Porta do ViteExpress
    setupMiddleware: (app) => {
      const { createServer } = viteExpress({ app });
      createServer();
    },
    fs: {
      strict: false
    },
    proxy: {
      '/categories': {
        target: `http://localhost:${jsonServerPort}`, // Proxy para o json-server
        changeOrigin: true
      }
    }
  }
});
