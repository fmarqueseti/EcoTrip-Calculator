/**
 * CONFIG - Configurações globais da aplicação
 * Contém fatores de emissão, modos de transporte e funções de inicialização
 */

const CONFIG = {
    /**
     * Fatores de emissão de CO₂ em kg por quilômetro
     * Baseado em dados de emissões médias por modo de transporte
     */
    EMISSION_FACTORS: {
        bicycle: 0,          // Zero emissão
        car: 0.12,           // ~120g de CO₂ por km
        bus: 0.089,          // ~89g de CO₂ por km (mais eficiente)
        truck: 0.96          // ~960g de CO₂ por km
    },

    /**
     * Metadados dos modos de transporte
     * Inclui label em português, emoji e cor para UI
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚴",
            color: "#00AA00"   // Verde
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#FF6B6B"   // Vermelho
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#FFB347"   // Laranja
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#DC143C"   // Vermelho escuro
        }
    },

    /**
     * Configurações de créditos de carbono
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,        // 1 crédito = 1000 kg de CO₂
        PRICE_MIN_BRL: 50,          // Preço mínimo em reais
        PRICE_MAX_BRL: 150          // Preço máximo em reais
    },

    /**
     * Popula a datalist 'cities-list' com todas as cidades disponíveis
     * Deve ser chamado após o DOM estar pronto
     */
    populateDatalist: function() {
        // Obtém a lista de todas as cidades do RoutesDB
        const cities = RoutesDB.getAllCities();
        
        // Obtém o elemento datalist
        const datalist = document.getElementById('cities-list');
        
        // Verifica se o datalist existe
        if (!datalist) {
            console.warn('Elemento datalist com id "cities-list" não encontrado');
            return;
        }
        
        // Limpa opções anteriores (se houver)
        datalist.innerHTML = '';
        
        // Cria e adiciona option para cada cidade
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
        
        console.log(`Datalist populada com ${cities.length} cidades`);
    },

    /**
     * Configura o preenchimento automático da distância baseado nas cidades selecionadas
     * Permite também a edição manual da distância via checkbox
     * Deve ser chamado após o DOM estar pronto
     */
    setDistanceAutofill: function() {
        // Obtém elementos do formulário
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.calculator__helper-text');
        
        // Verifica se todos os elementos foram encontrados
        if (!originInput || !destinationInput || !distanceInput || !manualCheckbox || !helperText) {
            console.warn('Um ou mais elementos de formulário não foram encontrados');
            return;
        }
        
        /**
         * Tenta encontrar e preencher a distância automaticamente
         * Baseado nos valores de origem e destino
         */
        const tryFillDistance = () => {
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();
            
            // Se ambos os campos estão preenchidos
            if (origin && destination) {
                const distance = RoutesDB.findDistance(origin, destination);
                
                if (distance !== null) {
                    // Rota encontrada
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    helperText.textContent = '✓ Distância preenchida automaticamente';
                    helperText.style.color = '#00AA00';
                    console.log(`Distância encontrada: ${distance} km`);
                } else {
                    // Rota não encontrada
                    distanceInput.value = '';
                    distanceInput.readOnly = true;
                    helperText.textContent = '⚠️ Rota não encontrada. Insira a distância manualmente marcando a caixa abaixo';
                    helperText.style.color = '#FF6B6B';
                    console.log('Rota não encontrada no banco de dados');
                }
            }
        };
        
        /**
         * Event listener para mudanças no campo de origem
         */
        originInput.addEventListener('change', tryFillDistance);
        
        /**
         * Event listener para mudanças no campo de destino
         */
        destinationInput.addEventListener('change', tryFillDistance);
        
        /**
         * Event listener para o checkbox de edição manual
         */
        manualCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Checkbox marcado: permite edição manual
                distanceInput.readOnly = false;
                distanceInput.focus();
                helperText.textContent = 'Digite a distância em quilômetros';
                helperText.style.color = '#666';
                console.log('Modo manual ativado');
            } else {
                // Checkbox desmarcado: volta ao preenchimento automático
                distanceInput.readOnly = true;
                helperText.style.color = '#666';
                tryFillDistance();
                console.log('Modo automático reativado');
            }
        });
        
        console.log('Sistema de preenchimento de distância configurado');
    }
};
