import { useInView } from 'react-intersection-observer';

export const BestGuild = ({ guild, display, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true, // Pour déclencher l'animation une seule fois
        threshold: 0.5, // Le pourcentage de l'élément visible pour déclencher l'animation
    });


    const formatNumber = (number) => {
        if (number > 1000) {
            return Math.ceil(number / 100) * 100
        }
        else if (number > 100) {
            return Math.ceil(number / 10) * 10
        }
        else {
            return number
        }
    }

    return (<div className={`guilds ${inView ? 'active' : ''}`} ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
        <img src={guild.iconURL || "https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290"} alt="logo" onError={(e) => { e.target.outerHTML = `<img loading="lazy" src='https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290'/>` }} />
        <div>
            <h3>{guild.name}</h3>

            <div className="member">

                <svg width="17" height="18" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4978C35 26.0104 30.515 30.4979 25 30.4979C19.4875 30.4979 15 26.0104 15 20.4978C15 14.9853 19.485 10.4978 25 10.4978C30.515 10.4978 35 14.9853 35 20.4978ZM5 47.9979C5 39.1654 13.225 32.9979 25 32.9979C36.7775 32.9979 45 39.1654 45 47.9979V50.4979H5V47.9979Z" fill="#4F5056" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4978C35 26.0104 30.515 30.4979 25 30.4979C19.4875 30.4979 15 26.0104 15 20.4978C15 14.9853 19.485 10.4978 25 10.4978C30.515 10.4978 35 14.9853 35 20.4978ZM5 47.9979C5 39.1654 13.225 32.9979 25 32.9979C36.7775 32.9979 45 39.1654 45 47.9979V50.4979H5V47.9979Z" fill="#4F5056" />
                    <path d="M50.0002 50.498H55.0002V47.998C55.0002 41.5913 50.6742 36.5868 43.8032 34.321C47.6552 37.7648 50.0002 42.4978 50.0002 47.998V50.498Z" fill="#4F5056" />
                    <path d="M37.2084 30.252C41.6642 29.2437 45.0002 25.252 45.0002 20.4977C45.0002 15.4056 41.1732 11.1882 36.2427 10.5745C38.5804 13.2205 40.0002 16.6958 40.0002 20.4977C40.0002 24.1049 38.7222 27.4182 36.5944 30.0082C36.8007 30.0872 37.0054 30.1685 37.2084 30.252Z" fill="#4F5056" />
                </svg>

                <p>{formatNumber(guild.memberCount)} {display ? "membres" : ""}</p>
            </div>
        </div>
    </div>)
}



export default BestGuild;