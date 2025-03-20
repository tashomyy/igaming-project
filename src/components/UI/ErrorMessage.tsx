interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="text-sm text-danger font-semibold">{message}</p>;
};

export default ErrorMessage;
