# EcoTrip-Calculator

Uma **Calculadora Web de Emissão de CO₂** desenvolvida com HTML, CSS e JavaScript vanilla para calcular o impacto ambiental de diferentes modos de transporte entre cidades brasileiras.

## 🌿 Sobre o Projeto

O EcoTrip-Calculator é uma ferramenta educacional que permite aos usuários:

- 🚗 Calcular emissões de CO₂ para diferentes meios de transporte
- 📍 Consultar distâncias entre cidades brasileiras
- 📊 Comparar o impacto ambiental entre modos de transporte
- 🏆 Descobrir alternativas mais sustentáveis
- 💳 Calcular créditos de carbono necessários para compensar emissões

**Desenvolvido como projeto do Bootcamp GitHub Copilot - DIO**

## ✨ Funcionalidades

- ✅ **Preenchimento automático de distância** entre cidades cadastradas
- ✅ **Opção de inserção manual** de distância para rotas não cadastradas
- ✅ **4 modos de transporte**: Bicicleta, Carro, Ônibus e Caminhão
- ✅ **Comparação visual** com gráficos de barras coloridos
- ✅ **Cálculo de economia** vs. transporte em carro
- ✅ **Estimativa de créditos de carbono** com preços em reais
- ✅ **Interface responsiva** (mobile, tablet, desktop)
- ✅ **Animações suaves** e feedback visual
- ✅ **Banco de dados** com 40+ rotas entre cidades brasileiras

## 📁 Estrutura do Projeto

```
EcoTrip-Calculator/
├── 📄 index.html                 # Página principal (HTML)
├── 📄 README.md                  # Este arquivo
├── 📄 LICENSE                    # Licença MIT
│
├── 📁 css/
│   └── style.css                 # Estilos CSS (responsivo)
│
├── 📁 js/
│   ├── app.js                    # Orquestração principal e event listeners
│   ├── calculator.js             # Lógica de cálculos de CO₂
│   ├── config.js                 # Configurações, fatores de emissão e inicialização
│   ├── routes-data.js            # Base de dados de rotas entre cidades
│   └── ui.js                     # Funções de renderização e manipulação de DOM
│
└── 📁 .github/
    └── 📁 workflows/
        └── deploy.yml            # GitHub Actions para deploy automático
```

## 🛠️ Arquitetura do Código

### Módulos JavaScript

#### `js/routes-data.js`
Base de dados com distâncias entre cidades brasileiras.

**Exports:**
- `RoutesDB.routes` - Array com +40 rotas
- `RoutesDB.getAllCities()` - Retorna lista de cidades únicas
- `RoutesDB.findDistance(origin, destination)` - Busca distância entre cidades

#### `js/config.js`
Configurações globais da aplicação.

**Exports:**
- `CONFIG.EMISSION_FACTORS` - Fatores de emissão por modo (kg CO₂/km)
- `CONFIG.TRANSPORT_MODES` - Metadados dos modos de transporte
- `CONFIG.CARBON_CREDIT` - Configurações de créditos de carbono
- `CONFIG.populateDatalist()` - Popula campo de autocomplete
- `CONFIG.setDistanceAutofill()` - Ativa preenchimento automático

#### `js/calculator.js`
Lógica de cálculos científicos.

**Exports:**
- `Calculator.calculateEmission(distanceKm, transportMode)` - Calcula CO₂ para uma rota
- `Calculator.calculateAllModes(distanceKm)` - Emissões para todos os modos
- `Calculator.calculateSavings(emission, baselineEmission)` - Calcula economia vs baseline
- `Calculator.calculateCarbonCredits(emissionKg)` - Créditos necessários
- `Calculator.estimateCreditPrice(credits)` - Preço estimado em reais

#### `js/ui.js`
Funções de renderização e manipulação da DOM.

