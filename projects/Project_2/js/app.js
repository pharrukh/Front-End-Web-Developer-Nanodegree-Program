/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const doc = document;
const activeClass = 'active';
const navList = doc.getElementById('navbar__list');
const sections = [
    { text: 'Section 1', id: 'section1' },
    { text: 'Section 2', id: 'section2' },
    { text: 'Section 3', id: 'section3' },
    { text: 'Section 4', id: 'section4' }
];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function disableActive() {
    const active = doc.querySelector(`.${activeClass}`);
    if (active) {
        active.classList.remove(activeClass);
    }
}

function setActive(event) {
    event.preventDefault();
    disableActive();
    event.target.classList.add(activeClass);
}

function addObservableBy(id) {
    const sectionInView = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0) {
            disableActive();
            const sectionName = entries[0].target.attributes['data-nav'].textContent;
            const aTags = doc.getElementsByTagName("a");
            const relatedATag = Array.from(aTags).find(a => a.innerText === sectionName);
            relatedATag.classList.add(activeClass);
        }
    });

    const section = doc.getElementById(id);
    sectionInView.observe(section);
}




function smoothScroll(target) {
    let scrollContainer = target;

    do {
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) {
            return;
        }
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    let targetY = 0;

    do {
        if (target == scrollContainer) {
            break;
        }
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = (c, a, b, i) => {
        i++;
        if (i > 30) {
            return;
        }
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(() => { scroll(c, a, b, i); }, 20);
    }

    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function builNavigation(navivationList, sectionList) {
    sectionList.forEach(section => {
        const li = doc.createElement('li');
        const link = doc.createElement('a');
        link.textContent = section.text;
        li.appendChild(link);
        navivationList.appendChild(li);

        li.addEventListener('click', (e) => {
            smoothScroll(doc.getElementById(section.id));
            setActive(e);
        })
        // Add class 'active' to section when near top of viewport
        addObservableBy(section.id);
    })
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
builNavigation(navList, sections);
