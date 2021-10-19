import './styles.css';

export const Button = ({onClick, text, disabled}) => ((
    <div className="button-container">
        <button onClick={onClick} disabled={disabled} >{text}</button>
    </div>
));