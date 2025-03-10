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

        const target = switcher.current?.querySelector('[data-checked="true"]')?.querySelector('input')
        if (slider.current && target) {
            slider.current.style.transform = 'translateX(' + target.dataset.location + ')';
        }

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
        <section ref={switcher} className="relative flex items-center overflow-hidden rounded-full border-1 h-6.5">
            <div ref={slider} className="absolute bg-blue-200 w-7 top-0 bottom-0 left-0 border-0 pointer-events-none transition transform duration-300" />
            <label className="px-1 hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.LIGHT} title="light">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.LIGHT}
                    type="radio"
                    data-location="0"
                    className="appearance-none "
                />
                <span aria-label="day" role="img" >🌞</span>
            </label>

            <label className="px-1 hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.SYSTEM} title="system">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.SYSTEM}
                    type="radio"
                    data-location="calc(200% - 28px)"
                    className="appearance-none "
                />
                <span aria-label="system" role="img" >💻</span>
            </label>

            <label className="px-1 hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.DARK} title="dark">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.DARK}
                    type="radio"
                    data-location="calc(300% - 28px)"
                    className="appearance-none "
                />
                <span aria-label="night" role="img" >🌚</span>
            </label>
        </section>
    );
};

export default ThemeColorSwitcher;