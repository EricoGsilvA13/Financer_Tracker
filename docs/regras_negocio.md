# Regras de Negócio - Finance Tracker

## 1. Objetivo

O Finance Tracker é um sistema de controle financeiro pessoal que permite o gerenciamento de receitas, despesas, categorias e indicadores financeiros. Utiliza Python, FastAPI, SQLAlchemy, MySQL, React, Axios, Pytest e Recharts. 

---

# 2. Entidades do Sistema

O sistema possui as seguintes entidades principais: 

- Usuário
- Categoria
- Receita
- Despesa



---

# 3. Regras de Usuário

## RN001 - Cadastro de Usuário

O sistema deve permitir o cadastro de usuários.

### Campos obrigatórios

- nome
- email
- senha

---

## RN002 - E-mail Único

O e-mail deve ser único no sistema.

### Exemplo válido

```text
joao@email.com
maria@email.com
```

### Exemplo inválido

```text
joao@email.com
joao@email.com
```



---

# 4. Regras de Categoria

## RN003 - Cadastro de Categoria

O sistema deve permitir cadastrar categorias para classificar receitas e despesas.

### Exemplos

```text
Salário
Freelance
Alimentação
Transporte
Lazer
```

---

## RN004 - Categoria Única

Não podem existir duas categorias com o mesmo nome.

### Exemplo válido

```text
Alimentação
Transporte
```

### Exemplo inválido

```text
Alimentação
Alimentação
```



---

## RN005 - Tipo da Categoria

Toda categoria deve possuir um tipo.

### Valores permitidos

```text
receita
despesa
```

---

# 5. Regras de Receita

## RN006 - Cadastro de Receita

Uma receita deve possuir:

- descrição
- valor
- data
- usuário
- categoria

---

## RN007 - Valor Maior que Zero

O valor da receita deve ser maior que zero.

### Exemplos válidos

```text
100.00
2500.00
8500.75
```

### Exemplos inválidos

```text
0
-100
-50.25
```



---

# 6. Regras de Despesa

## RN008 - Cadastro de Despesa

Uma despesa deve possuir:

- descrição
- valor
- data
- usuário
- categoria

---

## RN009 - Valor Maior que Zero

O valor da despesa deve ser maior que zero.

### Exemplos válidos

```text
15.90
150.00
780.45
```

### Exemplos inválidos

```text
0
-1
-350.75
```



---

# 7. Relacionamentos

## RN010 - Usuário e Receitas

Um usuário pode possuir várias receitas.

```text
Usuário
 ├── Receita 1
 ├── Receita 2
 └── Receita N
```

---

## RN011 - Usuário e Despesas

Um usuário pode possuir várias despesas.

```text
Usuário
 ├── Despesa 1
 ├── Despesa 2
 └── Despesa N
```

---

## RN012 - Categoria e Movimentações

Uma categoria pode classificar várias receitas e várias despesas.

```text
Categoria
 ├── Receita 1
 ├── Receita 2
 ├── Despesa 1
 └── Despesa 2
```



---

# 8. Estatísticas Financeiras

## RN013 - Total de Receitas

O sistema deve calcular o total de receitas.

### Fórmula

```text
Receita 1 + Receita 2 + Receita N
```

---

## RN014 - Total de Despesas

O sistema deve calcular o total de despesas.

### Fórmula

```text
Despesa 1 + Despesa 2 + Despesa N
```

---

## RN015 - Saldo Atual

O sistema deve calcular automaticamente o saldo financeiro.

### Fórmula

```text
Saldo = Total Receitas - Total Despesas
```



---

## RN016 - Totais por Categoria

O sistema deve apresentar totais agrupados por categoria.

### Exemplo

```text
Alimentação: R$ 500,00
Transporte: R$ 230,00
Lazer: R$ 150,00
```



---

# 9. API

## RN017 - CRUD Completo

O sistema deve fornecer operações CRUD para:

- Usuários
- Categorias
- Receitas
- Despesas

### Operações

- Create
- Read
- Update
- Delete



---

# 10. Dashboard

## RN018 - Indicadores Financeiros

O Dashboard deverá exibir:

- Saldo Atual
- Total de Receitas
- Total de Despesas
- Totais por Categoria



---

# 11. Testes

## RN019 - Cobertura de Testes

Devem existir testes automatizados para:

- Usuários
- Categorias
- Receitas
- Despesas
- Estatísticas



---

# 12. Roadmap de Implementação

## Sprint 1

- Planejamento
- Documento de requisitos
- Modelagem do banco
- Criação do GitHub

## Sprint 2

- Estrutura Backend
- FastAPI
- SQLAlchemy
- SessionLocal
- CORS

## Sprint 3

- CRUD de Usuários

## Sprint 4

- CRUD de Categorias

## Sprint 5

- CRUD de Receitas

## Sprint 6

- CRUD de Despesas

## Sprint 7

- Estatísticas Financeiras

## Sprint 8

- Frontend React

## Sprint 9

- Integração Frontend e Backend

## Sprint 10

- Dashboard

## Sprint 11

- Gráficos com Recharts

## Sprint 12

- Testes finais
- Refatoração
- Deploy