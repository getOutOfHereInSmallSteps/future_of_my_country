'use strict';

///////////////////////////////////////
// Page elements

let servicesBtnActive = document.querySelector('.services__nav-btn--selected');
let modalCloseTimer;

const header = document.querySelector('.header');
const nav = document.querySelector('.main-nav__container');
const progressBar = document.querySelector('.main-nav__progress-bar');
const servicesCards = document.querySelector('.cards');
const servicesNav = document.querySelector('.services__nav');
const carouselCards = document.querySelectorAll('.carousel__card-container');
const carouselBtnRight = document.querySelector('.carousel-btn--right');
const carouselBtnLeft = document.querySelector('.carousel-btn--left');
const signUpForm = document.querySelector('form');
const firstNameInput = document.querySelector('.form-input--first-name');
const lastNameInput = document.querySelector('.form-input--last-name');
const emailInput = document.querySelector('.form-input--email');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

///////////////////////////////////////
// Database fetching links

const DB_PROJECTS =
  'https://http-fetch-react-default-rtdb.europe-west1.firebasedatabase.app/projects.json';

// UNSAFE //
const DB_USERSDATA =
  'https://http-fetch-react-default-rtdb.europe-west1.firebasedatabase.app/usersdata.json';

///////////////////////////////////////
// Helpers

const randomize = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'Decemeber',
};

///////////////////////////////////////
// Progress bar

window.addEventListener('scroll', () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('link')) {
    const hoveredLink = e.target;
    const navLinks = e.target
      .closest('.main-nav__links')
      .querySelectorAll('.link');
    const navLogo = document.querySelector('.main-nav__logo');

    navLinks.forEach(link => {
      if (link !== hoveredLink) {
        link.style.opacity = this.hoverOpacity;
      }
    });
    navLogo.style.opacity = this.hoverOpacity;
  }
};

nav.addEventListener('mouseover', handleHover.bind({ hoverOpacity: 0.5 }));
nav.addEventListener('mouseout', handleHover.bind({ hoverOpacity: 1 }));

///////////////////////////////////////
// Page navigation

document.querySelector('.main-nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('link')) {
    const sectionId = e.target.getAttribute('href');
    const selectedSection = document.querySelector(sectionId);
    const selectedSectionPosition = selectedSection.getBoundingClientRect().top;
    const navHeight = -nav.getBoundingClientRect().height;
    const Y_OFFSET = sectionId === '#section--blog' ? 50 : -50;

    const yCord =
      selectedSectionPosition + navHeight + window.pageYOffset + Y_OFFSET;

    window.scrollTo({
      top: yCord,
      behavior: 'smooth',
    });
  }
});

///////////////////////////////////////
// Sections show-up

const allSections = document.querySelectorAll('section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  section.classList.add('section-hidden');
  sectionObs.observe(section);
});

///////////////////////////////////////
// Sticky navigation

const navObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
};

const stickyNavHandler = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    progressBar.classList.remove('hidden');
  } else {
    nav.classList.remove('sticky');
    progressBar.classList.add('hidden');
  }
};

const navigationObserver = new IntersectionObserver(
  stickyNavHandler,
  navObserverOptions
);

navigationObserver.observe(header);

///////////////////////////////////////
// Project data fetching

const fetchProjects = async () => {
  const response = await fetch(DB_PROJECTS);
  const projectsData = await response.json();
  const projectsKeys = Object.keys(projectsData);
  const projectsDataSlice = {
    ...projectsData,
    topSelection: [],
  };
  projectsKeys.forEach(key =>
    projectsDataSlice.topSelection.push(projectsData[key][0])
  );
  return projectsDataSlice;
};

const projectsData = fetchProjects();

///////////////////////////////////////
// Projects rendering

const renderProjects = async (projectType = 'topSelection') => {
  let renderedProjects = ``;

  const projects = {
    architecture: [
      {
        description:
          '•	Впровадити чiтке та зрозумiле законодавство, що захищає права та iнтереси iнвесторiв, забезпечити їх дотримання судами та правоохоронними органами.',
      },
      {
        description:
          '•	Забезпечити полiтичну стабiльнiсть, пiдтримати дiалог i спiвпрацю з мiжнародною спiльнотою, продовжити курс на євроiнтеграцiю та реформування країни.',
      },
      {
        description:
          '•	Побороти корупцiю та забезпечити повне надходження грошових коштів в галузь, правильно регулювати iнвестицiйний бюджет та фiнансувати розвиненi галузi.',
      },
      {
        description:
          '•	Вдосконалити податкову систему, яка дозволить швидше, простіше і якісніше використовувати грошовий потенціал.',
      },
      {
        description:
          '•	Спростити процедури отримання дозволів, ліцензій, сертифікатів та інших документів, необхідних для здійснення інвестиційної діяльності, запровадити електронні сервіси та одне вікно для інвесторів.',
      },
    ],
    design: [
      {
        description:
          '•	Україна реформує свою систему освiти з метою покращення якостi освiти, забезпечення її доступностi, впровадження компетентнiсного пiдходу, змiцнення автономiї та демократизацiї освiтнiх закладiв, iнтеграцiї нацiональної освiти у свiтовий та європейський освiтнiй простори.',
      },
      {
        description:
          '•	Україна може взяти на замітку міжнародні стандарти освiти, які дозволяють порiвнювати освiтнi системи рiзних країн та оцiнювати їх ефективнiсть та якiсть, а також сприяють глобальному розвитку освiти, покращенню доступності та якості освiтніх послуг, забезпеченню мобільності та взаємного визнання кваліфікацій, поширенню демократичних цінностей та прав людини.',
      },
    ],
    topSelection: [
      {
        description:
          '•	Україна активно розвиває діджиталізацію, що створює нові можливості для інновацій та покращення якості життя людей.',
      },
      {
        description:
          '•	Україна має потенціал для розвитку штучного інтелекту та його застосування в різних сферах, але також повинна враховувати його переваги та ризики.',
      },
    ],
    planning: [
      {
        description:
          '•	Україна має сильне громадянське суспільство, яке об’єднує громадян для захисту своїх інтересів, цінностей та прав, а також відіграє важливу роль у формуванні демократичної культури, контролю над владою, сприянні соціальному діалогу та розвитку громад.',
      },
      {
        description:
          '•	Україна може зміцнити своє громадянське суспільство шляхом активізму та участі громадян у різних формах громадської діяльності, а також шляхом взаємодопомоги та солідарності між різними групами населення, особливо в умовах війни та кризи .',
      },
    ],
  };

  projects[projectType].forEach(project => {
    const cardType = project.type === 'architecture' ? 'card--2' : 'card--1';

    renderedProjects += `
    \n
    <div class="card ${cardType}">
    <div class="${cardType}__desc">

      <p class="${cardType}__desc-paragraph">
        ${project.description}
      </p>
    </div>
    </div>
    `;
    servicesCards.innerHTML = renderedProjects;
  });
};

