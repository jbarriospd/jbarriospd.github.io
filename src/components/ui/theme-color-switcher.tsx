import { useEffect, useRef, useState, useCallback } from 'preact/hooks';

const SCHEMES = {
    SYSTEM: 'system',
    DARK: 'dark',
    LIGHT: 'theme-light',
};


type Scheme = 'system' | 'dark' | 'theme-light';

const ThemeColorSwitcher = () => {
    const [theme, setThemeState] = useState<Scheme>('system');

    const slider = useRef<HTMLDivElement>(null);
    const switcher = useRef<HTMLElement>(null);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setThemeState(isDarkMode ? 'dark' : 'theme-light')
    }, [])

    useEffect(() => {
        const isDark =
            theme === 'dark' ||
            (theme === 'system' &&
                window.matchMedia('(prefers-color-theme: dark)').matches)

        document.documentElement.classList.add('disable-transitions')

        document.documentElement.classList[isDark ? 'add' : 'remove']('dark')

        window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('opacity')

        requestAnimationFrame(() => {
            document.documentElement.classList.remove('disable-transitions')
        })

    }, [theme]);

    const handleChange = useCallback((e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        setThemeState(target.value as Scheme);
        if (slider.current) {
            slider.current.style.transform = `translateX(${target.dataset.location})`;
        }

    }, []);

    return (
        <section ref={switcher} className="relative h-6 flex bg-amber-300 items-center overflow-hidden rounded-md">
            <div ref={slider} className="absolute border border-red-500 h-full w-5 top-0 bottom-0 left-0" />
            <label data-checked={theme === SCHEMES.LIGHT} title="light">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.LIGHT}
                    type="radio"
                    data-location="0"
                    className="appearance-none"
                />
                <span aria-label="day" role="img">
                    🌞
                </span>
            </label>

            <label data-checked={theme === SCHEMES.SYSTEM} title="system">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.SYSTEM}
                    type="radio"
                    data-location="calc(100% - 2px)"
                    className="appearance-none"
                />
                <span aria-label="system" role="img">
                    💻
                </span>
            </label>

            <label data-checked={theme === SCHEMES.DARK} title="dark">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.DARK}
                    type="radio"
                    data-location="calc(200% - 4px)"
                    className="appearance-none"
                />
                <span aria-label="night" role="img">
                    🌚
                </span>
            </label>
        </section>
    );
};

export default ThemeColorSwitcher;

<style>

</style>