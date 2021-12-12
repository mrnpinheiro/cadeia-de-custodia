import { parse } from 'csv-parse/sync';

const csvCidade = `cod_cidade,cidade
1,Adamantina
2,Adolfo
3,Aguaí
4,Águas da Prata
5,Águas de Lindóia
6,Águas de Santa Bárbara
7,Águas de São Pedro
8,Agudos
9,Alambari
10,Alfredo Marcondes
11,Altair
12,Altinópolis
13,Alto Alegre
14,Alumínio
15,Álvares Florence
16,Álvares Machado
17,Álvaro de Carvalho
18,Alvinlândia
19,Americana
20,Américo Brasiliense
21,Américo de Campos
22,Amparo
23,Analândia
24,Andradina
25,Angatuba
26,Anhembi
27,Anhumas
28,Aparecida
29,Aparecida D´oeste
30,Apiaí
31,Araçariguama
32,Araçatuba
33,Araçoiaba da Serra
34,Aramina
35,Arandu
36,Arapeí
37,Araraquara
38,Araras
39,Arco-íris
40,Arealva
41,Areias
42,Areiópolis
43,Ariranha
44,Artur Nogueira
45,Arujá
46,Aspásia
47,Assis
48,Atibaia
49,Auriflama
50,Avaí
51,Avanhandava
52,Avaré
53,Bady Bassitt
54,Balbinos
55,Bálsamo
56,Bananal
57,Barão de Antonina
58,Barbosa
59,Bariri
60,Barra Bonita
61,Barra do Chapéu
62,Barra do Turvo
63,Barretos
64,Barrinha
65,Barueri
66,Bastos
67,Batatais
68,Bauru
69,Bebedouro
70,Bento de Abreu
71,Bernardino de Campos
72,Bertioga
73,Bilac
74,Birigui
75,Biritiba-mirim
76,Boa Esperança do Sul
77,Bocaina
78,Bofete
79,Boituva
80,Bom Jesus Dos Perdões
81,Bom Sucesso de Itararé
82,Borá
83,Boracéia
84,Borborema
85,Borebi
86,Botucatu
87,Bragança Paulista
88,Braúna
89,Brejo Alegre
90,Brodowski
91,Brotas
92,Buri
93,Buritama
94,Buritizal
95,Cabrália Paulista
96,Cabreúva
97,Caçapava
98,Cachoeira Paulista
99,Caconde
100,Cafelândia
101,Caiabu
102,Caieiras
103,Caiuá
104,Cajamar
105,Cajati
106,Cajobi
107,Cajuru
108,Campina do Monte Alegre
109,Campinas
110,Campo Limpo Paulista
111,Campos do Jordão
112,Campos Novos Paulista
113,Cananéia
114,Canas
115,Cândido Mota
116,Cândido Rodrigues
117,Canitar
118,Capão Bonito
119,Capela do Alto
120,Capivari
121,Caraguatatuba
122,Carapicuíba
123,Cardoso
124,Casa Branca
125,Cássia Dos Coqueiros
126,Castilho
127,Catanduva
128,Catiguá
129,Cedral
130,Cerqueira César
131,Cerquilho
132,Cesário Lange
133,Charqueada
134,Chavantes
135,Clementina
136,Colina
137,Colômbia
138,Conchal
139,Conchas
140,Cordeirópolis
141,Coroados
142,Coronel Macedo
143,Corumbataí
144,Cosmópolis
145,Cosmorama
146,Cotia
147,Cravinhos
148,Cristais Paulista
149,Cruzália
150,Cruzeiro
151,Cubatão
152,Cunha
153,Descalvado
154,Diadema
155,Dirce Reis
156,Divinolândia
157,Dobrada
158,Dois Córregos
159,Dolcinópolis
160,Dourado
161,Dracena
162,Duartina
163,Dumont
164,Echaporã
165,Eldorado
166,Elias Fausto
167,Elisiário
168,Embaúba
169,Embu
170,Embu-guaçu
171,Emilianópolis
172,Engenheiro Coelho
173,Espírito Santo do Pinhal
174,Espírito Santo do Turvo
175,Estiva Gerbi
176,Estrela D´oeste
177,Estrela do Norte
178,Euclides da Cunha Paulista
179,Fartura
180,Fernando Prestes
181,Fernandópolis
182,Fernão
183,Ferraz de Vasconcelos
184,Flora Rica
185,Floreal
186,Flórida Paulista
187,Florínia
188,Franca
189,Francisco Morato
190,Franco da Rocha
191,Gabriel Monteiro
192,Gália
193,Garça
194,Gastão Vidigal
195,Gavião Peixoto
196,General Salgado
197,Getulina
198,Glicério
199,Guaiçara
200,Guaimbê
201,Guaíra
202,Guapiaçu
203,Guapiara
204,Guará
205,Guaraçaí
206,Guaraci
207,Guarani D´oeste
208,Guarantã
209,Guararapes
210,Guararema
211,Guaratinguetá
212,Guareí
213,Guariba
214,Guarujá
215,Guarulhos
216,Guatapará
217,Guzolândia
218,Herculândia
219,Holambra
220,Hortolândia
221,Iacanga
222,Iacri
223,Iaras
224,Ibaté
225,Ibirá
226,Ibirarema
227,Ibitinga
228,Ibiúna
229,Icém
230,Iepê
231,Igaraçu do Tietê
232,Igarapava
233,Igaratá
234,Iguape
235,Ilha Comprida
236,Ilha Solteira
237,Ilhabela
238,Indaiatuba
239,Indiana
240,Indiaporã
241,Inúbia Paulista
242,Ipaussu
243,Iperó
244,Ipeúna
245,Ipiguá
246,Iporanga
247,Ipuã
248,Iracemápolis
249,Irapuã
250,Irapuru
251,Itaberá
252,Itaí
253,Itajobi
254,Itaju
255,Itanhaém
256,Itaóca
257,Itapecerica da Serra
258,Itapetininga
259,Itapeva
260,Itapevi
261,Itapira
262,Itapirapuã Paulista
263,Itápolis
264,Itaporanga
265,Itapuí
266,Itapura
267,Itaquaquecetuba
268,Itararé
269,Itariri
270,Itatiba
271,Itatinga
272,Itirapina
273,Itirapuã
274,Itobi
275,Itu
276,Itupeva
277,Ituverava
278,Jaborandi
279,Jaboticabal
280,Jacareí
281,Jaci
282,Jacupiranga
283,Jaguariúna
284,Jales
285,Jambeiro
286,Jandira
287,Jardinópolis
288,Jarinu
289,Jaú
290,Jeriquara
291,Joanópolis
292,João Ramalho
293,José Bonifácio
294,Júlio Mesquita
295,Jumirim
296,Jundiaí
297,Junqueirópolis
298,Juquiá
299,Juquitiba
300,Lagoinha
301,Laranjal Paulista
302,Lavínia
303,Lavrinhas
304,Leme
305,Lençóis Paulista
306,Limeira
307,Lindóia
308,Lins
309,Lorena
310,Lourdes
311,Louveira
312,Lucélia
313,Lucianópolis
314,Luís Antônio
315,Luiziânia
316,Lupércio
317,Lutécia
318,Macatuba
319,Macaubal
320,Macedônia
321,Magda
322,Mairinque
323,Mairiporã
324,Manduri
325,Marabá Paulista
326,Maracaí
327,Marapoama
328,Mariápolis
329,Marília
330,Marinópolis
331,Martinópolis
332,Matão
333,Mauá
334,Mendonça
335,Meridiano
336,Mesópolis
337,Miguelópolis
338,Mineiros do Tietê
339,Mira Estrela
340,Miracatu
341,Mirandópolis
342,Mirante do Paranapanema
343,Mirassol
344,Mirassolândia
345,Mococa
346,Mogi Guaçu
347,Moji Das Cruzes
348,Moji-mirim
349,Mombuca
350,Monções
351,Mongaguá
352,Monte Alegre do Sul
353,Monte Alto
354,Monte Aprazível
355,Monte Azul Paulista
356,Monte Castelo
357,Monte Mor
358,Monteiro Lobato
359,Morro Agudo
360,Morungaba
361,Motuca
362,Murutinga do Sul
363,Nantes
364,Narandiba
365,Natividade da Serra
366,Nazaré Paulista
367,Neves Paulista
368,Nhandeara
369,Nipoã
370,Nova Aliança
371,Nova Campina
372,Nova Canaã Paulista
373,Nova Castilho
374,Nova Europa
375,Nova Granada
376,Nova Guataporanga
377,Nova Independência
378,Nova Luzitânia
379,Nova Odessa
380,Novais
381,Novo Horizonte
382,Nuporanga
383,Ocauçu
384,Óleo
385,Olímpia
386,Onda Verde
387,Oriente
388,Orindiúva
389,Orlândia
390,Osasco
391,Oscar Bressane
392,Osvaldo Cruz
393,Ourinhos
394,Ouro Verde
395,Ouroeste
396,Pacaembu
397,Palestina
398,Palmares Paulista
399,Palmeira D´oeste
400,Palmital
401,Panorama
402,Paraguaçu Paulista
403,Paraibuna
404,Paraíso
405,Paranapanema
406,Paranapuã
407,Parapuã
408,Pardinho
409,Pariquera-açu
410,Parisi
411,Patrocínio Paulista
412,Paulicéia
413,Paulínia
414,Paulistânia
415,Paulo de Faria
416,Pederneiras
417,Pedra Bela
418,Pedranópolis
419,Pedregulho
420,Pedreira
421,Pedrinhas Paulista
422,Pedro de Toledo
423,Penápolis
424,Pereira Barreto
425,Pereiras
426,Peruíbe
427,Piacatu
428,Piedade
429,Pilar do Sul
430,Pindamonhangaba
431,Pindorama
432,Pinhalzinho
433,Piquerobi
434,Piquete
435,Piracaia
436,Piracicaba
437,Piraju
438,Pirajuí
439,Pirangi
440,Pirapora do Bom Jesus
441,Pirapozinho
442,Pirassununga
443,Piratininga
444,Pitangueiras
445,Planalto
446,Platina
447,Poá
448,Poloni
449,Pompéia
450,Pongaí
451,Pontal
452,Pontalinda
453,Pontes Gestal
454,Populina
455,Porangaba
456,Porto Feliz
457,Porto Ferreira
458,Potim
459,Potirendaba
460,Pracinha
461,Pradópolis
462,Praia Grande
463,Pratânia
464,Presidente Alves
465,Presidente Bernardes
466,Presidente Epitácio
467,Presidente Prudente
468,Presidente Venceslau
469,Promissão
470,Quadra
471,Quatá
472,Queiroz
473,Queluz
474,Quintana
475,Rafard
476,Rancharia
477,Redenção da Serra
478,Regente Feijó
479,Reginópolis
480,Registro
481,Restinga
482,Ribeira
483,Ribeirão Bonito
484,Ribeirão Branco
485,Ribeirão Corrente
486,Ribeirão do Sul
487,Ribeirão Dos Índios
488,Ribeirão Grande
489,Ribeirão Pires
490,Ribeirão Preto
491,Rifaina
492,Rincão
493,Rinópolis
494,Rio Claro
495,Rio Das Pedras
496,Rio Grande da Serra
497,Riolândia
498,Riversul
499,Rosana
500,Roseira
501,Rubiácea
502,Rubinéia
503,Sabino
504,Sagres
505,Sales
506,Sales Oliveira
507,Salesópolis
508,Salmourão
509,Saltinho
510,Salto
511,Salto de Pirapora
512,Salto Grande
513,Sandovalina
514,Santa Adélia
515,Santa Albertina
516,Santa Bárbara D´oeste
517,Santa Branca
518,Santa Clara D´oeste
519,Santa Cruz da Conceição
520,Santa Cruz da Esperança
521,Santa Cruz Das Palmeiras
522,Santa Cruz do Rio Pardo
523,Santa Ernestina
524,Santa fé do Sul
525,Santa Gertrudes
526,Santa Isabel
527,Santa Lúcia
528,Santa Maria da Serra
529,Santa Mercedes
530,Santa Rita D´oeste
531,Santa Rita do Passa Quatro
532,Santa Rosa de Viterbo
533,Santa Salete
534,Santana da Ponte Pensa
535,Santana de Parnaíba
536,Santo Anastácio
537,Santo André
538,Santo Antônio da Alegria
539,Santo Antônio de Posse
540,Santo Antônio do Aracanguá
541,Santo Antônio do Jardim
542,Santo Antônio do Pinhal
543,Santo Expedito
544,Santópolis do Aguapeí
545,Santos
546,São Bento do Sapucaí
547,São Bernardo do Campo
548,São Caetano do Sul
549,São Carlos
550,São Francisco
551,São João da Boa Vista
552,São João Das Duas Pontes
553,São João de Iracema
554,São João do Pau D´alho
555,São Joaquim da Barra
556,São José da Bela Vista
557,São José do Barreiro
558,São José do Rio Pardo
559,São José do Rio Preto
560,São José Dos Campos
561,São Lourenço da Serra
562,São Luís do Paraitinga
563,São Manuel
564,São Miguel Arcanjo
565,São Paulo
566,São Pedro
567,São Pedro do Turvo
568,São Roque
569,São Sebastião
570,São Sebastião da Grama
571,São Simão
572,São Vicente
573,Sarapuí
574,Sarutaiá
575,Sebastianópolis do Sul
576,Serra Azul
577,Serra Negra
578,Serrana
579,Sertãozinho
580,Sete Barras
581,Severínia
582,Silveiras
583,Socorro
584,Sorocaba
585,Sud Mennucci
586,Sumaré
587,Suzanápolis
588,Suzano
589,Tabapuã
590,Tabatinga
591,Taboão da Serra
592,Taciba
593,Taguaí
594,Taiaçu
595,Taiúva
596,Tambaú
597,Tanabi
598,Tapiraí
599,Tapiratiba
600,Taquaral
601,Taquaritinga
602,Taquarituba
603,Taquarivaí
604,Tarabai
605,Tarumã
606,Tatuí
607,Taubaté
608,Tejupá
609,Teodoro Sampaio
610,Terra Roxa
611,Tietê
612,Timburi
613,Torre de Pedra
614,Torrinha
615,Trabiju
616,Tremembé
617,Três Fronteiras
618,Tuiuti
619,Tupã
620,Tupi Paulista
621,Turiúba
622,Turmalina
623,Ubarana
624,Ubatuba
625,Ubirajara
626,Uchoa
627,União Paulista
628,Urânia
629,Uru
630,Urupês
631,Valentim Gentil
632,Valinhos
633,Valparaíso
634,Vargem
635,Vargem Grande do Sul
636,Vargem Grande Paulista
637,Várzea Paulista
638,Vera Cruz
639,Vinhedo
640,Viradouro
641,Vista Alegre do Alto
642,Vitória Brasil
643,Votorantim
644,Votuporanga
645,Zacarias
`;

const records = parse(csvCidade, {
  columns: true,
  skip_empty_lines: true
});

const obj = {};
for (const record of records) {
  obj[record.cod_cidade] = record.cidade;
}

export default obj;
