# Rota Mínima

**Link do vídeo do Trabalho 4:**

[Vídeo Trabalho 4 - EDAII](https://youtu.be/-n9Zo4yZyaE)

## Alunos

| Matrícula  | Nome                         |
| ---------- | ---------------------------- |
| 21/1062446 | Renan Araújo de Souza        |
| 21/1062080 | Leandro Almeida Rocha Santos |

## Descrição do projeto

Este projeto foca na visualização e cálculo do menor caminho entre cidades do DF utilizando a biblioteca Leaflet para mapas e o algoritmo BFS.

## Guia de instalação

### Dependências do projeto

**Linguagem**: Typescript<br>
**Framework**: React, Nodev22

### Como executar o projeto

```
git clone https://github.com/EDAII/Grafos_rotaMinima.git
```

```
npm install
```

```
npm run dev
```

## Capturas de tela

<img width="1909" height="953" alt="image" src="https://github.com/user-attachments/assets/42e72723-2e5a-481e-be70-4590d1df0573" />
<img width="1912" height="952" alt="image" src="https://github.com/user-attachments/assets/e02cabb9-7eeb-4157-b9ce-456e8d52762c" />
<img width="1912" height="956" alt="image" src="https://github.com/user-attachments/assets/43c42bf4-3cbf-470e-8aa2-ae9023934b37" />
<img width="1914" height="954" alt="image" src="https://github.com/user-attachments/assets/b36510e2-5dbf-4d20-9fac-a93650ef2310" />

## Conclusões

Observou-se ao longo do desenvolvimento do trabalho que, embora a BFS encontre o caminho com menor número de arestas em um grafo, isso não corresponde necessariamente às menores distâncias reais. Um trajeto considerado “menor” pela BFS pode, na prática, resultar em um percurso maior em quilômetros do que outro caminho que passa por mais nós.

## Referências

- BFS: https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/
