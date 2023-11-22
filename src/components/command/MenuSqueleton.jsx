import "./_commandSqueleton.css"

export const MenuSqueleton = ({ index }) => {
    let type = "-".repeat(Math.floor(Math.random() * 10) + 5);

    return (
        <li key={index} className={"btnSearch btn-commands-category_squeleton " + (index == 0 ? "active" : "")} >{type}</li>
    );
}

export default MenuSqueleton;