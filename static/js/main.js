document.addEventListener('DOMContentLoaded', () => {
    // Language switch functions
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


    // Sorting functions
    const sortButtons = document.querySelectorAll('.sorting-controls button');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const sortType = button.id.replace('sort-', '');
            setSortType(sortType);
            sortProjects(sortType);
        });
    });

    function setSortType(type) {
        localStorage.setItem('sortType', type);
    }

    function getSortType() {
        return localStorage.getItem('sortType') || 'relevance';
    }

    function sortProjects(type) {
        let sortedItems;
        if (type === 'relevance') {
            sortedItems = portfolioItems.sort((a, b) => a.dataset.relevance - b.dataset.relevance);
        } else if (type === 'date') {
            sortedItems = portfolioItems.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        }
        portfolioGrid.innerHTML = '';
        sortedItems.forEach(item => portfolioGrid.appendChild(item));
    }

    // Initial sorting
    const initialSortType = getSortType();
    sortProjects(initialSortType);
    document.getElementById(`sort-${initialSortType}`).classList.add('active');
});