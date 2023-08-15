interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}
