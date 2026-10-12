type MagnifierProps = {
  label: string;
};

export default function Magnifier({ label }: MagnifierProps) {
  return (
    <span className="url-ribbon__magnifier" aria-hidden="true">
      <span className="magnifier__lens">
        <span>{label}</span>
      </span>
      <span className="magnifier__handle" />
    </span>
  );
}
