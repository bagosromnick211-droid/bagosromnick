const certificates = [
  {
    id: 1,
    title: 'Network Security and Multimedia Seminar',
    organization: 'Northeastern College',
    category: 'Seminars',
    asset: 'assets/Webinar/Network Security and Multimedia Seminar.png',
  },
  {
    id: 2,
    title: 'Digital Trust in the AI Era',
    organization: 'DICT CALABARZON',
    category: 'Webinars',
    date: '2026-07-22',
    asset: 'assets/Webinar/Screenshot 2026-10-11 155728.png',
  },
  {
    id: 3,
    title: 'Click Smart, Stay Safe',
    organization: 'Department of Information and Communications Technology',
    category: 'Webinars',
    date: '2026-06-26',
    asset: 'assets/Webinar/Screenshot 2026-10-11 155715.png',
  },
  {
    id: 4,
    title: 'Setting Up Computer Networks',
    organization: 'TESDA',
    category: 'Online Courses',
    date: '2026-09-12',
    asset: 'assets/Tesda/Screenshot 2026-10-11 155433.png',
  },
  {
    id: 5,
    title: 'Maintaining Computer Systems and Networks',
    organization: 'TESDA',
    category: 'Online Courses',
    date: '2026-09-12',
    asset: 'assets/Tesda/Screenshot 2026-10-11 155603.png',
  },
  {
    id: 6,
    title: 'Introduction to Computer Systems Servicing',
    organization: 'TESDA',
    category: 'Online Courses',
    date: '2026-09-12',
    asset: 'assets/Tesda/Screenshot 2026-10-11 155619.png',
  },
  {
    id: 7,
    title: 'Setting Up Computer Servers',
    organization: 'TESDA',
    category: 'Online Courses',
    date: '2026-09-12',
    asset: 'assets/Tesda/Screenshot 2026-10-11 155629.png',
  },
  {
    id: 8,
    title: 'Installing and Configuring Computer Systems',
    organization: 'TESDA',
    category: 'Online Courses',
    date: '2026-09-14',
    asset: 'assets/Tesda/Screenshot 2026-10-11 155641.png',
  },
  {
    id: 9,
    title: 'Computer Hardware Basics',
    organization: 'Cisco',
    category: 'Online Courses',
    date: '2026-10-01',
    asset: 'assets/cisco/Screenshot 2026-10-11 155213.png',
  },
  {
    id: 10,
    title: 'Introduction to Modern AI',
    organization: 'Cisco',
    category: 'Online Courses',
    date: '2026-10-07',
    asset: 'assets/cisco/Screenshot 2026-10-11 155229.png',
  },
  {
    id: 11,
    title: 'Build Your First HTML Webpage',
    organization: 'Microsoft Learn',
    category: 'Online Courses',
    date: '2026-10-07',
    asset: 'assets/microsoft_learn/Screenshot 2026-10-07 221247.png',
  },
  {
    id: 12,
    title: 'Use CSS Styles in a Webpage',
    organization: 'Microsoft Learn',
    category: 'Online Courses',
    date: '2026-10-07',
    asset: 'assets/microsoft_learn/Screenshot 2026-10-07 221703.png',
  },
  {
    id: 13,
    title: 'Design Multi-Agent Solutions in Microsoft Copilot Studio',
    organization: 'Microsoft Learn',
    category: 'Online Courses',
    date: '2026-10-07',
    asset: 'assets/microsoft_learn/Screenshot 2026-10-07 222104.png',
  },
  {
    id: 14,
    title: 'Understand Features of Copilot Studio Agents',
    organization: 'Microsoft Learn',
    category: 'Online Courses',
    date: '2026-10-07',
    asset: 'assets/microsoft_learn/Screenshot 2026-10-07 222425.png',
  },
  {
    id: 15,
    title: 'Integrating IoT in Capstone Project',
    organization: 'Northeastern College',
    category: 'Seminars',
    date: '2026-06-27',
    asset: 'assets/foundation_cert/13.png',
  },
  {
    id: 16,
    title: 'Video Editing Tips and Tricks',
    organization: 'Northeastern College',
    category: 'Seminars',
    date: '2026-06-27',
    asset: 'assets/foundation_cert/10.png',
  },
  {
    id: 17,
    title: 'Agentic AI',
    organization: 'Northeastern College',
    category: 'Seminars',
    date: '2026-06-27',
    asset: 'assets/foundation_cert/24.png',
  },
  {
    id: 18,
    title: 'Programming Fundamentals',
    organization: 'Northeastern College',
    category: 'Seminars',
    date: '2026-06-27',
    asset: 'assets/foundation_cert/44.png',
  },
  {
    id: 19,
    title: 'Pro Ads and Precision Reach: Mastering AI Design and Targeting',
    organization: 'Department of Science and Technology',
    category: 'Webinars',
    date: '2026-07-08',
    asset: 'assets/Webinar/Screenshot 2026-10-11 155739.png',
  },
];

