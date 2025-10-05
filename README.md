# Build a Space Biology Knowledge Engine  
**Project developed by the team CTRL + Farroups for the NASA Space Apps Challenge**

---

## About the project

**NASA** is an interactive platform developed during the **NASA Space Apps Challenge**, with the goal of organizing and enabling the exploration of scientific data related to the **possibility of life in the universe**.

The site functions as a **database and research tool**, offering information on planets, satellites, habitable environments, and other space biology related facts that relate to Earth. These are sourced from reliable references and data provided by NASA itself. It is worth noting that this data focuses primarily on Earth, Mars, and the Moon.

The project aims to make scientific knowledge more accessible and visual, contributing to science communication and fostering interest in space and biology.

---

## Features

- **Search for space-biology data**  
  With the help of chatbots and dashboards featuring information related to Earth, Mars, and the Moon, users can gather information more efficiently and reliably than with a simple language model query or Google search.

- **Display of Earth, Moon, and Mars profiles**  
  Detailed information such as composition, distance, atmospheric conditions, and presence of water.

- **Habitability analysis**  
  Scientific criteria applied to the provided data to assess possibilities for life.

- **Interactive interface**  
  A simple and accessible layout focused on usability and clarity.

- **Integration with external sources**  
  Real data from official databases and APIs, presented in a user-friendly format.

---

## Developed by

This project was created by the **CTRL + Farroups** team during the **NASA Space Apps Challenge 2025**. Team members:

- Ana Laura S. Trindade  
- Eduardo A. Hermann  
- Guilherme B. Zanella  
- Manuela K. Mayer  
- Manuela L. Spinelli  

---

## Tools Used

- **Frontend:** HTML, CSS, JavaScript, Lovable, Spline  
- **Backend:** Vanilla JavaScript  
- **Database:** Official NASA data  
- **External APIs:** Vercel, OpenAI  
- **Hosting and version control:** Vercel, Git + GitHub ([znx99](https://github.com/znx99))

---

Here's the English translation of your technical explanation:

---

## Technical Explanation:

To implement the application, we used Selenium in JavaScript to automate searches on NASA's websites and extract text from 608 research papers (≈40,000 lines). We prioritized the abstracts and, when those were missing, we captured the full text. We consolidated this text into a `.txt` file, which was used to fine-tune an OpenAI assistant, including prompts that restrict answers to the available content and add basic space science knowledge.
The interface is an HTML page with an interactive dashboard ; when a planet is clicked, a panel opens (hosted on Vercel) displaying basic information and a chat. The chat runs client-side due to the request timeout limit on the platform (requests are cancelled after ~10s). The UI logic and panel replication for the other planets were implemented to maintain consistency; currently, each interaction starts a new thread instead of retrieving history via Thread ID.

---

Let me know if you'd like help refining this for documentation, a pitch, or another purpose.


---
---
---

# Construa uma ferramenta de busca de conhecimentos relacionados a biologia espacial
**Projeto desenvolvido para o NASA Space Apps Challenge pela equipe CTRL + Farroups**

---

## Sobre o Projeto

**NASA** é uma plataforma interativa desenvolvida durante o **NASA Space Apps Challenge**, com o objetivo de organizar e permitir a exploração de dados científicos relacionados à **possibilidade de vida no universo**.

O site funciona como um **banco de dados e ferramenta de pesquisa**, oferecendo informações sobre planetas, satélites, ambientes habitáveis, e outros elementos biológico-espaciais próximos à Terra a partir de fontes confiáveis e dados disponibilizados pela própria NASA, vale ressaltar que estes dados apresentam um enfoque grande na Terra, em Marte e na Lua.

O projeto busca tornar o conhecimento científico mais acessível e visual, contribuindo com a divulgação científica e o interesse pelo espaço.

---

## Funcionalidades

- **Busca por dados astrobiológicos**  
 Com o auxílio de Chatbots e dashboards de informações relacionados à Terra, a Marte e a Lua, o usuário é capaz de coletar informações de forma mais eficiente e confiável do que com uma simples pergunta a um modelo de linguagem ou uma pesquisa no google.

- **Exibição de perfis da Terra, da Lua e de Marte**  
  Informações detalhadas como composição, distância, condições atmosféricas e presença de água.

- **Análise de habitabilidade**  
  Critérios científicos aplicados a partir dos dados fornecidos para avaliar possibilidades de vida.

- **Interface interativa**  
  Layout simples e acessível, focado em usabilidade e clareza.

- **Integração com fontes externas**  
  Dados reais provenientes de bancos e APIs oficiais, apresentados de forma compreensível.

---

## Desenvolvido por

Este projeto foi criado pela equipe **CTRL + Farroups** durante o **NASA Space Apps Challenge 2025**, os integrantes são:

- Ana Laura S. Trindade  
- Eduardo A. Hermann  
- Guilherme B. Zanella  
- Manuela K. Mayer  
- Manuela L. Spinelli  

---

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript, Lovable, Spline  
- **Backend:** JavaScript (puro)  
- **Banco de Dados:** Dados oficiais da NASA  
- **APIs externas:** Vercel, OpenAI  
- **Hospedagem e versionamento:** Vercel, Git + GitHub ([znx99](https://github.com/znx99))

---
## Explicação Tecnica:

Para implementar a aplicação usamos Selenium em JavaScript para automatizar buscas nos sites da nasa e extrair textos de 608 pesquisas (≈40.000 linhas), priorizamos os abstracts e, quando ausentes, capturamos o texto completo. Consolidamos esses textos em um arquivo .txt que serviu para ajustar um assistente da OpenAI, incluindo prompts que limitam respostas fora do conteúdo disponível e adicionam conhecimentos básicos de ciência espacial. A interface é uma página HTML com um dashboard interativo (planetas que seguem o mouse); ao clicar em um planeta abre-se um painel hospedado no Vercel que exibe informações básicas e um chat. O chat roda no client-side devido ao limite de tempo das requisições na plataforma (cancelamento após ~10s), e a lógica da UI e replicação dos painéis para os demais planetas foi implementada para manter consistência; atualmente cada interação inicia uma nova thread em vez de recuperar histórico por Thread ID.

