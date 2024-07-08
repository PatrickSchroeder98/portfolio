document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    languageSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const lang = e.target.parentElement.getAttribute('data-lang');
            setLanguage(lang);
        }
    });

    function setLanguage(lang) {
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
});