const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('certificateSearch');
const grid = document.getElementById('certificateGrid');
const resultsCount = document.getElementById('resultsCount');
const certificateTotal = document.getElementById('certificateTotal');
const modal = document.getElementById('certificateModal');
const modalTitle = document.getElementById('modalTitle');
const modalOrg = document.getElementById('modalOrg');
const modalDate = document.getElementById('modalDate');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalVisual = document.getElementById('modalVisual');
const enlargeCertificate = document.getElementById('enlargeCertificate');
const lightbox = document.getElementById('certificateLightbox');
const lightboxVisual = document.getElementById('lightboxVisual');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

let activeFilter = 'All';

const formatDisplayDate = (value) => {
  if (!value) {
    return 'Date not provided';
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

const getFilteredCertificates = () => {
  const query = searchInput.value.trim().toLowerCase();

  return certificates.filter((certificate) => {
    const matchesFilter = activeFilter === 'All' || certificate.category === activeFilter;
    const haystack = `${certificate.title} ${certificate.organization}`.toLowerCase();

    return matchesFilter && (!query || haystack.includes(query));
  });
};

const renderCertificates = () => {
  const filteredCertificates = getFilteredCertificates();
  resultsCount.textContent = filteredCertificates.length;
  certificateTotal.textContent = certificates.length;

  if (!filteredCertificates.length) {
    grid.innerHTML = `
      <div class="certificate-card empty-results">
        <div>
          <h3>No certificates found</h3>
          <p>Try a different keyword or filter.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredCertificates
    .map((certificate) => {
      const imageAsset = certificate.asset && /\.(png|jpe?g|webp)$/i.test(certificate.asset);
      const hasAsset = Boolean(certificate.asset);
      const visual = imageAsset
        ? `<img src="${certificate.asset}" alt="${certificate.title} certificate preview" loading="lazy" />`
        : `<span>${hasAsset ? 'Certificate document' : 'Certificate details needed'}</span>`;
      const category = certificate.category;
      const previewButton = hasAsset
        ? `<button type="button" class="link-button preview-btn" data-id="${certificate.id}">View Certificate</button>`
        : `<button type="button" class="link-button preview-btn" data-id="${certificate.id}">Add Details</button>`;
      const openFileLink = hasAsset && !imageAsset
        ? `<a class="link-button" href="${certificate.asset}" target="_blank" rel="noreferrer">Open PDF</a>`
        : '';

      return `
        <article class="certificate-card" data-id="${certificate.id}">
          <div class="certificate-visual${imageAsset ? ' has-image' : ''}">${visual}</div>
          <div class="certificate-body">
            <span class="certificate-index">${String(certificate.id).padStart(2, '0')}</span>
            <h3>${certificate.title}</h3>
            <p class="meta-line"><strong>Organization:</strong> ${certificate.organization}</p>
            <p class="meta-line"><strong>Category:</strong> ${category}</p>
            <p class="meta-line"><strong>Completed:</strong> ${formatDisplayDate(certificate.date)}</p>
            <div class="certificate-actions">${previewButton}${openFileLink}</div>
          </div>
        </article>
      `;
    })
    .join('');
};

const openModal = (certificateId) => {
  const certificate = certificates.find((item) => item.id === Number(certificateId));

  if (!certificate) {
    return;
  }

  modalTitle.textContent = certificate.title;
  modalOrg.textContent = `Issuing Organization: ${certificate.organization}`;
  modalDate.textContent = `Completed: ${formatDisplayDate(certificate.date)}`;
  modalDescription.textContent = certificate.description || '';
  modalCategory.textContent = certificate.category;
  modalVisual.replaceChildren();

  if (certificate.asset && /\.(png|jpe?g|webp)$/i.test(certificate.asset)) {
    const image = document.createElement('img');
    image.src = certificate.asset;
    image.alt = `${certificate.title} certificate`;
    modalVisual.append(image);
  } else if (certificate.asset) {
    const documentPreview = document.createElement('iframe');
    documentPreview.src = certificate.asset;
    documentPreview.title = `${certificate.title} PDF certificate`;
    modalVisual.append(documentPreview);
  } else {
    modalVisual.textContent = 'Add the certificate file to display a preview.';
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
};

const openLightbox = () => {
  const certificatePreview = modalVisual.querySelector('img, iframe');

  if (!certificatePreview) {
    return;
  }

  const enlargedPreview = certificatePreview.cloneNode();
  lightboxVisual.replaceChildren(enlargedPreview);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxVisual.replaceChildren();
};

const closeModal = () => {
  closeLightbox();
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalVisual.replaceChildren();
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    renderCertificates();
  });
});

searchInput.addEventListener('input', renderCertificates);

grid.addEventListener('click', (event) => {
  const previewButton = event.target.closest('.preview-btn');

  if (previewButton) {
    openModal(previewButton.dataset.id);
  }
});

document.querySelectorAll('[data-close="true"]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.querySelector('.modal-close').addEventListener('click', closeModal);

enlargeCertificate.addEventListener('click', openLightbox);

document.querySelectorAll('[data-close-lightbox="true"]').forEach((element) => {
  element.addEventListener('click', closeLightbox);
});

lightbox.querySelector('.modal-close').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
    return;
  }

  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

renderCertificates();
