import { error } from 'console';
import express from 'express';
import mysql from 'mysql2';  // Usando mysql2 com ESM
import OpenAI from 'openai';

//colocar apikey aqui

const app = express();
app.use(express.json());
app.set('trust proxy', true);
const ASSISTANT_ID = 'asst_6mhTRnYZ2mxCtL2PjTbLPaWa';

app.get("/te", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NASA Mission Control Dashboard</title>
<style>
  :root{
    --bg:#787878;
    --panel:#787878;
    --border:#787878;
    --txt:#15141A;
    --muted:#15141A;
    --accent:rgb(88, 88, 88);
    --radius:14px;
  }

  *{ box-sizing:border-box; margin:0; padding:0; }

  html, body{
    height:100%;
  }

  body{
    background: url("https://plus.unsplash.com/premium_photo-1717620946383-b2ced8822ea9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGV4dHVyYSUyMGRhJTIwbHVhfGVufDB8fDB8fHww") center/cover no-repeat fixed;
    color:var(--txt);
    font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    display:grid; place-items:center; min-height:100vh;
    overflow:hidden;
  }

  .vinheta-container{
    position:fixed; inset:0;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:#000; z-index:9999;
    animation:fadeout 1s ease 4s forwards;
  }
  .vinheta-container img{ width:min(700px,70vw); height:auto; object-fit:contain; margin-bottom:40px; }
  .vinheta-container p{ color:#aaa; font-size:1.1rem; }

  @keyframes fadeout{ to{ opacity:0; visibility:hidden; } }

  .box{
    width:min(1100px,92vw);
    height:min(760px,88vh);
    background:var(--panel);
    border:12px solid var(--border);
    border-radius:22px;
    overflow:auto;
    padding:18px;
    box-shadow:0 10px 40px rgba(0,0,0,.35);
    display:none;
  }

  .grid{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-rows:220px 280px auto;
    gap:22px;
    min-height:900px;
  }

  .card{ background:#15141A; border-radius:10px; overflow:hidden; position:relative; }
  .card img{ width:100%; height:100%; object-fit:cover; display:block; }

  .top-1{ grid-column:1; grid-row:1; }
  .top-2{ grid-column:2; grid-row:1; }
  .top-3{ grid-column:3; grid-row:1; }
  .mid-left{ grid-column:1; grid-row:2; }
  .mid-center{ grid-column:2; grid-row:2; }
  .mid-right{ grid-column:3; grid-row:2; }

  .chat{ grid-column:1/4; grid-row:3; background: #141514; border-radius:10px; display:flex; flex-direction:column; }
  .messages{ padding:16px; display:flex; flex-direction:column; gap:10px; height:260px; overflow-y:auto; }
  .msg{ padding:10px 12px; border-radius:12px; color:#ffffff; max-width:75%; position:relative; }
  .msg.you{ background:#4b4b4b; align-self:flex-end; }
  .msg.bot{ background:#696969; align-self:flex-start; }
  
  .thinking-dots {
    display: inline-flex;
    gap: 4px;
  }
  .thinking-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffffff;
    animation: pulse 1.5s infinite ease-in-out;
  }
  .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
  .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .inputbar{ padding:14px; border-top:6px solid var(--border); background:#15141A; display:flex; gap:10px; align-items:center; }
  .inputbar input{ flex:1; padding:14px 16px; border:none; border-radius:10px; background:#71717133; color:#ffffff; outline:none; font-size:16px; }
  .inputbar button{ padding:12px 16px; border:none; border-radius:12px; cursor:pointer; background:#696969; color:#ffffff; font-weight:600; }

  @media (max-width:900px){
    .grid{ grid-template-columns:1fr; grid-template-rows:auto; }
    .top-1,.top-2,.top-3,.mid-left,.mid-center,.mid-right{ grid-column:1; }
  }
</style>
</head>
<body>
  <div class="vinheta-container" id="vinheta">
    <img src="https://raw.githubusercontent.com/znx99/Nasa/main/MOONGIF.gif" alt="Vinheta NASA">
    <p>Carregando missão lunar...</p>
  </div>

  <div class="box" id="dashboard">
    <div class="grid">
      <div class="card top-1"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/1.jpeg" alt=""></div>
      <div class="card top-2"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/2.jpeg" alt=""></div>
      <div class="card top-3"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/3.jpeg" alt=""></div>

      <div class="card mid-left"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/4.jpeg" alt=""></div>
      <div class="card mid-center"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/LUAA.png" alt=""></div>
      <div class="card mid-right"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/5.jpeg" alt=""></div>

      <section class="chat" aria-label="Chat">
        <div id="messages" class="messages">
          <div class="msg bot">Olá! Sou o assistente da NASA. Como posso ajudar você hoje? 🚀</div>
        </div>
        <div class="inputbar">
          <input id="input" type="text" placeholder="digite aqui..." />
          <button id="send">Enviar</button>
        </div>
      </section>
    </div>
  </div>

<script>
  // Configurações da API
  const OPENAI_API_KEY = 'Coloque sua API KEY aqui';
  const ASSISTANT_ID = 'asst_6mhTRnYZ2mxCtL2PjTbLPaWa';

  // Mostrar dashboard após 5s e liberar rolagem no body
  setTimeout(() => {
    document.getElementById('vinheta').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.body.style.overflow = 'auto';
  }, 5000);

  // Elementos do chat
  const input = document.getElementById('input');
  const send = document.getElementById('send');
  const list = document.getElementById('messages');

  // Adicionar mensagem ao chat
  function appendMsg(text, who='you', id=null){
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    
    if (who === 'thinking') {
      div.id = 'thinking-msg';
      div.innerHTML = '<div class="thinking-dots"><span></span><span></span><span></span></div>';
    } else {
      div.textContent = text;
    }
    
    if (id) {
      div.id = id;
    }
    
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
    return div;
  }

  // Remover mensagem específica
  function removeMsg(id) {
    const msg = document.getElementById(id);
    if (msg) {
      msg.remove();
    }
  }

  // Desabilitar/habilitar entrada
  function disableInput(state){ 
    input.disabled = state; 
    send.disabled = state; 
  }

  // Criar thread no OpenAI
  async function createThread() {
    const resp = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({})
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.error?.message || 'Erro criando thread');
    return data.id;
  }

  // Extrair texto do assistente
  function extractAssistantText(messagesData){
    if (!messagesData) return null;
    const arr = messagesData.data || [];
    for (let i = arr.length - 1; i >= 0; i--){
      const m = arr[i];
      if (!m) continue;
      const role = m.role || (m.author?.role);
      if (role === 'assistant' || role === 'system') {
        const c = m.content;
        if (!c) continue;
        if (typeof c === 'string') return c;
        if (Array.isArray(c)) {
          for (const part of c) {
            if (!part) continue;
            if (typeof part === 'string') return part;
            if (part?.text?.value) return part.text.value;
            if (typeof part?.text === 'string') return part.text;
            if (Array.isArray(part?.parts) && part.parts.length) return part.parts.join('\\n');
            if (part?.type === 'output_text' && (part.text || part.parts)) return part.text || (Array.isArray(part.parts) ? part.parts.join('\\n') : String(part.parts));
          }
        } else {
          if (m.content?.[0]?.text?.value) return m.content[0].text.value;
          if (m.content?.[0]?.text) return m.content[0].text;
          if (m.output_text) return m.output_text;
          if (m.text) return m.text;
        }
        try { return JSON.stringify(m.content); } catch { return String(m.content); }
      }
    }
    return null;
  }

  // Chamar assistente e aguardar resposta
  async function callAssistantAndWait(message) {
    const threadId = await createThread();
    
    // Postar mensagem do usuário
    const postResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({ role: 'user', content: message })
    });
    const postData = await postResp.json();
    if (!postResp.ok) throw new Error(postData?.error?.message || 'Erro ao postar mensagem');

    // Iniciar run
    const runResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/runs', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID, stream: false })
    });
    const runData = await runResp.json();
    if (!runResp.ok) throw new Error(runData?.error?.message || 'Erro ao iniciar run');

    const runId = runData.id;
    let runStatus = runData.status || 'in_progress';

    // Polling até completar
    const maxAttempts = 60; 
    let attempts = 0;
    while ((runStatus === 'in_progress' || runStatus === 'queued') && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 800));
      attempts++;
      try {
        const statusResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/runs/' + runId, {
          headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY, 'OpenAI-Beta': 'assistants=v2' }
        });
        const statusData = await statusResp.json();
        if (statusResp.ok) {
          runStatus = statusData.status || runStatus;
          if (runStatus === 'failed') throw new Error('Run falhou: ' + (statusData.last_error?.message || JSON.stringify(statusData)));
        }
      } catch (err) {
        console.warn('Erro no poll do run:', err);
      }
    }

    // Buscar mensagens
    const messagesResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/messages', {
      headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY, 'OpenAI-Beta': 'assistants=v2' }
    });
    const messagesData = await messagesResp.json();
    if (!messagesResp.ok) throw new Error(messagesData?.error?.message || 'Erro ao buscar mensagens');

    const assistantText = extractAssistantText(messagesData);
    if (!assistantText) throw new Error('Nenhuma resposta do assistente encontrada');

    return assistantText;
  }

  // Manipular envio de mensagem
  async function handleSend(){
    const message = input.value.trim();
    if(!message) return;
    
    // Adicionar mensagem do usuário
    appendMsg(message, 'you');
    input.value='';
    disableInput(true);

    // Adicionar indicador de pensando
    appendMsg('', 'thinking', 'thinking-msg');

    try {
      // Obter resposta do assistente
      const reply = await callAssistantAndWait(message);
      
      // Remover mensagem de pensando e adicionar resposta real
      removeMsg('thinking-msg');
      appendMsg(reply, 'bot');
    } catch (err) {
      console.error('Erro:', err);
      // Remover mensagem de pensando e mostrar erro
      removeMsg('thinking-msg');
      appendMsg('Erro: ' + (err.message || 'Sem resposta do assistente'), 'bot');
    } finally {
      disableInput(false);
      input.focus();
    }
  }

  // Event listeners
  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { 
    if(e.key==='Enter'){ 
      e.preventDefault(); 
      handleSend(); 
    }
  });
