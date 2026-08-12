Totem UNICRUZ — IA de Primeiro Atendimento (Nível 3) 
Projeto desenvolvido como Trabalho Final da disciplina de Métodos Numéricos, atendendo ao desafio de Nível 3 proposto para a empresa Action Day.

O objetivo do projeto é implementar uma assistente virtual inteligente focada no atendimento inicial e triagem de alunos e candidatos da Universidade de Cruz Alta (UNICRUZ).

* Funcionalidades do Projeto
Assistente Virtual Inteligente: Atendimento automatizado utilizando IA Generativa para sanar dúvidas frequentes sobre a universidade.

Base de Conhecimento Institucional: Respostas precisas sobre matrículas, rematrículas, prazos, vestibular, localização de prédios, horários de funcionamento e lista de cursos.

Fluxo Conversacional & Histórico: Gestão contínua de contexto da conversa para um diálogo natural e humanizado.

Triagem e Encaminhamento: Identificação automática da intenção do usuário e direcionamento para atendimento humano presencial na Secretaria Geral quando a demanda foge do escopo inicial.

Integração com API REST: Servidor backend construído para processamento de requisições de chat em tempo real.

* Tecnologias Utilizadas
Backend: Node.js, Express, HTTP

Integração de IA: Google GenAI SDK (gemini-2.5-flash)

Frontend / Interface: HTML5, CSS3, JavaScript (Fetch API)

* Requisitos do Desafio Atendidos (Nível 3 - Action Day)
[x] Integração com API de IA Generativa

[x] Confirmação de matrículas / orientações acadêmicas

[x] Respostas iniciais automatizadas e personalizadas

[x] Coleta e interpretação de intenções do usuário

[x] Encaminhamento inteligente para suporte presencial/humano

[x] Manutenção do histórico de conversas do usuário

* Como Executar o Projeto Localmente
Bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/totem-unicruz.git

# Entre na pasta do projeto
cd totem-unicruz

# Instale as dependências
npm install

# Execute o servidor
node index.js
Acesse em seu navegador: http://localhost:49858 (ou na porta configurada).
