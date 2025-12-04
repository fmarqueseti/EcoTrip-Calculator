/**
 * Calculator - Módulo de cálculos de emissões de CO₂
 * Realiza todos os cálculos relacionados a emissões, poupança e créditos de carbono
 */

const Calculator = {
    /**
     * Calcula a emissão de CO₂ para uma rota específica
     * @param {number} distanceKm - Distância em quilômetros
     * @param {string} transportMode - Modo de transporte (bicycle, car, bus, truck)
     * @returns {number} Emissão em kg de CO₂, arredondado a 2 casas decimais
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Obtém o fator de emissão para o modo de transporte
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];
        
        // Valida se o modo de transporte existe
        if (emissionFactor === undefined) {
            console.error(`Modo de transporte inválido: ${transportMode}`);
            return 0;
        }
        
        // Calcula: distância * fator de emissão
        const emission = distanceKm * emissionFactor;
        
        // Retorna arredondado a 2 casas decimais
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calcula emissões para todos os modos de transporte em uma distância específica
     * Compara cada modo com o carro como baseline
     * @param {number} distanceKm - Distância em quilômetros
     * @returns {Array} Array de objetos ordenado por emissão (menor primeiro)
     *                  Formato: [{ mode: 'bicycle', emission: 0, percentageVsCar: 0 }, ...]
     */
    calculateAllModes: function(distanceKm) {
        const results = [];
        
        // Calcula emissão para o carro (baseline)
        const carEmission = this.calculateEmission(distanceKm, 'car');
        
        // Itera sobre todos os modos de transporte
        for (const mode in CONFIG.EMISSION_FACTORS) {
            // Calcula emissão para este modo
            const emission = this.calculateEmission(distanceKm, mode);
            
            // Calcula percentual em relação ao carro
            // Se carro = 0 (não deve ocorrer), percentual = 0
            const percentageVsCar = carEmission > 0 ? 
                (emission / carEmission) * 100 : 0;
            
            // Adiciona resultado ao array
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: Math.round(percentageVsCar * 100) / 100
            });
        }
        
        // Ordena por emissão (menor primeiro)
        results.sort((a, b) => a.emission - b.emission);
        
        return results;
    },

    /**
     * Calcula economia de CO₂ comparando emissão real com baseline
     * @param {number} emission - Emissão real em kg de CO₂
     * @param {number} baselineEmission - Emissão baseline (ex: carro) em kg de CO₂
     * @returns {Object} Objeto com economia: { savedKg: 6.5, percentage: 50.0 }
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calcula kg economizados
        const savedKg = baselineEmission - emission;
        
        // Calcula percentual economizado
        // Se baseline = 0, percentual = 0
        const percentage = baselineEmission > 0 ? 
            (savedKg / baselineEmission) * 100 : 0;
        
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Calcula quantos créditos de carbono equivalem à emissão
     * Baseado em CONFIG.CARBON_CREDIT.KG_PER_CREDIT
     * @param {number} emissionKg - Emissão em kg de CO₂
     * @returns {number} Quantidade de créditos, arredondado a 4 casas decimais
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emissão pela quantidade de kg por crédito
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        
        // Retorna arredondado a 4 casas decimais (maior precisão para créditos)
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estima o preço em reais para uma quantidade de créditos de carbono
     * Usa faixa de preço mínimo e máximo do CONFIG
     * @param {number} credits - Quantidade de créditos de carbono
     * @returns {Object} Objeto com estimativas de preço:
     *                   { min: 50.50, max: 150.50, average: 100.50 }
     */
    estimateCreditPrice: function(credits) {
        // Obtém preços mínimo e máximo do CONFIG
        const priceMin = CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        const priceMax = CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        // Calcula preço mínimo: créditos * preço mínimo
        const minPrice = credits * priceMin;
        
        // Calcula preço máximo: créditos * preço máximo
        const maxPrice = credits * priceMax;
        
        // Calcula preço médio
        const averagePrice = (minPrice + maxPrice) / 2;
        
        return {
            min: Math.round(minPrice * 100) / 100,
            max: Math.round(maxPrice * 100) / 100,
            average: Math.round(averagePrice * 100) / 100
        };
    }
};
