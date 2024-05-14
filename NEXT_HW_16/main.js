document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const banners = document.querySelectorAll('.banner');

    const bannerInfo = {
        banner1: { title: 'About Title', subtitle: 'About Subtitle', color: '#e8242d' },
        banner2: { title: 'Products Title', subtitle: 'Products Subtitle', color: '#087144' },
        banner3: { title: 'Technology Title', subtitle: 'Technology Subtitle', color: '#ee6e9f' },
        banner4: { title: 'Downloads Title', subtitle: 'Downloads Subtitle', color: '#f5be2e' },
    };

    function activateTab(index) {
        const tabId = `banner${index + 1}`;
        const { title, subtitle, color } = bannerInfo[tabId];
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        banners.forEach((banner) => banner.classList.remove('active'));
        tabButtons[index].classList.add('active');
        tabButtons[index].style.backgroundColor = color;
        banners[index].classList.add('active');
        document.getElementById(`title${index + 1}`).textContent = title;
        document.getElementById(`subtitle${index + 1}`).textContent = subtitle;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => activateTab(index));
        button.addEventListener('mouseover', function () {
            const tabId = this.getAttribute('data-tab');
            this.style.backgroundColor = bannerInfo[tabId].color;
        });
        button.addEventListener('mouseout', function () {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#ddd';
            }
        });
    });

    // Activate the first tab on page load
    activateTab(0);
});
