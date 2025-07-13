import "./Loading.css";

interface LoadingProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "medium",
}) => {
  return (
    <div className='loading-container'>
      <div className={`loading-spinner ${size}`}></div>
      <p className='loading-message'>{message}</p>
    </div>
  );
};

export default Loading;
