'use client'
import { useEffect, useRef } from 'react';
import { Carousel } from 'flowbite';

declare type educator = {
    name: string,
    text: string,   
}
const Slider = ({educators}:{educators: educator[]}) => {
    const carouselRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        if (!carouselRef.current) return;

        const items = [
            { position: 0, el: document.getElementById('carousel-item-1') as any },
            { position: 1, el: document.getElementById('carousel-item-2') },
            { position: 2, el: document.getElementById('carousel-item-3') },
            { position: 3, el: document.getElementById('carousel-item-4') },
        ];

        const options = {
            defaultPosition: 1,
            interval: 5000,
            indicators: {
                activeClasses: 'bg-white dark:bg-gray-800',
                inactiveClasses:
                    'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                items: [
                    { position: 0, el: document.getElementById('carousel-indicator-1') as any },
                    { position: 1, el: document.getElementById('carousel-indicator-2') },
                    { position: 2, el: document.getElementById('carousel-indicator-3') },
                    { position: 3, el: document.getElementById('carousel-indicator-4') },
                ],
            },
            onNext: () => console.log('Next slide'),
            onPrev: () => console.log('Previous slide'),
            onChange: () => console.log('Slide changed'),
        };

        const carousel = new Carousel(carouselRef.current, items, options);
        carousel.cycle();

        if (prevButtonRef.current) {
            prevButtonRef.current.addEventListener('click', () => carousel.prev());
        }
        if (nextButtonRef.current) {
            nextButtonRef.current.addEventListener('click', () => carousel.next());
        }

        return () => {
            if (prevButtonRef.current) {
                prevButtonRef.current.removeEventListener('click', () => carousel.prev());
            }
            if (nextButtonRef.current) {
                nextButtonRef.current.removeEventListener('click', () => carousel.next());
            }
        };
    }, []);

    return (
        <div id="carousel-example" ref={carouselRef} className="relative w-full lg:w-[50%]">
            <div className="relative  overflow-clip rounded-lg min-h-[60vh]">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} id={`carousel-item-${num}`} className="hidden duration-700 ease-in-out">
                        <div className='w-[100%] flex items-top justify-center h-[100%]'>
                        <li className=" p-6  md:p-8 border border-gray-100 rounded-3xl bg-white  shadow-2xl shadow-gray-600/10 list-none w-[90%] md:w-[60%] text-sm md:text-base">
                            <div className="flex gap-4 items-center"> 
                                <div>
                                    <h6 className="text-lg text-gray-800 text-start font-bold">{educators[num-1].name}</h6>
                                </div>
                            </div>
                            <p className="mt-4 text-start text-gray-600">
                                {educators[num-1].text}
                            </p>
                        </li>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((num) => (
                    <button key={num} id={`carousel-indicator-${num}`} className="h-3 w-3 rounded-full" aria-label={`Slide ${num}`}></button>
                ))}
            </div>
            <button ref={prevButtonRef} className="absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='h4 w-4'>
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </span>
            </button>
            <button ref={nextButtonRef} className="absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='h4 w-4'>
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </span>
            </button>
        </div>
    );
};

export default Slider;
