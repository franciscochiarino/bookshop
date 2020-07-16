import React from 'react';
import hero from '../../assets/hero_1920x1280.jpg';
import reactLogo from '../../assets/technologies/react-logo.png';
import reduxLogo from '../../assets/technologies/redux-logo.png';
import sassLogo from '../../assets/technologies/sass-logo.png';
import nodeLogo from '../../assets/technologies/node-logo.png';
import expressLogo from '../../assets/technologies/express-logo.png';
import mongoLogo from '../../assets/technologies/mongo-logo.jpeg';

export default function Home() {

    return (
        <section className="Home">
            <section className="heroContainer">
                <img src={hero} alt="books next to the window in a sunny day"/>
                <section className="heroTextbox">
                    <q>
                        It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived.
                    </q>
                    <p>
                        <cite>To Kill a Mockingbird</cite> - Harper Lee
                    </p>
                </section>
            </section>
            <section className="technologies">
                <h4>Designed and developed by <a href="https://www.franciscochiarino.com" target="_blank" rel="noopener noreferrer">Francisco Chiarino</a> using:</h4>
                <section className="techIconsContainer">
                    <img src={reactLogo} width="100" alt="react logo" title="React" />
                    <img src={reduxLogo} width="100" alt="redux logo" title="Redux" />
                    <img src={sassLogo} width="80" alt="sass logo" title="Sass" />
                    <img src={nodeLogo} width="100" alt="node logo" title="Node.js" />
                    <img src={expressLogo} width="100" alt="express logo" title="Express.js" />
                    <img src={mongoLogo} width="100" alt="mongo logo" title="MongoDB" />
                </section>
            </section>
        </section>
    )
}
