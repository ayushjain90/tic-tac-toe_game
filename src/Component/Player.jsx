import { useState } from 'react';

function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)
    function handelEdit() {
        setIsEditing(edit => !edit)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    function handelInput(e) {
        setPlayerName(e.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>

    if (isEditing) {
        editablePlayerName = <input type="text" value={playerName} required onChange={handelInput} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handelEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}

export default Player