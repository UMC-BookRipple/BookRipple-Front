import Button from '../../../../components/Button';

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function BottomFixedButton({
  label,
  onClick,
  disabled = false,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-transparent">
      <div className="mx-auto w-full max-w-[430px] px-5 pb-6">
        <Button onClick={onClick} disabled={disabled} variant="primary">
          {label}
        </Button>
      </div>
    </div>
  );
}
