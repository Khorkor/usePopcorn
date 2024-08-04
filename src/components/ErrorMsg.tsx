interface ErrorMsgProps {
  message: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ message }) => {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
};

export default ErrorMsg;
