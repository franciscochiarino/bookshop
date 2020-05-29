import React from 'react'
import hero from '../../assets/hero_1920x1280.jpg';

export default function Home() {
    return (
            <section className="Home">
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
    )
}
