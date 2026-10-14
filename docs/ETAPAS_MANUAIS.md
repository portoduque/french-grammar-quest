# Etapas manuais — o que a IA não deve esconder de você

A maior parte da configuração técnica pode ser feita por Codex, Antigravity ou Claude Code. Estas etapas envolvem sua conta, cobrança ou autorização e devem permanecer visíveis para você.

## 1. GitHub: criar o template/repositório

Você precisa escolher onde o código ficará e confirmar se o repositório será público ou privado.

## 2. GitHub Actions: proteção de custo

Para projetos privados no GitHub Free, existe uma franquia mensal de minutos. Configure **Budgets and alerts** para impedir gasto além do que você aceita.

Regra Secure Vibe: orçamento pago permitido = **R$ 0**.

Se a interface mostrar a opção **Stop usage when budget limit is reached**, mantenha-a ativada. Em escopos nos quais o GitHub aplica hard stop automaticamente, apenas confirme o orçamento/alertas.

Nunca escolha Larger runners para este template.

## 3. Antigravity: regra Always On

Se usar Antigravity, abra **Customizations → Rules**, localize a regra Secure Vibe do workspace e marque **Always On**.

## 4. SonarQube Cloud Free — opcional

A configuração da conta/token é manual porque envolve sua conta externa.

- mantenha a organização no plano Free;
- não cadastre cartão para este fluxo;
- não aceite Team trial;
- limite operacional interno Secure Vibe: **45k LOC privadas**;
- limite oficial atual do Free: **50k LOC privadas por organização**;
- o alerta de 45k é uma regra operacional deste template: confira o painel de uso antes de adicionar novos projetos privados quando estiver perto desse valor.

Você criará `SONAR_TOKEN` como secret do GitHub e as variables `SONAR_PROJECT_KEY` e `SONAR_ORGANIZATION`.

## 5. OWASP ZAP — manual por design

O ZAP não roda automaticamente em cada commit. Quando existir um ambiente de staging, você abre o workflow manualmente e informa uma URL que você controla ou tem autorização para testar.

## 6. Quando uma ferramenta pedir cartão/trial

Pare. Não aceite para “terminar a configuração”. Peça ao agente para manter o recurso opcional, trocar por alternativa open source ou continuar sem aquela integração.
