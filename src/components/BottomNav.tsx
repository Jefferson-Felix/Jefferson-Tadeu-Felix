import React from 'react';
import { Dices, Timer, ClipboardList, Award, Database, ShoppingBag } from 'lucide-react';

export type TabType = 'tabuleiro' | 'treino' | 'anamnese' | 'conquistas' | 'historico';

interface BottomNavProps {
  tabAtiva: TabType;
  onSelectTab: (tab: TabType) => void;
  temAnamnese: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  tabAtiva,
  onSelectTab,
  temAnamnese
}) => {
  const tabs = [
    { id: 'tabuleiro' as TabType, label: 'Tabuleiro', icon: Dices },
    { id: 'treino' as TabType, label: 'Treino', icon: Timer },
    { 
      id: 'anamnese' as TabType, 
      label: 'Anamnese', 
      icon: ClipboardList, 
      badge: !temAnamnese ? 'Pendente' : undefined 
    },
    { id: 'conquistas' as TabType, label: 'Conquistas', icon: Award },
    { id: 'historico' as TabType, label: 'Planilha', icon: Database },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = tabAtiva === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'text-indigo-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isSelected ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>
              {isSelected && (
                <div className="absolute -bottom-1 w-6 h-1 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
