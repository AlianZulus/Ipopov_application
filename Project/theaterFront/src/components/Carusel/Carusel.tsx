import React from 'react';
import {Carousel} from "react-responsive-carousel";
import prem from "../../assets/icons/premiera.png";
import styles from "../Main/Main.module.css";

type caruselType = {
    selectedSlides: any;
    openCombinedModalHandler:any
}

export const Carusel = ({selectedSlides, openCombinedModalHandler}:caruselType ) => {
    return (
        <Carousel
            showArrows
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            stopOnHover
            interval={3000}
            transitionTime={700}
            showStatus={false}
        >
            {selectedSlides.map((slide: any, index: number) => (
                <div key={index} style={{position: 'relative'}}>
                    <img
                        src={slide.icons}
                        alt={`Slide ${index + 1}`}
                        style={{width: '100%', height: 'calc(92vh - 55px)', objectFit: 'cover'}}
                    />
                    <img
                        style={{position: 'absolute', top: '10%', left: '2%', width: '5%', zIndex: 8}}
                        src={prem}
                        alt={'prem'}
                    />

                    {}
                    <div className={styles.overlay}>
                        <h2 className={styles.title}>{slide.title}</h2>
                        <div
                            className={styles.btwMainByuContainer}
                            onClick={() => openCombinedModalHandler(slide)}
                        >
                            <div className={styles.btwMainByu}>Купить билет</div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

