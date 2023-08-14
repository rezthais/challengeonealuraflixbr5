const express = require('express');
const path = require('path');
const { createServer } = require('vite');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

async function startServer() {
  const viteApp = await createServer({
    server: {
      middlewareMode: false,
    },
  });

  app.use(cors());

  // Rota para verificar a existência da categoria
  app.get('/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    const categories = router.db.getState().categories;

    console.log('categoryName:', categoryName);
    console.log('categories:', categories);

    const categoryExists = Object.keys(categories).includes(categoryName);

    console.log('categoryExists:', categoryExists);

    if (categoryExists) {
      const category = categories[categoryName];
      const formattedCategory = {
        [categoryName]: category,
      };
      res.status(200).json(formattedCategory);
    } else {
      res.status(404).json({ message: 'A categoria não existe' });
    }
  });

  // Rota para excluir a categoria
  app.delete('/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    const categories = router.db.getState().categories;

    const categoryExists = Object.keys(categories).includes(categoryName);

    if (categoryExists) {
      delete categories[categoryName];
      router.db.setState({ categories });
      res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'A categoria não existe' });
    }
  });

  // Rota para atualizar a categoria
  app.put('/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    const categories = router.db.getState().categories;
    const updatedCategories = req.body;
    
    const categoryExists = Object.keys(categories).includes(categoryName);

    if (categoryExists) {
      categories[categoryName] = updatedCategories[categoryName];
      router.db.setState({ categories });
      res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'A categoria não existe' });
    }
  });

  app.use('/api', router); // Defina o roteador do JSON Server

  app.use(express.static(path.join(__dirname, 'dist')));

  app.use(
    '/api', // Defina o caminho base para o proxy
    createProxyMiddleware({
      target: 'http://localhost:3001', // Aponte para o servidor Vite
      changeOrigin: true, // Altere a origem da solicitação para o destino do proxy
      ws: true, // Habilite suporte a WebSocket
      logLevel: 'error',
    })
  );

  app.use(viteApp.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      const template = await viteApp.transformIndexHtml(url, `
        <div id="app"></div>
      `);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (err) {
      viteApp.ssrFixStacktrace(err);
      console.log(err);
      res.status(500).end(err.stack);
    }
  });

  const port = process.env.PORT || 3000; // Use a porta definida no ambiente ou 3000 como padrão

  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });

  const vitePort = process.env.VITE_PORT || 3001; // Use a porta definida no ambiente ou 3001 como padrão

  viteApp.listen(vitePort, () => {
    console.log(`Servidor Vite iniciado na porta ${vitePort}`);
  });
}

startServer();
