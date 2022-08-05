import "../styles/App.css";

function Display({output}) {
    return (
        <div className="display">
                <span>{ output === '' ? 0 : output }</span>
        </div>
    )
}

export default Display
