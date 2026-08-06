const express = require('express');
const http = require('http');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const server = http.createServer(app);

// Mantive a porta estável 49860
const PORT = 49860;

// SUA CHAVE DE API ATIVA:
require('dotenv').config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
app.use(express.json());
app.use(express.static('public'));

const historicoConversas = {};

function obterHistorico(usuarioId) {
    if (!historicoConversas[usuarioId]) {
        historicoConversas[usuarioId] = [
            {
                role: "user",
                parts: [{ text: `
                Você é a assistente virtual oficial de atendimento da Universidade de Cruz Alta - UNICRUZ.
                Seu objetivo é guiar alunos e candidatos com precisão sobre a instituição.

                [BASE DE CONHECIMENTO (Use apenas estas informações)]
                - Matrículas: Podem ser feitas diretamente no portal acadêmico ou na Secretaria Geral. Documentos: RG, CPF, Histórico Escolar e Comprovante de Residência.
                - Rematrícula: O prazo regular ocorre sempre através do Portal do Aluno. É necessário estar em dia com a tesouraria da instituição para liberar o sistema.
                - Localização: Secretaria Geral e Protocolo ficam no Prédio Central. A Biblioteca no Prédio Administrativo. Os laboratórios variam de acordo com o Centro de Ensino (Ex: Saúde, Tecnológicas).
                - Horário de Atendimento: Segunda a Sexta, das 08h às 11h30min e das 13h30min às 22h.
                - Telefones e Contatos: O telefone geral da Unicruz é (55) 3321-1500. O número da Central de Atendimento Acadêmico / Secretaria Acadêmica é (55) 3043-0111.
                - Informações Gerais sobre os Cursos: A UNICRUZ possui nota 3 no Índice Geral de Cursos do MEC. A instituição oferta cerca de 25 cursos de graduação entre bacharelados, licenciaturas e tecnológicos, além de pós-graduação e cursos técnicos.
                - Lista de Cursos Disponíveis:
                  * Saúde e Bem-Estar: Biomedicina, Educação Física Bacharelado, Enfermagem, Farmácia, Fisioterapia, Medicina Veterinária e Tecnólogo em Estética e Cosmética.
                  * Exatas, Tecnologias e Negócios: Administração, Agronomia, Arquitetura e Urbanismo, Ciência da Computação, Ciências Contábeis e Engenharia Civil.
                  * Humanas e Sociais: Direito e Licenciaturas como Pedagogia e Matemática.
                   
    
                     -sobre as inscrições para o Vestibular de Inverno (Semestre 02) 
                      estão abertas de 11 de maio a 29 de junho.
                      Abaixo estão os detalhes práticos para o ingresso na instituição:Inscrições: 
                      São gratuitas e podem ser realizadas online.
                      Formato da Prova: O candidato pode optar por fazer a prova online ou agendar no campus.
                      Alternativa de Ingresso: É possível usar a nota de redação do ENEM (exames de 2020 a 2024) para substituir a prova da instituição.
                      Matrículas: A confirmação de matrícula dos aprovados no Vestibular de Inverno segue logo após a realização do processo
                       
                    

                [REGRAS DE COMPORTAMENTO]
                1. Se o aluno perguntar algo fora da BASE DE CONHECIMENTO, responda: "Infelizmente não tenho essa informação específica no momento. Deseja que eu te encaminhe para o atendimento presencial da Secretaria Geral?"
                2. Nunca invente prazos, valores ou telefones que não estão listados acima.
                3. Responda sempre em português, de forma educada, acolhedora, curta e direta.
                
                Entendido? Se sim, responda apenas confirmando com um 'Olá!' e aguarde as perguntas dos alunos.` }]
            },
            {
                role: "model",
                parts: [{ text: "Olá! Sou a assistente virtual da UNICRUZ. Estou pronta para atender os alunos." }]
            }
        ];
    }
    return historicoConversas[usuarioId];
}

// ROTA DO CHAT
app.post('/chat', async (req, res) => {
    const mensagem = req.body.mensagem || req.body.mensaje || req.body.texto;
    
    if (!mensagem) {
        return res.status(400).json({ resposta: "Por favor, digite uma mensagem válida." });
    }

    try {
        const respostaIA = await consultarGemini("totem_local", mensagem);
        res.json({ resposta: respostaIA });
    } catch (error) {
        console.error("Erro interno no processamento:", error);
        res.status(500).json({ resposta: "Desculpe, tive um problema ao processar. Tente novamente!" });
    }
});

async function consultarGemini(usuarioId, mensagemUsuario) {
    const historico = obterHistorico(usuarioId);
    
    historico.push({
        role: "user",
        parts: [{ text: mensagemUsuario }]



          

    });
// Usando o modelo correto exigido pelo novo SDK
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', 
        contents: historico,
        config: {
            temperature: 0.2
        }
    });
    
    

    let respostaBot = response.text || "Não consegui formular uma resposta. Pode perguntar de outra forma?";

    historico.push({
        role: "model",
        parts: [{ text: respostaBot }]
    });

    return respostaBot;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(PORT, () => {
    console.log(` Totem UNICRUZ rodando em: http://localhost:${PORT}`);
});