import { useInView } from "react-intersection-observer";

export const FeatureImage = ({ src, alt }) => {
    const [ref, inView] = useInView({
        triggerOnce: true, // Pour déclencher l'animation une seule fois
        threshold: 0.4, // Le pourcentage de l'élément visible pour déclencher l'animation
    });

    return (
        <img className={inView ? 'active' : ''} ref={ref} src={src} alt={alt} />
    )
}