**Exports:**
- `UI.formatNumber(number, decimals)` - Formata números
- `UI.formatCurrency(value)` - Formata moeda (R$)
- `UI.renderResults(data)` - Renderiza cards de resultado
- `UI.renderComparison(modesArray, selectedMode)` - Renderiza gráfico comparativo
- `UI.renderCarbonCredits(creditsData)` - Renderiza seção de créditos
- `UI.showElement(elementId)` - Mostra elemento
- `UI.hideElement(elementId)` - Oculta elemento
- `UI.scrollToElement(elementId)` - Scroll suave

#### `js/app.js`
Orquestração principal e manipulação de eventos.

**Funcionalidades:**
- Inicialização da aplicação
- Event listener do formulário
- Orquestração de cálculos e renderização
- Simulação de carregamento assíncrono

### Arquivos Estáticos

#### `index.html`
Estrutura HTML semântica com:
- Formulário com autocomplete de cidades
- Seleção de modo de transporte
- Seções de resultado, comparação e créditos de carbono
- Datalist dinâmico

#### `css/style.css`
Estilos CSS com:
- Variáveis CSS para temas
- Grid responsivo
- Animações suaves
- Design mobile-first
- Breakpoints para tablet e desktop

## 📊 Fatores de Emissão (kg CO₂/km)

| Transporte | Emissão | Status |
|-----------|---------|--------|
| 🚴 Bicicleta | 0.000 | ✅ Sustentável |
| 🚌 Ônibus | 0.089 | ✅ Eficiente |
| 🚗 Carro | 0.120 | ⚠️ Padrão |
| 🚚 Caminhão | 0.960 | ❌ Alto impacto |

## 🗺️ Cidades Disponíveis

O projeto inclui rotas entre **+40 cidades brasileiras**, incluindo:

### Capitais
São Paulo, Rio de Janeiro, Brasília, Belo Horizonte, Salvador, Recife, Fortaleza, Manaus, Belém, Porto Alegre, Curitiba, Florianópolis, Goiânia, Cuiabá e Campo Grande.

### Principais Regionais
Campinas, Santos, Niterói, Búzios, Ouro Preto, Sorocaba, Ribeirão Preto e mais...

## 🚀 Como Usar

1. **Abra o navegador** e acesse a aplicação
2. **Selecione a origem** (com sugestões automáticas)
3. **Selecione o destino** (distância preenchida automaticamente)
4. **Escolha o modo de transporte**
5. **Clique em "Calcular Emissão"**
6. **Visualize os resultados**, comparações e créditos de carbono

## 📱 Responsividade

- ✅ **Desktop** (1200px+) - Grid completo
- ✅ **Tablet** (768px-1199px) - Layout adaptado
- ✅ **Mobile** (até 767px) - Single column, touch-friendly

## 🌐 Deploy

A aplicação está configurada para deploy automático no **GitHub Pages** via GitHub Actions.

**Workflow:** `.github/workflows/deploy.yml`
**Trigger:** Push para branch `main`

## 📦 Dependências

Nenhuma! O projeto usa apenas **JavaScript vanilla** sem frameworks ou bibliotecas externas.

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [`LICENSE`](https://github.com/fmarqueseti/EcoTrip-Calculator?tab=MIT-1-ov-file) para detalhes.

Copyright © 2025 Fábio Marques

## 🎓 Tecnologias Utilizadas

- **HTML5** - Semântica e estrutura
- **CSS3** - Grid, Flexbox, Variáveis CSS, Animações
- **JavaScript ES6+** - Modules pattern, Arrow functions, Template literals
- **GitHub Actions** - CI/CD automático

## 📚 Recursos Educacionais

Este projeto foi desenvolvido como parte do [**Bootcamp GitHub Copilot**](https://web.dio.me/track/github-copilot-codigo-na-pratica) oferecido pela [**DIO**](https://www.dio.me/) (Digital Innovation One) para demonstrar:

- Uso efetivo do GitHub Copilot
- Arquitetura modular em JavaScript
- Boas práticas de código
- Design responsivo moderno
- Automação com GitHub Actions

---

**Desenvolvido com ❤️ para a comunidade tech** 🚀
