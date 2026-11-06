Sistema Full Stack para gerenciamento financeiro pessoal desenvolvido com Python, FastAPI, MySQL e JavaScript.
O Finance Tracker permite controlar receitas, despesas e categorias financeiras através de uma interface moderna, dashboard interativo, estatísticas em tempo real e gráficos financeiros. O projeto foi desenvolvido seguindo uma arquitetura Full Stack utilizando API REST, banco de dados em nuvem e deploy em produção.

🚀 Demonstração
Frontend
https://SEU-FRONTEND.vercel.app
Backend
https://SEU-BACKEND.onrender.com
Swagger
https://SEU-BACKEND.onrender.com/docs

✨ Funcionalidades
Usuários
Criar usuário
Listar usuários
Buscar usuário por ID
Atualizar usuário
Excluir usuário

Categorias
Criar categorias
Listar categorias
Excluir categorias
Categorias de receita
Categorias de despesa
Receitas

Criar receitas
Listar receitas
Excluir receitas
Despesas
Criar despesas
Listar despesas
Excluir despesas

Dashboard
Saldo atual
Total de receitas
Total de despesas
Quantidade de movimentações
Filtro por usuário
Filtro por período

Estatísticas
Receitas por categoria
Despesas por categoria
Ranking de receitas
Ranking de despesas

Gráficos
Pizza de receitas por categoria
Pizza de despesas por categoria
Comparativo Receitas × Despesas
Evolução do saldo acumulado

UX
Toasts de sucesso e erro
Confirmação antes de excluir
Interface responsiva
Tema escuro

🏗 Arquitetura
Frontend (Vercel) ↓
 Backend FastAPI (Render) ↓
 Banco MySQL (Aiven)

🛠 Tecnologias Utilizadas
Backend
Python
FastAPI
SQLAlchemy
MySQL
PyMySQL
Pydantic
Uvicorn

Frontend
HTML5
CSS3
JavaScript Vanilla
Fetch API
Chart.js

Banco de Dados
MySQL
Aiven

Deploy
Render
Vercel

Testes
Pytest

📂 Estrutura do Projeto
Plain Text
Finance-Tracker/
│
├── backend/
│ ├── app/
│ │ ├── core/
│ │ ├── database/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ ├── services/
│ │ └── main.py
│ │
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ ├── index.html
│ ├── dashboard.html
│ ├── categorias.html
│ ├── receitas.html
│ ├── despesas.html
│ │
│ ├── css/
│ │ └── style.css
│ │
│ └── js/
│ ├── api.js
│ ├── ui.js
│ ├── categorias.js
│ ├── receitas.js
│ ├── despesas.js
│ ├── dashboard.js
│ └── graficos.js
│
├── README.md
└── .gitignore
⚙️ Executando Localmente

Clonar o Repositório
Shell
git clone URL_DO_REPOSITORIO
Shell
cd Finance-Tracker

Criar Ambiente Virtual
Shell
python -m venv .venv
Windows
Shell
.venv\Scripts\activate
Linux/macOS
Shell
source .venv/bin/activate

Instalar Dependências
Shell
pip install -r requirements.txt

Configurar Variáveis de Ambiente
Criar o arquivo:
Shell
env não tem suporte total. O realce de sintaxe é baseado em Shell.
DB_HOST=localhost
DB_PORT=3306
DB_NAME=finance_tracker
DB_USER=root
DB_PASSWORD=sua_senha

Executar o Backend
Shell
uvicorn app.main:app --reload
Acessar:
http://localhost:8000/docs

Executar o Frontend
Abrir:
frontend/index.html
ou utilizar o Live Server.

📌 Endpoints
Usuários
HTTP
POST /usuarios
GET /usuarios
GET /usuarios/{id}
PUT /usuarios/{id}
DELETE /usuarios/{id}

Categorias
HTTP
POST /categorias
GET /categorias
GET /categorias/{id}
PUT /categorias/{id}
DELETE /categorias/{id}

Receitas
HTTP
POST /receitas
GET /receitas
GET /receitas/{id}
PUT /receitas/{id}
DELETE /receitas/{id}

Despesas
HTTP
POST /despesas
GET /despesas
GET /despesas/{id}
PUT /despesas/{id}
DELETE /despesas/{id}

📊 Dashboard
O Dashboard apresenta:
Saldo acumulado
Receitas totais
Despesas totais
Quantidade de movimentações
Filtro por usuário
Filtro por período
Estatísticas por categoria
Rankings financeiros
Gráficos financeiros

✅ Status do Projeto
Versão: 1.0.1
Funcionalidades concluídas
CRUD de Usuários
CRUD de Categorias
CRUD de Receitas
CRUD de Despesas
Integração Frontend ↔ Backend
Dashboard Financeiro
Estatísticas
Rankings
Gráficos
Deploy em Produção

🚀 Roadmap Futuro
v2.0
Login JWT
Logout
Controle de sessões
Perfil de usuário
v2.1
Exportação CSV
Exportação PDF
Relatórios financeiros
v2.2
Metas financeiras
Alertas de gastos
Orçamento mensal

👨‍💻 Autor
Érico Gaudencio da Silva
Projeto desenvolvido para aprimorar conhecimentos em:
Python
FastAPI
SQLAlchemy
MySQL
JavaScript
APIs REST
Deploy Full Stack
Arquitetura Web