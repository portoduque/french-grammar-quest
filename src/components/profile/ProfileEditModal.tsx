import React, { useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Profile } from '@/types/database';

export interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (updates: {
    display_name: string;
    avatar_url: string | null;
    preferences: Record<string, any>;
  }) => Promise<void>;
}

export const FRENCH_AVATAR_PRESETS = [
  { id: 'fleur', icon: '⚜️', label: 'Chevalier' },
  { id: 'academie', icon: '🎓', label: 'Académicien' },
  { id: 'artiste', icon: '🧑‍🎨', label: 'Artiste' },
  { id: 'croissant', icon: '🥐', label: 'Gourmet' },
  { id: 'paris', icon: '🗼', label: 'Parisien' },
  { id: 'couronne', icon: '👑', label: 'Monarque' },
  { id: 'livre', icon: '📚', label: 'Philosophe' },
  { id: 'baguette', icon: '🥖', label: 'Artisan' },
  { id: 'prince', icon: '🚀', label: 'Petit Prince' },
  { id: 'theatre', icon: '🎭', label: 'Molière' },
  { id: 'lion', icon: '🦁', label: 'Gaulois' },
  { id: 'chouette', icon: '🦉', label: 'Sage' },
  { id: 'cafe', icon: '☕', label: 'Flâneur' },
  { id: 'science', icon: '🔬', label: 'Curieux' },
] as const;

const DAILY_GOAL_OPTIONS = [
  { xp: 20, label: 'Découverte', time: '~5 min/jour', icon: '⚡' },
  { xp: 50, label: 'Régulier', time: '~15 min/jour', icon: '⭐', isDefault: true },
  { xp: 100, label: 'Intensif', time: '~30 min/jour', icon: '🔥' },
];

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  open,
  onClose,
  profile,
  onSave,
}) => {
  const currentPreferences = (profile?.preferences as Record<string, any>) || {};
  const [displayName, setDisplayName] = useState(profile?.display_name || 'Étudiant');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null);
  const [dailyGoal, setDailyGoal] = useState<number>(currentPreferences.daily_goal_xp || 50);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload'>('presets');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress chosen image to a light 200x200 base64 JPEG
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('L’image ne doit pas dépasser 8 Mo.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const size = 200;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setAvatarUrl(event.target?.result as string);
            return;
          }

          // Center crop to square
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;

          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setAvatarUrl(compressedDataUrl);
        } catch {
          // Fallback to raw data url if canvas has issues
          setAvatarUrl(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = displayName.trim() || 'Étudiant';
    setIsSaving(true);
    try {
      await onSave({
        display_name: cleanName,
        avatar_url: avatarUrl,
        preferences: {
          ...currentPreferences,
          daily_goal_xp: dailyGoal,
        },
      });
      onClose();
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Check if current avatar is custom photo or preset
  const isImageAvatar = avatarUrl?.startsWith('data:image/') || avatarUrl?.startsWith('http');

  return (
    <Modal open={open} onClose={onClose} title="Modifier mon Profil" size="md">
      <form onSubmit={handleSubmit} className="profile-edit-form">
        {/* Current Avatar Preview */}
        <div className="profile-edit-avatar-preview-wrapper">
          <div className="profile-edit-avatar-circle" aria-label="Aperçu de votre avatar">
            {isImageAvatar ? (
              <img
                src={avatarUrl!}
                alt="Aperçu de la photo de profil"
                className="profile-edit-avatar-img"
              />
            ) : (
              <span className="profile-edit-avatar-glyph">
                {avatarUrl || (displayName ? displayName.charAt(0).toUpperCase() : '👤')}
              </span>
            )}
          </div>
          <div className="profile-edit-avatar-info">
            <span className="profile-edit-avatar-title">Avatar d'apprentissage</span>
            <span className="profile-edit-avatar-sub">
              Personnalisez votre apparence dans les séries et classements
            </span>
            {avatarUrl && (
              <button
                type="button"
                className="profile-edit-avatar-reset"
                onClick={() => setAvatarUrl(null)}
              >
                Réinitialiser par défaut ↺
              </button>
            )}
          </div>
        </div>

        {/* Avatar selection tabs */}
        <div className="profile-edit-section">
          <label className="input-label">Choisir un style d'avatar</label>
          <div className="profile-avatar-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'presets'}
              className={`profile-avatar-tab ${activeTab === 'presets' ? 'active' : ''}`}
              onClick={() => setActiveTab('presets')}
            >
              ⚜️ Insignes FLE
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'upload'}
              className={`profile-avatar-tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              📷 Photo Personnelle
            </button>
          </div>

          {activeTab === 'presets' && (
            <div className="profile-presets-grid" role="group" aria-label="Insignes et personnages culturels français">
              {FRENCH_AVATAR_PRESETS.map((preset) => {
                const isSelected = avatarUrl === preset.icon;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`profile-preset-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setAvatarUrl(preset.icon)}
                    title={preset.label}
                    aria-label={`${preset.label} ${preset.icon}`}
                  >
                    <span className="preset-icon" aria-hidden="true">{preset.icon}</span>
                    <span className="preset-label">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="profile-upload-panel">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => fileInputRef.current?.click()}
                className="profile-upload-btn"
                icon="📁"
              >
                Choisir une image depuis votre appareil
              </Button>
              <p className="profile-upload-hint">
                Formats acceptés : JPG, PNG, WebP. L'image est automatiquement ajustée et protégée sur votre profil.
              </p>
              {uploadError && (
                <p className="input-error-text" role="alert">{uploadError}</p>
              )}
            </div>
          )}
        </div>

        {/* Display Name Field */}
        <div className="profile-edit-section">
          <Input
            label="Nom d'affichage ou Pseudonyme"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value.slice(0, 35))}
            placeholder="Ex: Émile, Marianne, Sophie..."
            maxLength={35}
            hint="Ce nom est affiché sur vos certificats et vos conquêtes"
            required
            autoComplete="name"
          />
        </div>

        {/* Daily XP Goal Selection */}
        <div className="profile-edit-section">
          <label className="input-label" id="daily-goal-group-label">
            Objectif d'entraînement quotidien
          </label>
          <div
            className="profile-goals-grid"
            role="radiogroup"
            aria-labelledby="daily-goal-group-label"
          >
            {DAILY_GOAL_OPTIONS.map((opt) => {
              const isSelected = dailyGoal === opt.xp;
              return (
                <button
                  key={opt.xp}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`profile-goal-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setDailyGoal(opt.xp)}
                >
                  <span className="goal-icon" aria-hidden="true">{opt.icon}</span>
                  <span className="goal-xp">{opt.xp} XP / jour</span>
                  <span className="goal-label">{opt.label}</span>
                  <span className="goal-time">{opt.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-edit-actions">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isSaving}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSaving}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Modal>
  );
};
