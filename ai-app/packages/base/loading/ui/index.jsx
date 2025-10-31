import './index.css';

export const Loading = () => {
  return (
    <div className="loading">
      <span className="dot" style={{ '--i': 0 }}></span>
      <span className="dot" style={{ '--i': 1 }}></span>
      <span className="dot" style={{ '--i': 2 }}></span>
      <span className="dot" style={{ '--i': 3 }}></span>
    </div>
  )
}