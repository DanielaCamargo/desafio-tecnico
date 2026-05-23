# Desafio Técnico

Dashboard de monitoramento de eficiência por linha de produção, desenvolvido com Laravel 7, Vue.js 2 e Tailwind CSS.

## Tecnologias

| Ferramenta     | Versão  |
|----------------|---------|
| PHP            | 8.0.30  |
| Laravel        | 7.x     |
| Composer       | ^2.x    |
| Node.js        | 16.x    |
| Vue.js         | 2.x     |
| Tailwind CSS   | 1.x     |
| MySQL          | 8.x     |

## Pré-requisitos

- PHP 8.0+
- Composer
- Node.js 16
- MySQL rodando localmente

## Instalação

**1. Clonar o repositório**

```bash
git clone <url-do-repositorio>
cd desafio-tecnico
```

**2. Configurar variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o `.env` com as credenciais do seu banco MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

**3. Instalar dependências**

```bash
composer install
npm install
```

**4. Gerar chave da aplicação**

```bash
php artisan key:generate
```

**5. Executar migrations e seeds**

```bash
php artisan migrate
php artisan db:seed
```

## Executando o projeto

```bash
npm run dev-artisan
```

Este comando executa em paralelo o build dos assets (`npm run dev`) e o servidor Laravel (`php artisan serve`).

A aplicação estará disponível em: **http://localhost:8000**

## Scripts disponíveis

| Comando              | Descrição                                      |
|----------------------|------------------------------------------------|
| `npm run dev-artisan`| Inicia o frontend e o servidor juntos          |
| `npm run dev`        | Compila os assets em modo desenvolvimento      |
| `npm run watch`      | Compila e observa alterações nos assets        |
| `npm run prod`       | Compila os assets para produção (minificado)   |
| `php artisan serve`  | Inicia apenas o servidor Laravel               |
