import { useEffect, useRef, useState } from 'preact/hooks';

const SCHEMES = {
    SYSTEM: 'system',
    DARK: 'dark',
    LIGHT: 'theme-light',
};

type Scheme = 'system' | 'dark' | 'theme-light';

const ThemeColorSwitcher = () => {
    const [theme, setThemeState] = useState<Scheme>('system');

    const slider = useRef<HTMLDivElement>(null);
    const switcher = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setThemeState(isDarkMode ? 'dark' : 'theme-light')
    }, [])

    useEffect(() => {
        const isDark =
            theme === 'dark' ||
            (theme === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)

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

    const handleChange = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        setThemeState(target.value as Scheme);
        if (slider.current) {
            slider.current.style.transform = `translateX(${target.dataset.location})`;
        }

    }

    return (
        <div ref={switcher} className="relative flex items-center overflow-hidden rounded-full border-1 w-22">
            <div ref={slider} className="absolute bg-blue-200 w-7 top-0 bottom-0 left-0 transition transform duration-300" />
            <label className="px-1 py-0 text-base hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.LIGHT} title="light">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.LIGHT}
                    type="radio"
                    data-location="0"
                    className="hidden"
                />
                <span aria-label="day" role="img">&#x1f31e;</span>
            </label>
            <label className="px-1 text-base hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.SYSTEM} title="system">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.SYSTEM}
                    type="radio"
                    data-location='30px'
                    className="hidden"
                />
                <span aria-label="system" role="img">&#x1f4bb;</span>
            </label>
            <label className="px-1 text-base hover:bg-blue-300 z-10 cursor-pointer opacity-50 data-[checked=true]:opacity-100" data-checked={theme === SCHEMES.DARK} title="dark">
                <input
                    onChange={handleChange}
                    name="switch"
                    value={SCHEMES.DARK}
                    type="radio"
                    data-location='60px'
                    className="hidden"
                />
                <span aria-label="night" role="img" className="inline-block w-full text-center">&#x1f31a;</span>
            </label>
        </div>
    );
};

export default ThemeColorSwitcher;