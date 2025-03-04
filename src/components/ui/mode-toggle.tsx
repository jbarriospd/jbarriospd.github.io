import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import styles from '@/styles/SchemeColorSwitcher.module.css';

const SCHEMES = {
    SYSTEM: 'system',
    DARK: 'dark',
    LIGHT: 'theme-light',
};


type Scheme = 'system' | 'dark' | 'theme-light';

const SchemeColorSwitcher = () => {
    const [scheme, setScheme] = useState<Scheme>('system')

    const slider = useRef<HTMLDivElement>(null);
    const switcher = useRef<HTMLElement>(null);

    useEffect(() => {
        const isDark =
            scheme === 'dark' ||
            (scheme === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.add('disable-transitions')

        document.documentElement.classList[isDark ? 'add' : 'remove']('dark')

        window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('opacity')

        requestAnimationFrame(() => {
            document.documentElement.classList.remove('disable-transitions')
        })

    }, [scheme]);

    const handleChange = useCallback((e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setScheme(target.value as Scheme);
        if (slider.current) {
            slider.current.style.transform = `translateX(${target.dataset.location})`;
        }
    }, []);

    return (
        <section ref={switcher} className="shadow-2xs">
            <div ref={slider} className="bg-blue-400" />
            <label data-checked={scheme === SCHEMES.LIGHT} title="light">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.LIGHT}
                    type="radio"
                    data-location="0"
                />
                <span aria-label="day" role="img">
                    🌞
                </span>
            </label>

            <label data-checked={scheme === SCHEMES.SYSTEM} title="system">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.SYSTEM}
                    type="radio"
                    data-location="calc(100% - 2px)"
                />
                <span aria-label="system" role="img">
                    💻
                </span>
            </label>

            <label data-checked={scheme === SCHEMES.DARK} title="dark">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.DARK}
                    type="radio"
                    data-location="calc(200% - 4px)"
                />
                <span aria-label="night" role="img">
                    🌚
                </span>
            </label>
        </section>
    );
};

export default SchemeColorSwitcher;