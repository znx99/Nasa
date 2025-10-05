<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NASA SpaceApps Challenge Hackathon</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #000;
      color: #fff;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex-direction: column;
    }

    .main-page {
      text-align: center;
      z-index: 999;
      transition: opacity 0.5s ease-out;
    }

    .title {
      font-size: 3em;
      margin-bottom: 20px;
      color: #ff6b81;
      text-shadow: 0 4px 10px rgba(255, 107, 129, 0.8);
    }

    .subtitle {
      font-size: 1.6em;
      margin-bottom: 30px;
      color: #fff;
      font-weight: 400;
    }

    .spline-container {
      position: relative;
      margin-top: 30px;
      z-index: 3;
      display: none; /* Inicialmente escondido */
    }

    /* Dashboard - Visual Moderno */
    .dashboard {
      position: fixed;
      top: 0;
      right: 0;
      width: 45%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4); /* Transparente */
      padding: 30px;
      display: none;
      backdrop-filter: blur(15px); /* Mais desfoque */
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5); /* Sombra forte */
      border-radius: 20px 0 0 20px;
      z-index: 10;
      transition: transform 0.5s ease-in-out;
    }

    .dashboard h2 {
      color: #fff;
      font-size: 2.5em;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 600;
    }

    .dashboard ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }


    .btn {
      background-color: #ff6b81;
      color: white;
      padding: 15px 30px;
      font-size: 1.4em;
      border-radius: 12px;
      cursor: pointer;
      border: none;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .btn:hover {
      background-color: #e2436e;
      transform: scale(1.05); /* Aumenta um pouco ao passar o mouse */
    
    }
  </style>
</head>
<body>

  <!-- Página Principal -->
  <div class="main-page" id="main-page">
    <div class="title">NASA SPACEAPPS CHALLENGE HACKATHON</div>
    <div class="subtitle">biolab research tool</div>
    <button class="btn" onclick="goToResearchTool()">Ir para Ferramenta de Pesquisa</button>
  </div>

  <!-- Visualizador Spline -->
  <div class="spline-container" id="spline-viewer-container">
    <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js"></script>
    <spline-viewer url="https://prod.spline.design/M6HRJs84CtKt79D4/scene.splinecode"></spline-viewer>

  </div>

  <script>
    // Função para ir para a seção de ferramenta de pesquisa
    function goToResearchTool() {
      const mainPage = document.getElementById("main-page");
      mainPage.style.opacity = "0";  // Esconde a página inicial com transição suave
      setTimeout(function() {
        mainPage.style.display = "none"; // Esconde a página completamente
        document.getElementById("spline-viewer-container").style.display = "block";  // Mostra o spline-viewer
      }, 500); // Espera a transição de opacidade terminar antes de esconder a página
    }
  </script>

</body>
</html>
