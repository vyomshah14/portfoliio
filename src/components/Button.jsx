export default function Button({ children, className = '', ...props }) {
  return (
    <a className={`btn ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
