import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TheoryReader } from './TheoryReader';

describe('TheoryReader Component', () => {
  it('renders chapter number and title in header', () => {
    render(
      <TheoryReader
        chapterNumber={1}
        chapterTitle="The present tense of regular -er verbs"
        content={`## Introduction

French verbs in -er are regular.`}
      />
    );

    expect(screen.getByText('Chapitre 1')).toBeInTheDocument();
    expect(screen.getByText('The present tense of regular -er verbs')).toBeInTheDocument();
    expect(screen.getByText('French verbs in -er are regular.')).toBeInTheDocument();
  });

  it('renders markdown tables with accessibility wrapper and lang="fr" on cells', () => {
    const tableMarkdown = `
| French | English |
| --- | --- |
| je parle | I speak |
| tu parles | you speak |
`;

    const { container } = render(<TheoryReader content={tableMarkdown} />);

    const tableWrapper = container.querySelector('.theory-table-wrapper');
    expect(tableWrapper).toBeInTheDocument();
    expect(tableWrapper).toHaveAttribute('role', 'region');

    const frenchCell = screen.getByText('je parle');
    expect(frenchCell).toBeInTheDocument();
    expect(frenchCell).toHaveAttribute('lang', 'fr');
  });

  it('preserves French accents, ligatures and special punctuation', () => {
    const accentMarkdown = `
Les verbes comme **commencer** prennent une cédille (*nous commençons*) et **manger** un *e* muet (*nous mangeons*).
Exemples : *élève*, *fenêtre*, *cœur*, « bonjour ».
`;

    render(<TheoryReader content={accentMarkdown} />);

    expect(screen.getByText(/nous commençons/i)).toBeInTheDocument();
    expect(screen.getByText(/nous mangeons/i)).toBeInTheDocument();
    expect(screen.getByText(/cœur/i)).toBeInTheDocument();
  });

  it('renders blockquotes as styled teacher tip callouts', () => {
    const calloutMarkdown = `
> [!TIP]
> ### Astuce du Prof
> Les terminaisons -e, -es, -ent sont silencieuses !
`;

    const { container } = render(<TheoryReader content={calloutMarkdown} />);

    const callout = container.querySelector('.theory-callout');
    expect(callout).toBeInTheDocument();
    expect(callout).toHaveAttribute('role', 'note');
    expect(screen.getByText(/Astuce du Prof/i)).toBeInTheDocument();
    expect(screen.getByText(/Les terminaisons -e, -es, -ent sont silencieuses/i)).toBeInTheDocument();
  });

  it('CRITICAL SECURITY (T-023): sanitizes dangerous XSS payloads like <script> and onerror', () => {
    const maliciousMarkdown = `
# Malicious Content

<script>window.__xss_executed = true;</script>
<img src="invalid" onerror="window.__xss_img = true;" />
<a href="javascript:alert('pwned')">Click here</a>
`;

    const { container } = render(<TheoryReader content={maliciousMarkdown} />);

    // Ensure <script> tag was completely stripped
    const scriptTag = container.querySelector('script');
    expect(scriptTag).toBeNull();

    // Ensure onerror was stripped from img if present
    const imgTag = container.querySelector('img');
    if (imgTag) {
      expect(imgTag).not.toHaveAttribute('onerror');
    }

    // Ensure javascript: link was sanitized
    const linkTag = container.querySelector('a');
    if (linkTag) {
      expect(linkTag.getAttribute('href')).not.toMatch(/^javascript:/i);
    }
  });

  it('renders fallback message gracefully when content is empty or comments only', () => {
    render(<TheoryReader content="<!-- subtopic_id: ch01 -->" />);
    expect(screen.getByText(/Aucun contenu de théorie disponible/i)).toBeInTheDocument();
  });

  it('does not leak Rehype AST "node" prop into rendered DOM elements', () => {
    const { container } = render(
      <TheoryReader content="## Header 2\n\n**Bold text** and `code`." />
    );

    const h2 = container.querySelector('.theory-h2');
    expect(h2).not.toHaveAttribute('node');

    const strong = container.querySelector('.theory-strong');
    expect(strong).not.toHaveAttribute('node');
  });
});
