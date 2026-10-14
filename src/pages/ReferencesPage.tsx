import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export interface ReferenceItem {
  id: string;
  category: 'auxiliaires' | 'terminaisons' | 'pronoms' | 'accords';
  title: string;
  subtitle: string;
  tags: string[];
  content: {
    description: string;
    table?: { headers: string[]; rows: string[][] };
    examples: { fr: string; pt: string }[];
    tip: string;
  };
}

export const GRAMMAR_REFERENCES: ReferenceItem[] = [
  {
    id: 'ref-aux-etre',
    category: 'auxiliaires',
    title: 'Verbe Auxiliaire : Être',
    subtitle: 'Présent de l’indicatif & Usage aux temps composés',
    tags: ['être', 'présent', 'auxiliaire', 'fondations'],
    content: {
      description: 'Être est utilisé comme auxiliaire pour les verbes de mouvement (DR & MRS VANDERTRAMP) et tous les verbes pronominaux.',
      table: {
        headers: ['Pronom', 'Présent', 'Passé Composé (Participe : été)'],
        rows: [
          ['Je', 'suis', "J'ai été"],
          ['Tu', 'es', 'Tu as été'],
          ['Il / Elle / On', 'est', 'Il a été'],
          ['Nous', 'sommes', 'Nous avons été'],
          ['Vous', 'êtes', 'Vous avez été'],
          ['Ils / Elles', 'sont', 'Ils ont été'],
        ]
      },
      examples: [
        { fr: 'Je suis prêt pour la mission.', pt: 'Estou pronto para a missão.' },
        { fr: 'Elle est allée à Paris.', pt: 'Ela foi a Paris.' }
      ],
      tip: "Attention à la liaison : 'Vous êtes' se prononce [vu-z-ɛt] avec un son [z]."
    }
  },
  {
    id: 'ref-aux-avoir',
    category: 'auxiliaires',
    title: 'Verbe Auxiliaire : Avoir',
    subtitle: 'Présent de l’indicatif & Emploi général aux temps composés',
    tags: ['avoir', 'présent', 'auxiliaire', 'fondations'],
    content: {
      description: 'Avoir est le verbe auxiliaire par défaut pour la grande majorité des verbes transitifs et intransitifs en français.',
      table: {
        headers: ['Pronom', 'Présent', 'Passé Composé (Participe : eu)'],
        rows: [
          ["J'", 'ai', "J'ai eu"],
          ['Tu', 'as', 'Tu as eu'],
          ['Il / Elle / On', 'a', 'Il a eu'],
          ['Nous', 'avons', 'Nous avons eu'],
          ['Vous', 'avez', 'Vous avez eu'],
          ['Ils / Elles', 'ont', 'Ils ont eu'],
        ]
      },
      examples: [
        { fr: "J'ai faim et j'ai sommeil.", pt: 'Estou com fome e com sono.' },
        { fr: 'Nous avons fini nos devoirs.', pt: 'Nós terminamos nossas tarefas.' }
      ],
      tip: "Ne confondez pas 'ils ont' [il-z-õ] (avoir) et 'ils sont' [il-sõ] (être) !"
    }
  },
  {
    id: 'ref-term-er',
    category: 'terminaisons',
    title: 'Verbes Réguliers en -er (1er Groupe)',
    subtitle: 'Terminaisons du présent de l’indicatif',
    tags: ['er', 'présent', 'terminaisons', 'fondations'],
    content: {
      description: 'Le premier groupe rassemble environ 90% des verbes français. Toutes les terminaisons du singulier et de la 3e personne du pluriel sont muettes.',
      table: {
        headers: ['Pronom', 'Terminaison', 'Exemple (Parler)'],
        rows: [
          ['Je', '-e', 'Je parle'],
          ['Tu', '-es', 'Tu parles'],
          ['Il / Elle / On', '-e', 'Il parle'],
          ['Nous', '-ons', 'Nous parlons'],
          ['Vous', '-ez', 'Vous parlez'],
          ['Ils / Elles', '-ent', 'Ils parlent (prononcé /paʁl/)'],
        ]
      },
      examples: [
        { fr: 'Nous habitons à Lyon.', pt: 'Nós moramos em Lyon.' },
        { fr: 'Vous étudiez la grammaire.', pt: 'Vocês estudam gramática.' }
      ],
      tip: 'La terminaison -ent des verbes ne se prononce JAMAIS. Elle est purement graphique.'
    }
  },
  {
    id: 'ref-pron-relatifs',
    category: 'pronoms',
    title: 'Pronoms Relatifs Simples : Qui, Que, Où, Dont',
    subtitle: 'Lier deux propositions sans répétition',
    tags: ['pronoms', 'relatifs', 'qui', 'que', 'dont', 'où'],
    content: {
      description: 'Les pronoms relatifs remplacent un nom (antécédent) et introduisent une proposition subordonnée relative.',
      table: {
        headers: ['Pronom', 'Fonction', 'Règle essentielle'],
        rows: [
          ['qui', 'Sujet du verbe subordonné', 'Suivi immédiatement d’un verbe (qui parle...)'],
          ['que / qu’', 'COD (Complément d’Objet Direct)', 'Suivi d’un sujet (que je vois...)'],
          ['où', 'Complément de lieu ou de temps', "La ville où j'habite / Le jour où..."],
          ['dont', 'Complément introduit par « de »', 'Le livre dont je parle (parler de)'],
        ]
      },
      examples: [
        { fr: "L'étudiant qui comprend réussit.", pt: 'O estudante que compreende passa.' },
        { fr: "Le roman que j'ai lu est captivant.", pt: 'O romance que li é cativante.' },
        { fr: "C'est l'ami dont je t'ai parlé.", pt: 'É o amigo de quem te falei.' }
      ],
      tip: "« Que » s'élide obligatoirement devant voyelle (qu'il, qu'elle). « Qui » ne s'élide JAMAIS."
    }
  },
  {
    id: 'ref-accord-participe',
    category: 'accords',
    title: 'Accord du Participe Passé',
    subtitle: 'Règles fondamentales avec Être et Avoir',
    tags: ['accord', 'participe', 'passé composé', 'grammaire'],
    content: {
      description: "Le participe passé s'accorde selon des règles précises qui dépendent de l'auxiliaire employé.",
      table: {
        headers: ['Auxiliaire', 'Règle d’accord', 'Exemple'],
        rows: [
          ['Être', "S'accorde TOUJOURS en genre et nombre avec le sujet", 'Elles sont arrivées.'],
          ['Avoir', "Ne s'accorde JAMAIS avec le sujet", 'Ils ont chanté toute la nuit.'],
          ['Avoir + COD avant', "S'accorde avec le COD placé AVANT le verbe", 'Les lettres que tu as écrites.'],
          ['Verbes pronominaux', "S'accorde avec le COD si celui-ci précède", 'Elle s’est lavée. / Elle s’est lavé les mains.']
        ]
      },
      examples: [
        { fr: 'Marie et Sophie sont parties hier.', pt: 'Marie e Sophie partiram ontem.' },
        { fr: 'Quelle belle chanson tu as chantée !', pt: 'Que bela canção você cantou!' }
      ],
      tip: "Avec avoir, posez la question : 'Avoir + participe + QUI ? ou QUOI ?'. Si la réponse est avant le verbe, accordez !"
    }
  }
];

