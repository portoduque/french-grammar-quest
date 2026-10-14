import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReferencesPage } from './ReferencesPage';

describe('ReferencesPage (RF-023 Références FLE)', () => {
  it('renderiza as tabelas de referência gramatical e dicas do professor FLE', () => {
    render(<ReferencesPage />);

    expect(screen.getByText(/Références & Tables Grammaticales/i)).toBeInTheDocument();
    expect(screen.getByText('Verbe Auxiliaire : Être')).toBeInTheDocument();
    expect(screen.getByText('Verbe Auxiliaire : Avoir')).toBeInTheDocument();
    expect(screen.getByText(/Verbes Réguliers en -er/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Conseil du Professeur FLE/i).length).toBeGreaterThanOrEqual(1);
  });

  it('permite filtrar termos gramaticais pela barra de busca instantânea', () => {
    render(<ReferencesPage />);

    const searchInput = screen.getByLabelText(/Rechercher une règle/i);
    fireEvent.change(searchInput, { target: { value: 'accord' } });

    expect(screen.getByText('Accord du Participe Passé')).toBeInTheDocument();
    expect(screen.queryByText('Verbe Auxiliaire : Être')).not.toBeInTheDocument();
  });

  it('permite filtrar fiches gramaticais por botão de categoria', () => {
    render(<ReferencesPage />);

    const pronomsBtn = screen.getByRole('button', { name: /Pronoms Relatifs/i });
    fireEvent.click(pronomsBtn);

    expect(screen.getByText(/Pronoms Relatifs Simples : Qui, Que, Où, Dont/i)).toBeInTheDocument();
    expect(screen.queryByText('Verbe Auxiliaire : Être')).not.toBeInTheDocument();
  });

  it('exibe empty state educativo quando nenhum termo coincide', () => {
    render(<ReferencesPage />);

    const searchInput = screen.getByLabelText(/Rechercher une règle/i);
    fireEvent.change(searchInput, { target: { value: 'termo_inexistente_xyz' } });

    expect(screen.getByText('Aucune règle trouvée')).toBeInTheDocument();
  });

  it('encontra termos mesmo quando o usuário pesquisa sem acento (ex: etre encontra Être)', () => {
    render(<ReferencesPage />);

    const searchInput = screen.getByLabelText(/Rechercher une règle/i);
    fireEvent.change(searchInput, { target: { value: 'etre' } });

    expect(screen.getByText('Verbe Auxiliaire : Être')).toBeInTheDocument();
  });
});
