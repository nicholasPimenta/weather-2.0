<div align="center">

# Weather 2.0

Uma experiência meteorológica imersiva, responsiva e dinâmica.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vite.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-20232A?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[Ver projeto em produção](https://weather-20-live.vercel.app) · [Acessar repositório](https://github.com/nicholasPimenta/weather-2.0)

</div>

## Sobre o projeto

O **Weather 2.0** é uma aplicação de previsão do tempo que transforma informações meteorológicas em uma experiência visual imersiva.

Ao pesquisar uma cidade, a aplicação apresenta as condições atuais, máximas e mínimas, umidade, velocidade do vento e a previsão dos próximos quatro dias. O cenário da página também se adapta ao clima e ao período do dia, utilizando imagens e vídeos atmosféricos.

Além da interface, o projeto conta com uma função serverless responsável por intermediar as requisições à OpenWeather, mantendo a chave da API protegida no servidor.

## Funcionalidades

- Pesquisa meteorológica por cidade;
- Exibição da temperatura atual;
- Temperaturas máxima e mínima;
- Umidade relativa do ar;
- Velocidade do vento em km/h;
- Previsão para os próximos quatro dias;
- Identificação correta da cidade por geocodificação;
- Cenários dinâmicos para:
  - Céu limpo;
  - Tempo nublado;
  - Chuva;
  - Neve;
  - Períodos diurno e noturno;
- Ícones meteorológicos monocromáticos;
- Estado visual de carregamento;
- Mensagens para campo vazio, cidade inexistente e falha de conexão;
- Transições animadas entre pesquisa, carregamento e resultado;
- Retorno fluido à tela inicial;
- Layout responsivo para diferentes tamanhos de tela;
- Suporte a `prefers-reduced-motion`;
- Navegação acessível por teclado e tecnologias assistivas;
- Chave da OpenWeather protegida por uma função serverless.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS Modules
- [Phosphor Icons](https://phosphoricons.com/)
- [OpenWeather API](https://openweathermap.org/api)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Vercel](https://vercel.com/)

## Arquitetura da aplicação

```text
Navegador
   │
   │ GET /api/weather?city=...
   ▼
Vercel Function
   │
   ├── Geocodificação da cidade
   ├── Condições meteorológicas atuais
   └── Previsão do tempo
   │
   ▼
OpenWeather API
```

O frontend não acessa diretamente a OpenWeather e não possui acesso à chave da API. Todas as consultas passam pela função localizada em `api/weather.ts`.

A função realiza três operações:

1. Localiza as coordenadas da cidade pesquisada;
2. Consulta as condições meteorológicas atuais;
3. Consulta a previsão dos próximos dias.

Os dados retornam para o frontend, onde são preparados para a interface e associados ao cenário visual correspondente.

## Estrutura principal

```text
weather-2.0/
├── api/
│   └── weather.ts
├── public/
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── components/
│   │   ├── SearchForm/
│   │   └── WeatherResult/
│   ├── services/
│   │   └── openWeather.ts
│   ├── utils/
│   │   └── forecast.ts
│   ├── App.module.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
└── package.json
```

## Como executar localmente

### Pré-requisitos

Antes de começar, será necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- Uma conta na [Vercel](https://vercel.com/)
- Uma chave da [OpenWeather](https://openweathermap.org/api)

### 1. Clone o repositório

```bash
git clone https://github.com/nicholasPimenta/weather-2.0.git
```

### 2. Entre na pasta do projeto

```bash
cd weather-2.0
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
OPENWEATHER_API_KEY=sua_chave_da_openweather
```

> A variável não utiliza o prefixo `VITE_`, pois ela deve permanecer disponível somente no servidor.

Nunca envie o arquivo `.env.local` para o repositório.

### 5. Vincule o projeto à Vercel

```bash
npx vercel link
```

Caso a variável local não seja reconhecida pela função durante o desenvolvimento, adicione-a ao ambiente `Development` da Vercel:

```bash
npx vercel env add OPENWEATHER_API_KEY development
```

Quando o terminal solicitar `Value?`, informe somente o conteúdo da chave.

### 6. Inicie o ambiente de desenvolvimento

```bash
npx vercel dev
```

A aplicação ficará disponível normalmente em:

```text
http://localhost:3000
```

> É necessário utilizar `vercel dev`, em vez de apenas `npm run dev`, para executar também a função serverless localizada em `api/weather.ts`.

### Compatibilidade com o Vercel CLI

Caso alguma versão do Vercel CLI apresente erro ao identificar o diretório raiz, utilize a versão validada durante o desenvolvimento:

```bash
npx vercel@58.7.1 dev
```

## Build de produção

Para verificar o build local:

```bash
npm run build
```

Os arquivos finais serão gerados no diretório `dist`.

## Implantação

Antes da implantação, configure `OPENWEATHER_API_KEY` nos ambientes `Preview` e `Production` da Vercel.

Isso pode ser feito pelo painel da plataforma ou pelo terminal:

```bash
npx vercel env add OPENWEATHER_API_KEY preview --sensitive
```

```bash
npx vercel env add OPENWEATHER_API_KEY production --sensitive
```

Para publicar em produção:

```bash
npx vercel deploy --prod
```

## Segurança da chave da API

A chave da OpenWeather:

- Não utiliza o prefixo público `VITE_`;
- Não é incorporada ao bundle do frontend;
- Não aparece nas requisições feitas pelo navegador à OpenWeather;
- Não é armazenada no repositório;
- É acessada somente pela função serverless por meio de:

```ts
process.env.OPENWEATHER_API_KEY
```

O arquivo `.env.example` documenta apenas o nome esperado da variável:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

## Acessibilidade

O projeto inclui cuidados como:

- HTML semântico;
- Formulário identificado como mecanismo de pesquisa;
- Rótulo acessível para o campo de cidade;
- Botões com nomes acessíveis;
- Mensagens de erro anunciadas como alerta;
- Indicação do estado de carregamento;
- Estados visíveis de foco;
- Elementos decorativos ocultos de leitores de tela;
- Compatibilidade com preferência por movimento reduzido.

## Decisões técnicas

### Função serverless como proxy

A integração inicial poderia expor a chave da OpenWeather no bundle do Vite. Para evitar isso, as consultas foram transferidas para uma função serverless da Vercel.

O navegador chama apenas `/api/weather`, enquanto a função acrescenta a chave de maneira privada antes de consultar a OpenWeather.

### Processamento da previsão

Os dados da previsão são agrupados por data local da cidade. Para cada dia, a aplicação calcula as temperaturas máxima e mínima e seleciona quatro dias posteriores ao dia atual.

### Cenários meteorológicos

Os códigos retornados pela OpenWeather são convertidos em categorias visuais. A aplicação também compara o horário atual com o nascer e o pôr do sol para escolher corretamente entre os cenários diurno e noturno.

### Transições de interface

O fluxo visual é controlado por diferentes fases da aplicação:

```text
Pesquisa → Carregamento → Resultado → Retorno
```

Isso permite coordenar a saída do formulário, a entrada dos dados, a troca do cenário e o retorno fluido à tela inicial.

## Aprendizados

Este projeto permitiu praticar e aprofundar conhecimentos em:

- Componentização com React;
- Tipagem de respostas externas com TypeScript;
- Consumo e tratamento de APIs;
- Funções assíncronas e tratamento de erros;
- Organização de responsabilidades;
- CSS Modules e design responsivo;
- Animações e transições de estado;
- Acessibilidade na interface;
- Variáveis de ambiente;
- Funções serverless;
- Proteção de informações sensíveis;
- Publicação e configuração de aplicações na Vercel.

## Autor

Desenvolvido por [Nicholas Pimenta](https://github.com/nicholasPimenta).

---

<div align="center">

**[Acessar o Weather 2.0](https://weather-20-live.vercel.app)**

</div>