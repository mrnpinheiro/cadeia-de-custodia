import { parse } from 'csv-parse/sync';

const csvUnidades = `codunidade,instituto,diretoria,nucleo
3,IC,CEAP,Análise Instrumental
4,IC,CEAP,Balística
5,IC,CEAP,Biologia e Bioquímica
6,IC,CEAP,Física
7,IC,CEAP,Química
8,IC,CEAP,Entorpecentes
10,IC,CP,Acidentes de Trânsito
11,IC,CP,Crimes Contábeis
12,IC,CP,Crimes Contra o Patrimônio
13,IC,CP,Crimes Contra a Pessoa
14,IC,CP,Documentoscopia
15,IC,CP,Engenharia
16,IC,CP,Perícias Especiais
17,IC,CP,Identificação Criminal
18,IC,CP,Perícia de Informática
19,IC,CP,Araçatuba
20,IC,CP,Araçatuba
21,IC,CP,Araçatuba
22,IC,CP,Araraquara
23,IC,CP,Araraquara
24,IC,CP,Araraquara
25,IC,CP,Bauru
26,IC,CP,Bauru
27,IC,CP,Araçatuba
28,IC,CP,Campinas
29,IC,CP,Americana
30,IC,CP,Campinas
31,IC,CP,Campinas
32,IC,CP,Americana
33,IC,CP,Campinas
34,IC,CP,Americana
35,IC,CP,Americana
36,IC,CP,Americana
37,IC,CP,Capital e Grande São Paulo
38,IC,CP,Capital e Grande São Paulo
41,IC,CP,Capital e Grande São Paulo
42,IC,CP,Capital e Grande São Paulo
43,IC,CP,Capital e Grande São Paulo
44,IC,CP,Capital e Grande São Paulo
45,IC,CP,Capital e Grande São Paulo
46,IC,CP,Capital e Grande São Paulo
47,IC,CP,Capital e Grande São Paulo
48,IC,CP,Capital e Grande São Paulo
49,IC,CP,Capital e Grande São Paulo
50,IC,CP,Capital e Grande São Paulo
51,IC,CP,Capital e Grande São Paulo
52,IC,CP,Capital e Grande São Paulo
53,IC,CP,Capital e Grande São Paulo
54,IC,CP,Bauru
55,IC,CP,Presidente Prudente
56,IC,CP,Bauru
57,IC,CP,Bauru
58,IC,CP,Presidente Prudente
59,IC,CP,Presidente Prudente
60,IC,CP,Presidente Prudente
61,IC,CP,Presidente Prudente
62,IC,CP,Ribeirão Preto
63,IC,CP,Ribeirão Preto
64,IC,CP,Ribeirão Preto
65,IC,CP,Ribeirão Preto
66,IC,CP,Ribeirão Preto
67,IC,CP,Ribeirão Preto
68,IC,CP,Santos
69,IC,CP,Santos
70,IC,CP,Santos
71,IC,CP,Santos
72,IC,CP,Santos
73,IC,CP,São Jose dos Campos
74,IC,CP,São Jose do Rio Preto
75,IC,CP,São Jose do Rio Preto
76,IC,CP,São Jose do Rio Preto
77,IC,CP,São Jose do Rio Preto
78,IC,CP,São Jose do Rio Preto
79,IC,CP,São Jose do Rio Preto
80,IC,CP,São Jose dos Campos
81,IC,CP,São Jose dos Campos
82,IC,CP,São Jose dos Campos
83,IC,CP,São Jose dos Campos
84,IC,CP,São Jose dos Campos
85,IC,CP,Sorocaba
86,IC,CP,Sorocaba
87,IC,CP,Sorocaba
88,IC,CP,Sorocaba
89,IC,CP,Sorocaba
173,IC,CP,JECRIM
174,IC,CP,Capital e Grande São Paulo
175,IC,CP,Supervisão de Plantão
176,IC,CEAP,Biologia e Bioquímica
177,IC,CEAP,Biologia e Bioquímica
`;

const records = parse(csvUnidades, {
  columns: true,
  skip_empty_lines: true
});

const obj = {};
for (const record of records) {
  obj[record.codunidade] = record.instituto;
}

export default obj;
