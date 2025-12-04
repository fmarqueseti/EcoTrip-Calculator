/**
 * UI - Módulo de interface do usuário
 * Contém funções para formatação, renderização de componentes e manipulação da DOM
 */

const UI = {
    /**
     * Formata um número com casas decimais e separadores de milhar
     * @param {number} number - Número a formatar
     * @param {number} decimals - Quantidade de casas decimais (padrão: 2)
     * @returns {string} Número formatado ex: "1.234,56"
     */
    formatNumber: function(number, decimals = 2) {
        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Formata um valor como moeda brasileira
     * @param {number} value - Valor em reais
     * @returns {string} Valor formatado ex: "R$ 1.234,56"
     */
    formatCurrency: function(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },

    /**
     * Exibe um elemento removendo a classe 'hidden'
     * @param {string} elementId - ID do elemento
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Oculta um elemento adicionando a classe 'hidden'
     * @param {string} elementId - ID do elemento
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Rola a página até um elemento com comportamento suave
     * @param {string} elementId - ID do elemento
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Renderiza os resultados da emissão de CO₂
     * @param {Object} data - Objeto com: origin, destination, distance, emission, mode, savings
     * @returns {string} HTML string com cards de resultado
     */
    renderResults: function(data) {
        const modeInfo = CONFIG.TRANSPORT_MODES[data.mode];
        
        // Card de rota
        const routeCard = `
            <div class="results__card">
                <h3 class="results__card-title">Rota</h3>
                <div class="results__card-content">
                    <p class="results__route">${data.origin} → ${data.destination}</p>
                </div>
            </div>
        `;
        
        // Card de distância
        const distanceCard = `
            <div class="results__card">
                <h3 class="results__card-title">Distância</h3>
                <div class="results__card-content">
                    <p class="results__value">${this.formatNumber(data.distance, 1)} km</p>
                </div>
            </div>
        `;
        
        // Card de emissão
        const emissionCard = `
            <div class="results__card results__card--highlight">
                <h3 class="results__card-title">Emissão de CO₂</h3>
                <div class="results__card-content">
                    <p class="results__value">${this.formatNumber(data.emission, 2)} kg</p>
                    <p class="results__icon">🍃</p>
                </div>
            </div>
        `;
        
        // Card de modo de transporte
        const transportCard = `
            <div class="results__card">
                <h3 class="results__card-title">Modo de Transporte</h3>
                <div class="results__card-content results__card-content--transport">
                    <p class="results__transport-icon">${modeInfo.icon}</p>
                    <p class="results__transport-label">${modeInfo.label}</p>
                </div>
            </div>
        `;
        
        // Card de economia (se não for carro e houver economia)
        let savingsCard = '';
        if (data.mode !== 'car' && data.savings) {
            savingsCard = `
                <div class="results__card results__card--success">
                    <h3 class="results__card-title">Economia vs Carro</h3>
                    <div class="results__card-content">
                        <p class="results__value">${this.formatNumber(data.savings.savedKg, 2)} kg economizados</p>
                        <p class="results__savings-percentage">${this.formatNumber(data.savings.percentage, 1)}% menos emissão</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="results__grid">
                ${routeCard}
                ${distanceCard}
                ${emissionCard}
                ${transportCard}
                ${savingsCard}
            </div>
        `;
    },

    /**
     * Renderiza comparação de emissão entre todos os modos de transporte
     * @param {Array} modesArray - Array de modos com { mode, emission, percentageVsCar }
     * @param {string} selectedMode - Modo selecionado (ex: 'car')
     * @returns {string} HTML string com comparação
     */
    renderComparison: function(modesArray, selectedMode) {
        // Encontra a emissão máxima para cálculo de barra de progresso
        const maxEmission = Math.max(...modesArray.map(m => m.emission));
        
        // Função para determinar cor da barra baseado em percentagem vs carro
        const getBarColor = (percentageVsCar) => {
            if (percentageVsCar <= 25) return '#00AA00';      // Verde
            if (percentageVsCar <= 75) return '#FFB347';      // Laranja
            if (percentageVsCar <= 100) return '#FF6B6B';     // Vermelho
            return '#DC143C';                                 // Vermelho escuro (>100%)
        };
        
        // Renderiza cada modo de transporte
        const modesHTML = modesArray.map(modeData => {
            const modeInfo = CONFIG.TRANSPORT_MODES[modeData.mode];
            const isSelected = modeData.mode === selectedMode;
            const progressWidth = maxEmission > 0 ? 
                (modeData.emission / maxEmission) * 100 : 0;
            const barColor = getBarColor(modeData.percentageVsCar);
            
            const badge = isSelected ? 
                '<span class="comparison__badge">✓ Selecionado</span>' : '';
            
            return `
                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <div class="comparison__header-info">
                            <span class="comparison__icon">${modeInfo.icon}</span>
                            <span class="comparison__label">${modeInfo.label}</span>
                        </div>
                        ${badge}
                    </div>
                    
                    <div class="comparison__stats">
                        <p class="comparison__emission">${this.formatNumber(modeData.emission, 2)} kg CO₂</p>
                        <p class="comparison__percentage">${this.formatNumber(modeData.percentageVsCar, 1)}% vs carro</p>
                    </div>
                    
                    <div class="comparison__bar-container">
                        <div 
                            class="comparison__bar" 
                            style="width: ${progressWidth}%; background-color: ${barColor};"
                        ></div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Box de dica
        const tipBox = `
            <div class="comparison__tip">
                <p class="comparison__tip-text">
                    💡 <strong>Dica:</strong> A bicicleta é a opção mais sustentável! 
                    Ônibus e bicicleta produzem menos emissões que carro.
                </p>
            </div>
        `;
        
        return `
            <div class="comparison__container">
                ${modesHTML}
                ${tipBox}
            </div>
        `;
    },

    /**
     * Renderiza informações sobre créditos de carbono
     * @param {Object} creditsData - Objeto com { credits, price: { min, max, average } }
     * @returns {string} HTML string com créditos e preços
     */
    renderCarbonCredits: function(creditsData) {
        const credits = creditsData.credits;
        const prices = creditsData.price;
        
        // Card de créditos necessários
        const creditsCard = `
            <div class="carbon-credits__card">
                <h4 class="carbon-credits__card-title">Créditos Necessários</h4>
                <div class="carbon-credits__card-content">
                    <p class="carbon-credits__value">${this.formatNumber(credits, 4)}</p>
                    <p class="carbon-credits__helper">1 crédito = 1.000 kg CO₂</p>
                </div>
            </div>
        `;
        
        // Card de preço estimado
        const priceCard = `
            <div class="carbon-credits__card">
                <h4 class="carbon-credits__card-title">Preço Estimado</h4>
                <div class="carbon-credits__card-content">
                    <p class="carbon-credits__price">${this.formatCurrency(prices.average)}</p>
                    <p class="carbon-credits__price-range">
                        ${this.formatCurrency(prices.min)} - ${this.formatCurrency(prices.max)}
                    </p>
                </div>
            </div>
        `;
        
        // Box de informação
        const infoBox = `
            <div class="carbon-credits__info">
                <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                <p class="carbon-credits__info-text">
                    Créditos de carbono representam uma redução ou remoção de uma tonelada métrica 
                    (1.000 kg) de CO₂ da atmosfera. Eles podem ser comprados para compensar suas 
                    emissões e apoiar projetos ambientais.
                </p>
            </div>
        `;
        
        // Botão de compensação (não-funcional para demo)
        const buttonCompensate = `
            <button class="carbon-credits__button" type="button" disabled>
                🛒 Compensar Emissões
            </button>
        `;
        
        return `
            <div class="carbon-credits__container">
                <div class="carbon-credits__grid">
                    ${creditsCard}
                    ${priceCard}
                </div>
                ${infoBox}
                ${buttonCompensate}
            </div>
        `;
    },

    /**
     * Mostra estado de carregamento no botão
     * @param {HTMLElement} buttonElement - Elemento do botão
     */
    showLoading: function(buttonElement) {
        // Salva o texto original em dataset
        buttonElement.dataset.originalText = buttonElement.textContent;
        
        // Desabilita o botão
        buttonElement.disabled = true;
        
        // Muda o conteúdo para mostrar spinner
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Remove estado de carregamento do botão
     * @param {HTMLElement} buttonElement - Elemento do botão
     */
    hideLoading: function(buttonElement) {
        // Reabilita o botão
        buttonElement.disabled = false;
        
        // Restaura o texto original
        buttonElement.textContent = buttonElement.dataset.originalText || 'Calcular Emissão';
    }
};
