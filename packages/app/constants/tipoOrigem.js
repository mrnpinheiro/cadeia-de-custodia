import { parse } from 'csv-parse/sync';

var csvTipoOrigem = `cod_tipoorigem,tipoorigem,tipoorgaoorigem,cod_tipoorgao
1,REP/SRA,IC,2
2,BO,Civil,1
3,IP,Civil,1
4,IP/PM,PM,3
5,Processo,Judiciário,5
6,S.A./P.A./Apuração Sumária,Civil,1
7,TC,Civil,1
8,TC/PM,PM,3
9,Ofício,Ofício,6
10,Controle,Controle,7
11,Laudo,IC,2
12,Corregedoria/Civil,Civil,1
13,Corregedoria/PM,PM,3
14,MSG,Civil,1
15,Protocolo,IC,2
16,R.E,IC,2
17,R.D.O,Civil,1
18,P.A,Civil,1
19,Sindicância,PM,3
20,Autuação Sumária,Civil,1
21,Requisição,Civil,1
23,Apuração Preliminar,Civil,1
24,EB,Forças Armadas,4
25,A.I,Civil,1
26,Auto,Civil,1
27,BO/PM,PM,3
28,Talão,Civil,1
29,P.I.C.,Civil,1
30,I.C,MP,8
31,Carta Precatória,Civil,1
32,Despacho,IC,2
`

const records = parse(csvTipoOrigem, {
    columns: true,
    skip_empty_lines: true
});

export default records;