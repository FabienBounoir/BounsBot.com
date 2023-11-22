import "./_commandSqueleton.css"

export const CommandSqueleton = ({ command, onClick }) => {
    let name = "-".repeat(Math.floor(Math.random() * 10) + 10);
    let description = "-".repeat(Math.floor(Math.random() * 40) + 30);

    return (
        <div className='command-card__container'>
            <div className="command-card__header">
                <div>
                    <h5 className="command-card__header__title_squeleton"><span className="name">{`${name}`}</span><span className="description">{`${description ? "- " + description : ""}`}</span></h5>
                </div>
                <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
            </div>
        </div>
    );
}

export default CommandSqueleton;