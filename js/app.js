/**
 * APP - Inicialização e manipulação de eventos principal
 * Orquestra a interação entre módulos e gerencia o ciclo de vida da aplicação
 */

// Immediately Invoked Function Expression (IIFE) para encapsulamento
(function() {
    'use strict';
    
    /**
     * Inicializa a aplicação quando o DOM está pronto
     */
    function initializeApp() {
        try {
            // 1. Popula a datalist com todas as cidades disponíveis
            CONFIG.populateDatalist();
            
            // 2. Configura o preenchimento automático de distância
            CONFIG.setDistanceAutofill();
            
            // 3. Obtém o formulário
            const calculatorForm = document.getElementById('calculator-form');
            
            // 4. Adiciona event listener ao submit do formulário
            if (calculatorForm) {
                calculatorForm.addEventListener('submit', handleFormSubmit);
            }
            
            // 5. Log de sucesso
            console.log('✅ Calculadora inicializada!');
        } catch (error) {
            console.error('Erro ao inicializar a aplicação:', error);
        }
    }
    
    /**
     * Manipulador do envio do formulário
     * @param {Event} event - Evento de submit do formulário
     */
    function handleFormSubmit(event) {
        // 1. Previne o envio padrão do formulário
        event.preventDefault();
        
        // 2. Obtém valores do formulário
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const transportRadios = document.getElementsByName('transport');
        
        const origin = originInput.value.trim();
        const destination = destinationInput.value.trim();
        const distance = parseFloat(distanceInput.value);
        
        // Encontra o modo de transporte selecionado
        let selectedTransport = 'car';
        for (let radio of transportRadios) {
            if (radio.checked) {
                selectedTransport = radio.value;
                break;
            }
        }
        
        // 3. Validação dos inputs
        if (!origin || !destination || !distance) {
            alert('❌ Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (distance <= 0) {
            alert('❌ A distância deve ser maior que 0 km.');
            return;
        }
        
        // 4. Obtém o botão de submit
        const submitButton = event.target.querySelector('button[type="submit"]');
        
        // 5. Mostra estado de carregamento
        UI.showLoading(submitButton);
        
        // 6. Oculta seções de resultados anteriores
        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');
        
        // 7. Simula processamento com delay de 1500ms
        setTimeout(() => {
            try {
                // === CÁLCULOS ===
                
                // Calcula emissão para o modo selecionado
                const selectedEmission = Calculator.calculateEmission(distance, selectedTransport);
                
                // Calcula emissão do carro como baseline
                const carEmission = Calculator.calculateEmission(distance, 'car');
                
                // Calcula economia comparado ao carro
                const savingsData = Calculator.calculateSavings(selectedEmission, carEmission);
                
                // Calcula emissões para todos os modos
                const allModesData = Calculator.calculateAllModes(distance);
                
                // Calcula créditos de carbono
                const creditsQuantity = Calculator.calculateCarbonCredits(selectedEmission);
                
                // Estima preço dos créditos
                const priceEstimate = Calculator.estimateCreditPrice(creditsQuantity);
                
                // === RENDERIZAÇÃO ===
                
                // Monta objeto com dados de resultado
                const resultsData = {
                    origin: origin,
                    destination: destination,
                    distance: distance,
                    emission: selectedEmission,
                    mode: selectedTransport,
                    savings: selectedTransport !== 'car' ? savingsData : null
                };
                
                // Renderiza seção de resultados
                const resultsHTML = UI.renderResults(resultsData);
                const resultsContent = document.getElementById('results-content');
                resultsContent.innerHTML = resultsHTML;
                
                // Renderiza seção de comparação entre modos
                const comparisonHTML = UI.renderComparison(allModesData, selectedTransport);
                const comparisonContent = document.getElementById('comparison-content');
                comparisonContent.innerHTML = comparisonHTML;
                
                // Monta objeto com dados de créditos
                const creditsData = {
                    credits: creditsQuantity,
                    price: priceEstimate
                };
                
                // Renderiza seção de créditos de carbono
                const creditsHTML = UI.renderCarbonCredits(creditsData);
                const creditsContent = document.getElementById('carbon-credits-content');
                creditsContent.innerHTML = creditsHTML;
                
                // === EXIBIÇÃO ===
                
                // Mostra todas as seções de resultado
                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');
                
                // Scroll suave até os resultados
                UI.scrollToElement('results');
                
                // Remove estado de carregamento
                UI.hideLoading(submitButton);
                
                console.log('✅ Cálculo realizado com sucesso!', resultsData);
                
            } catch (error) {
                // Trata erros durante o cálculo
                console.error('Erro ao processar cálculo:', error);
                alert('❌ Ocorreu um erro ao processar o cálculo. Verifique os dados e tente novamente.');
                UI.hideLoading(submitButton);
            }
        }, 1500);
    }
    
    /**
     * Aguarda o DOM estar completamente carregado antes de inicializar
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM já está carregado (se este script for carregado assincronamente)
        initializeApp();
    }
})();
