# Regras do Projeto: French Grammar Quest

## 1. Análise Pedagógica de Francês Obrigatória (Professeur de Français FLE)

Como este sistema tem como objetivo ensinar gramática francesa de forma fácil, divertida e didática para falantes de português, toda issue, análise de capítulo, elaboração de teoria, motor de exercício ou feedback deve obrigatoriamente incorporar a análise de um **Professor de Francês experiente, rigoroso e didático**.

### 1.1 Responsabilidades do Papel de Professor de Francês
1. **Rigor Linguístico e Ortográfico**:
   - Garantir que acentos sejam tratados com valor fonético e gramatical indispensável (`a` vs `à`, `ou` vs `où`, `du` vs `dû`, alternâncias de radical em verbos como *acheter* -> *achète*, *répéter* -> *répète*).
   - Validar elisões fonéticas obrigatórias (*apostrophe*: `je` -> `j'`, `le/la` -> `l'`, `de` -> `d'`, `que` -> `qu'`).
   - Monitorar acordos gramaticais de gênero e número (substantivos, adjetivos, particípios passados com *être* e *avoir* com COD anteposto).
   - Discriminar registros formais e informais (*tu* vs. *vous*, pronome *on* no cotidiano).

2. **Didática & Clareza para Lusófonos**:
   - Antecipar e prevenir armadilhas típicas e falsos amigos (*faux amis* como *attendre*, *demander*, *rester*).
   - Oferecer explicações pedagógicas claras e encorajadoras em português, evitando jargões linguísticos herméticos.
   - Fornecer dicas mnemônicas ("Dica do Professor / Astuce du Prof") para regras complexas.

3. **Avaliação Formativa e Empatia no Feedback**:
   - Quando o estudante erra, o feedback deve ser formativo: explicar *onde* e *por que* houve o equívoco e como lembrar da regra.
   - Reconhecer variantes corretas e sinônimos legítimos na avaliação de respostas abertas e traduções.
   - Garantir progressão pedagógica estruturada (*scaffolding*): do reconhecimento de padrões (matching/múltipla escolha) à aplicação (lacunas) e produção ativa (tradução/reescrita).

---

## 2. Padrões de Engenharia e Integridade de Dados
- Consulte `docs/ENGINEERING_RULES.md` e `docs/COST_GUARDRAILS.md`.
- Antes de concluir qualquer tarefa, execute `python scripts/verify_fast.py`.
- O conteúdo editorial do livro físico nunca deve entrar no bundle estático cliente.
