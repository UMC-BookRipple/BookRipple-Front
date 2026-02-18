import type React from 'react';

export default function Divider({ style }: { style?: React.CSSProperties } = {}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[10px] self-stretch"
      style={{ padding: '15px 0', ...style }}
    >
      <div
        style={{
          width: '100%',
          height: '0.7px',
          opacity: 0.7,
          background: '#58534E',
        }}
      />
    </div>
  );
}
