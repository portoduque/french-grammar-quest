import React from 'react';
import { PathNode, NodeStatus } from './PathNode';

export interface ChapterProgress {
  number: number;
  id: string;
  title: string;
  status: NodeStatus;
  stars?: number;
}

export interface LearningPathSnakeProps {
  chapters: ChapterProgress[];
  onSelectChapter: (chapterId: string) => void;
}

interface WorldGroup {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  chapterRange: [number, number];
  themeClass: string;
}

const WORLDS: WorldGroup[] = [
  {
    id: 'world-1',
    name: 'Mundo 1: Les Fondations',
    subtitle: 'O Presente do Indicativo, Artigos, Substantivos e Adjetivos',
    icon: '🏰',
    chapterRange: [1, 6],
    themeClass: 'world-theme-emerald',
  },
  {
    id: 'world-2',
    name: 'Mundo 2: Les Temps du Passé',
    subtitle: 'Passé Composé, Imparfait e a narrativa no passado',
    icon: '⏳',
    chapterRange: [7, 12],
    themeClass: 'world-theme-cyan',
  },
  {
    id: 'world-3',
    name: 'Mundo 3: L’Espace et les Pronoms',
    subtitle: 'Pronomes Objeto Direto/Indireto, Y, En e Relativos',
    icon: '🧭',
    chapterRange: [13, 18],
    themeClass: 'world-theme-violet',
  },
  {
    id: 'world-4',
    name: 'Mundo 4: Les Nuances et le Virtuel',
    subtitle: 'Futur, Conditionnel e o Subjonctif',
    icon: '🔮',
    chapterRange: [19, 24],
    themeClass: 'world-theme-amber',
  },
  {
    id: 'world-5',
    name: 'Mundo 5: Le Sommet de la Maîtrise',
    subtitle: 'Participios, Regências e o Final Boss com 345 questões',
    icon: '👑',
    chapterRange: [25, 28],
    themeClass: 'world-theme-rose',
  },
];

const OFFSETS: Array<'center' | 'left' | 'center' | 'right'> = [
  'center',
  'left',
  'center',
  'right',
];

export const LearningPathSnake: React.FC<LearningPathSnakeProps> = ({
  chapters,
  onSelectChapter,
}) => {
  return (
    <div className="learning-path-snake" aria-label="Trilha de Aprendizado">
      {WORLDS.map((world) => {
        const worldChapters = chapters.filter(
          (c) => c.number >= world.chapterRange[0] && c.number <= world.chapterRange[1]
        );

        return (
          <section key={world.id} className={`world-section ${world.themeClass}`}>
            <header className="world-header">
              <span className="world-icon" aria-hidden="true">{world.icon}</span>
              <div className="world-info">
                <h2 className="world-name">{world.name}</h2>
                <p className="world-subtitle">{world.subtitle}</p>
              </div>
            </header>

            <div className="snake-nodes-track">
              {worldChapters.map((chapter, index) => {
                const offset = OFFSETS[index % OFFSETS.length];
                const isLastInWorld = chapter.number === world.chapterRange[1];
                const isFinalBoss = chapter.number === 28;

                return (
                  <div key={chapter.id} className="snake-step">
                    <PathNode
                      id={chapter.id}
                      number={chapter.number}
                      title={chapter.title}
                      status={isFinalBoss && chapter.status !== 'completed' ? 'boss' : chapter.status}
                      stars={chapter.stars}
                      offset={offset}
                      icon={isFinalBoss ? '👑' : isLastInWorld ? '🛡️' : undefined}
                      onClick={() => onSelectChapter(chapter.id)}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
