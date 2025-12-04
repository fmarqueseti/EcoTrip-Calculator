/**
 * RoutesDB - Base de dados de rotas e cidades brasileiras
 * Contém informações de distâncias entre principais cidades do Brasil
 * e métodos para consultar e processar dados de rotas
 */

const RoutesDB = {
    /**
     * Array de rotas com origem, destino e distância em quilômetros
     * Formato: { origin: "Cidade, UF", destination: "Cidade, UF", distanceKm: número }
     */
    routes: [
        // Conexões entre capitais
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1961 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2527 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 715 },
        { origin: "Brasília, DF", destination: "Belo Horizonte, MG", distanceKm: 716 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 840 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 792 },
        
        // Rotas regionais principais
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Búzios, RJ", distanceKm: 167 },
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Araxá, MG", distanceKm: 368 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 108 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 315 },
        { origin: "Curitiba, PR", destination: "São Paulo, SP", distanceKm: 408 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 1134 },
        
        // Rotas do nordeste
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 115 },
        { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 8 },
        { origin: "Fortaleza, CE", destination: "Sobral, CE", distanceKm: 239 },
        { origin: "São Luís, MA", destination: "Imperatriz, MA", distanceKm: 628 },
        
        // Rotas do norte
        { origin: "Manaus, AM", destination: "Belém, PA", distanceKm: 1619 },
        { origin: "Belém, PA", destination: "Marabá, PA", distanceKm: 485 },
        
        // Rotas do sul
        { origin: "Porto Alegre, RS", destination: "Pelotas, RS", distanceKm: 264 },
        { origin: "Curitiba, PR", destination: "Londrina, PR", distanceKm: 365 },
        { origin: "Florianópolis, SC", destination: "Blumenau, SC", distanceKm: 331 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        
        // Rotas do centro-oeste
        { origin: "Cuiabá, MT", destination: "Várzea Grande, MT", distanceKm: 30 },
        { origin: "Campo Grande, MS", destination: "Dourados, MS", distanceKm: 225 },
        
        // Rotas interestaduais importantes
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 220 },
        { origin: "Belo Horizonte, MG", destination: "Governador Valadares, MG", distanceKm: 380 },
        { origin: "Salvador, BA", destination: "Ilhéus, BA", distanceKm: 463 },
        { origin: "São Paulo, SP", destination: "Ubatuba, SP", distanceKm: 192 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 155 },
        { origin: "Fortaleza, CE", destination: "Crato, CE", distanceKm: 532 },
    ],

    /**
     * Retorna um array ordenado e sem duplicatas de todas as cidades do banco de dados
     * @returns {string[]} Array de cidades únicas ordenadas alfabeticamente
     */
    getAllCities: function() {
        const citiesSet = new Set();
        
        // Adiciona origem e destino de cada rota ao Set
        this.routes.forEach(route => {
            citiesSet.add(route.origin);
            citiesSet.add(route.destination);
        });
        
        // Converte para array, ordena alfabeticamente e retorna
        return Array.from(citiesSet).sort();
    },

    /**
     * Encontra a distância entre duas cidades
     * Busca em ambas as direções (origem-destino e destino-origem)
     * Normaliza as entradas convertendo para minúsculas e removendo espaços extras
     * @param {string} origin - Cidade de origem
     * @param {string} destination - Cidade de destino
     * @returns {number|null} Distância em km se encontrada, null caso contrário
     */
    findDistance: function(origin, destination) {
        // Normaliza as entradas: trim() e toLowerCase()
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();
        
        // Procura a rota nos dois sentidos
        for (let route of this.routes) {
            const routeOrigin = route.origin.toLowerCase();
            const routeDestination = route.destination.toLowerCase();
            
            // Verifica se encontrou a rota na direção origem -> destino
            if (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) {
                return route.distanceKm;
            }
            
            // Verifica se encontrou a rota na direção destino -> origem (rota reversa)
            if (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin) {
                return route.distanceKm;
            }
        }
        
        // Retorna null se a rota não for encontrada
        return null;
    }
};