renderProjects();

servicesNav.addEventListener('click', e => {
  e.preventDefault();
  if (
    !e.target.classList.contains('services__nav-btn') ||
    e.target.classList.contains('services__nav-btn--selected')
  )
    return;
  servicesBtnActive.classList.remove('services__nav-btn--selected');
  const projectType = e.target.dataset.type;
  e.target.classList.add('services__nav-btn--selected');
  servicesBtnActive = e.target;
  renderProjects(projectType);
});

///////////////////////////////////////
// Carousel processing

let curSlide = 0;
const lastSlide = carouselCards.length;

const scrollSlide = () => {
  carouselCards.forEach((card, i) => {
    card.style.transform = `translateX(${120 * (i - curSlide * 2)}%)`;
  });
};

const nextSlide = () => {
  ++curSlide;
  if (curSlide === lastSlide / 2) curSlide = 0;
  scrollSlide();
};

const prevSlide = () => {
  --curSlide;
  if (curSlide === -1) curSlide = lastSlide / 2 - 1;
  scrollSlide();
};

carouselCards.forEach((card, i) => {
  card.style.transform = `translateX(${120 * i}%)`;
});

carouselBtnRight.addEventListener('click', nextSlide);
carouselBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

///////////////////////////////////////
// Blogs show-up

const revealBlogs = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.style.animation = 'show-blog 1s';
    entry.target.style.opacity = 1;
  } else {
    entry.target.style.opacity = 0;
    entry.target.style.animation = '';
  }
};

const blogsSectionObs = new IntersectionObserver(revealBlogs, {
  root: null,
  threshold: 0,
});

const blogsSection = document.querySelector('.blogs');
blogsSectionObs.observe(blogsSection);

///////////////////////////////////////
// Form validation

const postUserData = async userData => {
  const request = await fetch(DB_USERSDATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

const localStorageInit = () => {
  if (!localStorage.getItem('users'))
    localStorage.setItem('users', JSON.stringify([]));
};

const addToStorage = (storage, data) => {
  const selectedStorage = JSON.parse(localStorage.getItem(storage));
  selectedStorage.push(data);
  localStorage.setItem(storage, JSON.stringify(selectedStorage));
};

localStorageInit();

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const nameRegex = /^[A-Z][a-z]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [firstNameError, lastNameError, emailError] =
    document.querySelectorAll('.form-input-error');

  const nameIsValid = nameRegex.test(firstNameInput.value);
  const lastNameIsValid = nameRegex.test(lastNameInput.value);
  const emailIsValid = emailRegex.test(emailInput.value);

  const formIsValid = nameIsValid && lastNameIsValid && emailIsValid;

  firstNameInput.classList[nameIsValid ? 'remove' : 'add']('input--invalid');
  firstNameError.classList[nameIsValid ? 'add' : 'remove']('hidden');

  lastNameInput.classList[lastNameIsValid ? 'remove' : 'add']('input--invalid');
  lastNameError.classList[lastNameIsValid ? 'add' : 'remove']('hidden');

  emailInput.classList[emailIsValid ? 'remove' : 'add']('input--invalid');
  emailError.classList[emailIsValid ? 'add' : 'remove']('hidden');

  if (formIsValid) {
    const userData = {
      id: Math.random().toFixed(6),
      userFirstName: firstNameInput.value,
      userLastName: lastNameInput.value,
      userEmail: emailInput.value,
    };
    addToStorage('users', userData);
    postUserData(userData);
  }
});

///////////////////////////////////////
// Handling loading state

// const LOADING_TIMEOUT = 2000; // 5 seconds
const LOADING_TIMEOUT = 0; // 5 seconds

window.addEventListener('load', () => {
  const content = document.querySelector('.content');
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
  }, LOADING_TIMEOUT);
});

///////////////////////////////////////
// Footer date parser

// const currentYear = new Date().getFullYear();
// footerSpanYear.textContent = currentYear;