export const ReferencesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return GRAMMAR_REFERENCES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.tags.some((t) => t.toLowerCase().includes(term)) ||
        item.content.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="page page-references" style={{ maxWidth: '1080px', margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              📖 Références & Tables Grammaticales (FLE)
            </h1>
            <p className="page-subtitle" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              Consultez rapidement les conjugaisons, pronoms, accords et règles fondamentales des 28 chapitres
            </p>
          </div>
          <Badge variant="cyan">RF-023 Certifié FLE</Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Rechercher une règle, un verbe ou un pronom :"
            type="search"
            placeholder="Ex : être, terminaisons, dont, participe passé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Catégorie :
            </span>
            {[
              { id: 'all', label: 'Toutes les fiches' },
              { id: 'auxiliaires', label: 'Auxiliaires (Être / Avoir)' },
              { id: 'terminaisons', label: 'Terminaisons Régulières' },
              { id: 'pronoms', label: 'Pronoms Relatifs' },
              { id: 'accords', label: 'Règles d’Accord' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'var(--color-primary)' : 'var(--color-bg-secondary, rgba(0,0,0,0.04))',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '20px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: selectedCategory === cat.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Reference Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredItems.map((item) => (
          <Card key={item.id} variant="elevated" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
                  {item.title}
                </h2>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  {item.subtitle}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', margin: '0 0 1rem 0' }}>
              {item.content.description}
            </p>

            {item.content.table && (
              <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                      {item.content.table.headers.map((h, i) => (
                        <th key={i} style={{ padding: '0.6rem 0.75rem', fontWeight: 700 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.content.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '0.6rem 0.75rem', fontWeight: cIdx === 0 ? 600 : 400 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Examples & Professor Tip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-bg-secondary, rgba(0,0,0,0.02))',
                  border: '1px solid var(--color-border)'
                }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  📝 Exemples Pratiques
                </span>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
                  {item.content.examples.map((ex, exIdx) => (
                    <li key={exIdx} style={{ marginBottom: '0.4rem' }}>
                      <strong lang="fr">{ex.fr}</strong>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>
                        {ex.pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(59, 130, 246, 0.06)',
                  border: '1px solid rgba(59, 130, 246, 0.25)'
                }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563EB', display: 'block', marginBottom: '0.5rem' }}>
                  💡 Conseil du Professeur FLE
                </span>
                <p style={{ margin: 0, fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--color-text)' }}>
                  {item.content.tip}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <Card variant="default" style={{ padding: '2rem', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Aucune règle trouvée</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              Essayez un autre mot-clé ou réinitialisez le filtre de catégorie.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReferencesPage;
