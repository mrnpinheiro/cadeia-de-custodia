import { parse } from 'csv-parse/sync';

var csvFuncao = `cod_funcao,funcao
1,Agente de Telecom. Policial
2,Agente Policial
3,Atendente de Necrotério
4,Auxiliar de Necropsia
5,Desenhista Técnico Pericial
6,Escrivão de Polícia
7,Estagiário / Frente de Trabalh
8,Fotógrafo Técnico Pericial
9,Investigador de Polícia
10,Médico Legista
11,Oficial Administrativo
12,Perito Criminal
13,Diretor
14,Chefe
15,Protocolo
`

const records = parse(csvFuncao, {
    columns: true,
    skip_empty_lines: true
});

export default records;