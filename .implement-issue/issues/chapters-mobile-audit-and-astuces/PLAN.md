# Auditoria e Otimização Mobile (316x568) + Tradução Pedagógica das Astuces FLE

## 1. Contexto e Diagnóstico

### 1.1 Diagnóstico de Responsividade (316x568 - iPhone SE / Ultra-compacto)
Através do rastreador automatizado Playwright (`scripts/audit_live_site.mjs`), foram auditadas a rota `/chapters` (visões Trilha Sinuosa e Lista por Mundos) e todos os 28 capítulos (abas Théorie, Exercices e Astuces FLE). Foram identificados os seguintes gargalos:
1. **Overflow Horizontal na barra de status superior (`.top-status-bar`)**:
   - O pseudo-elemento `::before` de `.theme-mini-toggle` possuía `inset: -5px`, ultrapassando a margem direita da tela de 316px e forçando scroll horizontal.
   - Ajuste: compensar o padding/inset e garantir `overflow: hidden` na barra ou margem de segurança no botão.
2. **Nó ativo da trilha sinuosa (`.path-node-active`)**:
   - O badge flutuante "Commencer" não tinha ancoragem central (`left: 50%; transform: translateX(-50%)`), estendendo a largura do nó para 82px (contra 72px de clientWidth).
   - Ajuste: centralização absoluta do badge sobre o nó.
3. **Abas de capítulo (`.chapter-tabs` e `.chapter-tab-btn`)**:
   - A altura de toque dos botões de abas no mobile ultra-compacto era de apenas 26px, violando a regra de acessibilidade mínima de 44px (Fitts' Law / touch targets).
   - Card de visão geral (`.chapter-overview-card`) consumia 48px de padding horizontal (`var(--space-6)` = 24px cada lado), restando apenas 268px de largura útil.
   - Ajuste: `min-height: 44px` nos botões de abas, padding reduzido para 12px em telas `<= 360px`, e layout fluido.
4. **Tabelas de Gramática no Théorie (`.theory-table`)**:
   - As tabelas de conjugação possuem até 616px de largura. Embora encapsuladas em `.theory-table-wrapper`, em 316px necessitam de controle de quebra de palavra e scroll suave com indicação visual para o usuário.
5. **Alternador de Modos de Visão (`.view-toggle`)**:
   - Os dois botões "Trilha Sinuosa" e "Lista por Mundos" mediam 300px juntos, ficando muito próximos da borda em 316px.
   - Ajuste: flex distribuído 50%/50% em telas compactas.

### 1.2 Diagnóstico Pedagógico FLE (Aba "Astuces")
- **Problema**: Nos Capítulos 1 a 8 e 20 a 28, os parágrafos explicativos dos cards de dicas pedagógicas foram escritos em francês, enquanto na aba "Théorie" as explicações estão em português claro.
- **Regra do Projeto (AGENTS.md & PROJECT_RULES.md)**: "Como este sistema tem como objetivo ensinar gramática francesa de forma fácil, divertida e didática para falantes de português, toda issue (...) deve obrigatoriamente incorporar a análise de um Professor de Francês experiente, rigoroso e didático (...) Oferecer explicações pedagógicas claras e encorajadoras em português, evitando jargões linguísticos herméticos".
- **Solução**: Reescrever todos os parágrafos explicativos (`<p>`) das dicas dos Capítulos 1 a 8 e 20 a 28 em português didático, acolhedor e focado nas dificuldades do aluno lusófono (falsos amigos, elisões, pronúncias mudas, acordos de particípio, posições de pronomes, ausência de partitivo no português), preservando integralmente os títulos `<h3>` esperados pelos testes de regressão automatizados e destacando os exemplos em francês (`lang="fr"`).

---

## 2. Plano de Execução

1. **Camada de Estilo (CSS) - Mobile 316x568**:
   - Corrigir `.top-status-bar`, `.top-status-right` e `.theme-mini-toggle`.
   - Ajustar `.path-node-active-badge` e limites de offset no mapa sinuoso.
   - Aprimorar `.view-toggle` para telas compactas `<= 360px`.
   - Garantir touch target de 44px em `.chapter-tab-btn` e padding proporcional em `.chapter-overview-card`.
   - Polir `.tip-card` e `.tip-example` para que nenhuma frase em francês ou comentário quebre horizontalmente.

2. **Camada Pedagógica FLE (ChapterPage.tsx)**:
   - Traduzir e enriquecer didaticamente as explicações dos capítulos 1, 2, 3, 4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 25, 26, 27, 28 na aba Astuces FLE.
   - Manter compatibilidade com `ChapterPage.test.tsx`.

3. **Validação Automatizada**:
   - Executar suíte de testes unitários com Vitest (`npm run test`).
   - Executar verificador completo do projeto (`python scripts/verify_fast.py`).
   - Executar teste Playwright em 316x568 para confirmar zero overflows e renderização 100% perfeita.