</script>
</body>
</html>`);
});
// Este código para Express serve a página HTML sem backticks internos que quebrariam o template literal
app.get('/dashboard', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Dashboard + Chat IA</title>
<style>
  :root{
    --bg:#0b0b0c;
    --panel:#111;
    --border:#000;
    --txt:#f5f5f7;
    --muted:#c6c6c7;
    --accent:#25D366;
    --radius:14px;
  }

  *{box-sizing:border-box;}
  body{
    margin:0;
    background:#0b0b0c url("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png") center/cover no-repeat;
    font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    display:grid; place-items:center; min-height:100vh;
  }

  .box{
    width:min(1100px, 92vw);
    height:min(760px, 88vh);
    background:var(--panel);
    border:12px solid var(--border);
    border-radius:22px;
    overflow:auto;
    padding:18px;
    box-shadow:0 10px 40px rgba(0,0,0,.35);
  }

  .grid{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 220px 280px auto;
    gap:22px;
    min-height:900px;
  }

  .card{
    background:#fff;
    border-radius:10px;
    overflow:hidden;
    position:relative;
  }
  .card img{
    width:100%; height:100%; object-fit:cover; display:block;
  }

  .top-1{ grid-column:1; grid-row:1; }
  .top-2{ grid-column:2; grid-row:1; }
  .top-3{ grid-column:3; grid-row:1; }
  .mid-left{ grid-column:1; grid-row:2; }
  .mid-center{ grid-column:2; grid-row:2; }
  .mid-right{ grid-column:3; grid-row:2; }

  /* CHAT ESTILO WHATSAPP */
  .chat{
    grid-column:1 / 4; grid-row:3;
    background:var(--panel); border-radius:10px; display:flex; flex-direction:column;
  }

  .chat-card { background: #fff; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); display:flex; flex-direction:column; overflow:hidden; height:100%; }
  .chat-header{ display:flex; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid #eee; background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95)); }
  .avatar{ width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#34b7f1,#128C7E); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
  .header-info{ display:flex; flex-direction:column; }
  .header-title{ font-weight:600; }
  .header-sub{ font-size:12px; color:#6b6b6b; }

  .messages{ padding:16px; overflow-y:auto; background-image: linear-gradient(transparent 0, rgba(0,0,0,0.01) 1px); background-size: 100% 24px; flex:1; }
  .messages-list{ display:flex; flex-direction:column; gap:12px; max-width:100%; }
  .msg-row{ display:flex; gap:8px; align-items:flex-end; }
  .msg-row.me{ justify-content:flex-end; }
  .msg-row.bot{ justify-content:flex-start; }
  .bubble{ max-width:76%; padding:10px 12px; border-radius:14px; box-shadow:0 4px 10px rgba(0,0,0,0.04); position:relative; font-size:14px; line-height:1.35; word-wrap:break-word; white-space:pre-wrap; }
  .bubble.me{ background:#daf8cb; border-bottom-right-radius:6px; }
  .bubble.bot{ background:#ffffff; border-bottom-left-radius:6px; }
  .meta{ font-size:11px; color:#6b6b6b; margin-top:6px; display:flex; gap:8px; align-items:center; justify-content:flex-end; }

  .thinking{ display:inline-flex; align-items:center; gap:8px; font-size:13px; color:#444; opacity:0.95; }
  .dots span{ display:inline-block; width:6px; height:6px; background:#bbb; border-radius:50%; margin:0 1px; opacity:0.9; animation:blink 1s infinite; }
  .dots span:nth-child(2){ animation-delay:.15s; }
  .dots span:nth-child(3){ animation-delay:.3s; }
  @keyframes blink{ 0%{opacity:0.25} 50%{opacity:1} 100%{opacity:0.25} }

  .composer{ padding:12px; border-top:1px solid #eee; background:#fafafa; }
  .composer-row{ display:flex; align-items:center; gap:10px; }
  .input-wrap{ flex:1; display:flex; align-items:center; gap:8px; background:#f7f7f7; padding:8px 10px; border-radius:28px; border:1px solid #ececec; }
  .input-wrap input{ flex:1; border:0; background:transparent; outline:none; padding:8px 6px; font-size:15px; }
  .btn-send{ display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#25D366,#1aa860); color:white; border:none; padding:8px 12px; border-radius:20px; cursor:pointer; font-weight:600; box-shadow:0 6px 18px rgba(37,211,102,0.18); }

  @media (max-width:900px){
    .grid{ grid-template-columns:1fr; grid-template-rows:auto; }
    .top-1,.top-2,.top-3,.mid-left,.mid-center,.mid-right{ grid-column:1 }
  }
</style>
</head>
<body>
  <div class="box">
    <div class="grid">
      <div class="card top-1"><img src="https://picsum.photos/800/600?random=1" alt=""></div>
      <div class="card top-2"><img src="https://picsum.photos/800/600?random=2" alt=""></div>
      <div class="card top-3"><img src="https://picsum.photos/800/600?random=3" alt=""></div>

      <div class="card mid-left"><img src="https://picsum.photos/400/800?random=4" alt=""></div>
      <div class="card mid-center"><img src="https://picsum.photos/1200/800?random=5" alt=""></div>
      <div class="card mid-right"><img src="https://picsum.photos/400/800?random=6" alt=""></div>

      <!-- CHAT COMPLETO -->
      <section class="chat" aria-label="Chat">
        <div class="chat-card">
          <div class="chat-header">
            <div class="avatar">B</div>
            <div class="header-info">
              <div class="header-title">Bot Assistente</div>
              <div class="header-sub">Online • Responde com IA</div>
            </div>
          </div>

          <div class="messages" id="messages">
            <div class="messages-list" id="messagesList"></div>
          </div>

          <div class="composer">
            <div class="composer-row">
              <div class="input-wrap">
                <input id="message" type="text" placeholder="Digite uma mensagem..." />
              </div>
              <button id="sendBtn" class="btn-send">Enviar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

<script>
  const OPENAI_API_KEY = 'Coloque sua API KEY aqui';
  const ASSISTANT_ID = 'asst_6mhTRnYZ2mxCtL2PjTbLPaWa';

  const messagesList = document.getElementById('messagesList');
  const messagesContainer = document.getElementById('messages');
  const input = document.getElementById('message');
  const sendBtn = document.getElementById('sendBtn');

  function scrollToBottom(){ messagesContainer.scrollTop = messagesContainer.scrollHeight; }
  function timeNow(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }

  function createMessage({text, who='bot', status=null}){
    const row = document.createElement('div');
    row.className = 'msg-row ' + who;
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + who;
    if(status==='thinking'){
      bubble.innerHTML = '<span class="thinking"><span class="dots"><span></span><span></span><span></span></span> Pensando...</span>';
    } else {
      bubble.textContent = text;
    }
    const meta = document.createElement('div');
    meta.className = 'meta';
    const time = document.createElement('span');
    time.textContent = timeNow();
    meta.appendChild(time);
    bubble.appendChild(meta);
    row.appendChild(bubble);
    return {row, bubble};
  }

  function pushMessage(opts){
    const {row, bubble} = createMessage(opts);
    messagesList.appendChild(row);
    scrollToBottom();
    return {row,bubble};
  }

  function updateBubble(bubble,text){
    bubble.innerHTML = text;
    const meta = document.createElement('div');
    meta.className = 'meta';
    const time = document.createElement('span');
    time.textContent = timeNow();
    meta.appendChild(time);
    bubble.appendChild(meta);
    scrollToBottom();
  }

  async function createThread(){
    const r = await fetch('https://api.openai.com/v1/threads',{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+OPENAI_API_KEY,
        'Content-Type':'application/json',
        'OpenAI-Beta':'assistants=v2'
      },
      body:JSON.stringify({})
    });
    const j = await r.json();
    return j.id || j.thread?.id;
  }

  async function callAssistant(message){
    const thread = await createThread();
    await fetch(\`https://api.openai.com/v1/threads/\${thread}/messages\`,{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+OPENAI_API_KEY,
        'Content-Type':'application/json',
        'OpenAI-Beta':'assistants=v2'
      },
      body:JSON.stringify({role:'user',content:message})
    });
    const runResp = await fetch(\`https://api.openai.com/v1/threads/\${thread}/runs\`,{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+OPENAI_API_KEY,
        'Content-Type':'application/json',
        'OpenAI-Beta':'assistants=v2'
      },
      body:JSON.stringify({assistant_id:ASSISTANT_ID})
    });
    const runData = await runResp.json();
    let status = runData.status;
    let runId = runData.id;
    while(status==='in_progress'||status==='queued'){
      await new Promise(r=>setTimeout(r,1000));
      const s = await fetch(\`https://api.openai.com/v1/threads/\${thread}/runs/\${runId}\`,{
        headers:{'Authorization':'Bearer '+OPENAI_API_KEY,'OpenAI-Beta':'assistants=v2'}
      });
      const j=await s.json();
      status=j.status;
    }
    const msgs=await fetch(\`https://api.openai.com/v1/threads/\${thread}/messages\`,{
      headers:{'Authorization':'Bearer '+OPENAI_API_KEY,'OpenAI-Beta':'assistants=v2'}
    });
    const data=await msgs.json();
    const last=data.data?.find(m=>m.role==='assistant');
    const txt=last?.content?.[0]?.text?.value||'Sem resposta.';
    return txt;
  }

  async function sendMessage(){
    const message=input.value.trim();
    if(!message)return;
    pushMessage({text:message,who:'me'});
    input.value='';
    const {bubble}=pushMessage({who:'bot',status:'thinking'});
    try{
      const reply=await callAssistant(message);
      updateBubble(bubble,reply);
    }catch(e){
      updateBubble(bubble,'Erro: '+e.message);
      bubble.style.background='#ffe6e6'; bubble.style.color='#7f1d1d';
    }
  }

  sendBtn.addEventListener('click',sendMessage);
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){ e.preventDefault(); sendMessage(); }
  });

  pushMessage({text:'Olá! Sou seu assistente de IA. Como posso ajudar hoje? 🤖',who:'bot'});
</script>
</body>
</html>`);
});
app.get('/te2', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Dashboard NASA - Missão Lunar</title>
<style>
  :root{
    --bg:#722121;
    --panel:#722121;
    --border:#722121;
    --txt:#f5f5f7;
    --muted:#e8a3a3;
    --accent:rgb(143, 41, 41);
    --radius:14px;
  }

  *{ box-sizing:border-box; margin:0; padding:0; }

  body{
    background: url("https://media.istockphoto.com/id/488156684/pt/foto/planeta-alien%C3%ADgena-com-crateras-4.jpg?s=612x612&w=0&k=20&c=x35CV4QHU7YnD09K8p_fvi2v096l4w0rA-i95r8my60=") center/cover no-repeat fixed;
    color:var(--txt);
    font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    display:grid; place-items:center; min-height:100vh;
    overflow:hidden;
  }

  /* ===== Vinheta ===== */
  .vinheta-container{
    position:fixed; inset:0;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:#000; z-index:9999;
    animation:fadeout 1s ease 4s forwards;
  }
  .vinheta-container img{ width:min(700px,70vw); height:auto; object-fit:contain; margin-bottom:40px; }
  .vinheta-container p{ color:#cacaca; font-size:1.1rem; }
  @keyframes fadeout{ to{ opacity:0; visibility:hidden; } }

  /* ===== BOX central ===== */
  .box{
    width:min(1100px,92vw);
    height:min(760px,88vh);
    background:var(--panel);
    border:12px solid var(--border);
    border-radius:22px;
    overflow:auto;
    padding:18px;
    box-shadow:0 10px 40px rgba(0,0,0,.35);
    display:none;
  }

  /* ===== GRID principal ===== */
  .grid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    gap:22px;
  }

  /* Cards */
  .card{
    background:#1e1516;
    border-radius:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  .card img{
    width:100%;
    height:100%;
    object-fit:contain;
    display:block;
    transition: transform 0.5s ease;
  }
  .card:hover img {
    transform: scale(1.05);
  }

  /* Spans e alturas */
  .span-3{ grid-column: span 3; }
  .span-2{ grid-column: span 2; }
  .h220{ height:220px; }
  .h280{ height:280px; }

  /* Chat */
  .chat{
    grid-column:1 / -1;
    background:#6e0404;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    overflow: hidden;
  }
  .chat-header {
    padding: 14px 16px;
    background: #360101;
    border-bottom: 6px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat-header h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  .chat-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4CAF50;
    animation: pulse 1.5s infinite;
  }
  .messages{ 
    padding:16px; 
    display:flex; 
    flex-direction:column; 
    gap:10px; 
    height:260px; 
    overflow-y:auto;
    flex: 1;
  }
  .msg{ 
    padding:10px 12px; 
    border-radius:12px; 
    color:#fff; 
    max-width:75%; 
    position: relative;
    animation: fadeIn 0.3s ease;
  }
  .msg.you{ 
    background:#1c0101; 
    align-self:flex-end; 
    border-bottom-right-radius: 4px;
  }
  .msg.bot{ 
    background:#510303; 
    align-self:flex-start; 
    border-bottom-left-radius: 4px;
  }
  .msg-time {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 5px;
    text-align: right;
  }
  .inputbar{ 
    padding:14px; 
    border-top:6px solid var(--border); 
    background:#360101; 
    display:flex; 
    gap:10px; 
    align-items:center; 
  }
  .inputbar input{ 
    flex:1; 
    padding:14px 16px; 
    border:none; 
    border-radius:10px; 
    background:#71717133; 
    color:#fff; 
    outline:none; 
    font-size:16px; 
    transition: background 0.3s ease;
  }
  .inputbar input:focus {
    background: #71717166;
  }
  .inputbar button{ 
    padding:12px 16px; 
    border:none; 
    border-radius:12px; 
    cursor:pointer; 
    background:#a92121; 
    color:#fff; 
    font-weight:600; 
    transition: background 0.3s ease;
  }
  .inputbar button:hover {
    background: #c02929;
  }

  /* Animações */
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width:900px){
    .grid{ grid-template-columns:1fr; }
  }
</style>
</head>
<body>

  <!-- Vinheta -->
  <div class="vinheta-container" id="vinheta">
    <img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARSGIF.gif" alt="Vinheta NASA">
    <p>Carregando missão lunar...</p>
  </div>

  <!-- Dashboard -->
  <div class="box" id="dashboard">
    <div class="grid">
      <!-- Linha 1 -->
      <div class="card span-3 h220"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (1).jpeg" alt="Imagem de Marte 1"></div>
      <div class="card span-3 h220"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (3).jpeg" alt="Imagem de Marte 2"></div>

      <!-- Linha 2 -->
      <div class="card span-3 h280"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (4).jpeg" alt="Imagem de Marte 3"></div>
      <div class="card span-3 h280"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (5).jpeg" alt="Imagem de Marte 4"></div>

      <!-- Linha 3 -->
      <div class="card span-2 h220"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (2).jpeg" alt="Imagem de Marte 5"></div>
      <div class="card span-2 h220"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/marspreview-removebg-preview.png" alt="Preview de Marte"></div>
      <div class="card span-2 h220"><img src="https://raw.githubusercontent.com/znx99/Nasa/main/MARTEFOTO (6).jpeg" alt="Imagem de Marte 6"></div>

      <!-- Chat -->
      <section class="chat" aria-label="Chat">
        <div class="chat-header">
          <h3>Chat da Missão Lunar</h3>
          <div class="chat-status">
            <div class="status-dot"></div>
            <span>Conectado</span>
          </div>
        </div>
        <div id="messages" class="messages">
          <div class="msg bot">
            Olá! Bem-vindo ao chat da missão lunar da NASA. Como posso ajudá-lo hoje?
            <div class="msg-time">10:30 AM</div>
          </div>
        </div>
        <div class="inputbar">
          <input id="input" type="text" placeholder="Digite sua mensagem..." />
          <button id="send">Enviar</button>
        </div>
      </section>
    </div>
  </div>

<script>
  // Mostrar dashboard após 5s
  setTimeout(() => {
    document.getElementById('vinheta').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.body.style.overflow = 'auto';
  }, 5000);

  // Chat melhorado
  const input = document.getElementById('input');
  const send  = document.getElementById('send');
  const list  = document.getElementById('messages');

  function getCurrentTime() {
    const now = new Date();
    return \`\${now.getHours().toString().padStart(2, '0')}:\${now.getMinutes().toString().padStart(2, '0')}\`;
  }

  function appendMsg(text, who='you'){
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'msg-time';
    timeDiv.textContent = getCurrentTime();
    
    div.textContent = text;
    div.appendChild(timeDiv);
    
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
  }

  function generateBotResponse(userMessage) {
    const responses = [
      "Interessante! Vou registrar essa informação no sistema.",
      "Obrigado pelo feedback. A equipe será notificada.",
      "Estamos analisando os dados coletados. Sua contribuição é valiosa!",
      "Posso ajudar com informações sobre a missão lunar. O que você gostaria de saber?",
      "Estamos monitorando as condições lunares constantemente.",
      "Os dados da última transmissão indicam condições estáveis.",
      "A equipe de engenharia está trabalhando nas próximas fases da missão.",
      "Vou encaminhar sua mensagem para o controle da missão."
    ];
    
    // Resposta específica para algumas palavras-chave
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("lua") || lowerMessage.includes("lunar")) {
      return "A missão lunar está progredindo conforme o planejado. Os astronautas estão coletando amostras importantes.";
    } else if (lowerMessage.includes("marte")) {
      return "Embora nosso foco atual seja a Lua, temos planos para futuras missões a Marte.";
    } else if (lowerMessage.includes("nasa")) {
      return "A NASA está comprometida com a exploração espacial e descobertas científicas.";
    } else if (lowerMessage.includes("foto") || lowerMessage.includes("imagem")) {
      return "As imagens que você vê são capturadas pelos nossos rovers e satélites. Impressionante, não é?";
    }
    
    // Resposta aleatória
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function handleSend(){
    const v = input.value.trim();
    if(!v) return;
    
    appendMsg(v, 'you');
    input.value='';
    
    // Simular tempo de resposta do bot
    setTimeout(() => {
      const response = generateBotResponse(v);
      appendMsg(response, 'bot');
    }, 1000 + Math.random() * 2000);
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { 
    if(e.key==='Enter'){ 
      e.preventDefault(); 
      handleSend(); 
    }
  });
</script>
</body>
</html>
  `);
});
app.get('/teste', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Chat estilo WhatsApp</title>
<style>
  /* (mesmo CSS do seu template — mantenha o original) */
  :root{ --bg:#e5ddd5; --card:#ffffff; --me:#daf8cb; --bot:#ffffff; --muted:#6b6b6b; --accent:#25D366; --shadow: 0 6px 20px rgba(0,0,0,0.08); --radius: 18px; }
  html,body{height:100%;margin:0;padding:0;font-family:Inter, "Segoe UI", Roboto, Arial, sans-serif;background:linear-gradient(180deg,var(--bg),#f7f7f7);}
  .app { max-width: 940px; height: 88vh; margin: 3vh auto; display: grid; grid-template-rows: 1fr auto; gap: 14px; padding: 18px; }
  .chat-card { background: var(--card); border-radius: 16px; box-shadow: var(--shadow); display:flex; flex-direction:column; overflow:hidden; height:100%; }
  .chat-header{ display:flex; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid #eee; background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95)); }
  .avatar{ width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#34b7f1,#128C7E); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
  .header-info{ display:flex; flex-direction:column; }
  .header-title{ font-weight:600; }
  .header-sub{ font-size:12px; color:var(--muted); }
  .messages{ padding:16px; overflow-y:auto; background-image: linear-gradient(transparent 0, rgba(0,0,0,0.01) 1px); background-size: 100% 24px; flex:1; }
  .messages-list{ display:flex; flex-direction:column; gap:12px; max-width:100%; }
  .msg-row{ display:flex; gap:8px; align-items:flex-end; }
  .msg-row.me{ justify-content:flex-end; }
  .msg-row.bot{ justify-content:flex-start; }
  .bubble{ max-width:76%; padding:10px 12px; border-radius:14px; box-shadow:0 4px 10px rgba(0,0,0,0.04); position:relative; font-size:14px; line-height:1.35; word-wrap:break-word; white-space:pre-wrap; }
  .bubble.me{ background:var(--me); border-bottom-right-radius:6px; border-bottom-left-radius:14px; border-top-right-radius:14px; text-align:left; }
  .bubble.bot{ background:var(--bot); border-bottom-left-radius:6px; border-bottom-right-radius:14px; border-top-left-radius:14px; text-align:left; }
  .meta{ font-size:11px; color:var(--muted); margin-top:6px; display:flex; gap:8px; align-items:center; justify-content:flex-end; }
  .thinking{ display:inline-flex; align-items:center; gap:8px; font-size:13px; color:#444; opacity:0.95; }
  .dots{ display:inline-block; }
  .dots span{ display:inline-block; width:6px; height:6px; background:#bbb; border-radius:50%; margin:0 1px; opacity:0.9; animation:blink 1s infinite; }
  .dots span:nth-child(2){ animation-delay:.15s; }
  .dots span:nth-child(3){ animation-delay:.3s; }
  @keyframes blink{ 0%{opacity:0.25} 50%{opacity:1} 100%{opacity:0.25} }
  .composer{ padding:12px; border-top:1px solid #eee; background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.99)); }
  .composer-row{ display:flex; align-items:center; gap:10px; max-width:100%; }
  .input-wrap{ flex:1; display:flex; align-items:center; gap:8px; background:#f7f7f7; padding:8px 10px; border-radius:28px; border:1px solid #ececec; }
  .input-wrap input{ flex:1; border:0; background:transparent; outline:none; padding:8px 6px; font-size:15px; }
  .btn-send{ display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#25D366,#1aa860); color:white; border:none; padding:8px 12px; border-radius:20px; cursor:pointer; font-weight:600; box-shadow:0 6px 18px rgba(37,211,102,0.18); }
  @media (max-width:520px){ .app{ padding:10px; height:94vh } .messages{ padding:12px } .bubble{ font-size:15px } }
</style>
</head>
<body>
  <div class="app">
    <div class="chat-card" role="region" aria-label="Chat">
      <div class="chat-header">
        <div class="avatar">B</div>
        <div class="header-info">
          <div class="header-title">Bot Assistente</div>
          <div class="header-sub">Online • Responde com IA</div>
        </div>
      </div>

      <div class="messages" id="messages" aria-live="polite">
        <div class="messages-list" id="messagesList"></div>
      </div>

      <div class="composer">
        <div class="composer-row">
          <div class="input-wrap" role="search">
            <input id="message" type="text" placeholder="Digite uma mensagem" aria-label="Mensagem" autocomplete="off" />
          </div>
          <button id="sendBtn" class="btn-send" onclick="sendMessage()" aria-label="Enviar mensagem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11.5L21 3L14.5 21L11.5 14.5L3 11.5Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

<script>
  // ********** Uso apenas para testes locais! **********
  const OPENAI_API_KEY = 'Coloque sua API KEY aqui';
  const ASSISTANT_ID = 'asst_6mhTRnYZ2mxCtL2PjTbLPaWa';

  const messagesList = document.getElementById('messagesList');
  const messagesContainer = document.getElementById('messages');
  const input = document.getElementById('message');
  const sendBtn = document.getElementById('sendBtn');

  function scrollToBottom(){ messagesContainer.scrollTop = messagesContainer.scrollHeight; }
  function timeNow(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }

  function createMessage(opts){
    const text = opts.text;
    const who = opts.who || 'bot';
    const status = opts.status || null;
    const row = document.createElement('div');
    row.className = 'msg-row ' + (who === 'me' ? 'me' : 'bot');
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (who === 'me' ? 'me' : 'bot');

    if (status === 'thinking') {
      const span = document.createElement('span');
      span.className = 'thinking';
      span.innerHTML = '<span class="dots"><span></span><span></span><span></span></span> Pensando...';
      bubble.appendChild(span);
    } else {
      bubble.appendChild(document.createTextNode(text || ''));
    }

    const meta = document.createElement('div'); meta.className = 'meta';
    const time = document.createElement('span'); time.textContent = timeNow(); meta.appendChild(time);
    if (who === 'me') {
      const tick = document.createElement('span'); tick.className = 'tick';
      tick.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L5 17L11 11" stroke="#2e7d32" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13L13 17L23 7" stroke="#2e7d32" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      meta.appendChild(tick);
    }
    bubble.appendChild(meta); row.appendChild(bubble);
    return {row, bubble};
  }

  function pushMessage(obj){ const res = createMessage(obj); messagesList.appendChild(res.row); scrollToBottom(); return res; }

  function updateBubble(bubble, text){
    bubble.innerHTML = ''; bubble.appendChild(document.createTextNode(text || ''));
    const meta = document.createElement('div'); meta.className = 'meta';
    const time = document.createElement('span'); time.textContent = timeNow(); meta.appendChild(time);
    bubble.appendChild(meta); scrollToBottom();
  }

  // ----- novo: cria uma THREAD nova a cada requisição e espera a resposta -----
  async function createThread() {
    const resp = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({}) // corpo vazio normalmente ok
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.error?.message || 'Erro criando thread');
    return data.id || data.thread?.id || data.body?.id || (data?.id);
  }

  function extractAssistantText(messagesData){
    if (!messagesData) return null;
    const arr = messagesData.data || [];
    for (let i = arr.length - 1; i >= 0; i--){
      const m = arr[i]; if (!m) continue;
      const role = m.role || (m.author?.role);
      if (role === 'assistant' || role === 'system') {
        const c = m.content;
        if (!c) continue;
        if (typeof c === 'string') return c;
        if (Array.isArray(c)) {
          for (const part of c) {
            if (!part) continue;
            if (typeof part === 'string') return part;
            if (part?.text?.value) return part.text.value;
            if (typeof part?.text === 'string') return part.text;
            if (Array.isArray(part?.parts) && part.parts.length) return part.parts.join('\\n');
            if (part?.type === 'output_text' && (part.text || part.parts)) return part.text || (Array.isArray(part.parts) ? part.parts.join('\\n') : String(part.parts));
          }
        } else {
          if (m.content?.[0]?.text?.value) return m.content[0].text.value;
          if (m.content?.[0]?.text) return m.content[0].text;
          if (m.output_text) return m.output_text;
          if (m.text) return m.text;
        }
        try { return JSON.stringify(m.content); } catch { return String(m.content); }
      }
    }
    return null;
  }

  // Faz uma única requisição completa: cria thread -> posta mensagem -> run -> poll -> pega resposta
  async function callAssistantAndWait(message) {
    // 1) cria thread nova (por isso 'não importa qual threadid será')
    const threadId = await createThread();
    console.log(threadId);
    // 2) posta a mensagem do usuário
    const postResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({ role: 'user', content: message })
    });
    const postData = await postResp.json();
    if (!postResp.ok) throw new Error(postData?.error?.message || 'Erro ao postar mensagem');

    // 3) inicia o run com o assistant escolhido
    const runResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/runs', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID, stream: false })
    });
    const runData = await runResp.json();
    if (!runResp.ok) throw new Error(runData?.error?.message || 'Erro ao iniciar run');

    const runId = runData.id || runData.body?.id;
    let runStatus = runData.status || runData?.state || 'in_progress';

    // 4) poll até completar (com limite de tentativas)
    const maxAttempts = 60; let attempts = 0;
    while ((runStatus === 'in_progress' || runStatus === 'queued') && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 800));
      attempts++;
      try {
        const statusResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/runs/' + runId, {
          headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY, 'OpenAI-Beta': 'assistants=v2' }
        });
        const statusData = await statusResp.json();
        if (statusResp.ok) {
          runStatus = statusData.status || statusData.state || runStatus;
          if (runStatus === 'failed') throw new Error('Run falhou: ' + (statusData.last_error?.message || JSON.stringify(statusData)));
        }
      } catch (err) {
        console.warn('Erro no poll do run:', err);
      }
    }

    // 5) buscar mensagens e extrair resposta do assistant
    const messagesResp = await fetch('https://api.openai.com/v1/threads/' + threadId + '/messages', {
      headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY, 'OpenAI-Beta': 'assistants=v2' }
    });
    const messagesData = await messagesResp.json();
    if (!messagesResp.ok) throw new Error(messagesData?.error?.message || 'Erro ao buscar mensagens');

    const assistantText = extractAssistantText(messagesData);
    if (!assistantText) throw new Error('Nenhuma resposta do assistente encontrada');

    return assistantText;
  }

  // UI + integração
  function disableInput(state){ input.disabled = state; sendBtn.disabled = state; }

  async function sendMessage(){
    const message = input.value.trim(); if (!message) return;
    pushMessage({text: message, who: 'me'});
    input.value = ''; disableInput(true);
    const {row, bubble} = pushMessage({text:'', who: 'bot', status: 'thinking'});

    try {
      const reply = await callAssistantAndWait(message);
      updateBubble(bubble, reply);
    } catch (err) {
      console.error('Erro na interação com assistente:', err);
      updateBubble(bubble, 'Erro ao enviar: ' + (err.message || 'Sem resposta'));
      bubble.style.background = '#ffe6e6';
      bubble.style.color = '#7f1d1d';
    } finally {
      disableInput(false);
      input.focus();
    }
  }

  input.addEventListener('keydown', function(e){ if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

  (function welcome(){
    const res = pushMessage({text:'Olá! Eu sou o assistente de IA. Como posso ajudar você hoje? 😊', who: 'bot'});
    res.bubble.style.opacity = 0; setTimeout(()=> res.bubble.style.opacity = 1, 120);
  })();
</script>
</body>
</html>`);
});

app.get("/ip", (req, res) =>{
  fetch("https://api64.ipify.org?format=json")
  .then(r => r.json())
  .then(data => console.log("Seu IP público é:", data.ip));

})

app.use((req, res) => {
  res.send("Middleware global"); // captura todas as rotas
});
// Iniciando o servidor na porta 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});