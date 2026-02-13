
import React from 'react';
import { SUBJECTS, PRESCHOOL_SECTIONS, VPR_SUBJECTS, OGE_SUBJECTS, EGE_SUBJECTS } from '../constants';

interface Props {
  isExam?: boolean;
  isPreschool?: boolean;
  examType?: 'vpr' | 'oge' | 'ege';
  classLevel?: number;
  onBack: () => void;
  onSelect: (id: string) => void;
}

const SubjectGrid: React.FC<Props> = ({ isExam, isPreschool, examType, classLevel, onBack, onSelect }) => {
  let items: { id: string; name: string; emoji: string }[];
  let title: string;

  if (isPreschool) {
    items = PRESCHOOL_SECTIONS;
    title = 'Программа дошкольника';
  } else if (examType === 'vpr') {
    const level = classLevel || 4;
    items = VPR_SUBJECTS[level] || VPR_SUBJECTS[4];
    title = `ВПР — ${level} класс`;
  } else if (examType === 'oge') {
    items = OGE_SUBJECTS;
    title = 'ОГЭ — Выберите предмет';
  } else if (examType === 'ege') {
    items = EGE_SUBJECTS;
    title = 'ЕГЭ — Выберите предмет';
  } else {
    items = SUBJECTS;
    title = 'Выберите предмет';
  }

  return (
    <div className="p-5 animate-slide-in space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const prefix = examType === 'vpr' ? `ВПР ${classLevel} класс: ` :
                             examType === 'oge' ? 'ОГЭ: ' :
                             examType === 'ege' ? 'ЕГЭ: ' : '';
              onSelect(`${prefix}${item.name}`);
            }}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md active:scale-95 transition-all flex flex-col items-center gap-3 group"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
            <span className="font-bold text-slate-800 text-sm text-center">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectGrid;
