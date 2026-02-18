import type { ReactNode } from 'react';

import Header from '../../../components/Header';
import BlindBookHero from './BlindBookHero';
import BlindBookModeTabs from './BlindBookModeTabs';

interface Props {
  children: ReactNode;
  activeMode?: 'sell' | 'buy';
  showHero?: boolean;
  heroVariant?: 'default' | 'minimal';
  noBottomPadding?: boolean;
  hideTabs?: boolean;
}

export default function BlindBookShell({
  children,
  activeMode = 'sell',
  showHero = true,
  heroVariant = 'default',
  noBottomPadding = false,
  hideTabs = false,
}: Props) {
  return (
    <div className="min-h-dvh bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
      <div className="mx-auto min-h-dvh w-full max-w-[430px]">
        <Header />
        {showHero && <BlindBookHero variant={heroVariant} />}
        {!hideTabs && (
          <div className="px-5">
            <div className="mt-1">
              <BlindBookModeTabs active={activeMode} />
            </div>
          </div>
        )}

        <div className={`px-5 ${noBottomPadding ? '' : 'pb-24'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
