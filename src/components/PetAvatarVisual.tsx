import React from 'react';
import { PetProfile, PetAvatarConfig } from '../types';
import { AVATAR_BREEDS } from '../data/rewardsAndAvatarsData';
import { Dog, Cat, Sparkles } from 'lucide-react';

interface PetAvatarVisualProps {
  pet: PetProfile;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const PetAvatarVisual: React.FC<PetAvatarVisualProps> = ({
  pet,
  size = 'md',
  showBadge = true,
  className = ''
}) => {
  const breedInfo = AVATAR_BREEDS.find(b => b.id === pet.avatarConfig?.breedId) || (
    pet.especie === 'Gato' 
      ? AVATAR_BREEDS.find(b => b.id === 'gato_laranja') 
      : AVATAR_BREEDS.find(b => b.id === 'caramelo')
  );

  const sizeClasses = {
    sm: 'w-8 h-8 text-base rounded-xl',
    md: 'w-12 h-12 text-2xl rounded-2xl',
    lg: 'w-16 h-16 text-3xl rounded-3xl',
    xl: 'w-24 h-24 text-5xl rounded-3xl'
  };

  const bgGrad = breedInfo?.bgGradiente || (pet.especie === 'Gato' ? 'from-orange-500 to-amber-700' : 'from-indigo-600 to-indigo-800');

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br ${bgGrad} text-white shadow-md flex items-center justify-center border-2 border-white/60 select-none transition-transform hover:scale-105`}
        title={`${pet.nome} (${pet.raca})`}
      >
        <span>{breedInfo?.emoji || (pet.especie === 'Gato' ? '🐱' : '🐕')}</span>
      </div>

      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[9px] shadow-xs border border-white flex items-center justify-center"
          title={`Nível ${pet.nivel}`}
        >
          {pet.nivel}
        </span>
      )}
    </div>
  );
};
