import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExercisePage } from './ExercisePage';

// Mock do supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: {
              id: 'ch01-ex01',
              chapter_id: 'ch01',
              order_index: 1,
              title: 'Exercice 1.1',
              instruction: 'Mettre les verbes entre parenthèses au présent.',
              interaction_type: 'fill_blank',
              questions_count: 1,
              created_at: new Date().toISOString()
            },
            error: null
          }),
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'ch01-ex01-q01',
                exercise_set_id: 'ch01-ex01',
                order_index: 1,
                prompt: 'Lucie _________________ (travailler) à Lyon.',
                instruction: null,
                tokens: null,
                options: null,
                accepted_answers: ['travaille'],
                explanation: 'Verbe en -er',
                created_at: new Date().toISOString()
              }
            ],
            error: null
          })
        }))
      }))
    }))
  }
}));

describe('ExercisePage', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  it('carrega e renderiza a sessão de exercício da rota', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/exercise/ch01-ex01']}>
          <Routes>
            <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Deve carregar e encontrar o exercício e a questão
    expect(await screen.findByText('Exercice 1.1')).toBeInTheDocument();
    expect(await screen.findByText(/Lucie/)).toBeInTheDocument();
    expect(screen.getByRole('toolbar', { name: /Clavier des accents/ })).toBeInTheDocument();
  });
});
