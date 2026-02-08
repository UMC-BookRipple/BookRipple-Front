export default function Divider() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[10px] self-stretch"
      style={{ padding: '15px 0' }}
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
