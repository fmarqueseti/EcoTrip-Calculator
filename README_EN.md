# EcoTrip-Calculator

A **Web CO₂ Emission Calculator** developed with HTML, CSS, and vanilla JavaScript to compute the environmental impact of various transportation modes between Brazilian cities.

## 🌿 About the Project

EcoTrip-Calculator is an educational tool that allows users to:

- 🚗 Calculate CO₂ emissions for different modes of transportation
- 📍 Retrieve distances between Brazilian cities
- 📊 Compare the environmental impact among transport options
- 🏆 Discover more sustainable alternatives
- 💳 Estimate the carbon credits needed to offset emissions

**Developed as a project for the GitHub Copilot Bootcamp - DIO**

## ✨ Features

- ✅ **Automatic distance filling** between registered cities\
- ✅ **Manual distance entry** for custom routes\
- ✅ **4 transportation modes**: Bicycle, Car, Bus, and Truck\
- ✅ **Visual comparison** using colored bar charts\
- ✅ **Savings calculation** relative to car transportation\
- ✅ **Carbon credit estimation** with pricing in BRL\
- ✅ **Responsive interface** (mobile, tablet, desktop)\
- ✅ **Smooth animations** and visual feedback\
- ✅ **Database** with 40+ routes between Brazilian cities

## 📁 Project Structure

```
EcoTrip-Calculator/
├── 📄 index.html                 # Main page (HTML)
├── 📄 README.md                  # This file
├── 📄 LICENSE                    # MIT License
│
├── 📁 css/
│   └── style.css                 # Responsive CSS styles
│
├── 📁 js/
│   ├── app.js                    # Main orchestration and event listeners
│   ├── calculator.js             # CO₂ calculation logic
│   ├── config.js                 # Configuration, emission factors, initialization
│   ├── routes-data.js            # Database of city routes
│   └── ui.js                     # Rendering and DOM manipulation functions
│
└── 📁 .github/
    └── 📁 workflows/
        └── deploy.yml            # GitHub Actions for automatic deployment
```

## 🛠️ Code Architecture

### JavaScript Modules

#### `js/routes-data.js`
Database containing distances between Brazilian cities.

**Exports:**
- `RoutesDB.routes` - Array with 40+ routes
- `RoutesDB.getAllCities()` - Returns a list of unique cities
- `RoutesDB.findDistance(origin, destination)` - Retrieves distance between cities

#### `js/config.js`
Global application configuration.

**Exports:**
- `CONFIG.EMISSION_FACTORS` - Emission factors per mode (kg CO₂/km)
- `CONFIG.TRANSPORT_MODES` - Metadata for transport modes
- `CONFIG.CARBON_CREDIT` - Carbon credit configurations
- `CONFIG.populateDatalist()` - Populates autocomplete fields
- `CONFIG.setDistanceAutofill()` - Enables automatic distance filling

#### `js/calculator.js`
Scientific calculation logic.

**Exports:**
- `Calculator.calculateEmission(distanceKm, transportMode)` - Computes route CO₂ emissions
- `Calculator.calculateAllModes(distanceKm)` - Emissions for all modes
- `Calculator.calculateSavings(emission, baselineEmission)` - Savings vs. baseline
- `Calculator.calculateCarbonCredits(emissionKg)` - Required carbon credits
- `Calculator.estimateCreditPrice(credits)` - Estimated cost in BRL

#### `js/ui.js`
Rendering and DOM manipulation functions.

**Exports:**
- `UI.formatNumber(number, decimals)` - Number formatting
- `UI.formatCurrency(value)` - Currency formatting (BRL)
- `UI.renderResults(data)` - Renders result cards
- `UI.renderComparison(modesArray, selectedMode)` - Renders comparison chart
- `UI.renderCarbonCredits(creditsData)` - Renders carbon credit section
- `UI.showElement(elementId)` - Shows an element
- `UI.hideElement(elementId)` - Hides an element
- `UI.scrollToElement(elementId)` - Smooth scrolling

#### `js/app.js`
Main orchestration and event handling.

**Features:**
- Application initialization
- Form event listener
- Calculation and rendering orchestration
- Simulated asynchronous loading

### Static Files

#### `index.html`
Semantic HTML structure with:
- Form with city autocomplete
- Transportation mode selection
- Results, comparison, and carbon credit sections
- Dynamic datalist

#### `css/style.css`
CSS styles featuring:
- CSS variables for theming
- Responsive grid
- Smooth animations
- Mobile-first design
- Tablet and desktop breakpoints

## 📊 Emission Factors (kg CO₂/km)

| Transport | Emission | Status |
|-----------|---------|--------|
| 🚴 Bicycle | 0.000 | ✅ Sustainable |
| 🚌 Bus | 0.089 | ✅ Efficient |
| 🚗 Car | 0.120 | ⚠️ Standard |
| 🚚 Truck | 0.960 | ❌ High impact |

## 🗺️ Available Cities

The project includes routes between **40+ Brazilian cities**, including:

### Capitals
São Paulo, Rio de Janeiro, Brasília, Belo Horizonte, Salvador, Recife, Fortaleza, Manaus, Belém, Porto Alegre, Curitiba, Florianópolis, Goiânia, Cuiabá, and Campo Grande.

### Major Regional Cities
Campinas, Santos, Niterói, Búzios, Ouro Preto, Sorocaba, Ribeirão Preto, and more...

## 🚀 How to Use

1.  **Open your browser** and access the application
2.  **Select the origin** (with automatic suggestions)
3.  **Select the destination** (distance auto-filled)
4.  **Choose the transport mode**
5.  **Click "Calculate Emission"**
6.  **View the results**, comparisons, and carbon credits

## 📱 Responsiveness

-   ✅ **Desktop** (1200px+) -- Full grid
-   ✅ **Tablet** (768px--1199px) -- Adapted layout
-   ✅ **Mobile** (up to 767px) -- Single column, touch-friendly

## 🌐 Deployment

The application is configured for automatic deployment on **GitHub
Pages** using GitHub Actions.

**Workflow:** `.github/workflows/deploy.yml`
**Trigger:** Push to the `main` branch

## 📦 Dependencies

None! The project uses only **vanilla JavaScript**, with no external libraries or frameworks.

## 📝 License

This project is licensed under the **MIT License** - see the [`LICENSE`](https://github.com/fmarqueseti/EcoTrip-Calculator?tab=MIT-1-ov-file) para detalhes. file for details.

Copyright © 2025 Fábio Marques

## 🎓 Technologies Used

-   **HTML5** - Semantics and structure
-   **CSS3** - Grid, Flexbox, CSS Variables, Animations
-   **JavaScript ES6+** - Modules, Arrow functions, Template literals
-   **GitHub Actions** - Automated CI/CD

## 📚 Educational Resources

This project was developed as part of the [**GitHub Copilot Bootcamp**](https://web.dio.me/track/github-copilot-codigo-na-pratica) by [**DIO**](https://www.dio.me/en) (Digital Innovation One) to demonstrate:

-   Effective use of GitHub Copilot
-   Modular JavaScript architecture
-   Clean coding practices
-   Modern responsive design
-   Automation with GitHub Actions

------------------------------------------------------------------------

**Developed with ❤️ for the tech community** 🚀
