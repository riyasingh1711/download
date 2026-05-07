document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const container = document.getElementById('mainContainer');
    const installBtn = document.getElementById('installBtn');
    const installUI = document.getElementById('installUI');
    const progressBar = document.getElementById('progressBar');
    const installPercent = document.getElementById('installPercent');
    const installSpeed = document.getElementById('installSpeed');
    const installSize = document.getElementById('installSize');
    const cancelBtn = document.getElementById('cancelBtn');
    const topNav = document.getElementById('topNav');

    const aboutTrigger = document.getElementById('aboutTrigger');
    const aboutModal = document.getElementById('aboutModal');
    const closeAbout = document.getElementById('closeAbout');

    const APK_URL = 'https://xyrobet.com/apk/Xyrobet.apk';

    // 1. Splash Screen Transition
    // Reduced delay for better UX while maintaining the branding impact
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            splash.style.display = 'none';
            container.classList.add('loaded');
        }, 600);
    }, 2000);

    // 2. Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });

    // 3. Realistic Install Simulation
    let installInterval;

    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            // Note: The browser will naturally trigger the download because of the 'download' attribute
            // We then immediately show the UI feedback
            installBtn.style.display = 'none';
            installUI.style.display = 'block';
            startSimulation();
        });
    }

    function startSimulation() {
        let progress = 0;
        const totalSize = 24.5; // Simulated APK size in MB
        clearInterval(installInterval);

        installInterval = setInterval(() => {
            // Random increments to feel realistic
            let inc = Math.random() * 5 + 1;
            progress += inc;

            if (progress >= 100) {
                progress = 100;
                clearInterval(installInterval);
                finishInstall();
            }

            progressBar.style.width = progress + '%';
            installPercent.innerText = Math.floor(progress) + '%';

            // Update downloaded size
            const downloaded = (totalSize * (progress / 100)).toFixed(1);
            installSize.innerText = `${downloaded} MB / ${totalSize} MB`;

            // Simulating a steady download speed
            const speed = (Math.random() * 1.5 + 2.5).toFixed(1);
            installSpeed.innerText = speed + ' MB/s';
        }, 400);
    }

    function finishInstall() {
        installSpeed.innerText = 'Installing...';
        installPercent.innerText = '99%';

        setTimeout(() => {
            installUI.style.display = 'none';
            const openBtn = document.createElement('button');
            openBtn.innerText = 'Open';
            openBtn.className = 'install-btn'; // Uses the same high-visibility style
            openBtn.style.background = '#01875f';

            document.querySelector('.install-box').appendChild(openBtn);

            openBtn.addEventListener('click', () => {
                // If the initial download didn't start or they want it again
                window.location.href = APK_URL;
            });
        }, 2500);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            clearInterval(installInterval);
            installUI.style.display = 'none';
            installBtn.style.display = 'block';
            progressBar.style.width = '0%';
        });
    }

    // 4. Modal (About App) Interactivity
    if (aboutTrigger) {
        aboutTrigger.addEventListener('click', () => {
            aboutModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    }

    const closeModal = () => {
        aboutModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeAbout) closeAbout.addEventListener('click', closeModal);

    // Click outside modal to close (Standard Android behavior)
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) closeModal();
    });

    // 5. Developer Contact Toggle
    const devContactTrigger = document.getElementById('devContactTrigger');
    const devContactContent = document.getElementById('devContactContent');
    const devContactIcon = document.getElementById('devContactIcon');

    if (devContactTrigger) {
        devContactTrigger.addEventListener('click', () => {
            const isHidden = devContactContent.style.display === 'none';
            devContactContent.style.display = isHidden ? 'block' : 'none';
            devContactIcon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    // 6. Dynamic Win Toasts
    const winners = [
        { n: 'Arjun', a: '₹5,000' },
        { n: 'Rohit', a: '₹12,800' },
        { n: 'Sai Teja', a: '₹3,500' },
        { n: 'Nikhil', a: '₹8,200' },
        { n: 'Aman', a: '₹15,000' },
        { n: 'Priya', a: '₹7,400' },
        { n: 'Vikram', a: '₹20,000' }
    ];

    const toast = document.getElementById('liveToast');
    const winnerName = document.getElementById('winnerName');
    const winAmount = document.getElementById('winAmount');

    function showToast() {
        const winner = winners[Math.floor(Math.random() * winners.length)];
        winnerName.innerText = winner.n;
        winAmount.innerText = winner.a;

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Delayed start for toasts to not interrupt the splash
    setTimeout(() => {
        showToast();
        setInterval(showToast, 18000); // Periodic notification
    }, 6000);

    // 6. Helpful Chips Toggle (Visual feedback only)
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const group = this.parentElement;
            group.querySelectorAll('.chip').forEach(c => {
                c.style.background = 'white';
                c.style.color = '#5f6368';
            });
            this.style.background = '#e6f3ef';
            this.style.color = '#01875f';
            this.style.borderColor = '#01875f';
        });
    });
});
