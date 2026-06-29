document.addEventListener('DOMContentLoaded', () => {
    // 1. Satirical / Parody Jobs Database
    const jobListings = [
        {
            id: 1,
            title: "Chief Zoom Meeting Node (CZN)",
            company: "Micromanagement Corp",
            location: "zoom",
            locationName: "Zoom Room 4B",
            sector: "corporate",
            sectorName: "Corporate Theater",
            type: "endless",
            typeName: "Endless Meeting",
            salary: "14,000 Invites / yr",
            description: "Requires nodding sagely at 15-minute intervals. Must keep camera on but blur background to hide laundry. Must unmute and say 'Let's take this offline' at least twice daily."
        },
        {
            id: 2,
            title: "Stack Overflow Copy-Paste Consultant",
            company: "Syntax Errors Ltd",
            location: "bed",
            locationName: "Work From Bed",
            sector: "dev",
            sectorName: "Software Craftsmanship",
            type: "nap",
            typeName: "Napping Allowed",
            salary: "3M Warnings / yr",
            description: "Responsible for copying code snippets from Stack Overflow without understanding how they work. Must look stressed and blame compiler/linter issues for code delivery delays."
        },
        {
            id: 3,
            title: "Synergy Integration Buzzword Specialist",
            company: "Paradigm Shifts LLC",
            location: "watercooler",
            locationName: "Watercooler Area",
            sector: "buzz",
            sectorName: "Buzzword Engineering",
            type: "endless",
            typeName: "Endless Meeting",
            salary: "50 Deliverables / hr",
            description: "Orchestrate dynamic solutions, empower action items, and touch base regarding low-hanging fruit. High competency in explaining why simple tasks require long R&D phases."
        },
        {
            id: 4,
            title: "Professional Mouse Jiggler",
            company: "Status Green Enterprises",
            location: "bed",
            locationName: "Work From Bed",
            sector: "corporate",
            sectorName: "Corporate Theater",
            type: "nap",
            typeName: "Napping Allowed",
            salary: "8 hrs Green Status / day",
            description: "Ensure Slack/Teams status remains active green while taking extensive mid-day naps. Master level expertise in balancing heavy paperweights on the Shift key."
        },
        {
            id: 5,
            title: "AI Prompt Typist (Principal Futurist)",
            company: "Artisan Prompts Co",
            location: "zoom",
            locationName: "Zoom Room 4B",
            sector: "dev",
            sectorName: "Software Craftsmanship",
            type: "nap",
            typeName: "Napping Allowed",
            salary: "400 Tokens / hr",
            description: "Responsible for typing 'make it look more high-tech' and 'make it pop' into image generator portals. Must refer to self as 'Principal Generative Architect' on LinkedIn."
        },
        {
            id: 6,
            title: "Outlook Calendar Color-Coder",
            company: "Busywork Solutions",
            location: "watercooler",
            locationName: "Watercooler Area",
            sector: "corporate",
            sectorName: "Corporate Theater",
            type: "endless",
            typeName: "Endless Meeting",
            salary: "24 Pastel Colors / palette",
            description: "Color-coordinate meeting invites so calendar looks fully loaded. Primary metric is ensuring zero time is left to perform actual tasks."
        }
    ];

    // 2. Rendering Logic
    const jobsContainer = document.getElementById('jobs-container');

    const renderJobs = (jobs) => {
        if (!jobsContainer) return;
        
        jobsContainer.innerHTML = '';
        
        if (jobs.length === 0) {
            jobsContainer.innerHTML = `
                <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-beige); margin-bottom: 1.5rem;"></i>
                    <h3>No parody roles match your query</h3>
                    <p style="margin-top: 0.5rem;">Try searching for "Nodding", "Copy", or "Synergy".</p>
                </div>
            `;
            return;
        }

        jobs.forEach((job, index) => {
            const card = document.createElement('div');
            card.className = 'glass-card job-card reveal-scale active';
            card.style.transitionDelay = `${(index % 3) * 0.05}s`;
            card.innerHTML = `
                <div class="job-tags">
                    <span class="job-tag tag-sector">${job.sectorName}</span>
                    <span class="job-tag tag-type">${job.typeName}</span>
                </div>
                <h3>${job.title}</h3>
                <div class="job-company">${job.company}</div>
                <div class="job-meta">
                    <span><i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i> ${job.locationName}</span>
                    <span><i class="fas fa-wallet" style="margin-right: 5px;"></i> ${job.salary}</span>
                </div>
                <p class="job-desc">${job.description}</p>
                <button class="btn btn-primary job-apply-btn" data-job-id="${job.id}" data-job-title="${job.title}">Apply for Parody</button>
            `;
            jobsContainer.appendChild(card);
        });

        bindApplyButtons();
    };

    // 3. Filter Controls Handler
    const searchInput = document.getElementById('search-input');
    const sectorSelect = document.getElementById('sector-select');
    const locationSelect = document.getElementById('location-select');
    const typeSelect = document.getElementById('type-select');

    const filterJobs = () => {
        const query = searchInput.value.toLowerCase().trim();
        const sector = sectorSelect.value;
        const location = locationSelect.value;
        const type = typeSelect.value;

        const filtered = jobListings.filter(job => {
            const matchesQuery = job.title.toLowerCase().includes(query) || 
                                 job.company.toLowerCase().includes(query) || 
                                 job.description.toLowerCase().includes(query);
                                 
            const matchesSector = sector === 'all' || job.sector === sector;
            const matchesLocation = location === 'all' || job.location === location;
            const matchesType = type === 'all' || job.type === type;

            return matchesQuery && matchesSector && matchesLocation && matchesType;
        });

        renderJobs(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', filterJobs);
    if (sectorSelect) sectorSelect.addEventListener('change', filterJobs);
    if (locationSelect) locationSelect.addEventListener('change', filterJobs);
    if (typeSelect) typeSelect.addEventListener('change', filterJobs);

    // Initial render
    renderJobs(jobListings);

    // 4. Modal Popup Controls
    const applyModal = document.getElementById('apply-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalJobTitle = document.getElementById('modal-job-title');
    const appliedJobIdInput = document.getElementById('applied-job-id');

    function bindApplyButtons() {
        const applyBtns = document.querySelectorAll('.job-apply-btn');
        applyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const jobId = btn.getAttribute('data-job-id');
                const jobTitle = btn.getAttribute('data-job-title');
                
                appliedJobIdInput.value = jobId;
                modalJobTitle.innerHTML = `Apply for: <span style="color: var(--accent-beige);">${jobTitle}</span>`;
                applyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    const closeModal = () => {
        applyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('job-application-form').reset();
        uploadStatus.style.display = 'none';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (applyModal) {
        applyModal.addEventListener('click', (e) => {
            if (e.target === applyModal) closeModal();
        });
    }

    // 5. Drag & Drop File Upload Interactions
    const dropzone = document.getElementById('resume-dropzone');
    const fileInput = document.getElementById('resume-file-input');
    const uploadStatus = document.getElementById('file-upload-status');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => {
            fileInput.click();
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                updateFileInfo(files[0]);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                updateFileInfo(fileInput.files[0]);
            }
        });
    }

    function updateFileInfo(file) {
        if (!file) return;
        fileNameDisplay.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
        uploadStatus.style.display = 'block';
    }

    // 6. Application Form Submission Handle
    const applicationForm = document.getElementById('job-application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = applicationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Simulating interview dodging...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Corporate application received! We will pretend to review your credentials and likely send an automated rejection template in 2-3 business weeks.`);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                closeModal();
            }, 1500);
        });
    }
});
