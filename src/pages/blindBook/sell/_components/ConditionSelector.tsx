import { useState } from 'react';

type Condition = '상' | '중' | '하';

interface Props {
  value?: Condition;
  onChange?: (value: Condition) => void;
}

export default function ConditionSelector({ value, onChange }: Props) {
  const [selected, setSelected] = useState<Condition | undefined>(value);

  const handleSelect = (condition: Condition) => {
    setSelected(condition);
    onChange?.(condition);
  };

  const conditions: Condition[] = ['상', '중', '하'];

  return (
    <div
      className="flex items-start gap-[10px]"
      style={{ padding: '6px 0 10px 0' }}
    >
      {conditions.map((condition) => (
        <button
          key={condition}
          onClick={() => handleSelect(condition)}
          className="flex flex-shrink-0 items-start gap-[10px] rounded-[12px]"
          style={{
            flex: 1,
            padding: '14px 0',
            background: selected === condition ? '#BDB7B2' : '#FFF',
          }}
        >
          <div
            style={{
              flex: '1 0 0',
              alignSelf: 'stretch',
              color: selected === condition ? '#FFF' : '#BDB7B2',
              textAlign: 'center',
              fontFamily: 'Freesentation',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            {condition}
          </div>
        </button>
      ))}
    </div>
  );
}
