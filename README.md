# Desafio Wind Dashboard

Criar uma página web que atenda as demandas abaixo.
A página deve apresentar uma interface amigável, bonita e limpa,
 na qual o usuário possa visualizar as informações de forma clara.


## Contexto

> A Visualização de Dados e Informações é uma área relativamente nova e tem ganho destaque pois, com os avanços tecnológicos e científicos, a quantidade de dados e informações que um usuário pode coletar se torna, muitas vezes, enorme, podendo sobrecarregá-lo. Deste modo, é necessário que o usuário saiba como deve organizar seus dados, a fim de que eles possam ser corretamente apresentados e interpretados.
>
> -- <cite>[Wikipedia](https://pt.wikipedia.org/wiki/Visualiza%C3%A7%C3%A3o_de_dados)</cite>

A pessoa estagiária de desenvolvimento Web dará suporte no desenvolvimento de um site interno para gestão de ativos, onde são consolidadas em tempo real, informações relacionadas aos parques eólicos em operação e torres anemométricas da empresa. Diversas análises desenvolvidas pelos times de Data Science e Recurso Eólico também são visualizadas através dessa plataforma. O estagiário será responsável, principalmente, por auxiliar no desenvolvimento, validação e implantação de melhorias no front-end, mas também auxiliará em correções no back-end.

## Instruções

- Leia este README até o fim;
- Faça um fork desse repositório. Em seguida, crie uma branch, cujo nome é o seu nome completo;
- Utilizando a branch com o seu nome, implemente as demandas abaixo com os arquivos *index.hml*, *script.js* e *style.css*;
- Verifique se o código está de acordo com os *requisitos de código*;
- Verifique se o código atende os requisitos funcionais das demandas;
- Ao finalizar o desafio, faça um pull request de sua branch para esse repositório.


### Manual da API INMET.GOV

- Recuperar todas estações de acordo com o tipo passado como parâmetro:
  - Tipos:
    - Automáticas: T
    - Manuais: M
  - https://apitempo.inmet.gov.br/estacoes/<tipo>
  - https://apitempo.inmet.gov.br/estacoes/T

- Recuperar dados horários referentes a todas as estações automáticas de um determinado dia:
  - https://apitempo.inmet.gov.br/estacoes/dados/<data>
  - https://apitempo.inmet.gov.br/estacao/dados/2020-05-02
  - Sendo data no formato **AAAA-MM-DD** (ex: 2020-05-020)

- Recuperar dados horários referentes a estação automática ou manual:
  - https://apitempo.inmet.gov.br/estacao/<data_inicial>/<data_final>/<cod_estacao>
  - https://apitempo.inmet.gov.br/estacao/2019-10-23/2019-10-23/A301
  - Sendo data no formato **AAAA-MM-DD** (ex: 2019-10-23)

- Recuperar dados diários referentes a estação automática ou manual:
  - https://apitempo.inmet.gov.br/estacao/diaria/<data_inicial>/<data_final>/<cod_estacao>
  - https://apitempo.inmet.gov.br/estacao/diaria/2019-10-01/2019-10-31/A301
  - Sendo data no formato **AAAA-MM-DD** (ex: 2019-10-31)


## Formato dos dados

**SÉRIES DIÁRIAS**
| CAMPO         | DESCRIÇÃO                                   | UNIDADE |
| ------------- | ------------------------------------------- | ------- |
| CHUVA         | Precipitação Total, Diario (Aut)            | mm      |
| PRESS_ATM_MED | Pressao Atmosferica Media Diaria (Aut)      | mB      |
| TEMP_MAX      | Temperatura Máxima, Diaria (Aut)            | °C      |
| TEMP_MED      | Temperatura Média, Diária (Aut)             | °C      |
| TEMP_MIN      | Temperatura Mínima, Diaria (Aut)            | °C      |
| UMID_MED      | Umidade Relativa Do Ar, Media Diaria (Aut)  | %       |
| UMID_MIN      | Umidade Relativa Do Ar, Minima Diaria (Aut) | %       |
| VEL_VENTO_MED | Vento, Velocidade Média Diária (Aut)        | m/s     |

**SÉRIES HORÁRIAS**
| CAMPO         | DESCRIÇÃO                                        | UNIDADE |
| ------------- | ------------------------------------------------ | ------- |
| VEN_DIR       | Vento, Direção Horaria (Gr)                      | ° (gr)  |
| CHUVA         | Precipitação Total, Horário                      | mm      |
| PRE_INS       | Pressão Atmosférica Ao Nível Da Estacão, Horaria | mB      |
| PRE_MIN       | Pressão Atmosférica Min. Na Hora Ant. (Aut)      | mB      |
| UMD_MAX       | Umidade Rel. Max. Na Hora Ant. (Aut)             | %       |
| PRE_MAX       | Pressão Atmosférica Max.Na Hora Ant. (Aut)       | mB      |
| VEN_VEL       | Vento, Velocidade Horaria                        | m/s     |
| PTO_MIN       | Temperatura Orvalho Min. Na Hora Ant. (Aut)      | °C      |
| TEM_MAX       | Temperatura Máxima Na Hora Ant. (Aut)            | °C      |
| RAD_GLO       | Radiação Global                                  | KJ/m²   |
| PTO_INS       | Temperatura Do Ponto De Orvalho                  | °C      |
| VEN_RAJ       | Vento, Rajada Máxima                             | m/s     |
| TEM_INS       | Temperatura Do Ar - Bulbo Seco, Horaria          | °C      |
| UMD_INS       | Umidade Relativa Do Ar, Horaria                  | %       |
| TEM_MIN       | Temperatura Mínima Na Hora Ant. (Aut)            | °C      |
| UMD_MIN       | Umidade Rel. Min. Na Hora Ant. (Aut)             | %       |
| PTO_MAX       | Temperatura Orvalho Max. Na Hora Ant. (Aut)      | °C      |


Para mais informações vide o manual no site do INMET: [link](https://portal.inmet.gov.br/manual/manual-de-uso-da-api-esta%C3%A7%C3%B5es)



## Requisitos de código

- O código deve estar bem organizado;
- A página não deve apresentar nenhuma mensagem de erro, ou *warning*, para o usuário (inclusive no console).
- Não utilizar bibliotecas além das listadas abaixo:
  - [Bootstrap](https://getbootstrap.com/)
  - [PlotlyJs](https://plotly.com/javascript/)
- Utilizar a paleta de cores da Rio Energy:
  - [Principal](https://coolors.co/00d35c-c4f27a-1a1b86-000000-12121d-4a4a57-ecf1f4-fafcfe-ffffff)
  - [Apoio](https://coolors.co/18197a-311aa1-4719bb-7417ef-e84800-ff4f00-ff9200-ffd400-ffdf3f-dddd00)

### HTML
- Sempre criar as tags e parâmetros usando *lowercase*;
- Evitar espaços em branco a direita;
- Usar 4 espaços para indentação;
- Deixar uma linha em branco após para cada bloco de código;
- Tags com elementos filhos devem ser indentadas;
- Tags sem elementos filhos não devem ser indentadas.

### CSS
- Usar sempre *lowercase*;
- Evitar espaços em branco a direita;
- Usar 4 espaços para indentação;
- Usar nomes de classes e ids que façam sentido;
- Sempre colocar duas linhas entre as declarações de regra.

### Javascript
- Variáveis devem usar *camelCase* com a primeira letra minúscula;
- Evitar espaços em branco a direita;
- Usar 2 espaços para indentação;
- Usar ";" de forma consistente, usa sempre ou não usa nunca.


## Demanda 1: Processamento de dados


- Criar as seguintes funções:
  - variancia: Retorna a variância de uma relação de números;
  - desvio_padrao: Retorna o desvio padrão de uma relação de números;
  - covar: Retorna a covariância entre duas listas de números;
  - rmse: Retorna a métrica [RMSE - root mean squared error](https://en.wikipedia.org/wiki/Root-mean-square_deviation) para dois conjuntos numéricos;
  - linear_reg: Calcula a [regressão linear simples](https://pt.wikipedia.org/wiki/Regress%C3%A3o_linear_simples) entre duas listas e retorna um objeto com as métricas "coeficiente linear" e "coeficiente angular".
    - Exemplo: `{ slope: 3, intercept: '1.4'}`
  - predict: Retorna uma série numérica com base no objeto de regressão linear e outra série numérica.



## Demanda 2: Visualização de dados

Criar uma página para exibição dos dados das estações meteorológicas **automáticas**.
O objetivo da página é permitir a comparação entre duas séries temporais.
Os dados escolhidos deverão ser processados adequadamente e exibidos em um conjunto de gráficos e tabelas descritos abaixo.

- Deve ser possível escolher:
  - Estação;
  - Tipo da série de dados, horário ou diário;
  - Duas séries temporais (posteriormente chamadas de primeira série e segunda série);
  - Data de inicio
  - Data de fim

A página deve conter:
- Gráfico de linha com as séries escolhidas pelo usuário;
- Tabela com as seguintes métricas de ambas as séries:
   - Máximo;
   - Mínimo;
   - Desvio Padrão;
   - Variância;
   - Covariância;
   - RMSE.
- Gráfico de linha com duas séries:
  - Primeira série escolhida pelo usuário;
  - Primeira série extrapolada a partir dos dados da segunda, utilizando a função *predict*.
- Gráfico de linha com duas séries:
  - Segunda série escolhida pelo usuário;
  - Segunda série extrapolada a partir dos dados da primeira, utilizando a função *predict*.


### Manual da API INMET.GOV

- Recuperar todas estações de acordo com o tipo passado como parâmetro:
  - Tipos:
    - Automáticas: T
    - Manuais: M
  - https://apitempo.inmet.gov.br/estacoes/`<tipo>`
  - https://apitempo.inmet.gov.br/estacoes/T

- Recuperar dados horários referentes a todas as estações automáticas de um determinado dia:
  - https://apitempo.inmet.gov.br/estacoes/dados/`<data>`
  - https://apitempo.inmet.gov.br/estacao/dados/2020-05-02
  - Sendo data no formato **AAAA-MM-DD** (ex: 2020-05-020)

- Recuperar dados horários referentes a todas as estações automáticas de um determinado dia e hora:
  - https://apitempo.inmet.gov.br/estacoes/dados/`<data>`/`<data>`
  - https://apitempo.inmet.gov.br/estacao/dados/2020-05-02/0800
  - Sendo data no formato **AAAA-MM-DD** (ex: 2020-05-02)
  - Sendo hora no formato HH00 hora cheia (ex: 1200), considera horário UTC

- Recuperar dados horários referentes a estação automática ou manual:
  - https://apitempo.inmet.gov.br/estacao/`<data_inicial>`/`<data_final>`/`<cod_estacao>`
  - https://apitempo.inmet.gov.br/estacao/2019-10-23/2019-10-23/A301
  - Sendo data no formato **AAAA-MM-DD** (ex: 2019-10-23)

- Recuperar dados diários referentes a estação automática ou manual:
  - https://apitempo.inmet.gov.br/estacao/diaria/`<data_inicial>`/`<data_final>`/`<cod_estacao>`
  - https://apitempo.inmet.gov.br/estacao/diaria/2019-10-01/2019-10-31/A301
  - Sendo data no formato **AAAA-MM-DD** (ex: 2019-10-31)


## Formato dos dados

**SERIES DIÁRIAS**
| CAMPO         | DESCRIÇÃO                                   | UNIDADE |
| ------------- | ------------------------------------------- | ------- |
| CHUVA         | Precipitação Total, Diario (Aut)            | mm      |
| PRESS_ATM_MED | Pressao Atmosferica Media Diaria (Aut)      | mB      |
| TEMP_MAX      | Temperatura Máxima, Diaria (Aut)            | °C      |
| TEMP_MED      | Temperatura Média, Diária (Aut)             | °C      |
| TEMP_MIN      | Temperatura Mínima, Diaria (Aut)            | °C      |
| UMID_MED      | Umidade Relativa Do Ar, Media Diaria (Aut)  | %       |
| UMID_MIN      | Umidade Relativa Do Ar, Minima Diaria (Aut) | %       |
| VEL_VENTO_MED | Vento, Velocidade Média Diária (Aut)        | m/s     |

**SERIES HORÁRIAS**
| CAMPO         | DESCRIÇÃO                                        | UNIDADE |
| ------------- | ------------------------------------------------ | ------- |
| VEN_DIR       | Vento, Direção Horaria (Gr)                      | ° (gr)  |
| CHUVA         | Precipitação Total, Horário                      | mm      |
| PRE_INS       | Pressão Atmosférica Ao Nível Da Estacão, Horaria | mB      |
| PRE_MIN       | Pressão Atmosférica Min. Na Hora Ant. (Aut)      | mB      |
| UMD_MAX       | Umidade Rel. Max. Na Hora Ant. (Aut)             | %       |
| PRE_MAX       | Pressão Atmosférica Max.Na Hora Ant. (Aut)       | mB      |
| VEN_VEL       | Vento, Velocidade Horaria                        | m/s     |
| PTO_MIN       | Temperatura Orvalho Min. Na Hora Ant. (Aut)      | °C      |
| TEM_MAX       | Temperatura Máxima Na Hora Ant. (Aut)            | °C      |
| RAD_GLO       | Radiação Global                                  | KJ/m²   |
| PTO_INS       | Temperatura Do Ponto De Orvalho                  | °C      |
| VEN_RAJ       | Vento, Rajada Máxima                             | m/s     |
| TEM_INS       | Temperatura Do Ar - Bulbo Seco, Horaria          | °C      |
| UMD_INS       | Umidade Relativa Do Ar, Horaria                  | %       |
| TEM_MIN       | Temperatura Mínima Na Hora Ant. (Aut)            | °C      |
| UMD_MIN       | Umidade Rel. Min. Na Hora Ant. (Aut)             | %       |
| PTO_MAX       | Temperatura Orvalho Max. Na Hora Ant. (Aut)      | °C      |


Para mais informações vide o manual no site do INMET: [link](https://portal.inmet.gov.br/manual/manual-de-uso-da-api-esta%C3%A7%C3%B5es)



## Adicionais (opcional)

- Faça commits que descrevam o que está sendo implementado no código em questão;
- Fazer com que os gráficos mantenham sempre o mesmo nível de zoom;
- Responsividade, deve funcionar bem em telas pequenas (Um bom jeito de testar isso é a opção "toggle device toolbar" <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> no DevTools do Google Chrome).