

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
function sendEmail() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !subject || !message) {
        showNotification('Lütfen tüm alanları doldurun', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir email adresi girin', 'error');
        return;
    }
    
    // Create email content
    const emailBody = `Merhaba,

Aşağıdaki bilgilerle iletişim formu gönderildi:

İsim: ${name}
Email: ${email}
Konu: ${subject}

Mesaj:
${message}

---
Bu mesaj Zade Alüminyum web sitesinden gönderilmiştir.`;

    // Create mailto link
    const mailtoLink = `mailto:info@zadealuminyumtasarim.com.tr?subject=${encodeURIComponent('Zade Alüminyum - ' + subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Show success message
    showNotification('Email uygulamanız açılıyor. Mesajı göndermek için "Gönder" butonuna tıklayın.', 'success');
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature card hover effects
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Hero title animation - only fadeInUp effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Keep the original text and let CSS handle the fadeInUp animation
        heroTitle.style.animation = 'fadeInUp 1s ease';
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #1d4ed8);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Global function to force update page title


// Simple title update when script loads
(function() {
    if (window.updatePageTitle) {
        window.updatePageTitle();
    }
})();

// Language Selector Functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLang = document.querySelector('.current-lang');
    const countryName = document.querySelector('.country-name');

    // Language code to flag emoji mapping
    const langToFlag = {
        'tr': '🇹🇷',
        'en': '🇺🇸', // Default to US flag for English
        'fr': '🇫🇷',
        'de': '🇩🇪',
        'es': '🇪🇸',
        'it': '🇮🇹',
        'nl': '🇳🇱',
        'pl': '🇵🇱',
        'pt': '🇵🇹',
        'ro': '🇷🇴',
        'cs': '🇨🇿',
        'fi': '🇫🇮',
        'hu': '🇭🇺',
        'lt': '🇱🇹',
        'lu': '🇱🇺',
        'rs': '🇷🇸',
        'se': '🇸🇪',
        'ch': '🇨🇭',
        'ua': '🇺🇦',
        'cn': '🇨🇳',
        'ar': '🇸🇦'
    };

    // Special mapping for countries with same language but different flags
    const countryToFlag = {
        'United Kingdom - UK': '🇬🇧',
        'United States - US': '🇺🇸'
    };

    // Translations object
    const translations = {
        'tr': {
            // Page Title
            'page_title': 'Zade - Cam Hizmetlerimiz',
            
            // Navigation
            'nav_home': 'Ana Sayfa',
            'nav_services': 'Hizmetlerimiz',
            'nav_projects': 'Projelerimiz',
            'nav_about': 'Hakkımızda',
            'nav_contact': 'İletişim',
            
            // Hero Section
            'hero_title': 'Zade Alüminyum Giyotin Cam Sistemleri',
            'hero_description': 'Zade Alüminyum olarak, modern yapılarda tercih edilen dayanıklı, hafif ve estetik alüminyum sistemleri ile projelerinize değer katıyoruz. Alüminyum doğrama, cephe kaplama, alüminyum korkuluk, sürme kapı ve pencere sistemleri gibi geniş hizmet yelpazemizle konut, ofis ve ticari alanlar için uzun ömürlü çözümler sunuyoruz. Paslanmaz yapısı ve şık görünümü sayesinde alüminyum, iç ve dış mekan uygulamalarında ideal tercihtir.',
            'btn_discover': 'Hizmetlerimizi Keşfedin',
            'btn_about': 'Hakkımızda',
            
            // Services Section
            'services_title': 'Hizmetlerimiz',
            'services_subtitle': 'Zade Alüminyum ve Cam Tasarım, sanatın birleştiği mekanlarınıza sıcaklık, zarafet ve estetiği uzun ömürlü çözümler sunuyoruz.',
            'glass_projects': 'Cam Projeler',
            'glass_projects_desc': 'Modern mimari için şeffaf ve zarif cam çözümleri',
            'aluminum_projects': 'Alüminyum Projeler',
            'aluminum_projects_desc': 'Dayanıklı ve estetik alüminyum tasarım çözümleri',
            'btn_details': 'Detayları Gör',
            
            // About Section
            'about_title': 'Hakkımızda',
            'about_subtitle': 'Cam ve alüminyumda estetikle dayanıklılığı buluşturan öncü firma.',
            'mission_title': 'Misyonumuz',
            'mission_text1': 'Zade alüminyum Tasarım olarak, alüminyum ve cam uygulamalarında estetik, dayanıklılık ve yenilikçi çözümler sunan lider bir firmayız. Yılların deneyimi ve bilgi birikimiyle müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz. Modern mimari çözümlerle yaşam alanlarınızı daha fonksiyonel ve şık hale getirmek için buradayız. Çeşitli ürün yelpazemizle her türlü ihtiyaca uygun çözümler üretiyoruz.',
            'mission_text2': 'Uzman ekibimiz, sektördeki en son teknolojileri kullanarak, müşterilerimizin ihtiyaçlarına özel, işlevsel ve şık tasarımlar üretmektedir. Zade alüminyum ve Cam Tasarım olarak, bireysel ve ticari projelerde güvenilir bir iş ortağı olmayı hedefliyoruz.',
            'mission_text3': 'Hayalinizdeki yaşam alanlarını gerçeğe dönüştürmek için, camın zarafetini ve alüminyumun gücünü birleştirerek fark yaratıyoruz.',
            
            // Features
            'feature1_title': 'Öncü Tasarımlar',
            'feature1_desc': 'Modern mimarinin sınırlarını zorlayan yaratıcı çözümler sunuyoruz.',
            'feature2_title': 'Deneyim ve Uzmanlık',
            'feature2_desc': 'Alanında uzman kadromuz, projelerinizi en iyi şekilde hayata geçirir.',
            'feature3_title': 'Kalıcı Çözümler',
            'feature3_desc': 'Dayanıklı, uzun ömürlü ve şık tasarımlarla değer yaratırız.',
            'feature4_title': 'Güvenilir Kalite',
            'feature4_desc': 'Kullandığımız yüksek kaliteli malzemelerle uzun ömürlü sonuçlar sağlıyoruz.',
            
            // Contact Section
            'contact_title': 'Bizimle İletişime Geçin',
            'contact_subtitle': 'Estetik ve Teknolojiyi Buluşturan Tasarıma Sahip Mekanlar İçin Bize Ulaşabilirsiniz.',
            'contact_email': 'Email',
            'contact_phone': 'Firma İletişim',
            'contact_address': 'Adres',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'İsminiz',
            'form_email': 'Email',
            'form_subject': 'Konu',
            'form_message': 'Mesajınız',
            'btn_send': 'Mesaj Gönder',
            
            // Footer
            'footer_about': 'Cam ve alüminyumda estetikle dayanıklılığı buluşturan öncü firma.',
            'footer_services': 'Hizmetlerimiz',
            'footer_contact': 'İletişim',
            'footer_copyright': '© 2024 Zade Alüminyum. Tüm hakları saklıdır.',
            
            // Footer Quick Links
            'footer_quick_links': 'Hızlı Bağlantılar',
            'footer_services_title': 'Hizmetlerimiz',
            
            // Footer Services List
            'service_transparent_facade': 'Transparan Cephe',
            'service_glass_curtain': 'Cam Giyotin Sistemleri',
            'service_glass_door': 'Cam Kapı',
            'service_plexiglass_railing': 'Pleksi Dikme Korkuluk',
            'service_glass_canopy': 'Cam Saçak',
            'service_spider_facade': 'Spider Cephe',
            'service_transparent_elevator': 'Transparan Asansör',
            'service_glass_facade': 'Cam Cephe',
            'service_stair_glass_railing': 'Merdiven Cam Korkuluk',
            
            // Cam Projeler Page Specific
            'cam_hero_title': 'Cam Hizmetlerimiz',
            'aluminyum_hero_title': 'Alüminyum Hizmetlerimiz',
            'cam_hero_description': 'Cam tasarım hizmetlerimizle yaşam ve çalışma alanlarınıza modern, zarif ve fonksiyonel çözümler sunuyoruz. Özenle seçilmiş malzemeler ve titiz işçilikle ürettiğimiz cam uygulamalar; estetik görünümünün yanı sıra güvenlik, dayanıklılık ve ışık geçirgenliği gibi avantajlarıyla da öne çıkar. Ofis bölmeleri, cam kapılar, vitrin sistemleri ve özel projelerde hayal ettiğiniz tasarımları gerçeğe dönüştürüyor, mekanlarınıza değer katıyoruz.',
            'cam_services_title': 'Cam Hizmetlerimiz',
            'cam_services_subtitle': 'Her türlü cam projesi için kapsamlı çözümler sunuyoruz',
            'cam_facade_systems': 'Cam Cephe Sistemleri',
            'cam_facade_desc': 'Modern binalar için şeffaf ve dayanıklı cam cephe çözümleri. Enerji verimliliği ve estetik tasarımı bir arada sunuyoruz.',
            'cam_door_systems': 'Cam Kapı Sistemleri',
            'cam_door_desc': 'Alüminyum çerçeveli zarif cam kapı çözümleri. Hem konut hem ticari projeler için özel tasarımlar.',
            'cam_railing_systems': 'Cam Korkuluk Sistemleri',
            'cam_railing_desc': 'Güvenlik ve estetiği birleştiren cam korkuluk çözümleri. Merdiven ve balkon uygulamaları için özel tasarımlar.',
            'cam_elevator_systems': 'Cam Asansör Sistemleri',
            'cam_elevator_desc': 'Şeffaf asansör muhafazaları ve cam asansör sistemleri. Modern binalar için görsel zenginlik katıyoruz.',
            'cam_features_title': 'Cam Projelerimizin Özellikleri',
            'cam_features_subtitle': 'Neden Zade Alüminyum\'u tercih etmelisiniz?',
            'cam_transparency_title': 'Şeffaflık ve Işık',
            'cam_transparency_desc': 'Doğal ışığı maksimum seviyede iç mekanlara taşıyarak ferah ve aydınlık ortamlar yaratıyoruz.',
            'cam_energy_title': 'Enerji Verimliliği',
            'cam_energy_desc': 'Isı yalıtımlı cam sistemleri ile enerji tasarrufu sağlayarak çevre dostu çözümler sunuyoruz.',
            'cam_aesthetic_title': 'Estetik Tasarım',
            'cam_aesthetic_desc': 'Modern mimari trendlerine uygun, şık ve zarif cam tasarımları ile mekanlarınızı güzelleştiriyoruz.',
            'cam_security_title': 'Güvenlik ve Dayanıklılık',
            'cam_security_desc': 'Yüksek kaliteli cam malzemeler ve güvenlik standartlarına uygun uygulamalar ile güvenli çözümler.',
            
            // Work Process Section
            'work_process_title': 'Çalışma Sürecimiz',
            'work_process_subtitle': 'Projelerinizi hayata geçirmek için izlediğimiz profesyonel adımlar',
            
            // Projects Section
            'projects_title': 'Projelerimiz',
            'projects_subtitle': 'Başarıyla tamamladığımız projelerden örnekler',
            'projects_description': '12+ yıl deneyimimizle Türkiye\'nin önde gelen alüminyum ve cam sistemleri üreticisi olarak, 2.645+ projeyi başarıyla tamamladık.',
            'project_stats_title': 'Proje İstatistiklerimiz',
            'project_stats_subtitle': 'Başarılarımızın sayısal göstergeleri',
            'stats_completed_projects': '2.645+ Tamamlanmış Proje',
            'stats_years_experience': '12+ Yıllık Deneyim',
            'stats_application_area': '550.000+ m² Uygulama',
            'stats_professional_team': '30+ Profesyonel Ekip',
            'view_all_projects': 'Tüm Projeleri Gör',
            'project_year': 'Yıl',
            'project_location': 'Konum',
            'project_area': 'Alan',
            'step1_title': 'İlk Görüşme',
            'step1_desc': 'Müşteri ihtiyaçlarını anlamak için detaylı görüşme yapıyor, proje kapsamını belirliyoruz.',
            'step2_title': 'Tasarım ve Planlama',
            'step2_desc': 'Uzman ekibimiz projenizi analiz ederek en uygun tasarım ve teknik çözümleri hazırlıyor.',
            'step3_title': 'Teklif ve Anlaşma',
            'step3_desc': 'Detaylı proje teklifini sunuyor, anlaşma sonrası üretim sürecini başlatıyoruz.',
            'step4_title': 'Üretim',
            'step4_desc': 'Modern teknoloji ve kaliteli malzemelerle projenizi hassasiyetle üretiyoruz.',
            'step5_title': 'Montaj',
            'step5_desc': 'Uzman montaj ekibimiz projenizi güvenli ve profesyonel şekilde yerine monte ediyor.',
            'step6_title': 'Kontrol ve Teslim',
            'step6_desc': 'Son kontrolleri yaparak projenizi teslim ediyor, sonrasında destek hizmeti sunuyoruz.',
            
            // Projects Section
            'projects_title': 'Projelerimiz',
            'projects_subtitle': 'Başarıyla tamamladığımız örnek projeler ve referanslarımız',
            'project1_title': 'Rezidans Projesi',
            'project1_desc': 'Modern rezidans projesi için cam cephe ve alüminyum sistemleri uygulaması',
            'project1_tag1': 'Cam Cephe',
            'project1_tag2': 'Alüminyum',
            'project2_title': 'Ticari Merkez',
            'project2_desc': 'Büyük ölçekli ticari merkez için transparan cephe sistemi',
            'project2_tag1': 'Transparan Cephe',
            'project2_tag2': 'Ticari',
            'project3_title': 'Villa Projesi',
            'project3_desc': 'Lüks villa için özel tasarım cam kapı ve korkuluk sistemleri',
            'project3_tag1': 'Cam Kapı',
            'project3_tag2': 'Korkuluk',
            'cam_cta_title': 'Cam Projeleriniz İçin Bizimle İletişime Geçin',
            'cam_cta_desc': 'Hayalinizdeki cam projesini gerçeğe dönüştürmek için uzman ekibimizle görüşün. Size özel çözümler sunuyoruz.',
            'btn_get_quote': 'Teklif Alın'
        },
        'en': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Home',
            'nav_services': 'Services',
            'nav_projects': 'Our Projects',
            'nav_about': 'About',
            'nav_contact': 'Contact',
            
            // Hero Section
            'hero_title': 'Zade Aluminum Guillotine Glass Systems',
            'hero_description': 'Transparent and durable aluminum glass systems for modern architecture. We offer innovative solutions that transform your living spaces.',
            'btn_discover': 'Discover Our Services',
            'btn_about': 'About Us',
            
            // Services Section
            'services_title': 'Our Services',
            'services_subtitle': 'Zade Aluminum and Glass Design offers long-lasting solutions with warmth, elegance, and aesthetics to spaces where art meets functionality.',
            'glass_projects': 'Glass Projects',
            'glass_projects_desc': 'Transparent and elegant glass solutions for modern architecture',
            'aluminum_projects': 'Aluminum Projects',
            'aluminum_projects_desc': 'Durable and aesthetic aluminum design solutions',
            'btn_details': 'View Details',
            
            // About Section
            'about_title': 'About Us',
            'about_subtitle': 'Leading company combining aesthetics with durability in glass and aluminum.',
            'mission_title': 'Our Mission',
            'mission_text1': 'As Zade Aluminum Design, we are a leading company offering aesthetic, durable, and innovative solutions in aluminum and glass applications. With years of experience and knowledge, we aim to provide our customers with the highest quality service. We are here to make your living spaces more functional and elegant with modern architectural solutions. We produce solutions suitable for all kinds of needs with our diverse product range.',
            'mission_text2': 'Our expert team produces functional and elegant designs tailored to our customers\' needs using the latest technologies in the sector. As Zade Aluminum and Glass Design, we aim to be a reliable business partner in individual and commercial projects.',
            'mission_text3': 'To turn your dream living spaces into reality, we make a difference by combining the elegance of glass with the strength of aluminum.',
            
            // Features
            'feature1_title': 'Pioneering Designs',
            'feature1_desc': 'We offer creative solutions that push the boundaries of modern architecture.',
            'feature2_title': 'Experience and Expertise',
            'feature2_desc': 'Our expert staff brings your projects to life in the best way possible.',
            'feature3_title': 'Permanent Solutions',
            'feature3_desc': 'We create value with durable, long-lasting, and elegant designs.',
            'feature4_title': 'Reliable Quality',
            'feature4_desc': 'We provide long-lasting results with the high-quality materials we use.',
            
            // Contact Section
            'contact_title': 'Contact Us',
            'contact_subtitle': 'You can reach us for spaces with designs that combine aesthetics and technology.',
            'contact_email': 'Email',
            'contact_phone': 'Company Contact',
            'contact_address': 'Address',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Your Name',
            'form_email': 'Email',
            'form_subject': 'Subject',
            'form_message': 'Your Message',
            'btn_send': 'Send Message',
            
            // Footer
            'footer_about': 'Leading company combining aesthetics with durability in glass and aluminum.',
            'footer_services': 'Our Services',
            'footer_contact': 'Contact',
            'footer_copyright': '© 2024 Zade Aluminum. All rights reserved.',
            
            // Footer Quick Links
            'footer_quick_links': 'Quick Links',
            'footer_services_title': 'Our Services',
            
            // Footer Services List
            'service_transparent_facade': 'Transparent Facade',
            'service_glass_curtain': 'Glass Curtain Systems',
            'service_glass_door': 'Glass Door',
            'service_plexiglass_railing': 'Plexiglass Railing',
            'service_glass_canopy': 'Glass Canopy',
            'service_spider_facade': 'Spider Facade',
            'service_transparent_elevator': 'Transparent Elevator',
            'service_glass_facade': 'Glass Facade',
            'service_stair_glass_railing': 'Stair Glass Railing',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Our Glass Services',
            'cam_services_subtitle': 'We offer comprehensive solutions for all types of glass projects',
            'cam_facade_systems': 'Glass Facade Systems',
            'cam_facade_desc': 'Transparent and durable glass facade solutions for modern buildings. We offer energy efficiency and aesthetic design together.',
            'cam_door_systems': 'Glass Door Systems',
            'cam_door_desc': 'Elegant glass door solutions with aluminum frames. Special designs for both residential and commercial projects.',
            'cam_railing_systems': 'Glass Railing Systems',
            'cam_railing_desc': 'Glass railing solutions that combine security and aesthetics. Special designs for stair and balcony applications.',
            'cam_elevator_systems': 'Glass Elevator Systems',
            'cam_elevator_desc': 'Transparent elevator enclosures and glass elevator systems. We add visual richness to modern buildings.',
            'cam_features_title': 'Features of Our Glass Projects',
            'cam_features_subtitle': 'Why should you choose Zade Aluminum?',
            'cam_transparency_title': 'Transparency and Light',
            'cam_transparency_desc': 'We create comfortable and bright environments by bringing natural light to the maximum level into interior spaces.',
            'cam_energy_title': 'Energy Efficiency',
            'cam_energy_desc': 'We offer environmentally friendly solutions by saving energy with heat-insulated glass systems.',
            'cam_aesthetic_title': 'Aesthetic Design',
            'cam_aesthetic_desc': 'We beautify your spaces with stylish and elegant glass designs that comply with modern architectural trends.',
            'cam_security_title': 'Security and Durability',
            'cam_security_desc': 'Safe solutions with high-quality glass materials and applications that comply with security standards.',
            'cam_cta_title': 'Contact Us for Your Glass Projects',
            'cam_cta_desc': 'Consult our expert team to turn your dream glass project into reality. We offer customized solutions for you.',
            'btn_get_quote': 'Get Quote',
            
            // Work Process Section
            'work_process_title': 'Our Work Process',
            'work_process_subtitle': 'Professional steps we follow to bring your projects to life',
            'step1_title': 'Initial Meeting',
            'step1_desc': 'We conduct detailed meetings to understand customer needs and determine project scope.',
            'step2_title': 'Design and Planning',
            'step2_desc': 'Our expert team analyzes your project and prepares the most suitable design and technical solutions.',
            'step3_title': 'Quote and Agreement',
            'step3_desc': 'We present detailed project proposals and start the production process after agreement.',
            'step4_title': 'Production',
            'step4_desc': 'We produce your project with precision using modern technology and quality materials.',
            'step5_title': 'Installation',
            'step5_desc': 'Our expert installation team mounts your project safely and professionally.',
            'step6_title': 'Inspection and Delivery',
            'step6_desc': 'We deliver your project after final inspections and provide ongoing support services.',
            
            // Projects Section
            'projects_title': 'Our Projects',
            'projects_subtitle': 'Sample projects and references we have successfully completed',
            'project1_title': 'Residential Project',
            'project1_desc': 'Glass facade and aluminum systems application for modern residential project',
            'project1_tag1': 'Glass Facade',
            'project1_tag2': 'Aluminum',
            'project2_title': 'Commercial Center',
            'project2_desc': 'Transparent facade system for large-scale commercial center',
            'project2_tag1': 'Transparent Facade',
            'project2_tag2': 'Commercial',
            'project3_title': 'Villa Project',
            'project3_desc': 'Custom design glass door and railing systems for luxury villa',
            'project3_tag1': 'Glass Door',
            'project3_tag2': 'Railing',
            
            // Project Statistics
            'project_stats_title': 'Our Project Statistics',
            'project_stats_subtitle': 'Numerical indicators of our success',
            'stats_completed_projects': '2,645+ Completed Projects',
            'stats_years_experience': '12+ Years Experience',
            'stats_application_area': '550,000+ m² Application',
            'stats_professional_team': '30+ Professional Team',
            'view_all_projects': 'View All Projects',
            'project_year': 'Year',
            'project_location': 'Location',
            'project_area': 'Area',
            'projects_description': 'With 12+ years of experience as Turkey\'s leading aluminum and glass systems manufacturer, we have successfully completed 2,645+ projects.'
        },
        'fr': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Accueil',
            'nav_services': 'Services',
            'nav_about': 'À Propos',
            'nav_projects': 'Nos Projets',
            'nav_contact': 'Contact',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Systèmes de Vitres Guillotine',
            'hero_description': 'Systèmes de vitres en aluminium transparents et durables pour l\'architecture moderne. Nous offrons des solutions innovantes qui transforment vos espaces de vie.',
            'btn_discover': 'Découvrir Nos Services',
            'btn_about': 'À Propos',
            
            // Services Section
            'services_title': 'Nos Services',
            'services_subtitle': 'Zade Aluminium et Design de Verre offre des solutions durables avec chaleur, élégance et esthétique aux espaces où l\'art rencontre la fonctionnalité.',
            'glass_projects': 'Projets de Verre',
            'glass_projects_desc': 'Solutions de verre transparentes et élégantes pour l\'architecture moderne',
            'aluminum_projects': 'Projets d\'Aluminium',
            'aluminum_projects_desc': 'Solutions de design en aluminium durables et esthétiques',
            'btn_details': 'Voir les Détails',
            
            // About Section
            'about_title': 'À Propos',
            'about_subtitle': 'Entreprise leader combinant esthétique et durabilité dans le verre et l\'aluminium.',
            'mission_title': 'Notre Mission',
            'mission_text1': 'En tant que Zade Aluminium Design, nous sommes une entreprise leader offrant des solutions esthétiques, durables et innovantes dans les applications d\'aluminium et de verre. Avec des années d\'expérience et de connaissances, nous visons à fournir à nos clients le service de la plus haute qualité. Nous sommes là pour rendre vos espaces de vie plus fonctionnels et élégants avec des solutions architecturales modernes.',
            'mission_text2': 'Notre équipe d\'experts produit des designs fonctionnels et élégants adaptés aux besoins de nos clients en utilisant les dernières technologies du secteur.',
            'mission_text3': 'Pour transformer vos espaces de vie de rêve en réalité, nous faisons la différence en combinant l\'élégance du verre avec la force de l\'aluminium.',
            
            // Features
            'feature1_title': 'Designs Pionniers',
            'feature1_desc': 'Nous offrons des solutions créatives qui repoussent les limites de l\'architecture moderne.',
            'feature2_title': 'Expérience et Expertise',
            'feature2_desc': 'Notre personnel expert donne vie à vos projets de la meilleure façon possible.',
            'feature3_title': 'Solutions Permanentes',
            'feature3_desc': 'Nous créons de la valeur avec des designs durables, durables et élégants.',
            'feature4_title': 'Qualité Fiable',
            'feature4_desc': 'Nous fournissons des résultats durables avec les matériaux de haute qualité que nous utilisons.',
            
            // Contact Section
            'contact_title': 'Contactez-Nous',
            'contact_subtitle': 'Vous pouvez nous joindre pour des espaces avec des designs qui combinent esthétique et technologie.',
            'contact_email': 'Email',
            'contact_phone': 'Contact de l\'Entreprise',
            'contact_address': 'Adresse',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Votre Nom',
            'form_email': 'Email',
            'form_subject': 'Sujet',
            'form_message': 'Votre Message',
            'btn_send': 'Envoyer le Message',
            
            // Footer
            'footer_about': 'Entreprise leader combinant esthétique et durabilité dans le verre et l\'aluminium.',
            'footer_services': 'Nos Services',
            'footer_contact': 'Contact',
            'footer_copyright': '© 2024 Zade Aluminium. Tous droits réservés.',
            
            // Projects Section
            'projects_title': 'Nos Projets',
            'projects_subtitle': 'Exemples de projets que nous avons réalisés avec succès',
            'projects_description': 'Avec plus de 12 ans d\'expérience en tant que fabricant leader de systèmes d\'aluminium et de verre en Turquie, nous avons réalisé avec succès plus de 2 645 projets.',
            'project_stats_title': 'Nos Statistiques de Projets',
            'project_stats_subtitle': 'Indicateurs numériques de notre succès',
            'stats_completed_projects': '2 645+ Projets Réalisés',
            'stats_years_experience': '12+ Années d\'Expérience',
            'stats_application_area': '550 000+ m² d\'Application',
            'stats_professional_team': '30+ Équipe Professionnelle',
            'view_all_projects': 'Voir Tous les Projets',
            'project_year': 'Année',
            'project_location': 'Emplacement',
            'project_area': 'Surface',
            
            // Footer Quick Links
            'footer_quick_links': 'Liens Rapides',
            'footer_services_title': 'Nos Services',
            
            // Footer Services List
            'service_transparent_facade': 'Façade Transparente',
            'service_glass_curtain': 'Systèmes de Rideaux de Verre',
            'service_glass_door': 'Porte en Verre',
            'service_plexiglass_railing': 'Garde-corps en Plexiglas',
            'service_glass_canopy': 'Verrière',
            'service_spider_facade': 'Façade Spider',
            'service_transparent_elevator': 'Ascenseur Transparent',
            'service_glass_facade': 'Façade en Verre',
            'service_stair_glass_railing': 'Garde-corps d\'Escalier en Verre',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Nos Services de Verre',
            'cam_services_subtitle': 'Nous offrons des solutions complètes pour tous types de projets de verre',
            'cam_facade_systems': 'Systèmes de Façade en Verre',
            'cam_facade_desc': 'Solutions de façade en verre transparentes et durables pour les bâtiments modernes. Nous offrons efficacité énergétique et design esthétique ensemble.',
            'cam_door_systems': 'Systèmes de Portes en Verre',
            'cam_door_desc': 'Solutions de portes en verre élégantes avec cadres en aluminium. Designs spéciaux pour projets résidentiels et commerciaux.',
            'cam_railing_systems': 'Systèmes de Garde-corps en Verre',
            'cam_railing_desc': 'Solutions de garde-corps en verre qui combinent sécurité et esthétique. Designs spéciaux pour applications d\'escaliers et balcons.',
            'cam_elevator_systems': 'Systèmes d\'Ascenseurs en Verre',
            'cam_elevator_desc': 'Enceintes d\'ascenseurs transparentes et systèmes d\'ascenseurs en verre. Nous ajoutons de la richesse visuelle aux bâtiments modernes.',
            'cam_features_title': 'Caractéristiques de Nos Projets de Verre',
            'cam_features_subtitle': 'Pourquoi choisir Zade Aluminium ?',
            'cam_transparency_title': 'Transparence et Lumière',
            'cam_transparency_desc': 'Nous créons des environnements confortables et lumineux en apportant la lumière naturelle au niveau maximum dans les espaces intérieurs.',
            'cam_energy_title': 'Efficacité Énergétique',
            'cam_energy_desc': 'Nous offrons des solutions respectueuses de l\'environnement en économisant l\'énergie avec des systèmes de verre isolés thermiquement.',
            'cam_aesthetic_title': 'Design Esthétique',
            'cam_aesthetic_desc': 'Nous embellissons vos espaces avec des designs en verre élégants et stylés qui respectent les tendances architecturales modernes.',
            'cam_security_title': 'Sécurité et Durabilité',
            'cam_security_desc': 'Solutions sûres avec des matériaux en verre de haute qualité et des applications conformes aux normes de sécurité.',
            'cam_cta_title': 'Contactez-nous pour Vos Projets de Verre',
            'cam_cta_desc': 'Consultez notre équipe d\'experts pour transformer votre projet de verre de rêve en réalité. Nous offrons des solutions personnalisées pour vous.',
            'btn_get_quote': 'Obtenir un Devis',
            
            // Work Process Section
            'work_process_title': 'Notre Processus de Travail',
            'work_process_subtitle': 'Étapes professionnelles que nous suivons pour donner vie à vos projets',
            'step1_title': 'Première Réunion',
            'step1_desc': 'Nous organisons des réunions détaillées pour comprendre les besoins du client et déterminer la portée du projet.',
            'step2_title': 'Conception et Planification',
            'step2_desc': 'Nous créons des conceptions détaillées et planifions chaque étape du projet avec précision.',
            'step3_title': 'Devis et Accord',
            'step3_desc': 'Nous préparons des devis détaillés et établissons des accords clairs avec nos clients.',
            'step4_title': 'Production',
            'step4_desc': 'Nous produisons des systèmes de haute qualité en utilisant des matériaux de première classe.',
            'step5_title': 'Installation',
            'step5_desc': 'Notre équipe expérimentée installe les systèmes avec précision et professionnalisme.',
            'step6_title': 'Inspection et Livraison',
            'step6_desc': 'Nous effectuons des inspections finales et livrons le projet selon les normes les plus élevées.',
        },
        'de': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Startseite',
            'nav_services': 'Dienstleistungen',
            'nav_about': 'Über uns',
            'nav_projects': 'Unsere Projekte',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Guillotine-Glassysteme',
            'hero_description': 'Transparente und langlebige Aluminium-Glassysteme für moderne Architektur. Wir bieten innovative Lösungen, die Ihre Wohnräume verwandeln.',
            'btn_discover': 'Unsere Dienstleistungen entdecken',
            'btn_about': 'Über uns',
            
            // Services Section
            'services_title': 'Unsere Dienstleistungen',
            'services_subtitle': 'Zade Aluminium und Glasdesign bietet langlebige Lösungen mit Wärme, Eleganz und Ästhetik für Räume, in denen Kunst auf Funktionalität trifft.',
            'glass_projects': 'Glasprojekte',
            'glass_projects_desc': 'Transparente und elegante Glaslösungen für moderne Architektur',
            'aluminum_projects': 'Aluminiumprojekte',
            'aluminum_projects_desc': 'Langlebige und ästhetische Aluminium-Designlösungen',
            'btn_details': 'Details anzeigen',
            
            // About Section
            'about_title': 'Über uns',
            'about_subtitle': 'Führendes Unternehmen, das Ästhetik mit Langlebigkeit in Glas und Aluminium verbindet.',
            'mission_title': 'Unsere Mission',
            'mission_text1': 'Als Zade Aluminium Design sind wir ein führendes Unternehmen, das ästhetische, langlebige und innovative Lösungen in Aluminium- und Glasanwendungen anbietet. Mit jahrelanger Erfahrung und Wissen streben wir danach, unseren Kunden den höchsten Qualitätsservice zu bieten.',
            'mission_text2': 'Unser Expertenteam erstellt funktionale und elegante Designs, die auf die Bedürfnisse unserer Kunden zugeschnitten sind und die neuesten Technologien der Branche nutzen.',
            'mission_text3': 'Um Ihre Traumwohnräume Wirklichkeit werden zu lassen, machen wir den Unterschied, indem wir die Eleganz von Glas mit der Stärke von Aluminium kombinieren.',
            
            // Features
            'feature1_title': 'Pionierdesigns',
            'feature1_desc': 'Wir bieten kreative Lösungen, die die Grenzen der modernen Architektur erweitern.',
            'feature2_title': 'Erfahrung und Expertise',
            'feature2_desc': 'Unser Expertenteam bringt Ihre Projekte auf die bestmögliche Weise zum Leben.',
            'feature3_title': 'Dauerhafte Lösungen',
            'feature3_desc': 'Wir schaffen Wert mit langlebigen, dauerhaften und eleganten Designs.',
            'feature4_title': 'Zuverlässige Qualität',
            'feature4_desc': 'Wir liefern langlebige Ergebnisse mit den hochwertigen Materialien, die wir verwenden.',
            
            // Contact Section
            'contact_title': 'Kontaktieren Sie uns',
            'contact_subtitle': 'Sie können uns für Räume mit Designs erreichen, die Ästhetik und Technologie verbinden.',
            'contact_email': 'E-Mail',
            'contact_phone': 'Firmenkontakt',
            'contact_address': 'Adresse',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Ihr Name',
            'form_email': 'E-Mail',
            'form_subject': 'Betreff',
            'form_message': 'Ihre Nachricht',
            'btn_send': 'Nachricht senden',
            
            // Footer
            'footer_about': 'Führendes Unternehmen, das Ästhetik mit Langlebigkeit in Glas und Aluminium verbindet.',
            'footer_services': 'Unsere Dienstleistungen',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Aluminium. Alle Rechte vorbehalten.',
            
            // Footer Quick Links
            'footer_quick_links': 'Schnelllinks',
            'footer_services_title': 'Unsere Dienstleistungen',
            
            // Footer Services List
            'service_transparent_facade': 'Transparente Fassade',
            'service_glass_curtain': 'Glasvorhang-Systeme',
            'service_glass_door': 'Glastür',
            'service_plexiglass_railing': 'Plexiglas-Geländer',
            'service_glass_canopy': 'Glasdach',
            'service_spider_facade': 'Spider-Fassade',
            'service_transparent_elevator': 'Transparenter Aufzug',
            'service_glass_facade': 'Glasfassade',
            'service_stair_glass_railing': 'Treppenglas-Geländer',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Unsere Glasservices',
            'cam_services_subtitle': 'Wir bieten umfassende Lösungen für alle Arten von Glasprojekten',
            'cam_facade_systems': 'Glasfassaden-Systeme',
            'cam_facade_desc': 'Transparente und langlebige Glasfassaden-Lösungen für moderne Gebäude. Wir bieten Energieeffizienz und ästhetisches Design zusammen.',
            'cam_door_systems': 'Glastür-Systeme',
            'cam_door_desc': 'Elegante Glastür-Lösungen mit Aluminiumrahmen. Spezielle Designs für Wohn- und Gewerbeprojekte.',
            'cam_railing_systems': 'Glasgeländer-Systeme',
            'cam_railing_desc': 'Glasgeländer-Lösungen, die Sicherheit und Ästhetik verbinden. Spezielle Designs für Treppen- und Balkonanwendungen.',
            'cam_elevator_systems': 'Glasaufzug-Systeme',
            'cam_elevator_desc': 'Transparente Aufzugskabinen und Glasaufzug-Systeme. Wir fügen modernen Gebäuden visuelle Reichhaltigkeit hinzu.',
            'cam_features_title': 'Eigenschaften unserer Glasprojekte',
            'cam_features_subtitle': 'Warum sollten Sie Zade Aluminium wählen?',
            'cam_transparency_title': 'Transparenz und Licht',
            'cam_transparency_desc': 'Wir schaffen komfortable und helle Umgebungen, indem wir natürliches Licht maximal in Innenräume bringen.',
            'cam_energy_title': 'Energieeffizienz',
            'cam_energy_desc': 'Wir bieten umweltfreundliche Lösungen durch Energieeinsparung mit wärmeisolierten Glassystemen.',
            'cam_aesthetic_title': 'Ästhetisches Design',
            'cam_aesthetic_desc': 'Wir verschönern Ihre Räume mit stilvollen und eleganten Glasdesigns, die modernen architektonischen Trends entsprechen.',
            'cam_security_title': 'Sicherheit und Langlebigkeit',
            'cam_security_desc': 'Sichere Lösungen mit hochwertigen Glaswerkstoffen und anwendungskonformen Sicherheitsstandards.',
            'cam_cta_title': 'Kontaktieren Sie uns für Ihre Glasprojekte',
            'cam_cta_desc': 'Konsultieren Sie unser Expertenteam, um Ihr Traumglasprojekt Wirklichkeit werden zu lassen. Wir bieten maßgeschneiderte Lösungen für Sie.',
            'btn_get_quote': 'Angebot anfordern'
        },
        'es': {
            // Page Title
            'page_title': 'Zade Aluminio',
            
            // Navigation
            'nav_home': 'Inicio',
            'nav_services': 'Servicios',
            'nav_about': 'Acerca de',
            'nav_projects': 'Nuestros Proyectos',
            'nav_contact': 'Contacto',
            
            // Hero Section
            'hero_title': 'Zade Aluminio Sistemas de Cristal Guillotina',
            'hero_description': 'Sistemas de cristal de aluminio transparentes y duraderos para arquitectura moderna. Ofrecemos soluciones innovadoras que transforman sus espacios de vida.',
            'btn_discover': 'Descubrir Nuestros Servicios',
            'btn_about': 'Acerca de Nosotros',
            
            // Services Section
            'services_title': 'Nuestros Servicios',
            'services_subtitle': 'Zade Aluminio y Diseño de Cristal ofrece soluciones duraderas con calidez, elegancia y estética a espacios donde el arte se encuentra con la funcionalidad.',
            'glass_projects': 'Proyectos de Cristal',
            'glass_projects_desc': 'Soluciones de cristal transparentes y elegantes para arquitectura moderna',
            'aluminum_projects': 'Proyectos de Aluminio',
            'aluminum_projects_desc': 'Soluciones de diseño de aluminio duraderas y estéticas',
            'btn_details': 'Ver Detalles',
            
            // About Section
            'about_title': 'Acerca de Nosotros',
            'about_subtitle': 'Empresa líder que combina estética con durabilidad en cristal y aluminio.',
            'mission_title': 'Nuestra Misión',
            'mission_text1': 'Como Zade Aluminio Diseño, somos una empresa líder que ofrece soluciones estéticas, duraderas e innovadoras en aplicaciones de aluminio y cristal. Con años de experiencia y conocimiento, aspiramos a proporcionar a nuestros clientes el servicio de la más alta calidad.',
            'mission_text2': 'Nuestro equipo experto produce diseños funcionales y elegantes adaptados a las necesidades de nuestros clientes utilizando las últimas tecnologías del sector.',
            'mission_text3': 'Para convertir sus espacios de vida soñados en realidad, hacemos la diferencia combinando la elegancia del cristal con la fuerza del aluminio.',
            
            // Features
            'feature1_title': 'Diseños Pioneros',
            'feature1_desc': 'Ofrecemos soluciones creativas que empujan los límites de la arquitectura moderna.',
            'feature2_title': 'Experiencia y Experticia',
            'feature2_desc': 'Nuestro personal experto da vida a sus proyectos de la mejor manera posible.',
            'feature3_title': 'Soluciones Permanentes',
            'feature3_desc': 'Creamos valor con diseños duraderos, de larga duración y elegantes.',
            'feature4_title': 'Calidad Confiable',
            'feature4_desc': 'Proporcionamos resultados duraderos con los materiales de alta calidad que utilizamos.',
            
            // Contact Section
            'contact_title': 'Contáctenos',
            'contact_subtitle': 'Puede contactarnos para espacios con diseños que combinan estética y tecnología.',
            'contact_email': 'Correo Electrónico',
            'contact_phone': 'Contacto de la Empresa',
            'contact_address': 'Dirección',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Su Nombre',
            'form_email': 'Correo Electrónico',
            'form_subject': 'Asunto',
            'form_message': 'Su Mensaje',
            'btn_send': 'Enviar Mensaje',
            
            // Footer
            'footer_about': 'Empresa líder que combina estética con durabilidad en cristal y aluminio.',
            'footer_services': 'Nuestros Servicios',
            'footer_contact': 'Contacto',
            'footer_copyright': '© 2024 Zade Aluminio. Todos los derechos reservados.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Nuestros Servicios de Cristal',
            'cam_services_subtitle': 'Ofrecemos soluciones integrales para todo tipo de proyectos de cristal',
            'cam_facade_systems': 'Sistemas de Fachada de Cristal',
            'cam_facade_desc': 'Soluciones de fachada de cristal transparentes y duraderas para edificios modernos. Ofrecemos eficiencia energética y diseño estético juntos.',
            'cam_door_systems': 'Sistemas de Puertas de Cristal',
            'cam_door_desc': 'Soluciones de puertas de cristal elegantes con marcos de aluminio. Diseños especiales para proyectos residenciales y comerciales.',
            'cam_railing_systems': 'Sistemas de Barandillas de Cristal',
            'cam_railing_desc': 'Soluciones de barandillas de cristal que combinan seguridad y estética. Diseños especiales para aplicaciones de escaleras y balcones.',
            'cam_elevator_systems': 'Sistemas de Ascensores de Cristal',
            'cam_elevator_desc': 'Recintos de ascensores transparentes y sistemas de ascensores de cristal. Añadimos riqueza visual a edificios modernos.',
            'cam_features_title': 'Características de Nuestros Proyectos de Cristal',
            'cam_features_subtitle': '¿Por qué debería elegir Zade Aluminio?',
            'cam_transparency_title': 'Transparencia y Luz',
            'cam_transparency_desc': 'Creamos entornos cómodos y brillantes llevando la luz natural al nivel máximo a los espacios interiores.',
            'cam_energy_title': 'Eficiencia Energética',
            'cam_energy_desc': 'Ofrecemos soluciones respetuosas con el medio ambiente ahorrando energía con sistemas de cristal aislados térmicamente.',
            'cam_aesthetic_title': 'Diseño Estético',
            'cam_aesthetic_desc': 'Embellecemos sus espacios con diseños de cristal elegantes y estilizados que cumplen con las tendencias arquitectónicas modernas.',
            'cam_security_title': 'Seguridad y Durabilidad',
            'cam_security_desc': 'Soluciones seguras con materiales de cristal de alta calidad y aplicaciones que cumplen con los estándares de seguridad.',
            'cam_cta_title': 'Contáctenos para Sus Proyectos de Cristal',
            'cam_cta_desc': 'Consulte con nuestro equipo experto para convertir su proyecto de cristal soñado en realidad. Ofrecemos soluciones personalizadas para usted.',
            'btn_get_quote': 'Obtener Cotización',
            
            // Work Process Section
            'work_process_title': 'Nuestro Proceso de Trabajo',
            'work_process_subtitle': 'Pasos profesionales que seguimos para dar vida a sus proyectos',
            'step1_title': 'Primera Reunión',
            'step1_desc': 'Realizamos reuniones detalladas para entender las necesidades del cliente y determinar el alcance del proyecto.',
            'step2_title': 'Diseño y Planificación',
            'step2_desc': 'Creamos diseños detallados y planificamos cada paso del proyecto con precisión.',
            'step3_title': 'Cotización y Acuerdo',
            'step3_desc': 'Preparamos cotizaciones detalladas y establecemos acuerdos claros con nuestros clientes.',
            'step4_title': 'Producción',
            'step4_desc': 'Producimos sistemas de alta calidad utilizando materiales de primera clase.',
            'step5_title': 'Instalación',
            'step5_desc': 'Nuestro equipo experimentado instala los sistemas con precisión y profesionalismo.',
            'step6_title': 'Inspección y Entrega',
            'step6_desc': 'Realizamos inspecciones finales y entregamos el proyecto según los más altos estándares.',
            
            // Projects Section
            'projects_title': 'Nuestros Proyectos',
            'projects_subtitle': 'Ejemplos de proyectos que hemos completado exitosamente',
            'projects_description': 'Con más de 12 años de experiencia como fabricante líder de sistemas de aluminio y cristal en Turquía, hemos completado exitosamente más de 2.645 proyectos.',
            'project_stats_title': 'Nuestras Estadísticas de Proyectos',
            'project_stats_subtitle': 'Indicadores numéricos de nuestro éxito',
            'stats_completed_projects': '2.645+ Proyectos Completados',
            'stats_years_experience': '12+ Años de Experiencia',
            'stats_application_area': '550.000+ m² de Aplicación',
            'stats_professional_team': '30+ Equipo Profesional',
            'view_all_projects': 'Ver Todos los Proyectos',
            'project_year': 'Año',
            'project_location': 'Ubicación',
            'project_area': 'Área',
            
            // Footer
            'footer_quick_links': 'Enlaces Rápidos',
            'footer_services_title': 'Nuestros Servicios',
            'footer_about': 'Aluminio - Soluciones de aluminio de calidad',
            'footer_copyright': '© 2024 Zade. Todos los derechos reservados.'
        },
        'it': {
            // Page Title
            'page_title': 'Zade Alluminio',
            
            // Navigation
            'nav_home': 'Home',
            'nav_services': 'Servizi',
            'nav_about': 'Chi Siamo',
            'nav_projects': 'I Nostri Progetti',
            'nav_contact': 'Contatti',
            
            // Hero Section
            'hero_title': 'Zade Alluminio Sistemi Vetro Ghigliottina',
            'hero_description': 'Sistemi vetro alluminio trasparenti e duraturi per l\'architettura moderna. Offriamo soluzioni innovative che trasformano i vostri spazi di vita.',
            'btn_discover': 'Scoprire i Nostri Servizi',
            'btn_about': 'Chi Siamo',
            
            // Services Section
            'services_title': 'I Nostri Servizi',
            'services_subtitle': 'Zade Alluminio e Design Vetro offre soluzioni durature con calore, eleganza ed estetica agli spazi dove l\'arte incontra la funzionalità.',
            'glass_projects': 'Progetti Vetro',
            'glass_projects_desc': 'Soluzioni vetro trasparenti ed eleganti per l\'architettura moderna',
            'aluminum_projects': 'Progetti Alluminio',
            'aluminum_projects_desc': 'Soluzioni di design alluminio durature ed estetiche',
            'btn_details': 'Vedere Dettagli',
            
            // About Section
            'about_title': 'Chi Siamo',
            'about_subtitle': 'Azienda leader che combina estetica con durata in vetro e alluminio.',
            'mission_title': 'La Nostra Missione',
            'mission_text1': 'Come Zade Alluminio Design, siamo un\'azienda leader che offre soluzioni estetiche, durature e innovative nelle applicazioni di alluminio e vetro. Con anni di esperienza e conoscenza, miriamo a fornire ai nostri clienti il servizio della massima qualità.',
            'mission_text2': 'Il nostro team di esperti produce design funzionali ed eleganti adattati alle esigenze dei nostri clienti utilizzando le ultime tecnologie del settore.',
            'mission_text3': 'Per trasformare i vostri spazi di vita da sogno in realtà, facciamo la differenza combinando l\'eleganza del vetro con la forza dell\'alluminio.',
            
            // Features
            'feature1_title': 'Design Pionieristici',
            'feature1_desc': 'Offriamo soluzioni creative che spingono i limiti dell\'architettura moderna.',
            'feature2_title': 'Esperienza ed Expertise',
            'feature2_desc': 'Il nostro personale esperto dà vita ai vostri progetti nel modo migliore possibile.',
            'feature3_title': 'Soluzioni Permanenti',
            'feature3_desc': 'Creiamo valore con design duraturi, di lunga durata ed eleganti.',
            'feature4_title': 'Qualità Affidabile',
            'feature4_desc': 'Forniamo risultati duraturi con i materiali di alta qualità che utilizziamo.',
            
            // Contact Section
            'contact_title': 'Contattaci',
            'contact_subtitle': 'Potete contattarci per spazi con design che combinano estetica e tecnologia.',
            'contact_email': 'Email',
            'contact_phone': 'Contatto Aziendale',
            'contact_address': 'Indirizzo',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Il Vostro Nome',
            'form_email': 'Email',
            'form_subject': 'Oggetto',
            'form_message': 'Il Vostro Messaggio',
            'btn_send': 'Inviare Messaggio',
            
            // Footer
            'footer_about': 'Azienda leader che combina estetica con durata in vetro e alluminio.',
            'footer_services': 'I Nostri Servizi',
            'footer_contact': 'Contatti',
            'footer_copyright': '© 2024 Zade Alluminio. Tutti i diritti riservati.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'I Nostri Servizi di Vetro',
            'cam_services_subtitle': 'Offriamo soluzioni complete per tutti i tipi di progetti in vetro',
            'cam_facade_systems': 'Sistemi di Facciata in Vetro',
            'cam_facade_desc': 'Soluzioni di facciata in vetro trasparenti e durature per edifici moderni. Offriamo efficienza energetica e design estetico insieme.',
            'cam_door_systems': 'Sistemi di Porte in Vetro',
            'cam_door_desc': 'Soluzioni di porte in vetro eleganti con telai in alluminio. Design speciali per progetti residenziali e commerciali.',
            'cam_railing_systems': 'Sistemi di Ringhiere in Vetro',
            'cam_railing_desc': 'Soluzioni di ringhiere in vetro che combinano sicurezza ed estetica. Design speciali per applicazioni di scale e balconi.',
            'cam_elevator_systems': 'Sistemi di Ascensori in Vetro',
            'cam_elevator_desc': 'Cabine ascensori trasparenti e sistemi di ascensori in vetro. Aggiungiamo ricchezza visiva agli edifici moderni.',
            'cam_features_title': 'Caratteristiche dei Nostri Progetti in Vetro',
            'cam_features_subtitle': 'Perché scegliere Zade Alluminio?',
            'cam_transparency_title': 'Trasparenza e Luce',
            'cam_transparency_desc': 'Creiamo ambienti confortevoli e luminosi portando la luce naturale al livello massimo negli spazi interni.',
            'cam_energy_title': 'Efficienza Energetica',
            'cam_energy_desc': 'Offriamo soluzioni rispettose dell\'ambiente risparmiando energia con sistemi di vetro isolati termicamente.',
            'cam_aesthetic_title': 'Design Estetico',
            'cam_aesthetic_desc': 'Abbelliamo i vostri spazi con design in vetro eleganti e stilistici che rispettano le tendenze architettoniche moderne.',
            'cam_security_title': 'Sicurezza e Durabilità',
            'cam_security_desc': 'Soluzioni sicure con materiali in vetro di alta qualità e applicazioni conformi agli standard di sicurezza.',
            'cam_cta_title': 'Contattateci per i Vostri Progetti in Vetro',
            'cam_cta_desc': 'Consultate il nostro team di esperti per trasformare il vostro progetto in vetro dei sogni in realtà. Offriamo soluzioni personalizzate per voi.',
            'btn_get_quote': 'Richiedere Preventivo',
            
            // Projects Section
            'projects_title': 'I Nostri Progetti',
            'projects_subtitle': 'Esempi di progetti che abbiamo completato con successo',
            'projects_description': 'Con oltre 12 anni di esperienza come produttore leader di sistemi in alluminio e vetro in Turchia, abbiamo completato con successo oltre 2.645 progetti.',
            'project_stats_title': 'Le Nostre Statistiche di Progetti',
            'project_stats_subtitle': 'Indicatori numerici del nostro successo',
            'stats_completed_projects': '2.645+ Progetti Completati',
            'stats_years_experience': '12+ Anni di Esperienza',
            'stats_application_area': '550.000+ m² di Applicazione',
            'stats_professional_team': '30+ Squadra Professionale',
            'view_all_projects': 'Vedere Tutti i Progetti',
            'project_year': 'Anno',
            'project_location': 'Posizione',
            'project_area': 'Area',
            
            // Work Process Section
            'work_process_title': 'Il Nostro Processo di Lavoro',
            'work_process_subtitle': 'Passi professionali che seguiamo per dare vita ai vostri progetti',
            'step1_title': 'Primo Incontro',
            'step1_desc': 'Organizziamo incontri dettagliati per comprendere le esigenze del cliente e determinare la portata del progetto.',
            'step2_title': 'Design e Pianificazione',
            'step2_desc': 'Creiamo design dettagliati e pianifichiamo ogni fase del progetto con precisione.',
            'step3_title': 'Preventivo e Accordo',
            'step3_desc': 'Preghiamo preventivi dettagliati e stabiliamo accordi chiari con i nostri clienti.',
            'step4_title': 'Produzione',
            'step4_desc': 'Produciamo sistemi di alta qualità utilizzando materiali di prima classe.',
            'step5_title': 'Installazione',
            'step5_desc': 'Il nostro team esperto installa i sistemi con precisione e professionalità.',
            'step6_title': 'Ispezione e Consegna',
            'step6_desc': 'Effettuiamo ispezioni finali e consegniamo il progetto secondo i più alti standard.',
            
            // Glass System Options
            'transparent_facade_systems': 'Sistemi di Facciata Trasparenti',
            'spider_glass_facade': 'Facciata in Vetro Spider',
            'glass_canopy_systems': 'Sistemi di Tettoia in Vetro',
            'thermal_insulated_glass_applications': 'Applicazioni in Vetro Isolato Termicamente',
            'glass_guillotine_systems': 'Sistemi di Ghigliottina in Vetro',
            'sliding_glass_doors': 'Porte Scorrevoli in Vetro',
            'folding_glass_doors': 'Porte Piega in Vetro',
            'automatic_glass_doors': 'Porte Automatiche in Vetro',
            'stair_glass_railing': 'Ringhiera in Vetro per Scale',
            'plexiglass_vertical_railing': 'Ringhiera Verticale in Plexiglass',
            'balcony_glass_railing': 'Ringhiera in Vetro per Balconi',
            'terrace_glass_railing': 'Ringhiera in Vetro per Terrazze',
            'transparent_elevator': 'Ascensore Trasparente',
            'glass_elevator_enclosure': 'Recinto Ascensore in Vetro',
            'panoramic_elevator': 'Ascensore Panoramico',
            'glass_elevator_doors': 'Porte Ascensore in Vetro',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Sistemi di Facciata in Vetro',
            'transparent_facade_systems_section': 'Sistemi di Facciata Trasparenti',
            'spider_glass_facade_section': 'Facciata in Vetro Spider',
            'glass_canopy_systems_section': 'Sistemi di Tettoia in Vetro',
            'thermal_insulated_glass_applications_section': 'Applicazioni in Vetro Isolato Termicamente',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Sistemi di Facciata Trasparenti',
            'spider_glass_facade_section_title': 'Facciata in Vetro Spider',
            'glass_canopy_systems_section_title': 'Sistemi di Tettoia in Vetro',
            'thermal_insulated_glass_applications_section_title': 'Applicazioni in Vetro Isolato Termicamente',
            
            // Footer
            'footer_quick_links': 'Link Rapidi',
            'footer_services_title': 'I Nostri Servizi',
            'footer_about': 'Alluminio - Soluzioni di alluminio di qualità',
            'footer_copyright': '© 2024 Zade. Tutti i diritti riservati.'
        },
        'nl': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Home',
            'nav_services': 'Diensten',
            'nav_about': 'Over Ons',
            'nav_projects': 'Onze Projecten',
            'nav_contact': 'Contact',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Guillotine Glas Systemen',
            'hero_description': 'Transparante en duurzame aluminium glas systemen voor moderne architectuur. We bieden innovatieve oplossingen die uw leefruimtes transformeren.',
            'btn_discover': 'Ontdek Onze Diensten',
            'btn_about': 'Over Ons',
            
            // Services Section
            'services_title': 'Onze Diensten',
            'services_subtitle': 'Zade Aluminium en Glas Design biedt langdurige oplossingen met warmte, elegantie en esthetiek voor ruimtes waar kunst functionaliteit ontmoet.',
            'glass_projects': 'Glas Projecten',
            'glass_projects_desc': 'Transparante en elegante glasoplossingen voor moderne architectuur',
            'aluminum_projects': 'Aluminium Projecten',
            'aluminum_projects_desc': 'Duurzame en esthetische aluminium design oplossingen',
            'btn_details': 'Details Bekijken',
            
            // About Section
            'about_title': 'Over Ons',
            'about_subtitle': 'Toonaangevend bedrijf dat esthetiek combineert met duurzaamheid in glas en aluminium.',
            'mission_title': 'Onze Missie',
            'mission_text1': 'Als Zade Aluminium Design zijn we een toonaangevend bedrijf dat esthetische, duurzame en innovatieve oplossingen biedt in aluminium en glastoepassingen. Met jarenlange ervaring en kennis streven we ernaar onze klanten de hoogste kwaliteitsservice te bieden.',
            'mission_text2': 'Ons expertteam produceert functionele en elegante ontwerpen die zijn afgestemd op de behoeften van onze klanten met gebruik van de nieuwste technologieën in de sector.',
            'mission_text3': 'Om uw droom leefruimtes werkelijkheid te laten worden, maken we het verschil door de elegantie van glas te combineren met de kracht van aluminium.',
            
            // Features
            'feature1_title': 'Pionier Ontwerpen',
            'feature1_desc': 'We bieden creatieve oplossingen die de grenzen van moderne architectuur verleggen.',
            'feature2_title': 'Ervaring en Expertise',
            'feature2_desc': 'Ons expertpersoneel brengt uw projecten op de best mogelijke manier tot leven.',
            'feature3_title': 'Permanente Oplossingen',
            'feature3_desc': 'We creëren waarde met duurzame, langdurige en elegante ontwerpen.',
            'feature4_title': 'Betrouwbare Kwaliteit',
            'feature4_desc': 'We leveren langdurige resultaten met de hoogwaardige materialen die we gebruiken.',
            
            // Contact Section
            'contact_title': 'Neem Contact Op',
            'contact_subtitle': 'U kunt ons bereiken voor ruimtes met ontwerpen die esthetiek en technologie combineren.',
            'contact_email': 'E-mail',
            'contact_phone': 'Bedrijfscontact',
            'contact_address': 'Adres',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Uw Naam',
            'form_email': 'E-mail',
            'form_subject': 'Onderwerp',
            'form_message': 'Uw Bericht',
            'btn_send': 'Bericht Versturen',
            
            // Footer
            'footer_about': 'Toonaangevend bedrijf dat esthetiek combineert met duurzaamheid in glas en aluminium.',
            'footer_services': 'Onze Diensten',
            'footer_contact': 'Contact',
            'footer_copyright': '© 2024 Zade Aluminium. Alle rechten voorbehouden.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Onze Glasservices',
            'cam_services_subtitle': 'We bieden uitgebreide oplossingen voor alle soorten glasprojecten',
            'cam_facade_systems': 'Glasgevelsystemen',
            'cam_facade_desc': 'Transparante en duurzame glasgeveloplossingen voor moderne gebouwen. We bieden energie-efficiëntie en esthetisch ontwerp samen.',
            'cam_door_systems': 'Glasdeursystemen',
            'cam_door_desc': 'Elegante glasdeuroplossingen met aluminium frames. Speciale ontwerpen voor zowel residentiële als commerciële projecten.',
            'cam_railing_systems': 'Glasleuningsystemen',
            'cam_railing_desc': 'Glasleuningoplossingen die veiligheid en esthetiek combineren. Speciale ontwerpen voor trap- en balkonapplicaties.',
            'cam_elevator_systems': 'Glasliftsystemen',
            'cam_elevator_desc': 'Transparante liftomhulsels en glasliftsystemen. We voegen visuele rijkdom toe aan moderne gebouwen.',
            'cam_features_title': 'Kenmerken van Onze Glasprojecten',
            'cam_features_subtitle': 'Waarom zou u Zade Aluminium kiezen?',
            'cam_transparency_title': 'Transparantie en Licht',
            'cam_transparency_desc': 'We creëren comfortabele en lichte omgevingen door natuurlijk licht maximaal naar binnenruimtes te brengen.',
            'cam_energy_title': 'Energie-efficiëntie',
            'cam_energy_desc': 'We bieden milieuvriendelijke oplossingen door energie te besparen met warmte-geïsoleerde glassystemen.',
            'cam_aesthetic_title': 'Esthetisch Ontwerp',
            'cam_aesthetic_desc': 'We verfraaien uw ruimtes met stijlvolle en elegante glasontwerpen die voldoen aan moderne architecturale trends.',
            'cam_security_title': 'Veiligheid en Duurzaamheid',
            'cam_security_desc': 'Veilige oplossingen met hoogwaardige glasmaterialen en toepassingen die voldoen aan veiligheidsnormen.',
            'cam_cta_title': 'Neem Contact Op voor Uw Glasprojecten',
            'cam_cta_desc': 'Raadpleeg ons expertenteam om uw droomglasproject werkelijkheid te laten worden. We bieden op maat gemaakte oplossingen voor u.',
            'btn_get_quote': 'Offerte Aanvragen',
            
            // Glass System Options
            'transparent_facade_systems': 'Transparante Gevelsystemen',
            'spider_glass_facade': 'Spider Glasgevel',
            'glass_canopy_systems': 'Glasluifel Systemen',
            'thermal_insulated_glass_applications': 'Warmte-geïsoleerde Glasapplicaties',
            'glass_guillotine_systems': 'Glasguillotine Systemen',
            'sliding_glass_doors': 'Schuifglasdeuren',
            'folding_glass_doors': 'Vouwglasdeuren',
            'automatic_glass_doors': 'Automatische Glasdeuren',
            'stair_glass_railing': 'Trapglasleuning',
            'plexiglass_vertical_railing': 'Plexiglas Verticale Leuning',
            'balcony_glass_railing': 'Balkonglasleuning',
            'terrace_glass_railing': 'Terrassenglasleuning',
            'transparent_elevator': 'Transparante Lift',
            'glass_elevator_enclosure': 'Glasliftomhulsel',
            'panoramic_elevator': 'Panoramische Lift',
            'glass_elevator_doors': 'Glasliftdeuren',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Glasgevelsystemen',
            'transparent_facade_systems_section': 'Transparante Gevelsystemen',
            'spider_glass_facade_section': 'Spider Glasgevel',
            'glass_canopy_systems_section': 'Glasluifel Systemen',
            'thermal_insulated_glass_applications_section': 'Warmte-geïsoleerde Glasapplicaties',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Transparante Gevelsystemen',
            'spider_glass_facade_section_title': 'Spider Glasgevel',
            'glass_canopy_systems_section_title': 'Glasluifel Systemen',
            'thermal_insulated_glass_applications_section_title': 'Warmte-geïsoleerde Glasapplicaties',
            
            // Projects Section
            'projects_title': 'Onze Projecten',
            'projects_subtitle': 'Voorbeelden van projecten die we succesvol hebben voltooid',
            'projects_description': 'Met meer dan 12 jaar ervaring als toonaangevende fabrikant van aluminium- en glassystemen in Turkije, hebben we succesvol meer dan 2.645 projecten voltooid.',
            'project_stats_title': 'Onze Projectstatistieken',
            'project_stats_subtitle': 'Numerieke indicatoren van ons succes',
            'stats_completed_projects': '2.645+ Voltooide Projecten',
            'stats_years_experience': '12+ Jaar Ervaring',
            'stats_application_area': '550.000+ m² Toepassing',
            'stats_professional_team': '30+ Professioneel Team',
            'view_all_projects': 'Alle Projecten Bekijken',
            'project_year': 'Jaar',
            'project_location': 'Locatie',
            'project_area': 'Oppervlakte',
            
            // Work Process Section
            'work_process_title': 'Ons Werkproces',
            'work_process_subtitle': 'Professionele stappen die we volgen om uw projecten tot leven te brengen',
            'step1_title': 'Eerste Vergadering',
            'step1_desc': 'We houden gedetailleerde vergaderingen om klantbehoeften te begrijpen en de projectomvang te bepalen.',
            'step2_title': 'Ontwerp en Planning',
            'step2_desc': 'We maken gedetailleerde ontwerpen en plannen elke stap van het project met precisie.',
            'step3_title': 'Offerte en Overeenkomst',
            'step3_desc': 'We bereiden gedetailleerde offertes voor en maken duidelijke afspraken met onze klanten.',
            'step4_title': 'Productie',
            'step4_desc': 'We produceren hoogwaardige systemen met eersteklas materialen.',
            'step5_title': 'Installatie',
            'step5_desc': 'Ons ervaren team installeert de systemen met precisie en professionaliteit.',
            'step6_title': 'Inspectie en Levering',
            'step6_desc': 'We voeren eindinspecties uit en leveren het project volgens de hoogste normen.',
            
            // Footer
            'footer_quick_links': 'Snelle Links',
            'footer_services_title': 'Onze Diensten',
            'footer_about': 'Aluminium - Kwaliteit aluminium oplossingen',
            'footer_copyright': '© 2024 Zade. Alle rechten voorbehouden.'
        },
        'pl': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Strona Główna',
            'nav_services': 'Usługi',
            'nav_about': 'O Nas',
            'nav_projects': 'Nasze Projekty',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Systemy Szkła Żaluzjowego',
            'hero_description': 'Przezroczyste i trwałe systemy szklane aluminiowe dla nowoczesnej architektury. Oferujemy innowacyjne rozwiązania, które przekształcają przestrzenie mieszkalne.',
            'btn_discover': 'Odkryj Nasze Usługi',
            'btn_about': 'O Nas',
            
            // Services Section
            'services_title': 'Nasze Usługi',
            'services_subtitle': 'Zade Aluminium i Design Szkła oferuje długotrwałe rozwiązania z ciepłem, elegancją i estetyką dla przestrzeni, gdzie sztuka spotyka się z funkcjonalnością.',
            'glass_projects': 'Projekty Szkła',
            'glass_projects_desc': 'Przezroczyste i eleganckie rozwiązania szklane dla nowoczesnej architektury',
            'aluminum_projects': 'Projekty Aluminiowe',
            'aluminum_projects_desc': 'Trwałe i estetyczne rozwiązania projektowe aluminiowe',
            'btn_details': 'Zobacz Szczegóły',
            
            // About Section
            'about_title': 'O Nas',
            'about_subtitle': 'Wiodąca firma łącząca estetykę z trwałością w szkle i aluminium.',
            'mission_title': 'Nasza Misja',
            'mission_text1': 'Jako Zade Aluminium Design jesteśmy wiodącą firmą oferującą estetyczne, trwałe i innowacyjne rozwiązania w zastosowaniach aluminiowych i szklanych. Z wieloletnim doświadczeniem i wiedzą dążymy do świadczenia naszym klientom usług najwyższej jakości.',
            'mission_text2': 'Nasz zespół ekspertów tworzy funkcjonalne i eleganckie projekty dostosowane do potrzeb naszych klientów przy użyciu najnowszych technologii w branży.',
            'mission_text3': 'Aby przekształcić wymarzone przestrzenie mieszkalne w rzeczywistość, robimy różnicę łącząc elegancję szkła z siłą aluminium.',
            
            // Features
            'feature1_title': 'Pionierskie Projekty',
            'feature1_desc': 'Oferujemy kreatywne rozwiązania, które przekraczają granice nowoczesnej architektury.',
            'feature2_title': 'Doświadczenie i Ekspertyza',
            'feature2_desc': 'Nasz wykwalifikowany personel ożywia projekty w najlepszy możliwy sposób.',
            'feature3_title': 'Trwałe Rozwiązania',
            'feature3_desc': 'Tworzymy wartość z trwałymi, długotrwałymi i eleganckimi projektami.',
            'feature4_title': 'Niezawodna Jakość',
            'feature4_desc': 'Zapewniamy długotrwałe rezultaty z wysokiej jakości materiałami, których używamy.',
            
            // Contact Section
            'contact_title': 'Skontaktuj Się Z Nami',
            'contact_subtitle': 'Możesz się z nami skontaktować w sprawie przestrzeni z projektami łączącymi estetykę i technologię.',
            'contact_email': 'E-mail',
            'contact_phone': 'Kontakt Firmowy',
            'contact_address': 'Adres',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Twoje Imię',
            'form_email': 'E-mail',
            'form_subject': 'Temat',
            'form_message': 'Twoja Wiadomość',
            'btn_send': 'Wyślij Wiadomość',
            
            // Footer
            'footer_about': 'Wiodąca firma łącząca estetykę z trwałością w szkle i aluminium.',
            'footer_services': 'Nasze Usługi',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Aluminium. Wszystkie prawa zastrzeżone.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Nasze Usługi Szkła',
            'cam_services_subtitle': 'Oferujemy kompleksowe rozwiązania dla wszystkich rodzajów projektów szklanych',
            'cam_facade_systems': 'Systemy Elewacji Szklanych',
            'cam_facade_desc': 'Przezroczyste i trwałe rozwiązania elewacji szklanych dla nowoczesnych budynków. Oferujemy efektywność energetyczną i estetyczny design razem.',
            'cam_door_systems': 'Systemy Drzwi Szklanych',
            'cam_door_desc': 'Eleganckie rozwiązania drzwi szklanych z ramami aluminiowymi. Specjalne projekty dla projektów mieszkalnych i komercyjnych.',
            'cam_railing_systems': 'Systemy Balustrad Szklanych',
            'cam_railing_desc': 'Rozwiązania balustrad szklanych łączące bezpieczeństwo i estetykę. Specjalne projekty dla aplikacji schodowych i balkonowych.',
            'cam_elevator_systems': 'Systemy Wind Szklanych',
            'cam_elevator_desc': 'Przezroczyste obudowy wind i systemy wind szklanych. Dodajemy wizualne bogactwo do nowoczesnych budynków.',
            'cam_features_title': 'Cechy Naszych Projektów Szklanych',
            'cam_features_subtitle': 'Dlaczego powinieneś wybrać Zade Aluminium?',
            'cam_transparency_title': 'Przezroczystość i Światło',
            'cam_transparency_desc': 'Tworzymy komfortowe i jasne środowiska, wprowadzając naturalne światło na maksymalny poziom do przestrzeni wewnętrznych.',
            'cam_energy_title': 'Efektywność Energetyczna',
            'cam_energy_desc': 'Oferujemy przyjazne dla środowiska rozwiązania oszczędzając energię z systemami szklanymi izolowanymi termicznie.',
            'cam_aesthetic_title': 'Design Estetyczny',
            'cam_aesthetic_desc': 'Upiększamy Twoje przestrzenie stylowymi i eleganckimi projektami szklanymi zgodnymi z nowoczesnymi trendami architektonicznymi.',
            'cam_security_title': 'Bezpieczeństwo i Trwałość',
            'cam_security_desc': 'Bezpieczne rozwiązania z wysokiej jakości materiałami szklanymi i aplikacjami zgodnymi ze standardami bezpieczeństwa.',
            
            // Projects Section
            'projects_title': 'Nasze Projekty',
            'projects_subtitle': 'Przykłady projektów, które pomyślnie ukończyliśmy',
            'projects_description': 'Z ponad 12-letnim doświadczeniem jako wiodący producent systemów aluminiowych i szklanych w Turcji, pomyślnie ukończyliśmy ponad 2.645 projektów.',
            'project_stats_title': 'Nasze Statystyki Projektów',
            'project_stats_subtitle': 'Liczbowe wskaźniki naszego sukcesu',
            'stats_completed_projects': '2.645+ Ukończonych Projektów',
            'stats_years_experience': '12+ Lat Doświadczenia',
            'stats_application_area': '550.000+ m² Zastosowania',
            'stats_professional_team': '30+ Profesjonalny Zespół',
            'view_all_projects': 'Zobacz Wszystkie Projekty',
            'project_year': 'Rok',
            'project_location': 'Lokalizacja',
            'project_area': 'Powierzchnia',
            
            // Work Process Section
            'work_process_title': 'Nasz Proces Pracy',
            'work_process_subtitle': 'Profesjonalne kroki, które podążamy, aby ożywić Twoje projekty',
            'step1_title': 'Pierwsze Spotkanie',
            'step1_desc': 'Przeprowadzamy szczegółowe spotkania, aby zrozumieć potrzeby klienta i określić zakres projektu.',
            'step2_title': 'Projektowanie i Planowanie',
            'step2_desc': 'Tworzymy szczegółowe projekty i planujemy każdy krok projektu z precyzją.',
            'step3_title': 'Oferta i Umowa',
            'step3_desc': 'Przygotowujemy szczegółowe oferty i zawieramy jasne umowy z naszymi klientami.',
            'step4_title': 'Produkcja',
            'step4_desc': 'Produkujemy wysokiej jakości systemy używając materiałów pierwszej klasy.',
            'step5_title': 'Instalacja',
            'step5_desc': 'Nasz doświadczony zespół instaluje systemy z precyzją i profesjonalizmem.',
            'step6_title': 'Kontrola i Dostawa',
            'step6_desc': 'Przeprowadzamy końcowe kontrole i dostarczamy projekt według najwyższych standardów.',
            'cam_cta_title': 'Skontaktuj się z Nami dla Twoich Projektów Szklanych',
            'cam_cta_desc': 'Skonsultuj się z naszym zespołem ekspertów, aby przekształcić swój wymarzony projekt szklany w rzeczywistość. Oferujemy spersonalizowane rozwiązania dla Ciebie.',
            'btn_get_quote': 'Zamów Ofertę',
            
            // Glass System Options
            'transparent_facade_systems': 'Przezroczyste Systemy Elewacji',
            'spider_glass_facade': 'Spider Elewacja Szklana',
            'glass_canopy_systems': 'Systemy Zadaszeń Szklanych',
            'thermal_insulated_glass_applications': 'Aplikacje Szkła Izolowanego Termicznie',
            'glass_guillotine_systems': 'Systemy Gilotyn Szklanych',
            'sliding_glass_doors': 'Drzwi Szklane Przesuwne',
            'folding_glass_doors': 'Drzwi Szklane Składane',
            'automatic_glass_doors': 'Drzwi Szklane Automatyczne',
            'stair_glass_railing': 'Balustrada Szklana Schodowa',
            'plexiglass_vertical_railing': 'Balustrada Pionowa Plexiglas',
            'balcony_glass_railing': 'Balustrada Szklana Balkonowa',
            'terrace_glass_railing': 'Balustrada Szklana Tarasowa',
            'transparent_elevator': 'Winda Przezroczysta',
            'glass_elevator_enclosure': 'Obudowa Winda Szklana',
            'panoramic_elevator': 'Winda Panoramiczna',
            'glass_elevator_doors': 'Drzwi Winda Szklane',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Systemy Elewacji Szklanych',
            'transparent_facade_systems_section': 'Przezroczyste Systemy Elewacji',
            'spider_glass_facade_section': 'Spider Elewacja Szklana',
            'glass_canopy_systems_section': 'Systemy Zadaszeń Szklanych',
            'thermal_insulated_glass_applications_section': 'Aplikacje Szkła Izolowanego Termicznie',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Przezroczyste Systemy Elewacji',
            'spider_glass_facade_section_title': 'Spider Elewacja Szklana',
            'glass_canopy_systems_section_title': 'Systemy Zadaszeń Szklanych',
            'thermal_insulated_glass_applications_section_title': 'Aplikacje Szkła Izolowanego Termicznie',
            
            // Footer
            'footer_quick_links': 'Szybkie Linki',
            'footer_services_title': 'Nasze Usługi',
            'footer_about': 'Aluminium - Kwalitetywne rozwiązania aluminiowe',
            'footer_copyright': '© 2024 Zade. Wszystkie prawa zastrzeżone.'
        },
        'pt': {
            // Page Title
            'page_title': 'Zade Alumínio',
            
            // Navigation
            'nav_home': 'Início',
            'nav_services': 'Serviços',
            'nav_about': 'Sobre Nós',
            'nav_projects': 'Nossos Projetos',
            'nav_contact': 'Contacto',
            
            // Hero Section
            'hero_title': 'Zade Alumínio Sistemas de Vidro Guilhotina',
            'hero_description': 'Sistemas de vidro de alumínio transparentes e duráveis para arquitetura moderna. Oferecemos soluções inovadoras que transformam os seus espaços de vida.',
            'btn_discover': 'Descobrir Nossos Serviços',
            'btn_about': 'Sobre Nós',
            
            // Services Section
            'services_title': 'Nossos Serviços',
            'services_subtitle': 'Zade Alumínio e Design de Vidro oferece soluções duradouras com calor, elegância e estética para espaços onde a arte encontra funcionalidade.',
            'glass_projects': 'Projetos de Vidro',
            'glass_projects_desc': 'Soluções de vidro transparentes e elegantes para arquitetura moderna',
            'aluminum_projects': 'Projetos de Alumínio',
            'aluminum_projects_desc': 'Soluções de design de alumínio duráveis e estéticas',
            'btn_details': 'Ver Detalhes',
            
            // About Section
            'about_title': 'Sobre Nós',
            'about_subtitle': 'Empresa líder que combina estética com durabilidade em vidro e alumínio.',
            'mission_title': 'Nossa Missão',
            'mission_text1': 'Como Zade Alumínio Design, somos uma empresa líder que oferece soluções estéticas, duráveis e inovadoras em aplicações de alumínio e vidro. Com anos de experiência e conhecimento, aspiramos a fornecer aos nossos clientes o serviço da mais alta qualidade.',
            'mission_text2': 'A nossa equipa de especialistas produz designs funcionais e elegantes adaptados às necessidades dos nossos clientes utilizando as mais recentes tecnologias do setor.',
            'mission_text3': 'Para transformar os seus espaços de vida sonhados em realidade, fazemos a diferença combinando a elegância do vidro com a força do alumínio.',
            
            // Features
            'feature1_title': 'Designs Pioneiros',
            'feature1_desc': 'Oferecemos soluções criativas que empurram os limites da arquitetura moderna.',
            'feature2_title': 'Experiência e Expertise',
            'feature2_desc': 'O nosso pessoal especializado dá vida aos seus projetos da melhor forma possível.',
            'feature3_title': 'Soluções Permanentes',
            'feature3_desc': 'Criamos valor com designs duráveis, de longa duração e elegantes.',
            'feature4_title': 'Qualidade Confiável',
            'feature4_desc': 'Fornecemos resultados duradouros com os materiais de alta qualidade que utilizamos.',
            
            // Contact Section
            'contact_title': 'Contacte-nos',
            'contact_subtitle': 'Pode contactar-nos para espaços com designs que combinam estética e tecnologia.',
            'contact_email': 'E-mail',
            'contact_phone': 'Contacto da Empresa',
            'contact_address': 'Endereço',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'O Seu Nome',
            'form_email': 'E-mail',
            'form_subject': 'Assunto',
            'form_message': 'A Sua Mensagem',
            'btn_send': 'Enviar Mensagem',
            
            // Footer
            'footer_about': 'Empresa líder que combina estética com durabilidade em vidro e alumínio.',
            'footer_services': 'Nossos Serviços',
            'footer_contact': 'Contacto',
            'footer_copyright': '© 2024 Zade Alumínio. Todos os direitos reservados.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Nossos Serviços de Vidro',
            'cam_services_subtitle': 'Oferecemos soluções abrangentes para todos os tipos de projetos de vidro',
            'cam_facade_systems': 'Sistemas de Fachada de Vidro',
            'cam_facade_desc': 'Soluções de fachada de vidro transparentes e duráveis para edifícios modernos. Oferecemos eficiência energética e design estético juntos.',
            'cam_door_systems': 'Sistemas de Portas de Vidro',
            'cam_door_desc': 'Soluções elegantes de portas de vidro com molduras de alumínio. Projetos especiais para projetos residenciais e comerciais.',
            'cam_railing_systems': 'Sistemas de Guarda-corpos de Vidro',
            'cam_railing_desc': 'Soluções de guarda-corpos de vidro que combinam segurança e estética. Projetos especiais para aplicações de escadas e varandas.',
            'cam_elevator_systems': 'Sistemas de Elevadores de Vidro',
            'cam_elevator_desc': 'Recintos de elevadores transparentes e sistemas de elevadores de vidro. Adicionamos riqueza visual aos edifícios modernos.',
            'cam_features_title': 'Características dos Nossos Projetos de Vidro',
            'cam_features_subtitle': 'Por que deve escolher Zade Alumínio?',
            'cam_transparency_title': 'Transparência e Luz',
            'cam_transparency_desc': 'Criamos ambientes confortáveis e brilhantes trazendo luz natural ao nível máximo para espaços interiores.',
            'cam_energy_title': 'Eficiência Energética',
            'cam_energy_desc': 'Oferecemos soluções amigas do ambiente poupando energia com sistemas de vidro isolados termicamente.',
            'cam_aesthetic_title': 'Design Estético',
            'cam_aesthetic_desc': 'Embelezamos os seus espaços com designs de vidro elegantes e estilizados que cumprem as tendências arquitetónicas modernas.',
            'cam_security_title': 'Segurança e Durabilidade',
            'cam_security_desc': 'Soluções seguras com materiais de vidro de alta qualidade e aplicações que cumprem os padrões de segurança.',
            'cam_cta_title': 'Contacte-nos para os Seus Projetos de Vidro',
            'cam_cta_desc': 'Consulte a nossa equipa de especialistas para transformar o seu projeto de vidro de sonho em realidade. Oferecemos soluções personalizadas para si.',
            'btn_get_quote': 'Solicitar Orçamento',
            
            // Projects Section
            'projects_title': 'Nossos Projetos',
            'projects_subtitle': 'Exemplos de projetos que completamos com sucesso',
            'projects_description': 'Com mais de 12 anos de experiência como fabricante líder de sistemas de alumínio e vidro na Turquia, completamos com sucesso mais de 2.645 projetos.',
            'project_stats_title': 'Nossas Estatísticas de Projetos',
            'project_stats_subtitle': 'Indicadores numéricos do nosso sucesso',
            'stats_completed_projects': '2.645+ Projetos Completados',
            'stats_years_experience': '12+ Anos de Experiência',
            'stats_application_area': '550.000+ m² de Aplicação',
            'stats_professional_team': '30+ Equipa Profissional',
            'view_all_projects': 'Ver Todos os Projetos',
            'project_year': 'Ano',
            'project_location': 'Localização',
            'project_area': 'Área',
            
            // Work Process Section
            'work_process_title': 'Nosso Processo de Trabalho',
            'work_process_subtitle': 'Passos profissionais que seguimos para dar vida aos seus projetos',
            'step1_title': 'Primeira Reunião',
            'step1_desc': 'Realizamos reuniões detalhadas para entender as necessidades do cliente e determinar o escopo do projeto.',
            'step2_title': 'Design e Planejamento',
            'step2_desc': 'Criamos designs detalhados e planejamos cada etapa do projeto com precisão.',
            'step3_title': 'Orçamento e Acordo',
            'step3_desc': 'Preparamos orçamentos detalhados e estabelecemos acordos claros com nossos clientes.',
            'step4_title': 'Produção',
            'step4_desc': 'Produzimos sistemas de alta qualidade utilizando materiais de primeira classe.',
            'step5_title': 'Instalação',
            'step5_desc': 'Nossa equipe experiente instala os sistemas com precisão e profissionalismo.',
            'step6_title': 'Inspeção e Entrega',
            'step6_desc': 'Realizamos inspeções finais e entregamos o projeto de acordo com os mais altos padrões.',
            
            // Glass System Options
            'transparent_facade_systems': 'Sistemas de Fachada Transparente',
            'spider_glass_facade': 'Fachada de Vidro Spider',
            'glass_canopy_systems': 'Sistemas de Cobertura de Vidro',
            'thermal_insulated_glass_applications': 'Aplicações de Vidro Isolado Termicamente',
            'glass_guillotine_systems': 'Sistemas de Guilhotina de Vidro',
            'sliding_glass_doors': 'Portas de Vidro Deslizantes',
            'folding_glass_doors': 'Portas de Vidro Dobráveis',
            'automatic_glass_doors': 'Portas de Vidro Automáticas',
            'stair_glass_railing': 'Guarda-corpo de Vidro para Escadas',
            'plexiglass_vertical_railing': 'Guarda-corpo Vertical de Plexiglass',
            'balcony_glass_railing': 'Guarda-corpo de Vidro para Varandas',
            'terrace_glass_railing': 'Guarda-corpo de Vidro para Terraços',
            'transparent_elevator': 'Elevador Transparente',
            'glass_elevator_enclosure': 'Recinto de Elevador de Vidro',
            'panoramic_elevator': 'Elevador Panorâmico',
            'glass_elevator_doors': 'Portas de Elevador de Vidro',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Sistemas de Fachada de Vidro',
            'transparent_facade_systems_section': 'Sistemas de Fachada Transparente',
            'spider_glass_facade_section': 'Fachada de Vidro Spider',
            'glass_canopy_systems_section': 'Sistemas de Cobertura de Vidro',
            'thermal_insulated_glass_applications_section': 'Aplicações de Vidro Isolado Termicamente',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Sistemas de Fachada Transparente',
            'spider_glass_facade_section_title': 'Fachada de Vidro Spider',
            'glass_canopy_systems_section_title': 'Sistemas de Cobertura de Vidro',
            'thermal_insulated_glass_applications_section_title': 'Aplicações de Vidro Isolado Termicamente'
        },
        'ro': {
            // Page Title
            'page_title': 'Zade Aluminiu',
            
            // Navigation
            'nav_home': 'Acasă',
            'nav_services': 'Servicii',
            'nav_about': 'Despre Noi',
            'nav_projects': 'Proiectele Noastre',
            'nav_contact': 'Contact',
            
            // Hero Section
            'hero_title': 'Zade Aluminiu Sisteme de Sticlă Ghilotină',
            'hero_description': 'Sisteme de sticlă din aluminiu transparente și durabile pentru arhitectura modernă. Oferim soluții inovatoare care transformă spațiile de viață.',
            'btn_discover': 'Descoperă Serviciile Noastre',
            'btn_about': 'Despre Noi',
            
            // Services Section
            'services_title': 'Serviciile Noastre',
            'services_subtitle': 'Zade Aluminiu și Design de Sticlă oferă soluții durabile cu căldură, eleganță și estetică pentru spații unde arta întâlnește funcționalitatea.',
            'glass_projects': 'Proiecte de Sticlă',
            'glass_projects_desc': 'Soluții de sticlă transparente și elegante pentru arhitectura modernă',
            'aluminum_projects': 'Proiecte de Aluminiu',
            'aluminum_projects_desc': 'Soluții de design din aluminiu durabile și estetice',
            'btn_details': 'Vezi Detaliile',
            
            // About Section
            'about_title': 'Despre Noi',
            'about_subtitle': 'Companie de top care combină estetica cu durabilitatea în sticlă și aluminiu.',
            'mission_title': 'Misiunea Noastră',
            'mission_text1': 'Ca Zade Aluminiu Design, suntem o companie de top care oferă soluții estetice, durabile și inovatoare în aplicațiile de aluminiu și sticlă. Cu ani de experiență și cunoștințe, aspirăm să oferim clienților noștri serviciul de cea mai înaltă calitate.',
            'mission_text2': 'Echipa noastră de experți produce designuri funcționale și elegante adaptate nevoilor clienților noștri folosind cele mai noi tehnologii din sector.',
            'mission_text3': 'Pentru a transforma spațiile de viață visate în realitate, facem diferența combinând eleganța sticlei cu puterea aluminiului.',
            
            // Features
            'feature1_title': 'Designuri Pionier',
            'feature1_desc': 'Oferim soluții creative care împing limitele arhitecturii moderne.',
            'feature2_title': 'Experiență și Expertiză',
            'feature2_desc': 'Personalul nostru expert dă viață proiectelor în cel mai bun mod posibil.',
            'feature3_title': 'Soluții Permanente',
            'feature3_desc': 'Creăm valoare cu designuri durabile, de lungă durată și elegante.',
            'feature4_title': 'Calitate De Încredere',
            'feature4_desc': 'Oferim rezultate durabile cu materialele de înaltă calitate pe care le folosim.',
            
            // Contact Section
            'contact_title': 'Contactează-ne',
            'contact_subtitle': 'Ne poți contacta pentru spații cu designuri care combină estetica și tehnologia.',
            'contact_email': 'E-mail',
            'contact_phone': 'Contact Companie',
            'contact_address': 'Adresă',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Numele Tău',
            'form_email': 'E-mail',
            'form_subject': 'Subiect',
            'form_message': 'Mesajul Tău',
            'btn_send': 'Trimite Mesaj',
            
            // Footer
            'footer_about': 'Companie de top care combină estetica cu durabilitatea în sticlă și aluminiu.',
            'footer_services': 'Serviciile Noastre',
            'footer_contact': 'Contact',
            'footer_copyright': '© 2024 Zade Aluminiu. Toate drepturile rezervate.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Serviciile Noastre de Sticlă',
            'cam_services_subtitle': 'Oferim soluții complete pentru toate tipurile de proiecte de sticlă',
            'cam_facade_systems': 'Sisteme de Fațadă de Sticlă',
            'cam_facade_desc': 'Soluții de fațadă de sticlă transparente și durabile pentru clădiri moderne. Oferim eficiență energetică și design estetic împreună.',
            'cam_door_systems': 'Sisteme de Uși de Sticlă',
            'cam_door_desc': 'Soluții elegante de uși de sticlă cu rame de aluminiu. Designuri speciale pentru proiecte rezidențiale și comerciale.',
            'cam_railing_systems': 'Sisteme de Balustrade de Sticlă',
            'cam_railing_desc': 'Soluții de balustrade de sticlă care combină siguranța și estetica. Designuri speciale pentru aplicații de scări și balcoane.',
            'cam_elevator_systems': 'Sisteme de Lifturi de Sticlă',
            'cam_elevator_desc': 'Recinturi de lifturi transparente și sisteme de lifturi de sticlă. Adăugăm bogăție vizuală clădirilor moderne.',
            'cam_features_title': 'Caracteristicile Proiectelor Noastre de Sticlă',
            'cam_features_subtitle': 'De ce ar trebui să alegeți Zade Aluminiu?',
            'cam_transparency_title': 'Transparența și Lumina',
            'cam_transparency_desc': 'Creăm medii confortabile și luminoase aducând lumina naturală la nivelul maxim în spațiile interioare.',
            'cam_energy_title': 'Eficiența Energetică',
            'cam_energy_desc': 'Oferim soluții prietenoase cu mediul prin economisirea energiei cu sisteme de sticlă izolate termic.',
            'cam_aesthetic_title': 'Design Estetic',
            'cam_aesthetic_desc': 'Înfrumusețăm spațiile voastre cu designuri de sticlă elegante și stilizate care respectă tendințele arhitecturale moderne.',
            'cam_security_title': 'Siguranța și Durabilitatea',
            'cam_security_desc': 'Soluții sigure cu materiale de sticlă de înaltă calitate și aplicații conforme cu standardele de siguranță.',
            'cam_cta_title': 'Contactați-ne pentru Proiectele Voastre de Sticlă',
            'cam_cta_desc': 'Consultați echipa noastră de experți pentru a transforma proiectul voastru de sticlă de vis în realitate. Oferim soluții personalizate pentru voi.',
            'btn_get_quote': 'Solicitați Ofertă',
            
            // Projects Section
            'projects_title': 'Proiectele Noastre',
            'projects_subtitle': 'Exemple de proiecte pe care le-am finalizat cu succes',
            'projects_description': 'Cu peste 12 ani de experiență ca producător de top al sistemelor de aluminiu și sticlă în Turcia, am finalizat cu succes peste 2.645 de proiecte.',
            'project_stats_title': 'Statisticile Noastre de Proiecte',
            'project_stats_subtitle': 'Indicatori numerici ai succesului nostru',
            'stats_completed_projects': '2.645+ Proiecte Finalizate',
            'stats_years_experience': '12+ Ani de Experiență',
            'stats_application_area': '550.000+ m² Aplicație',
            'stats_professional_team': '30+ Echipă Profesională',
            'view_all_projects': 'Vezi Toate Proiectele',
            'project_year': 'An',
            'project_location': 'Locație',
            'project_area': 'Suprafață',
            
            // Work Process Section
            'work_process_title': 'Procesul Nostru de Lucru',
            'work_process_subtitle': 'Pași profesioniști pe care îi urmăm pentru a aduce proiectele voastre la viață',
            'step1_title': 'Prima Întâlnire',
            'step1_desc': 'Organizăm întâlniri detaliate pentru a înțelege nevoile clientului și a determina domeniul de aplicare al proiectului.',
            'step2_title': 'Design și Planificare',
            'step2_desc': 'Creăm designuri detaliate și planificăm fiecare pas al proiectului cu precizie.',
            'step3_title': 'Ofertă și Acord',
            'step3_desc': 'Pregătim oferte detaliate și stabilim acorduri clare cu clienții noștri.',
            'step4_title': 'Producție',
            'step4_desc': 'Producem sisteme de înaltă calitate folosind materiale de primă clasă.',
            'step5_title': 'Instalare',
            'step5_desc': 'Echipa noastră experimentată instalează sistemele cu precizie și profesionalism.',
            'step6_title': 'Inspecție și Livrare',
            'step6_desc': 'Efectuăm inspecții finale și livrăm proiectul conform celor mai înalte standarde.',
            
            // Glass System Options
            'transparent_facade_systems': 'Sisteme de Fațadă Transparentă',
            'spider_glass_facade': 'Fațadă de Sticlă Spider',
            'glass_canopy_systems': 'Sisteme de Baldachin de Sticlă',
            'thermal_insulated_glass_applications': 'Aplicații de Sticlă Izolată Termic',
            'glass_guillotine_systems': 'Sisteme de Ghilotină de Sticlă',
            'sliding_glass_doors': 'Uși de Sticlă Glisante',
            'folding_glass_doors': 'Uși de Sticlă Pliabile',
            'automatic_glass_doors': 'Uși de Sticlă Automate',
            'stair_glass_railing': 'Balustradă de Sticlă pentru Scări',
            'plexiglass_vertical_railing': 'Balustradă Verticală Plexiglas',
            'balcony_glass_railing': 'Balustradă de Sticlă pentru Balcoane',
            'terrace_glass_railing': 'Balustradă de Sticlă pentru Terase',
            'transparent_elevator': 'Lift Transparent',
            'glass_elevator_enclosure': 'Recint Lift de Sticlă',
            'panoramic_elevator': 'Lift Panoramic',
            'glass_elevator_doors': 'Uși de Lift de Sticlă',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Sisteme de Fațadă de Sticlă',
            'transparent_facade_systems_section': 'Sisteme de Fațadă Transparentă',
            'spider_glass_facade_section': 'Fațadă de Sticlă Spider',
            'glass_canopy_systems_section': 'Sisteme de Baldachin de Sticlă',
            'thermal_insulated_glass_applications_section': 'Aplicații de Sticlă Izolată Termic',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Sisteme de Fațadă Transparentă',
            'spider_glass_facade_section_title': 'Fațadă de Sticlă Spider',
            'glass_canopy_systems_section_title': 'Sisteme de Baldachin de Sticlă',
            'thermal_insulated_glass_applications_section_title': 'Aplicații de Sticlă Izolată Termic',
            
            // Footer
            'footer_quick_links': 'Link-uri Rapide',
            'footer_services_title': 'Serviciile Noastre',
            'footer_about': 'Aluminiu - Soluții de aluminiu de calitate',
            'footer_copyright': '© 2024 Zade. Toate drepturile rezervate.'
        },
        'cs': {
            // Page Title
            'page_title': 'Zade Hliník',
            
            // Navigation
            'nav_home': 'Domů',
            'nav_services': 'Služby',
            'nav_about': 'O Nás',
            'nav_projects': 'Naše Projekty',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Hliník Systémy Skla Žaluzie',
            'hero_description': 'Průhledné a trvanlivé hliníkové skleněné systémy pro moderní architekturu. Nabízíme inovativní řešení, která transformují vaše obytné prostory.',
            'btn_discover': 'Objevit Naše Služby',
            'btn_about': 'O Nás',
            
            // Services Section
            'services_title': 'Naše Služby',
            'services_subtitle': 'Zade Hliník a Design Skla nabízí dlouhodobá řešení s teplem, elegancí a estetikou pro prostory, kde se umění setkává s funkcionalitou.',
            'glass_projects': 'Skleněné Projekty',
            'glass_projects_desc': 'Průhledná a elegantní skleněná řešení pro moderní architekturu',
            'aluminum_projects': 'Hliníkové Projekty',
            'aluminum_projects_desc': 'Trvanlivá a estetická hliníková designová řešení',
            'btn_details': 'Zobrazit Detaily',
            
            // About Section
            'about_title': 'O Nás',
            'about_subtitle': 'Vedoucí společnost kombinující estetiku s trvanlivostí ve skle a hliníku.',
            'mission_title': 'Naše Mise',
            'mission_text1': 'Jako Zade Hliník Design jsme vedoucí společnost nabízející estetická, trvanlivá a inovativní řešení v hliníkových a skleněných aplikacích. S lety zkušeností a znalostí usilujeme o poskytování nejvyšší kvality služeb našim zákazníkům.',
            'mission_text2': 'Náš tým expertů vytváří funkční a elegantní designy přizpůsobené potřebám našich zákazníků s využitím nejnovějších technologií v oboru.',
            'mission_text3': 'Abychom proměnili vaše vysněné obytné prostory ve skutečnost, děláme rozdíl kombinováním elegance skla se silou hliníku.',
            
            // Features
            'feature1_title': 'Průkopnické Designy',
            'feature1_desc': 'Nabízíme kreativní řešení, která posouvají hranice moderní architektury.',
            'feature2_title': 'Zkušenosti a Expertíza',
            'feature2_desc': 'Náš expertní personál oživuje vaše projekty nejlepším možným způsobem.',
            'feature3_title': 'Trvalá Řešení',
            'feature3_desc': 'Vytváříme hodnotu s trvanlivými, dlouhodobými a elegantními designy.',
            'feature4_title': 'Spolehlivá Kvalita',
            'feature4_desc': 'Poskytujeme dlouhodobé výsledky s vysoce kvalitními materiály, které používáme.',
            
            // Contact Section
            'contact_title': 'Kontaktujte Nás',
            'contact_subtitle': 'Můžete nás kontaktovat pro prostory s designy, které kombinují estetiku a technologii.',
            'contact_email': 'E-mail',
            'contact_phone': 'Firemní Kontakt',
            'contact_address': 'Adresa',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Vaše Jméno',
            'form_email': 'E-mail',
            'form_subject': 'Předmět',
            'form_message': 'Vaše Zpráva',
            'btn_send': 'Odeslat Zprávu',
            
            // Footer
            'footer_about': 'Vedoucí společnost kombinující estetiku s trvanlivostí ve skle a hliníku.',
            'footer_services': 'Naše Služby',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Hliník. Všechna práva vyhrazena.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Naše Skleněné Služby',
            'cam_services_subtitle': 'Nabízíme komplexní řešení pro všechny typy skleněných projektů',
            'cam_facade_systems': 'Systémy Skleněných Fasád',
            'cam_facade_desc': 'Průhledná a trvanlivá řešení skleněných fasád pro moderní budovy. Nabízíme energetickou účinnost a estetický design společně.',
            'cam_door_systems': 'Systémy Skleněných Dveří',
            'cam_door_desc': 'Elegantní řešení skleněných dveří s hliníkovými rámy. Speciální návrhy pro rezidenční a komerční projekty.',
            'cam_railing_systems': 'Systémy Skleněných Zábradlí',
            'cam_railing_desc': 'Řešení skleněných zábradlí kombinující bezpečnost a estetiku. Speciální návrhy pro schodišťové a balkónové aplikace.',
            'cam_elevator_systems': 'Systémy Skleněných Výtahů',
            'cam_elevator_desc': 'Průhledné výtahové kabiny a systémy skleněných výtahů. Přidáváme vizuální bohatství moderním budovám.',
            'cam_features_title': 'Vlastnosti Našich Skleněných Projektů',
            'cam_features_subtitle': 'Proč byste měli vybrat Zade Hliník?',
            'cam_transparency_title': 'Průhlednost a Světlo',
            'cam_transparency_desc': 'Vytváříme pohodlná a světlá prostředí přiváděním přirozeného světla na maximální úroveň do vnitřních prostorů.',
            'cam_energy_title': 'Energetická Účinnost',
            'cam_energy_desc': 'Nabízíme ekologicky šetrná řešení šetřením energie s tepelně izolovanými skleněnými systémy.',
            'cam_aesthetic_title': 'Estetický Design',
            'cam_aesthetic_desc': 'Krášlíme vaše prostory stylovými a elegantními skleněnými návrhy, které splňují moderní architektonické trendy.',
            'cam_security_title': 'Bezpečnost a Trvanlivost',
            'cam_security_desc': 'Bezpečná řešení s vysoce kvalitními skleněnými materiály a aplikacemi splňujícími bezpečnostní standardy.',
            'cam_cta_title': 'Kontaktujte Nás pro Vaše Skleněné Projekty',
            'cam_cta_desc': 'Konzultujte s naším týmem odborníků, abyste proměnili váš vysněný skleněný projekt ve skutečnost. Nabízíme personalizovaná řešení pro vás.',
            'btn_get_quote': 'Získat Nabídku',
            
            // Projects Section
            'projects_title': 'Naše Projekty',
            'projects_subtitle': 'Příklady projektů, které jsme úspěšně dokončili',
            'projects_description': 'S více než 12 lety zkušeností jako přední výrobce hliníkových a skleněných systémů v Turecku jsme úspěšně dokončili více než 2.645 projektů.',
            'project_stats_title': 'Naše Projektové Statistiky',
            'project_stats_subtitle': 'Číselné ukazatele našeho úspěchu',
            'stats_completed_projects': '2.645+ Dokončených Projektů',
            'stats_years_experience': '12+ Let Zkušeností',
            'stats_application_area': '550.000+ m² Aplikace',
            'stats_professional_team': '30+ Profesionální Tým',
            'view_all_projects': 'Zobrazit Všechny Projekty',
            'project_year': 'Rok',
            'project_location': 'Lokalita',
            'project_area': 'Plocha',
            
            // Work Process Section
            'work_process_title': 'Náš Pracovní Proces',
            'work_process_subtitle': 'Profesionální kroky, které následujeme, abychom oživili vaše projekty',
            'step1_title': 'První Schůzka',
            'step1_desc': 'Pořádáme podrobné schůzky, abychom pochopili potřeby zákazníka a určili rozsah projektu.',
            'step2_title': 'Design a Plánování',
            'step2_desc': 'Vytváříme podrobné návrhy a plánujeme každý krok projektu s přesností.',
            'step3_title': 'Nabídka a Dohoda',
            'step3_desc': 'Připravujeme podrobné nabídky a uzavíráme jasné dohody s našimi zákazníky.',
            'step4_title': 'Výroba',
            'step4_desc': 'Vyrábíme vysoce kvalitní systémy s použitím materiálů první třídy.',
            'step5_title': 'Instalace',
            'step5_desc': 'Náš zkušený tým instaluje systémy s přesností a profesionalitou.',
            'step6_title': 'Kontrola a Dodání',
            'step6_desc': 'Provádíme finální kontroly a dodáváme projekt podle nejvyšších standardů.',
            
            // Glass System Options
            'transparent_facade_systems': 'Průhledné Fasádní Systémy',
            'spider_glass_facade': 'Spider Skleněná Fasáda',
            'glass_canopy_systems': 'Systémy Skleněných Zastřešení',
            'thermal_insulated_glass_applications': 'Tepelně Izolované Skleněné Aplikace',
            'glass_guillotine_systems': 'Systémy Skleněných Gilotin',
            'sliding_glass_doors': 'Posuvné Skleněné Dveře',
            'folding_glass_doors': 'Skládací Skleněné Dveře',
            'automatic_glass_doors': 'Automatické Skleněné Dveře',
            'stair_glass_railing': 'Schodišťové Skleněné Zábradlí',
            'plexiglass_vertical_railing': 'Vertikální Plexisklo Zábradlí',
            'balcony_glass_railing': 'Balkónové Skleněné Zábradlí',
            'terrace_glass_railing': 'Terasové Skleněné Zábradlí',
            'transparent_elevator': 'Průhledný Výtah',
            'glass_elevator_enclosure': 'Skleněná Výtahová Kabina',
            'panoramic_elevator': 'Panoramatický Výtah',
            'glass_elevator_doors': 'Skleněné Výtahové Dveře',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Systémy Skleněných Fasád',
            'transparent_facade_systems_section': 'Průhledné Fasádní Systémy',
            'spider_glass_facade_section': 'Spider Skleněná Fasáda',
            'glass_canopy_systems_section': 'Systémy Skleněných Zastřešení',
            'thermal_insulated_glass_applications_section': 'Tepelně Izolované Skleněné Aplikace',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Průhledné Fasádní Systémy',
            'spider_glass_facade_section_title': 'Spider Skleněná Fasáda',
            'glass_canopy_systems_section_title': 'Systémy Skleněných Zastřešení',
            'thermal_insulated_glass_applications_section_title': 'Tepelně Izolované Skleněné Aplikace',
            
            // Footer
            'footer_quick_links': 'Rychlé Odkazy',
            'footer_services_title': 'Naše Služby',
            'footer_about': 'Hliník - Kvalitní hliníková řešení',
            'footer_copyright': '© 2024 Zade. Všechna práva vyhrazena.'
        },
        'fi': {
            // Page Title
            'page_title': 'Zade Alumiini',
            
            // Navigation
            'nav_home': 'Koti',
            'nav_services': 'Palvelut',
            'nav_about': 'Tietoa Meistä',
            'nav_projects': 'Projektimme',
            'nav_contact': 'Yhteystiedot',
            
            // Hero Section
            'hero_title': 'Zade Alumiini Guillotiinilasijärjestelmät',
            'hero_description': 'Läpinäkyvät ja kestävät alumiinilasijärjestelmät modernille arkkitehtuurille. Tarjoamme innovatiivisia ratkaisuja, jotka muuttavat elintilojasi.',
            'btn_discover': 'Tutustu Palveluihimme',
            'btn_about': 'Tietoa Meistä',
            
            // Services Section
            'services_title': 'Palvelumme',
            'services_subtitle': 'Zade Alumiini ja Lasin Suunnittelu tarjoaa pitkäkestoisia ratkaisuja lämmöllä, tyylillä ja estetiikalla tiloihin, joissa taide kohtaa toiminnallisuuden.',
            'glass_projects': 'Lasiprojektit',
            'glass_projects_desc': 'Läpinäkyvät ja tyylikkäät lasiratkaisut modernille arkkitehtuurille',
            'aluminum_projects': 'Alumiiniprojektit',
            'aluminum_projects_desc': 'Kestävät ja esteettiset alumiinisuunnitteluratkaisut',
            'btn_details': 'Katso Yksityiskohdat',
            
            // About Section
            'about_title': 'Tietoa Meistä',
            'about_subtitle': 'Johtava yritys, joka yhdistää estetiikan kestävyyteen lasissa ja alumiinissa.',
            'mission_title': 'Missiomme',
            'mission_text1': 'Zade Alumiini Suunnitteluna olemme johtava yritys, joka tarjoaa esteettisiä, kestäviä ja innovatiivisia ratkaisuja alumiini- ja lasisovelluksissa. Vuosien kokemuksella ja tiedolla pyrimme tarjoamaan asiakkaillemme korkeimman laadun palvelua.',
            'mission_text2': 'Asiantuntijatiimimme tuottaa toiminnallisia ja tyylikkäitä suunnitelmia, jotka on räätälöity asiakkaidemme tarpeisiin käyttäen alan uusimpia teknologioita.',
            'mission_text3': 'Muuttaaksemme unelmiesi elintilat todellisuudeksi, teemme eron yhdistämällä lasin tyylin alumiinin voimaan.',
            
            // Features
            'feature1_title': 'Uraauurtavat Suunnitelmat',
            'feature1_desc': 'Tarjoamme luovia ratkaisuja, jotka työntävät modernin arkkitehtuurin rajoja.',
            'feature2_title': 'Kokemus ja Asiantuntemus',
            'feature2_desc': 'Asiantuntijapersonaali elävöittää projektisi parhaalla mahdollisella tavalla.',
            'feature3_title': 'Pysyvät Ratkaisut',
            'feature3_desc': 'Luomme arvoa kestävillä, pitkäkestoisilla ja tyylikkäillä suunnitelmilla.',
            'feature4_title': 'Luotettava Laatu',
            'feature4_desc': 'Tarjoamme pitkäkestoisia tuloksia käyttämämme korkealaatuisilla materiaaleilla.',
            
            // Contact Section
            'contact_title': 'Ota Meihin Yhteyttä',
            'contact_subtitle': 'Voit ottaa meihin yhteyttä tiloihin, joissa on suunnitelmia, jotka yhdistävät estetiikan ja teknologian.',
            'contact_email': 'Sähköposti',
            'contact_phone': 'Yrityksen Yhteystiedot',
            'contact_address': 'Osoite',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Nimesi',
            'form_email': 'Sähköposti',
            'form_subject': 'Aihe',
            'form_message': 'Viestisi',
            'btn_send': 'Lähetä Viesti',
            
            // Footer
            'footer_about': 'Johtava yritys, joka yhdistää estetiikan kestävyyteen lasissa ja alumiinissa.',
            'footer_services': 'Palvelumme',
            'footer_contact': 'Yhteystiedot',
            'footer_copyright': '© 2024 Zade Alumiini. Kaikki oikeudet pidätetään.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Lasi-palvelumme',
            'cam_services_subtitle': 'Tarjoamme kattavia ratkaisuja kaiken tyyppisille lasiprojekteille',
            'cam_facade_systems': 'Lasi-julkisivujärjestelmät',
            'cam_facade_desc': 'Läpinäkyviä ja kestäviä lasi-julkisivuratkaisuja moderneille rakennuksille. Tarjoamme energiatehokkuutta ja esteettistä suunnittelua yhdessä.',
            'cam_door_systems': 'Lasi-ovijärjestelmät',
            'cam_door_desc': 'Elegantteja lasi-oviratkaisuja alumiinikehyksillä. Erikoissuunnittelut asuin- ja liikeprojekteille.',
            'cam_railing_systems': 'Lasi-kaitejärjestelmät',
            'cam_railing_desc': 'Lasi-kaiteratkaisuja, jotka yhdistävät turvallisuuden ja estetiikan. Erikoissuunnittelut portaikko- ja parveke-sovelluksille.',
            'cam_elevator_systems': 'Lasi-hissijärjestelmät',
            'cam_elevator_desc': 'Läpinäkyviä hissikoppeja ja lasi-hissijärjestelmiä. Lisäämme visuaalista rikkautta moderneihin rakennuksiin.',
            'cam_features_title': 'Lasi-projektiemme ominaisuudet',
            'cam_features_subtitle': 'Miksi sinun pitäisi valita Zade Alumiini?',
            'cam_transparency_title': 'Läpinäkyvyys ja Valo',
            'cam_transparency_desc': 'Luomme mukavia ja valoisia ympäristöjä tuomalla luonnollisen valon maksimaaliseen tasoon sisätiloihin.',
            'cam_energy_title': 'Energiatehokkuus',
            'cam_energy_desc': 'Tarjoamme ympäristöystävällisiä ratkaisuja säästämällä energiaa lämpöeristetyillä lasijärjestelmillä.',
            'cam_aesthetic_title': 'Esteettinen Suunnittelu',
            'cam_aesthetic_desc': 'Kaunistamme tilojasi tyylikkäillä ja elegantilla lasisuunnittelulla, joka noudattaa moderneja arkkitehtuuritrendejä.',
            'cam_security_title': 'Turvallisuus ja Kestävyys',
            'cam_security_desc': 'Turvallisia ratkaisuja korkealaatuisilla lasimateriaaleilla ja sovelluksilla, jotka noudattavat turvallisuusstandardeja.',
            'cam_cta_title': 'Ota Meihin Yhteyttä Lasi-projekteihisi',
            'cam_cta_desc': 'Konsultoi asiantuntijatiimiämme muuttaaksesi unelmasi lasiprojektin todellisuudeksi. Tarjoamme räätälöityjä ratkaisuja sinulle.',
            'btn_get_quote': 'Pyydä Tarjous',
            
            // Projects Section
            'projects_title': 'Projektimme',
            'projects_subtitle': 'Esimerkkejä projekteista, jotka olemme onnistuneesti saaneet valmiiksi',
            'projects_description': 'Yli 12 vuoden kokemuksella Turkin johtavana alumiini- ja lasijärjestelmien valmistajana olemme onnistuneesti saaneet valmiiksi yli 2.645 projektia.',
            'project_stats_title': 'Projektitilastomme',
            'project_stats_subtitle': 'Menestyksemme numeeriset indikaattorit',
            'stats_completed_projects': '2.645+ Valmistunutta Projektia',
            'stats_years_experience': '12+ Vuoden Kokemus',
            'stats_application_area': '550.000+ m² Sovellusta',
            'stats_professional_team': '30+ Ammattimainen Tiimi',
            'view_all_projects': 'Katso Kaikki Projektit',
            'project_year': 'Vuosi',
            'project_location': 'Sijainti',
            'project_area': 'Pinta-ala',
            
            // Work Process Section
            'work_process_title': 'Työprosessimme',
            'work_process_subtitle': 'Ammattimaiset vaiheet, joita seuraamme tuodaksemme projektisi eloon',
            'step1_title': 'Ensimmäinen Tapaaminen',
            'step1_desc': 'Pidämme yksityiskohtaisia tapaamisia ymmärtääksemme asiakkaan tarpeet ja määrittääksemme projektin laajuuden.',
            'step2_title': 'Suunnittelu ja Suunnittelu',
            'step2_desc': 'Luomme yksityiskohtaisia suunnitelmia ja suunnittelemme projektin jokaisen vaiheen tarkkuudella.',
            'step3_title': 'Tarjous ja Sopimus',
            'step3_desc': 'Valmistelemme yksityiskohtaisia tarjouksia ja teemme selkeitä sopimuksia asiakkaidemme kanssa.',
            'step4_title': 'Tuotanto',
            'step4_desc': 'Tuotamme korkealaatuisia järjestelmiä käyttäen ensiluokkaisia materiaaleja.',
            'step5_title': 'Asennus',
            'step5_desc': 'Kokeneemme tiimimme asentaa järjestelmät tarkkuudella ja ammattimaisuudella.',
            'step6_title': 'Tarkastus ja Toimitus',
            'step6_desc': 'Suoritamme lopulliset tarkastukset ja toimittamme projektin korkeimman standardin mukaisesti.',
            
            // Glass System Options
            'transparent_facade_systems': 'Läpinäkyvät Julkisivujärjestelmät',
            'spider_glass_facade': 'Spider Lasi-julkisivu',
            'glass_canopy_systems': 'Lasi-katosjärjestelmät',
            'thermal_insulated_glass_applications': 'Lämpöeristetyt Lasi-sovellukset',
            'glass_guillotine_systems': 'Lasi-gilotiinijärjestelmät',
            'sliding_glass_doors': 'Liukulasi-ovet',
            'folding_glass_doors': 'Taitettavat Lasi-ovet',
            'automatic_glass_doors': 'Automaattiset Lasi-ovet',
            'stair_glass_railing': 'Portaikko-lasikaide',
            'plexiglass_vertical_railing': 'Pystypleksilasi-kaide',
            'balcony_glass_railing': 'Parveke-lasikaide',
            'terrace_glass_railing': 'Terasseja-lasikaide',
            'transparent_elevator': 'Läpinäkyvä Hissi',
            'glass_elevator_enclosure': 'Lasi-hissikoppi',
            'panoramic_elevator': 'Panoraamahissi',
            'glass_elevator_doors': 'Lasi-hissiovet',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Lasi-julkisivujärjestelmät',
            'transparent_facade_systems_section': 'Läpinäkyvät Julkisivujärjestelmät',
            'spider_glass_facade_section': 'Spider Lasi-julkisivu',
            'glass_canopy_systems_section': 'Lasi-katosjärjestelmät',
            'thermal_insulated_glass_applications_section': 'Lämpöeristetyt Lasi-sovellukset',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Läpinäkyvät Julkisivujärjestelmät',
            'spider_glass_facade_section_title': 'Spider Lasi-julkisivu',
            'glass_canopy_systems_section_title': 'Lasi-katosjärjestelmät',
            'thermal_insulated_glass_applications_section_title': 'Lämpöeristetyt Lasi-sovellukset',
            
            // Footer
            'footer_quick_links': 'Pikalinkit',
            'footer_services_title': 'Palvelumme',
            'footer_about': 'Alumiini - Laadukkaat alumiiniratkaisut',
            'footer_copyright': '© 2024 Zade. Kaikki oikeudet pidätetään.'
        },
        'lt': {
            // Page Title
            'page_title': 'Zade Aliuminis',
            
            // Navigation
            'nav_home': 'Pagrindinis',
            'nav_services': 'Paslaugos',
            'nav_about': 'Apie Mus',
            'nav_projects': 'Mūsų Projektai',
            'nav_contact': 'Kontaktai',
            
            // Hero Section
            'hero_title': 'Zade Aliuminio Stiklo Sistemos',
            'hero_description': 'Skaidrūs ir patvarūs aliuminio stiklo sprendimai moderniai architektūrai. Siūlome inovatyvius sprendimus, kurie transformuoja jūsų gyvenamąsias erdves.',
            'btn_discover': 'Atraskite Mūsų Paslaugas',
            'btn_about': 'Apie Mus',
            
            // Services Section
            'services_title': 'Mūsų Paslaugos',
            'services_subtitle': 'Zade Aliuminio ir Stiklo Dizainas siūlo ilgalaikius sprendimus su šiluma, elegancija ir estetika erdvėms, kur menas susitinka su funkcionalumu.',
            'glass_projects': 'Stiklo Projektai',
            'glass_projects_desc': 'Skaidrūs ir elegantiški stiklo sprendimai moderniai architektūrai',
            'aluminum_projects': 'Aliuminio Projektai',
            'aluminum_projects_desc': 'Patvarūs ir estetiški aliuminio dizaino sprendimai',
            'btn_details': 'Žiūrėti Detales',
            
            // About Section
            'about_title': 'Apie Mus',
            'about_subtitle': 'Pirmaujanti įmonė, sujungianti estetiką su patvarumu stikle ir aliuminyje.',
            'mission_title': 'Mūsų Misija',
            'mission_text1': 'Kaip Zade Aliuminio Dizainas, esame pirmaujanti įmonė, siūlanti estetiškus, patvarius ir inovatyvius sprendimus aliuminio ir stiklo taikymui. Su metų patirtimi ir žiniomis siekiame suteikti klientams aukščiausios kokybės paslaugas.',
            'mission_text2': 'Mūsų ekspertų komanda kuria funkcionalius ir elegantiškus dizainus, pritaikytus klientų poreikiams, naudodama naujausias technologijas šioje srityje.',
            'mission_text3': 'Kad paverstume jūsų svajonių gyvenamąsias erdves realybe, darome skirtumą sujungdami stiklo eleganciją su aliuminio jėga.',
            
            // Features
            'feature1_title': 'Pirmaujantys Dizainai',
            'feature1_desc': 'Siūlome kūrybiškus sprendimus, kurie veržiasi per modernios architektūros ribas.',
            'feature2_title': 'Patirtis ir Ekspertizė',
            'feature2_desc': 'Mūsų ekspertų personalas geriausiu būdu atgaivina jūsų projektus.',
            'feature3_title': 'Ilgalaikiai Sprendimai',
            'feature3_desc': 'Kuriame vertę patvarius, ilgalaikius ir elegantiškus dizainus.',
            'feature4_title': 'Patikima Kokybė',
            'feature4_desc': 'Suteikiame ilgalaikius rezultatus su mūsų naudojamais aukštos kokybės medžiagomis.',
            
            // Contact Section
            'contact_title': 'Susisiekite Su Mumis',
            'contact_subtitle': 'Galite susisiekti su mumis dėl erdvių su dizainais, kurie sujungia estetiką ir technologiją.',
            'contact_email': 'El. Paštas',
            'contact_phone': 'Įmonės Kontaktai',
            'contact_address': 'Adresas',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Jūsų Vardas',
            'form_email': 'El. Paštas',
            'form_subject': 'Tema',
            'form_message': 'Jūsų Žinutė',
            'btn_send': 'Siųsti Žinutę',
            
            // Footer
            'footer_about': 'Pirmaujanti įmonė, sujungianti estetiką su patvarumu stikle ir aliuminyje.',
            'footer_services': 'Mūsų Paslaugos',
            'footer_contact': 'Kontaktai',
            'footer_copyright': '© 2024 Zade Aliuminio. Visos teisės saugomos.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Mūsų Stiklo Paslaugos',
            'cam_services_subtitle': 'Siūlome išsamius sprendimus visų tipų stiklo projektams',
            'cam_facade_systems': 'Stiklo Fasadų Sistemos',
            'cam_facade_desc': 'Skaidrūs ir patvarūs stiklo fasadų sprendimai moderniems pastatams. Siūlome energijos efektyvumą ir estetinį dizainą kartu.',
            'cam_door_systems': 'Stiklo Durų Sistemos',
            'cam_door_desc': 'Elegantiški stiklo durų sprendimai su aliuminio rėmais. Specialūs dizainai gyvenamiesiems ir komerciniams projektams.',
            'cam_railing_systems': 'Stiklo Turėklų Sistemos',
            'cam_railing_desc': 'Stiklo turėklų sprendimai, kurie derina saugumą ir estetiką. Specialūs dizainai laiptų ir balkonų aplikacijoms.',
            'cam_elevator_systems': 'Stiklo Liftų Sistemos',
            'cam_elevator_desc': 'Skaidrūs liftų korpusai ir stiklo liftų sistemos. Pridedame vizualinį turtingumą moderniems pastatams.',
            'cam_features_title': 'Mūsų Stiklo Projektų Savybės',
            'cam_features_subtitle': 'Kodėl turėtumėte rinktis Zade Aliuminis?',
            'cam_transparency_title': 'Skaidrumas ir Šviesa',
            'cam_transparency_desc': 'Kuriame patogias ir šviesias aplinkas, atnešdami natūralų šviesą maksimaliu lygiu į vidaus erdves.',
            'cam_energy_title': 'Energijos Efektyvumas',
            'cam_energy_desc': 'Siūlome draugiškus aplinkai sprendimus taupant energiją su šilumos izoliuotomis stiklo sistemomis.',
            'cam_aesthetic_title': 'Estetinis Dizainas',
            'cam_aesthetic_desc': 'Gražiname jūsų erdves stilingais ir elegantiškais stiklo dizainais, kurie atitinka modernius architektūros trendus.',
            'cam_security_title': 'Saugumas ir Patvarumas',
            'cam_security_desc': 'Saugūs sprendimai su aukštos kokybės stiklo medžiagomis ir aplikacijomis, atitinkančiomis saugumo standartus.',
            'cam_cta_title': 'Susisiekite su Mumis dėl Jūsų Stiklo Projektų',
            'cam_cta_desc': 'Konsultuokitės su mūsų ekspertų komanda, kad paverstumėte savo svajonių stiklo projektą realybe. Siūlome individualius sprendimus jums.',
            'btn_get_quote': 'Gauti Pasiūlymą',
            
            // Projects Section
            'projects_title': 'Mūsų Projektai',
            'projects_subtitle': 'Mūsų sėkmingai įgyvendintų projektų pavyzdžiai',
            'projects_description': 'Su daugiau nei 12 metų patirtimi kaip pirmaujantis aliuminio ir stiklo sistemų gamintojas Turkijoje, sėkmingai įgyvendinome daugiau nei 2.645 projektus.',
            'project_stats_title': 'Mūsų Projektų Statistika',
            'project_stats_subtitle': 'Mūsų sėkmės skaitiniai rodikliai',
            'stats_completed_projects': '2.645+ Įgyvendinti Projektai',
            'stats_years_experience': '12+ Metų Patirtis',
            'stats_application_area': '550.000+ m² Taikymo',
            'stats_professional_team': '30+ Profesionalus Komandos',
            'view_all_projects': 'Žiūrėti Visus Projektus',
            'project_year': 'Metai',
            'project_location': 'Vieta',
            'project_area': 'Plotas',
            
            // Work Process Section
            'work_process_title': 'Mūsų Darbo Procesas',
            'work_process_subtitle': 'Profesionalūs žingsniai, kuriuos sekiame, kad atgaivintume jūsų projektus',
            'step1_title': 'Pirmas Susitikimas',
            'step1_desc': 'Organizuojame detales susitikimus, kad suprastume kliento poreikius ir nustatytume projekto apimtį.',
            'step2_title': 'Dizainas ir Planavimas',
            'step2_desc': 'Kuriame detales dizainus ir planuojame kiekvieną projekto žingsnį tiksliai.',
            'step3_title': 'Pasiūlymas ir Sutartis',
            'step3_desc': 'Ruošiame detales pasiūlymus ir sudarome aiškius susitarimus su mūsų klientais.',
            'step4_title': 'Gamyba',
            'step4_desc': 'Gaminame aukštos kokybės sistemas naudodami pirmos klasės medžiagas.',
            'step5_title': 'Montavimas',
            'step5_desc': 'Mūsų patyrusi komanda montuoja sistemas tiksliai ir profesionaliai.',
            'step6_title': 'Patikrinimas ir Pristatymas',
            'step6_desc': 'Atliekame galutinius patikrinimus ir pristatome projektą pagal aukščiausius standartus.',
            
            // Glass System Options
            'transparent_facade_systems': 'Skaidrūs Fasadų Sistemos',
            'spider_glass_facade': 'Spider Stiklo Fasadas',
            'glass_canopy_systems': 'Stiklo Stogų Sistemos',
            'thermal_insulated_glass_applications': 'Šilumos Izoliuotos Stiklo Aplikacijos',
            'glass_guillotine_systems': 'Stiklo Gilotinos Sistemos',
            'sliding_glass_doors': 'Stumdomos Stiklo Durys',
            'folding_glass_doors': 'Sulenkamos Stiklo Durys',
            'automatic_glass_doors': 'Automatinės Stiklo Durys',
            'stair_glass_railing': 'Laiptų Stiklo Turėklai',
            'plexiglass_vertical_railing': 'Vertikalūs Plexiglas Turėklai',
            'balcony_glass_railing': 'Balkono Stiklo Turėklai',
            'terrace_glass_railing': 'Terasos Stiklo Turėklai',
            'transparent_elevator': 'Skaidrus Liftas',
            'glass_elevator_enclosure': 'Stiklo Lifto Korpusas',
            'panoramic_elevator': 'Panoraminis Liftas',
            'glass_elevator_doors': 'Stiklo Lifto Durys',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Stiklo Fasadų Sistemos',
            'transparent_facade_systems_section': 'Skaidrūs Fasadų Sistemos',
            'spider_glass_facade_section': 'Spider Stiklo Fasadas',
            'glass_canopy_systems_section': 'Stiklo Stogų Sistemos',
            'thermal_insulated_glass_applications_section': 'Šilumos Izoliuotos Stiklo Aplikacijos',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Skaidrūs Fasadų Sistemos',
            'spider_glass_facade_section_title': 'Spider Stiklo Fasadas',
            'glass_canopy_systems_section_title': 'Stiklo Stogų Sistemos',
            'thermal_insulated_glass_applications_section_title': 'Šilumos Izoliuotos Stiklo Aplikacijos',
            
            // Footer
            'footer_quick_links': 'Greitos Nuorodos',
            'footer_services_title': 'Mūsų Paslaugos',
            'footer_about': 'Aliuminis - Kokybiški aliuminio sprendimai',
            'footer_copyright': '© 2024 Zade. Visos teisės saugomos.'
        },
        'lu': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Accueil',
            'nav_services': 'Services',
            'nav_about': 'À Propos',
            'nav_projects': 'Nos Projets',
            'nav_contact': 'Contact',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Systèmes de Verre',
            'hero_description': 'Solutions de verre aluminium transparentes et durables pour l\'architecture moderne. Nous offrons des solutions innovantes qui transforment vos espaces de vie.',
            'btn_discover': 'Découvrez Nos Services',
            'btn_about': 'À Propos',
            
            // Services Section
            'services_title': 'Nos Services',
            'services_subtitle': 'Zade Aluminium et Design de Verre offre des solutions durables avec chaleur, élégance et esthétique pour les espaces où l\'art rencontre la fonctionnalité.',
            'glass_projects': 'Projets de Verre',
            'glass_projects_desc': 'Solutions de verre transparentes et élégantes pour l\'architecture moderne',
            'aluminum_projects': 'Projets d\'Aluminium',
            'aluminum_projects_desc': 'Solutions de design aluminium durables et esthétiques',
            'btn_details': 'Voir les Détails',
            
            // About Section
            'about_title': 'À Propos',
            'about_subtitle': 'Entreprise leader qui unit l\'esthétique à la durabilité dans le verre et l\'aluminium.',
            'mission_title': 'Notre Mission',
            'mission_text1': 'En tant que Zade Aluminium Design, nous sommes une entreprise leader offrant des solutions esthétiques, durables et innovantes dans les applications d\'aluminium et de verre.',
            'mission_text2': 'Notre équipe d\'experts produit des designs fonctionnels et élégants adaptés aux besoins de nos clients en utilisant les dernières technologies du secteur.',
            'mission_text3': 'Pour transformer vos espaces de vie de rêve en réalité, nous faisons la différence en combinant l\'élégance du verre avec la force de l\'aluminium.',
            
            // Features
            'feature1_title': 'Designs Pionniers',
            'feature1_desc': 'Nous offrons des solutions créatives qui repoussent les limites de l\'architecture moderne.',
            'feature2_title': 'Expérience et Expertise',
            'feature2_desc': 'Notre personnel expert anime vos projets de la meilleure façon possible.',
            'feature3_title': 'Solutions Durables',
            'feature3_desc': 'Nous créons de la valeur avec des designs durables, durables et élégants.',
            'feature4_title': 'Qualité Fiable',
            'feature4_desc': 'Nous fournissons des résultats durables avec nos matériaux de haute qualité.',
            
            // Contact Section
            'contact_title': 'Contactez-Nous',
            'contact_subtitle': 'Vous pouvez nous contacter pour des espaces avec des designs qui unissent esthétique et technologie.',
            'contact_email': 'Email',
            'contact_phone': 'Contacts de l\'Entreprise',
            'contact_address': 'Adresse',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Votre Nom',
            'form_email': 'Email',
            'form_subject': 'Sujet',
            'form_message': 'Votre Message',
            'btn_send': 'Envoyer le Message',
            
            // Footer
            'footer_quick_links': 'Liens Rapides',
            'footer_services_title': 'Nos Services',
            'footer_about': 'Entreprise leader qui unit l\'esthétique à la durabilité dans le verre et l\'aluminium.',
            'footer_services': 'Nos Services',
            'footer_contact': 'Contact',
            'footer_copyright': '© 2024 Zade Aluminium. Tous droits réservés.',
            
            // Projects Section
            'projects_title': 'Nos Projets',
            'projects_subtitle': 'Exemples de projets que nous avons menés à bien avec succès',
            'projects_description': 'Avec plus de 12 ans d\'expérience en tant que fabricant leader de systèmes d\'aluminium et de verre en Turquie, nous avons mené à bien avec succès plus de 2.645 projets.',
            'project_stats_title': 'Nos Statistiques de Projets',
            'project_stats_subtitle': 'Indicateurs numériques de notre succès',
            'stats_completed_projects': '2.645+ Projets Menés à Bien',
            'stats_years_experience': '12+ Années d\'Expérience',
            'stats_application_area': '550.000+ m² d\'Application',
            'stats_professional_team': '30+ Équipe Professionnelle',
            'view_all_projects': 'Voir Tous les Projets',
            'project_year': 'Année',
            'project_location': 'Emplacement',
            'project_area': 'Surface',
            
            // Work Process Section
            'work_process_title': 'Notre Processus de Travail',
            'work_process_subtitle': 'Étapes professionnelles que nous suivons pour donner vie à vos projets',
            'step1_title': 'Première Réunion',
            'step1_desc': 'Nous organisons des réunions détaillées pour comprendre les besoins du client et déterminer la portée du projet.',
            'step2_title': 'Conception et Planification',
            'step2_desc': 'Nous créons des conceptions détaillées et planifions chaque étape du projet avec précision.',
            'step3_title': 'Devis et Accord',
            'step3_desc': 'Nous préparons des devis détaillés et établissons des accords clairs avec nos clients.',
            'step4_title': 'Production',
            'step4_desc': 'Nous produisons des systèmes de haute qualité en utilisant des matériaux de première classe.',
            'step5_title': 'Installation',
            'step5_desc': 'Notre équipe expérimentée installe les systèmes avec précision et professionnalisme.',
            'step6_title': 'Inspection et Livraison',
            'step6_desc': 'Nous effectuons des inspections finales et livrons le projet selon les normes les plus élevées.',
        },
        'rs': {
            // Page Title
            'page_title': 'Zade Aluminijum',
            
            // Navigation
            'nav_home': 'Početna',
            'nav_services': 'Usluge',
            'nav_about': 'O Nama',
            'nav_projects': 'Naši Projekti',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Aluminijum Sistemi za Staklo',
            'hero_description': 'Transparentni i izdržljivi aluminijumski stakleni sistemi za modernu arhitekturu. Nudimo inovativna rešenja koja transformišu vaše životne prostore.',
            'btn_discover': 'Istražite Naše Usluge',
            'btn_about': 'O Nama',
            
            // Services Section
            'services_title': 'Naše Usluge',
            'services_subtitle': 'Zade Aluminijum i Stakleni Dizajn nudi dugotrajna rešenja sa toplinom, elegancijom i estetikom za prostore gde se umetnost susreće sa funkcionalnošću.',
            'glass_projects': 'Stakleni Projekti',
            'glass_projects_desc': 'Transparentna i elegantna staklena rešenja za modernu arhitekturu',
            'aluminum_projects': 'Aluminijumski Projekti',
            'aluminum_projects_desc': 'Izdržljiva i estetička aluminijumska dizajnerska rešenja',
            'btn_details': 'Pogledaj Detalje',
            
            // About Section
            'about_title': 'O Nama',
            'about_subtitle': 'Vodeća kompanija koja spaja estetiku sa izdržljivošću u staklu i aluminijumu.',
            'mission_title': 'Naša Misija',
            'mission_text1': 'Kao Zade Aluminijum Dizajn, mi smo vodeća kompanija koja nudi estetička, izdržljiva i inovativna rešenja u aluminijumskim i staklenim aplikacijama.',
            'mission_text2': 'Naš tim stručnjaka proizvodi funkcionalne i elegantne dizajne prilagođene potrebama naših klijenata koristeći najnovije tehnologije u industriji.',
            'mission_text3': 'Da bismo pretvorili vaše životne prostore iz snova u stvarnost, pravimo razliku spajajući eleganciju stakla sa snagom aluminijuma.',
            
            // Features
            'feature1_title': 'Pionirski Dizajni',
            'feature1_desc': 'Nudimo kreativna rešenja koja guraju granice moderne arhitekture.',
            'feature2_title': 'Iskustvo i Ekspertiza',
            'feature2_desc': 'Naš stručni kadar oživljava vaše projekte na najbolji mogući način.',
            'feature3_title': 'Trajna Rešenja',
            'feature3_desc': 'Stvaramo vrednost sa izdržljivim, dugotrajnim i elegantnim dizajnima.',
            'feature4_title': 'Pouzdana Kvalitet',
            'feature4_desc': 'Pružamo dugotrajne rezultate sa našim visokokvalitetnim materijalima.',
            
            // Contact Section
            'contact_title': 'Kontaktirajte Nas',
            'contact_subtitle': 'Možete nas kontaktirati za prostore sa dizajnima koji spajaju estetiku i tehnologiju.',
            'contact_email': 'Email',
            'contact_phone': 'Kontakti Kompanije',
            'contact_address': 'Adresa',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Vaše Ime',
            'form_email': 'Email',
            'form_subject': 'Predmet',
            'form_message': 'Vaša Poruka',
            'btn_send': 'Pošaljite Poruku',
            
            // Footer
            'footer_about': 'Vodeća kompanija koja spaja estetiku sa izdržljivošću u staklu i aluminijumu.',
            'footer_services': 'Naše Usluge',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Aluminijum. Sva prava zadržana.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Naše Staklene Usluge',
            'cam_services_subtitle': 'Nudimo sveobuhvatna rešenja za sve vrste staklenih projekata',
            'cam_facade_systems': 'Sistemi Staklenih Fasada',
            'cam_facade_desc': 'Transparentna i izdržljiva rešenja staklenih fasada za moderne zgrade. Nudimo energetsku efikasnost i estetski dizajn zajedno.',
            'cam_door_systems': 'Sistemi Staklenih Vrata',
            'cam_door_desc': 'Elegantna rešenja staklenih vrata sa aluminijumskim okvirima. Specijalni dizajni za stambene i komercijalne projekte.',
            'cam_railing_systems': 'Sistemi Staklenih Ograda',
            'cam_railing_desc': 'Rešenja staklenih ograda koja spajaju sigurnost i estetiku. Specijalni dizajni za stepenišne i balkonske aplikacije.',
            'cam_elevator_systems': 'Sistemi Staklenih Liftova',
            'cam_elevator_desc': 'Transparentni liftovi i sistemi staklenih liftova. Dodajemo vizuelno bogatstvo modernim zgradama.',
            'cam_features_title': 'Karakteristike Naših Staklenih Projekata',
            'cam_features_subtitle': 'Zašto biste trebali izabrati Zade Aluminijum?',
            'cam_transparency_title': 'Transparentnost i Svetlost',
            'cam_transparency_desc': 'Stvaramo udobne i svetle prostore dovodeći prirodnu svetlost na maksimalni nivo u unutrašnje prostore.',
            'cam_energy_title': 'Energetska Efikasnost',
            'cam_energy_desc': 'Nudimo ekološki prihvatljiva rešenja štedeći energiju sa termički izolovanim staklenim sistemima.',
            'cam_aesthetic_title': 'Estetski Dizajn',
            'cam_aesthetic_desc': 'Ulepšavamo vaše prostore sa stilskim i elegantnim staklenim dizajnima koji se pridržavaju modernih arhitektonskih trendova.',
            'cam_security_title': 'Sigurnost i Izdržljivost',
            'cam_security_desc': 'Sigurna rešenja sa visokokvalitetnim staklenim materijalima i aplikacijama koje se pridržavaju sigurnosnih standarda.',
            'cam_cta_title': 'Kontaktirajte Nas za Vaše Staklene Projekte',
            'cam_cta_desc': 'Konsultujte se sa našim timom stručnjaka da pretvorite vaš san o staklenom projektu u stvarnost. Nudimo personalizovana rešenja za vas.',
            'btn_get_quote': 'Zatražite Ponudu',
            
            // Projects Section
            'projects_title': 'Naši Projekti',
            'projects_subtitle': 'Primeri projekata koje smo uspešno završili',
            'projects_description': 'Sa više od 12 godina iskustva kao vodeći proizvođač aluminijumskih i staklenih sistema u Turskoj, uspešno smo završili više od 2.645 projekata.',
            'project_stats_title': 'Naša Projektna Statistika',
            'project_stats_subtitle': 'Numerički pokazatelji našeg uspeha',
            'stats_completed_projects': '2.645+ Završenih Projekata',
            'stats_years_experience': '12+ Godina Iskustva',
            'stats_application_area': '550.000+ m² Primene',
            'stats_professional_team': '30+ Profesionalni Tim',
            'view_all_projects': 'Pogledajte Sve Projekte',
            'project_year': 'Godina',
            'project_location': 'Lokacija',
            'project_area': 'Površina',
            
            // Work Process Section
            'work_process_title': 'Naš Radni Proces',
            'work_process_subtitle': 'Profesionalni koraci koje pratimo da oživimo vaše projekte',
            'step1_title': 'Prvi Sastanak',
            'step1_desc': 'Organizujemo detaljne sastanke da razumemo potrebe klijenta i odredimo obim projekta.',
            'step2_title': 'Dizajn i Planiranje',
            'step2_desc': 'Kreiramo detaljne dizajne i planiramo svaki korak projekta sa preciznošću.',
            'step3_title': 'Ponuda i Dogovor',
            'step3_desc': 'Pripremamo detaljne ponude i uspostavljamo jasne dogovore sa našim klijentima.',
            'step4_title': 'Proizvodnja',
            'step4_desc': 'Proizvodimo visokokvalitetne sisteme koristeći materijale prve klase.',
            'step5_title': 'Instalacija',
            'step5_desc': 'Naš iskusni tim instalira sisteme sa preciznošću i profesionalizmom.',
            'step6_title': 'Inspekcija i Isporuka',
            'step6_desc': 'Vršimo konačne inspekcije i isporučujemo projekat prema najvišim standardima.',
            
            // Glass System Options
            'transparent_facade_systems': 'Transparentni Sistemi Fasada',
            'spider_glass_facade': 'Spider Staklena Fasada',
            'glass_canopy_systems': 'Sistemi Staklenih Nadstrešnica',
            'thermal_insulated_glass_applications': 'Termički Izolovane Staklene Aplikacije',
            'glass_guillotine_systems': 'Sistemi Staklenih Gilotina',
            'sliding_glass_doors': 'Klizne Staklene Kapije',
            'folding_glass_doors': 'Sklopive Staklene Kapije',
            'automatic_glass_doors': 'Automatske Staklene Kapije',
            'stair_glass_railing': 'Stepenište Staklene Ograde',
            'plexiglass_vertical_railing': 'Vertikalne Plexiglas Ograde',
            'balcony_glass_railing': 'Balkon Staklene Ograde',
            'terrace_glass_railing': 'Terasa Staklene Ograde',
            'transparent_elevator': 'Transparentni Lift',
            'glass_elevator_enclosure': 'Staklena Lift Kabina',
            'panoramic_elevator': 'Panoramski Lift',
            'glass_elevator_doors': 'Staklene Lift Kapije',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Sistemi Staklenih Fasada',
            'transparent_facade_systems_section': 'Transparentni Sistemi Fasada',
            'spider_glass_facade_section': 'Spider Staklena Fasada',
            'glass_canopy_systems_section': 'Sistemi Staklenih Nadstrešnica',
            'thermal_insulated_glass_applications_section': 'Termički Izolovane Staklene Aplikacije',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Transparentni Sistemi Fasada',
            'spider_glass_facade_section_title': 'Spider Staklena Fasada',
            'glass_canopy_systems_section_title': 'Sistemi Staklenih Nadstrešnica',
            'thermal_insulated_glass_applications_section_title': 'Termički Izolovane Staklene Aplikacije',
            
            // Footer
            'footer_quick_links': 'Brzi Linkovi',
            'footer_services_title': 'Naše Usluge',
            'footer_about': 'Aluminijum - Kvalitetna aluminijumska rešenja',
            'footer_copyright': '© 2024 Zade. Sva prava zadržana.'
        },
        'se': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Hem',
            'nav_services': 'Tjänster',
            'nav_about': 'Om Oss',
            'nav_projects': 'Våra Projekt',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Glas System',
            'hero_description': 'Transparenta och hållbara aluminiumglaslösningar för modern arkitektur. Vi erbjuder innovativa lösningar som transformerar dina livsrum.',
            'btn_discover': 'Upptäck Våra Tjänster',
            'btn_about': 'Om Oss',
            
            // Services Section
            'services_title': 'Våra Tjänster',
            'services_subtitle': 'Zade Aluminium och Glas Design erbjuder långvariga lösningar med värme, elegans och estetik för utrymmen där konst möter funktionalitet.',
            'glass_projects': 'Glas Projekt',
            'glass_projects_desc': 'Transparenta och eleganta glaslösningar för modern arkitektur',
            'aluminum_projects': 'Aluminium Projekt',
            'aluminum_projects_desc': 'Hållbara och estetiska aluminiumdesignlösningar',
            'btn_details': 'Se Detaljer',
            
            // About Section
            'about_title': 'Om Oss',
            'about_subtitle': 'Ledande företag som förenar estetik med hållbarhet i glas och aluminium.',
            'mission_title': 'Vårt Uppdrag',
            'mission_text1': 'Som Zade Aluminium Design är vi ett ledande företag som erbjuder estetiska, hållbara och innovativa lösningar inom aluminium- och glasapplikationer.',
            'mission_text2': 'Vårt expertteam producerar funktionella och eleganta designer anpassade efter våra kunders behov med hjälp av de senaste teknologierna i branschen.',
            'mission_text3': 'För att förvandla dina drömmar om livsrum till verklighet gör vi skillnad genom att kombinera glasets elegans med aluminiums styrka.',
            
            // Features
            'feature1_title': 'Banbrytande Designer',
            'feature1_desc': 'Vi erbjuder kreativa lösningar som pressar gränserna för modern arkitektur.',
            'feature2_title': 'Erfarenhet och Expertis',
            'feature2_desc': 'Vårt expertpersonal livar upp dina projekt på bästa möjliga sätt.',
            'feature3_title': 'Långvariga Lösningar',
            'feature3_desc': 'Vi skapar värde med hållbara, långvariga och eleganta designer.',
            'feature4_title': 'Pålitlig Kvalitet',
            'feature4_desc': 'Vi levererar långvariga resultat med våra högkvalitativa material.',
            
            // Contact Section
            'contact_title': 'Kontakta Oss',
            'contact_subtitle': 'Du kan kontakta oss för utrymmen med designer som förenar estetik och teknologi.',
            'contact_email': 'E-post',
            'contact_phone': 'Företagets Kontakter',
            'contact_address': 'Adress',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Ditt Namn',
            'form_email': 'E-post',
            'form_subject': 'Ämne',
            'form_message': 'Ditt Meddelande',
            'btn_send': 'Skicka Meddelande',
            
            // Footer
            'footer_about': 'Ledande företag som förenar estetik med hållbarhet i glas och aluminium.',
            'footer_services': 'Våra Tjänster',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Aluminium. Alla rättigheter förbehållna.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Våra Glasstjänster',
            'cam_services_subtitle': 'Vi erbjuder omfattande lösningar för alla typer av glasprojekt',
            'cam_facade_systems': 'Glasfasadssystem',
            'cam_facade_desc': 'Transparenta och hållbara glasfasadlösningar för moderna byggnader. Vi erbjuder energieffektivitet och estetisk design tillsammans.',
            'cam_door_systems': 'Glasdörrssystem',
            'cam_door_desc': 'Eleganta glasdörrlösningar med aluminiumramar. Specialdesigner för bostads- och kommersiella projekt.',
            'cam_railing_systems': 'Glasräckessystem',
            'cam_railing_desc': 'Glasräckeslösningar som kombinerar säkerhet och estetik. Specialdesigner för trapp- och balkongapplikationer.',
            'cam_elevator_systems': 'Glasliftsystem',
            'cam_elevator_desc': 'Transparenta liftkabiner och glasliftsystem. Vi lägger till visuell rikedom till moderna byggnader.',
            'cam_features_title': 'Egenskaper hos Våra Glasprojekt',
            'cam_features_subtitle': 'Varför bör du välja Zade Aluminium?',
            'cam_transparency_title': 'Transparens och Ljus',
            'cam_transparency_desc': 'Vi skapar bekväma och ljusa miljöer genom att föra naturligt ljus till maximal nivå i innanmiljöer.',
            'cam_energy_title': 'Energieffektivitet',
            'cam_energy_desc': 'Vi erbjuder miljövänliga lösningar genom att spara energi med värmesisolerade glassystem.',
            'cam_aesthetic_title': 'Estetisk Design',
            'cam_aesthetic_desc': 'Vi förskönar dina utrymmen med stilrena och eleganta glasdesigner som följer moderna arkitektoniska trender.',
            'cam_security_title': 'Säkerhet och Hållbarhet',
            'cam_security_desc': 'Säkra lösningar med högkvalitativa glasmaterial och applikationer som följer säkerhetsstandarder.',
            'cam_cta_title': 'Kontakta Oss för Dina Glasprojekt',
            'cam_cta_desc': 'Konsultera vårt expertteam för att förvandla ditt drömglasprojekt till verklighet. Vi erbjuder skräddarsydda lösningar för dig.',
            'btn_get_quote': 'Begär Offer',
            
            // Projects Section
            'projects_title': 'Våra Projekt',
            'projects_subtitle': 'Exempel på projekt som vi framgångsrikt har slutfört',
            'projects_description': 'Med över 12 års erfarenhet som ledande tillverkare av aluminium- och glassystem i Turkiet har vi framgångsrikt slutfört över 2.645 projekt.',
            'project_stats_title': 'Vår Projektstatistik',
            'project_stats_subtitle': 'Numeriska indikatorer för vår framgång',
            'stats_completed_projects': '2.645+ Slutförda Projekt',
            'stats_years_experience': '12+ Års Erfarenhet',
            'stats_application_area': '550.000+ m² Applikation',
            'stats_professional_team': '30+ Professionellt Team',
            'view_all_projects': 'Se Alla Projekt',
            'project_year': 'År',
            'project_location': 'Plats',
            'project_area': 'Yta',
            
            // Work Process Section
            'work_process_title': 'Vår Arbetsprocess',
            'work_process_subtitle': 'Professionella steg som vi följer för att ge liv åt dina projekt',
            'step1_title': 'Första Mötet',
            'step1_desc': 'Vi håller detaljerade möten för att förstå kundbehov och fastställa projektets omfattning.',
            'step2_title': 'Design och Planering',
            'step2_desc': 'Vi skapar detaljerade designer och planerar varje steg i projektet med precision.',
            'step3_title': 'Offert och Avtal',
            'step3_desc': 'Vi förbereder detaljerade offerter och träffar tydliga avtal med våra kunder.',
            'step4_title': 'Produktion',
            'step4_desc': 'Vi producerar högkvalitativa system med förstklassiga material.',
            'step5_title': 'Installation',
            'step5_desc': 'Vårt erfarna team installerar systemen med precision och professionalitet.',
            'step6_title': 'Inspektion och Leverans',
            'step6_desc': 'Vi utför slutinspektioner och levererar projektet enligt de högsta standarderna.',
            
            // Glass System Options
            'transparent_facade_systems': 'Transparenta Fasadssystem',
            'spider_glass_facade': 'Spider Glasfasad',
            'glass_canopy_systems': 'Glasmarkissystem',
            'thermal_insulated_glass_applications': 'Värmesisolerade Glasapplikationer',
            'glass_guillotine_systems': 'Glasguillotinsystem',
            'sliding_glass_doors': 'Glidande Glasdörrar',
            'folding_glass_doors': 'Vikbara Glasdörrar',
            'automatic_glass_doors': 'Automatiska Glasdörrar',
            'stair_glass_railing': 'Trappglasräcke',
            'plexiglass_vertical_railing': 'Vertikalt Plexiglasräcke',
            'balcony_glass_railing': 'Balkongglasräcke',
            'terrace_glass_railing': 'Terrassglasräcke',
            'transparent_elevator': 'Transparent Hiss',
            'glass_elevator_enclosure': 'Glasliftskåp',
            'panoramic_elevator': 'Panoramisk Hiss',
            'glass_elevator_doors': 'Glasliftsdörrar',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Glasfasadssystem',
            'transparent_facade_systems_section': 'Transparenta Fasadssystem',
            'spider_glass_facade_section': 'Spider Glasfasad',
            'glass_canopy_systems_section': 'Glasmarkissystem',
            'thermal_insulated_glass_applications_section': 'Värmesisolerade Glasapplikationer',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Transparenta Fasadssystem',
            'spider_glass_facade_section_title': 'Spider Glasfasad',
            'glass_canopy_systems_section_title': 'Glasmarkissystem',
            'thermal_insulated_glass_applications_section_title': 'Värmesisolerade Glasapplikationer',
            
            // Footer
            'footer_quick_links': 'Snabblänkar',
            'footer_services_title': 'Våra Tjänster',
            'footer_about': 'Aluminium - Kvalitativa aluminiumlösningar',
            'footer_copyright': '© 2024 Zade. Alla rättigheter förbehållna.'
        },
        'ch': {
            // Page Title
            'page_title': 'Zade Aluminium',
            
            // Navigation
            'nav_home': 'Startseite',
            'nav_services': 'Dienstleistungen',
            'nav_about': 'Über Uns',
            'nav_contact': 'Kontakt',
            
            // Hero Section
            'hero_title': 'Zade Aluminium Glas Systeme',
            'hero_description': 'Transparente und langlebige Aluminium-Glas-Lösungen für moderne Architektur. Wir bieten innovative Lösungen, die Ihre Lebensräume transformieren.',
            'btn_discover': 'Entdecken Sie Unsere Dienstleistungen',
            'btn_about': 'Über Uns',
            
            // Services Section
            'services_title': 'Unsere Dienstleistungen',
            'services_subtitle': 'Zade Aluminium und Glas Design bietet langlebige Lösungen mit Wärme, Eleganz und Ästhetik für Räume, in denen Kunst auf Funktionalität trifft.',
            'glass_projects': 'Glas Projekte',
            'glass_projects_desc': 'Transparente und elegante Glaslösungen für moderne Architektur',
            'aluminum_projects': 'Aluminium Projekte',
            'aluminum_projects_desc': 'Langlebige und ästhetische Aluminium-Designlösungen',
            'btn_details': 'Details Anzeigen',
            
            // About Section
            'about_title': 'Über Uns',
            'about_subtitle': 'Führendes Unternehmen, das Ästhetik mit Langlebigkeit in Glas und Aluminium vereint.',
            'mission_title': 'Unsere Mission',
            'mission_text1': 'Als Zade Aluminium Design sind wir ein führendes Unternehmen, das ästhetische, langlebige und innovative Lösungen in Aluminium- und Glasanwendungen anbietet.',
            'mission_text2': 'Unser Expertenteam erstellt funktionale und elegante Designs, die auf die Bedürfnisse unserer Kunden zugeschnitten sind und die neuesten Technologien der Branche nutzen.',
            'mission_text3': 'Um Ihre Traumlebensräume in die Realität umzuwandeln, machen wir den Unterschied, indem wir die Eleganz des Glases mit der Kraft des Aluminiums kombinieren.',
            
            // Features
            'feature1_title': 'Pionier-Designs',
            'feature1_desc': 'Wir bieten kreative Lösungen, die die Grenzen der modernen Architektur erweitern.',
            'feature2_title': 'Erfahrung und Expertise',
            'feature2_desc': 'Unser Expertenteam belebt Ihre Projekte auf bestmögliche Weise.',
            'feature3_title': 'Langlebige Lösungen',
            'feature3_desc': 'Wir schaffen Wert mit langlebigen, dauerhaften und eleganten Designs.',
            'feature4_title': 'Zuverlässige Qualität',
            'feature4_desc': 'Wir liefern langlebige Ergebnisse mit unseren hochwertigen Materialien.',
            
            // Contact Section
            'contact_title': 'Kontaktieren Sie Uns',
            'contact_subtitle': 'Sie können uns für Räume mit Designs kontaktieren, die Ästhetik und Technologie vereinen.',
            'contact_email': 'E-Mail',
            'contact_phone': 'Unternehmenskontakte',
            'contact_address': 'Adresse',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Ihr Name',
            'form_email': 'E-Mail',
            'form_subject': 'Betreff',
            'form_message': 'Ihre Nachricht',
            'btn_send': 'Nachricht Senden',
            
            // Footer
            'footer_about': 'Führendes Unternehmen, das Ästhetik mit Langlebigkeit in Glas und Aluminium vereint.',
            'footer_services': 'Unsere Dienstleistungen',
            'footer_contact': 'Kontakt',
            'footer_copyright': '© 2024 Zade Aluminium. Alle Rechte vorbehalten.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Unsere Glasservices',
            'cam_services_subtitle': 'Wir bieten umfassende Lösungen für alle Arten von Glasprojekten',
            'cam_facade_systems': 'Glasfassaden-Systeme',
            'cam_facade_desc': 'Transparente und langlebige Glasfassaden-Lösungen für moderne Gebäude. Wir bieten Energieeffizienz und ästhetisches Design zusammen.',
            'cam_door_systems': 'Glastür-Systeme',
            'cam_door_desc': 'Elegante Glastür-Lösungen mit Aluminiumrahmen. Spezielle Designs für Wohn- und Gewerbeprojekte.',
            'cam_railing_systems': 'Glasgeländer-Systeme',
            'cam_railing_desc': 'Glasgeländer-Lösungen, die Sicherheit und Ästhetik verbinden. Spezielle Designs für Treppen- und Balkonanwendungen.',
            'cam_elevator_systems': 'Glasaufzug-Systeme',
            'cam_elevator_desc': 'Transparente Aufzugskabinen und Glasaufzug-Systeme. Wir fügen modernen Gebäuden visuelle Reichhaltigkeit hinzu.',
            'cam_features_title': 'Eigenschaften unserer Glasprojekte',
            'cam_features_subtitle': 'Warum sollten Sie Zade Aluminium wählen?',
            'cam_transparency_title': 'Transparenz und Licht',
            'cam_transparency_desc': 'Wir schaffen komfortable und helle Umgebungen, indem wir natürliches Licht maximal in Innenräume bringen.',
            'cam_energy_title': 'Energieeffizienz',
            'cam_energy_desc': 'Wir bieten umweltfreundliche Lösungen durch Energieeinsparung mit wärmeisolierten Glassystemen.',
            'cam_aesthetic_title': 'Ästhetisches Design',
            'cam_aesthetic_desc': 'Wir verschönern Ihre Räume mit stilvollen und eleganten Glasdesigns, die modernen architektonischen Trends entsprechen.',
            'cam_security_title': 'Sicherheit und Langlebigkeit',
            'cam_security_desc': 'Sichere Lösungen mit hochwertigen Glaswerkstoffen und anwendungskonformen Sicherheitsstandards.',
            'cam_cta_title': 'Kontaktieren Sie uns für Ihre Glasprojekte',
            'cam_cta_desc': 'Konsultieren Sie unser Expertenteam, um Ihr Traumglasprojekt Wirklichkeit werden zu lassen. Wir bieten maßgeschneiderte Lösungen für Sie.',
            'btn_get_quote': 'Angebot anfordern',
            
            // Work Process Section
            'work_process_title': 'Unser Arbeitsprozess',
            'work_process_subtitle': 'Professionelle Schritte, die wir befolgen, um Ihre Projekte zum Leben zu erwecken',
            'step1_title': 'Erstes Treffen',
            'step1_desc': 'Wir führen detaillierte Besprechungen durch, um Kundenbedürfnisse zu verstehen und den Projektumfang zu bestimmen.',
            'step2_title': 'Design und Planung',
            'step2_desc': 'Wir erstellen detaillierte Designs und planen jeden Schritt des Projekts mit Präzision.',
            'step3_title': 'Angebot und Vereinbarung',
            'step3_desc': 'Wir bereiten detaillierte Angebote vor und treffen klare Vereinbarungen mit unseren Kunden.',
            'step4_title': 'Produktion',
            'step4_desc': 'Wir produzieren hochwertige Systeme mit erstklassigen Materialien.',
            'step5_title': 'Installation',
            'step5_desc': 'Unser erfahrenes Team installiert die Systeme mit Präzision und Professionalität.',
            'step6_title': 'Inspektion und Lieferung',
            'step6_desc': 'Wir führen Endinspektionen durch und liefern das Projekt nach höchsten Standards.',
            
            // Projects Section
            'projects_title': 'Unsere Projekte',
            'projects_subtitle': 'Beispiele für Projekte, die wir erfolgreich abgeschlossen haben',
            'projects_description': 'Mit über 12 Jahren Erfahrung als führender Hersteller von Aluminium- und Glassystemen in der Türkei haben wir erfolgreich über 2.645 Projekte abgeschlossen.',
            'project_stats_title': 'Unsere Projektstatistiken',
            'project_stats_subtitle': 'Numerische Indikatoren unseres Erfolgs',
            'stats_completed_projects': '2.645+ Abgeschlossene Projekte',
            'stats_years_experience': '12+ Jahre Erfahrung',
            'stats_application_area': '550.000+ m² Anwendung',
            'stats_professional_team': '30+ Professionelles Team',
            'view_all_projects': 'Alle Projekte anzeigen',
            'project_year': 'Jahr',
            'project_location': 'Standort',
            'project_area': 'Fläche',
            
            // Work Process Section
            'work_process_title': 'Unser Arbeitsprozess',
            'work_process_subtitle': 'Professionelle Schritte, die wir befolgen, um Ihre Projekte zum Leben zu erwecken',
            'step1_title': 'Erstes Treffen',
            'step1_desc': 'Wir führen detaillierte Besprechungen durch, um Kundenbedürfnisse zu verstehen und den Projektumfang zu bestimmen.',
            'step2_title': 'Design und Planung',
            'step2_desc': 'Wir erstellen detaillierte Designs und planen jeden Schritt des Projekts mit Präzision.',
            'step3_title': 'Angebot und Vereinbarung',
            'step3_desc': 'Wir bereiten detaillierte Angebote vor und treffen klare Vereinbarungen mit unseren Kunden.',
            'step4_title': 'Produktion',
            'step4_desc': 'Wir produzieren hochwertige Systeme mit erstklassigen Materialien.',
            'step5_title': 'Installation',
            'step5_desc': 'Unser erfahrenes Team installiert die Systeme mit Präzision und Professionalität.',
            'step6_title': 'Inspektion und Lieferung',
            'step6_desc': 'Wir führen Endinspektionen durch und liefern das Projekt nach höchsten Standards.',
            
            // Glass System Options
            'transparent_facade_systems': 'Transparente Fassadensysteme',
            'spider_glass_facade': 'Spider Glasfassade',
            'glass_canopy_systems': 'Glasdachsysteme',
            'thermal_insulated_glass_applications': 'Wärmeisolierte Glasapplikationen',
            'glass_guillotine_systems': 'Glasguillotine-Systeme',
            'sliding_glass_doors': 'Schiebeglas-Türen',
            'folding_glass_doors': 'Faltglas-Türen',
            'automatic_glass_doors': 'Automatische Glas-Türen',
            'stair_glass_railing': 'Treppenglas-Geländer',
            'plexiglass_vertical_railing': 'Vertikales Plexiglas-Geländer',
            'balcony_glass_railing': 'Balkonglas-Geländer',
            'terrace_glass_railing': 'Terrassenglas-Geländer',
            'transparent_elevator': 'Transparenter Aufzug',
            'glass_elevator_enclosure': 'Glasaufzug-Kabine',
            'panoramic_elevator': 'Panorama-Aufzug',
            'glass_elevator_doors': 'Glasaufzug-Türen',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Glasfassadensysteme',
            'transparent_facade_systems_section': 'Transparente Fassadensysteme',
            'spider_glass_facade_section': 'Spider Glasfassade',
            'glass_canopy_systems_section': 'Glasdachsysteme',
            'thermal_insulated_glass_applications_section': 'Wärmeisolierte Glasapplikationen',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Transparente Fassadensysteme',
            'spider_glass_facade_section_title': 'Spider Glasfassade',
            'glass_canopy_systems_section_title': 'Glasdachsysteme',
            'thermal_insulated_glass_applications_section_title': 'Wärmeisolierte Glasapplikationen',
            
            // Footer
            'footer_quick_links': 'Schnelllinks',
            'footer_services_title': 'Unsere Dienstleistungen',
            'footer_about': 'Aluminium - Qualitativ hochwertige Aluminiumlösungen',
            'footer_copyright': '© 2024 Zade. Alle Rechte vorbehalten.'
        },
        'ua': {
            // Page Title
            'page_title': 'Zade Алюмінієві',
            
            // Navigation
            'nav_home': 'Головна',
            'nav_services': 'Послуги',
            'nav_about': 'Про Нас',
            'nav_projects': 'Наші Проекти',
            'nav_contact': 'Контакти',
            
            // Hero Section
            'hero_title': 'Zade Алюмінієві Скляні Системи',
            'hero_description': 'Прозорі та довговічні алюмінієві скляні рішення для сучасної архітектури. Ми пропонуємо інноваційні рішення, які трансформують ваші житлові простори.',
            'btn_discover': 'Відкрийте Наші Послуги',
            'btn_about': 'Про Нас',
            
            // Services Section
            'services_title': 'Наші Послуги',
            'services_subtitle': 'Zade Алюміній та Скляний Дизайн пропонує довгострокові рішення з теплом, елегантністю та естетикою для просторів, де мистецтво зустрічається з функціональністю.',
            'glass_projects': 'Скляні Проекти',
            'glass_projects_desc': 'Прозорі та елегантні скляні рішення для сучасної архітектури',
            'aluminum_projects': 'Алюмінієві Проекти',
            'aluminum_projects_desc': 'Довговічні та естетичні алюмінієві дизайнерські рішення',
            'btn_details': 'Подивитися Деталі',
            
            // About Section
            'about_title': 'Про Нас',
            'about_subtitle': 'Провідна компанія, яка поєднує естетику з довговічністю у склі та алюмінії.',
            'mission_title': 'Наша Місія',
            'mission_text1': 'Як Zade Алюміній Дизайн, ми є провідною компанією, яка пропонує естетичні, довговічні та інноваційні рішення в алюмінієвих та скляних додатках.',
            'mission_text2': 'Наша команда експертів створює функціональні та елегантні дизайни, адаптовані до потреб наших клієнтів, використовуючи найновіші технології в галузі.',
            'mission_text3': 'Щоб перетворити ваші житлові простори з мрії в реальність, ми робимо різницю, поєднуючи елегантність скла з силою алюмінію.',
            
            // Features
            'feature1_title': 'Піонерські Дизайни',
            'feature1_desc': 'Ми пропонуємо креативні рішення, які розширюють межі сучасної архітектури.',
            'feature2_title': 'Досвід та Експертиза',
            'feature2_desc': 'Наш експертний персонал оживляє ваші проекти найкращим можливим способом.',
            'feature3_title': 'Довгострокові Рішення',
            'feature3_desc': 'Ми створюємо цінність з довговічними, тривалими та елегантними дизайнами.',
            'feature4_title': 'Надійна Якість',
            'feature4_desc': 'Ми забезпечуємо довгострокові результати з нашими високоякісними матеріалами.',
            
            // Contact Section
            'contact_title': 'Зв\'яжіться З Нами',
            'contact_subtitle': 'Ви можете зв\'язатися з нами для просторів з дизайнами, які поєднують естетику та технологію.',
            'contact_email': 'Електронна Пошта',
            'contact_phone': 'Контакти Компанії',
            'contact_address': 'Адреса',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Ваше Ім\'я',
            'form_email': 'Електронна Пошта',
            'form_subject': 'Тема',
            'form_message': 'Ваше Повідомлення',
            'btn_send': 'Надіслати Повідомлення',
            
            // Footer
            'footer_about': 'Провідна компанія, яка поєднує естетику з довговічністю у склі та алюмінії.',
            'footer_services': 'Наші Послуги',
            'footer_contact': 'Контакти',
            'footer_copyright': '© 2024 Zade Алюміній. Всі права захищені.',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Наші Скляні Послуги',
            'cam_services_subtitle': 'Ми пропонуємо комплексні рішення для всіх типів скляних проектів',
            'cam_facade_systems': 'Системи Скляних Фасадів',
            'cam_facade_desc': 'Прозорі та довговічні рішення скляних фасадів для сучасних будівель. Ми пропонуємо енергоефективність та естетичний дизайн разом.',
            'cam_door_systems': 'Системи Скляних Дверей',
            'cam_door_desc': 'Елегантні рішення скляних дверей з алюмінієвими рамами. Спеціальні дизайни для житлових та комерційних проектів.',
            'cam_railing_systems': 'Системи Скляних Перил',
            'cam_railing_desc': 'Рішення скляних перил, які поєднують безпеку та естетику. Спеціальні дизайни для сходових та балконних застосувань.',
            'cam_elevator_systems': 'Системи Скляних Ліфтів',
            'cam_elevator_desc': 'Прозорі кабіни ліфтів та системи скляних ліфтів. Ми додаємо візуальне багатство до сучасних будівель.',
            'cam_features_title': 'Характеристики Наших Скляних Проектів',
            'cam_features_subtitle': 'Чому ви повинні обрати Zade Алюміній?',
            'cam_transparency_title': 'Прозорість та Світло',
            'cam_transparency_desc': 'Ми створюємо комфортні та світлі середовища, приносячи природне світло на максимальний рівень у внутрішні простори.',
            'cam_energy_title': 'Енергоефективність',
            'cam_energy_desc': 'Ми пропонуємо екологічно дружні рішення, економлячи енергію з теплоізованими скляними системами.',
            'cam_aesthetic_title': 'Естетичний Дизайн',
            'cam_aesthetic_desc': 'Ми прикрашаємо ваші простори стильними та елегантними скляними дизайнами, які відповідають сучасним архітектурним трендам.',
            'cam_security_title': 'Безпека та Довговічність',
            'cam_security_desc': 'Безпечні рішення з високоякісними скляними матеріалами та застосуваннями, що відповідають стандартам безпеки.',
            'cam_cta_title': 'Зв\'яжіться з Нами для Ваших Скляних Проектів',
            'cam_cta_desc': 'Консультуйтеся з нашою командою експертів, щоб перетворити ваш мрійний скляний проект на реальність. Ми пропонуємо персоналізовані рішення для вас.',
            'btn_get_quote': 'Отримати Пропозицію',
            
            // Projects Section
            'projects_title': 'Наші Проекти',
            'projects_subtitle': 'Приклади проектів, які ми успішно завершили',
            'projects_description': 'З більш ніж 12-річним досвідом як провідний виробник алюмінієвих та скляних систем у Туреччині, ми успішно завершили більш ніж 2.645 проектів.',
            'project_stats_title': 'Наша Статистика Проектів',
            'project_stats_subtitle': 'Числові показники нашого успіху',
            'stats_completed_projects': '2.645+ Завершених Проектів',
            'stats_years_experience': '12+ Років Досвіду',
            'stats_application_area': '550.000+ м² Застосування',
            'stats_professional_team': '30+ Професійна Команда',
            'view_all_projects': 'Подивитися Всі Проекти',
            'project_year': 'Рік',
            'project_location': 'Місце',
            'project_area': 'Площа',
            
            // Work Process Section
            'work_process_title': 'Наш Робочий Процес',
            'work_process_subtitle': 'Професійні кроки, які ми слідуємо, щоб оживити ваші проекти',
            'step1_title': 'Перша Зустріч',
            'step1_desc': 'Ми організовуємо детальні зустрічі, щоб зрозуміти потреби клієнта та визначити обсяг проекту.',
            'step2_title': 'Дизайн та Планування',
            'step2_desc': 'Ми створюємо детальні дизайни та плануємо кожен крок проекту з точністю.',
            'step3_title': 'Пропозиція та Угода',
            'step3_desc': 'Ми готуємо детальні пропозиції та встановлюємо чіткі угоди з нашими клієнтами.',
            'step4_title': 'Виробництво',
            'step4_desc': 'Ми виробляємо високоякісні системи, використовуючи матеріали першого класу.',
            'step5_title': 'Монтаж',
            'step5_desc': 'Наша досвідчена команда монтує системи з точністю та професіоналізмом.',
            'step6_title': 'Перевірка та Поставка',
            'step6_desc': 'Ми проводимо фінальні перевірки та поставляємо проект за найвищими стандартами.',
            
            // Glass System Options
            'transparent_facade_systems': 'Прозорі Системи Фасадів',
            'spider_glass_facade': 'Spider Скляний Фасад',
            'glass_canopy_systems': 'Системи Скляних Навісів',
            'thermal_insulated_glass_applications': 'Теплоізовані Скляні Застосування',
            'glass_guillotine_systems': 'Системи Скляних Гільйотин',
            'sliding_glass_doors': 'Розсувні Скляні Двері',
            'folding_glass_doors': 'Складні Скляні Двері',
            'automatic_glass_doors': 'Автоматичні Скляні Двері',
            'stair_glass_railing': 'Сходові Скляні Перила',
            'plexiglass_vertical_railing': 'Вертикальні Plexiglas Перила',
            'balcony_glass_railing': 'Балконні Скляні Перила',
            'terrace_glass_railing': 'Терасні Скляні Перила',
            'transparent_elevator': 'Прозорий Ліфт',
            'glass_elevator_enclosure': 'Скляна Кабіна Ліфта',
            'panoramic_elevator': 'Панорамний Ліфт',
            'glass_elevator_doors': 'Скляні Двері Ліфта',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Системи Скляних Фасадів',
            'transparent_facade_systems_section': 'Прозорі Системи Фасадів',
            'spider_glass_facade_section': 'Spider Скляний Фасад',
            'glass_canopy_systems_section': 'Системи Скляних Навісів',
            'thermal_insulated_glass_applications_section': 'Теплоізовані Скляні Застосування',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Прозорі Системи Фасадів',
            'spider_glass_facade_section_title': 'Spider Скляний Фасад',
            'glass_canopy_systems_section_title': 'Системи Скляних Навісів',
            'thermal_insulated_glass_applications_section_title': 'Теплоізовані Скляні Застосування'
        },
        'cn': {
            // Page Title
            'page_title': 'Zade 铝制',
            
            // Navigation
            'nav_home': '首页',
            'nav_services': '服务',
            'nav_about': '关于我们',
            'nav_projects': '我们的项目',
            'nav_contact': '联系我们',
            
            // Hero Section
            'hero_title': 'Zade 铝制玻璃系统',
            'hero_description': '为现代建筑提供透明耐用的铝制玻璃解决方案。我们提供创新的解决方案来改造您的生活空间。',
            'btn_discover': '探索我们的服务',
            'btn_about': '关于我们',
            
            // Services Section
            'services_title': '我们的服务',
            'services_subtitle': 'Zade 铝制和玻璃设计为艺术与功能相遇的空间提供具有温暖、优雅和美感的长期解决方案。',
            'glass_projects': '玻璃项目',
            'glass_projects_desc': '为现代建筑提供透明优雅的玻璃解决方案',
            'aluminum_projects': '铝制项目',
            'aluminum_projects_desc': '耐用美观的铝制设计解决方案',
            'btn_details': '查看详情',
            
            // About Section
            'about_title': '关于我们',
            'about_subtitle': '在玻璃和铝制领域将美学与耐用性相结合的领导企业。',
            'mission_title': '我们的使命',
            'mission_text1': '作为 Zade 铝制设计，我们是提供铝制和玻璃应用美学、耐用和创新解决方案的领导企业。',
            'mission_text2': '我们的专家团队使用行业最新技术，为客户需求定制功能性和优雅的设计。',
            'mission_text3': '为了将您梦想中的生活空间变为现实，我们通过结合玻璃的优雅与铝制的力量来创造差异。',
            
            // Features
            'feature1_title': '开创性设计',
            'feature1_desc': '我们提供推动现代建筑边界的创意解决方案。',
            'feature2_title': '经验和专业知识',
            'feature2_desc': '我们的专家团队以最佳方式为您的项目注入活力。',
            'feature3_title': '持久解决方案',
            'feature3_desc': '我们通过耐用、持久和优雅的设计创造价值。',
            'feature4_title': '可靠质量',
            'feature4_desc': '我们使用高质量材料提供持久成果。',
            
            // Contact Section
            'contact_title': '联系我们',
            'contact_subtitle': '您可以联系我们获取结合美学和技术的空间设计。',
            'contact_email': '电子邮件',
            'contact_phone': '公司联系方式',
            'contact_address': '地址',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': '您的姓名',
            'form_email': '电子邮件',
            'form_subject': '主题',
            'form_message': '您的留言',
            'btn_send': '发送留言',
            
            // Footer
            'footer_about': '在玻璃和铝制领域将美学与耐用性相结合的领导企业。',
            'footer_services': '我们的服务',
            'footer_contact': '联系我们',
            'footer_copyright': '© 2024 Zade 铝制。保留所有权利。',
            
            // Cam Projeler Page Specific
            'cam_services_title': '我们的玻璃服务',
            'cam_services_subtitle': '我们为所有类型的玻璃项目提供全面的解决方案',
            'cam_facade_systems': '玻璃幕墙系统',
            'cam_facade_desc': '为现代建筑提供透明耐用的玻璃幕墙解决方案。我们同时提供能源效率和美学设计。',
            'cam_door_systems': '玻璃门系统',
            'cam_door_desc': '带铝制框架的优雅玻璃门解决方案。为住宅和商业项目提供特殊设计。',
            'cam_railing_systems': '玻璃栏杆系统',
            'cam_railing_desc': '结合安全性和美学的玻璃栏杆解决方案。为楼梯和阳台应用提供特殊设计。',
            'cam_elevator_systems': '玻璃电梯系统',
            'cam_elevator_desc': '透明电梯轿厢和玻璃电梯系统。我们为现代建筑增添视觉丰富性。',
            'cam_features_title': '我们玻璃项目的特色',
            'cam_features_subtitle': '为什么选择 Zade 铝制？',
            'cam_transparency_title': '透明度和光线',
            'cam_transparency_desc': '我们通过将自然光最大程度地引入室内空间，创造舒适明亮的环境。',
            'cam_energy_title': '能源效率',
            'cam_energy_desc': '我们通过热绝缘玻璃系统节省能源，提供环保解决方案。',
            'cam_aesthetic_title': '美学设计',
            'cam_aesthetic_desc': '我们用符合现代建筑趋势的时尚优雅玻璃设计美化您的空间。',
            'cam_security_title': '安全性和耐用性',
            'cam_security_desc': '采用高质量玻璃材料和符合安全标准的应用的安全解决方案。',
            'cam_cta_title': '联系我们获取您的玻璃项目',
            'cam_cta_desc': '咨询我们的专家团队，将您的梦想玻璃项目变为现实。我们为您提供个性化解决方案。',
            'btn_get_quote': '获取报价',
            
            // Projects Section
            'projects_title': '我们的项目',
            'projects_subtitle': '我们成功完成的项目示例',
            'projects_description': '作为土耳其领先的铝制和玻璃系统制造商，拥有超过12年的经验，我们已成功完成超过2,645个项目。',
            'project_stats_title': '我们的项目统计',
            'project_stats_subtitle': '我们成功的数字指标',
            'stats_completed_projects': '2,645+ 已完成项目',
            'stats_years_experience': '12+ 年经验',
            'stats_application_area': '550,000+ 平方米应用',
            'stats_professional_team': '30+ 专业团队',
            'view_all_projects': '查看所有项目',
            'project_year': '年份',
            'project_location': '位置',
            'project_area': '面积',
            
            // Work Process Section
            'work_process_title': '我们的工作流程',
            'work_process_subtitle': '我们遵循的专业步骤，让您的项目焕发生机',
            'step1_title': '初次会面',
            'step1_desc': '我们进行详细会议，了解客户需求并确定项目范围。',
            'step2_title': '设计和规划',
            'step2_desc': '我们创建详细设计并精确规划项目的每个步骤。',
            'step3_title': '报价和协议',
            'step3_desc': '我们准备详细报价并与客户达成明确协议。',
            'step4_title': '生产',
            'step4_desc': '我们使用一流材料生产高质量系统。',
            'step5_title': '安装',
            'step5_desc': '我们经验丰富的团队精确专业地安装系统。',
            'step6_title': '检查和交付',
            'step6_desc': '我们进行最终检查并按最高标准交付项目。',
            
            // Glass System Options
            'transparent_facade_systems': '透明幕墙系统',
            'spider_glass_facade': '蜘蛛网玻璃幕墙',
            'glass_canopy_systems': '玻璃雨篷系统',
            'thermal_insulated_glass_applications': '隔热玻璃应用',
            'glass_guillotine_systems': '玻璃百叶窗系统',
            'sliding_glass_doors': '推拉玻璃门',
            'folding_glass_doors': '折叠玻璃门',
            'automatic_glass_doors': '自动玻璃门',
            'stair_glass_railing': '楼梯玻璃栏杆',
            'plexiglass_vertical_railing': '有机玻璃垂直栏杆',
            'balcony_glass_railing': '阳台玻璃栏杆',
            'terrace_glass_railing': '露台玻璃栏杆',
            'transparent_elevator': '透明电梯',
            'glass_elevator_enclosure': '玻璃电梯轿厢',
            'panoramic_elevator': '全景电梯',
            'glass_elevator_doors': '玻璃电梯门',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': '玻璃幕墙系统',
            'transparent_facade_systems_section': '透明幕墙系统',
            'spider_glass_facade_section': '蜘蛛网玻璃幕墙',
            'glass_canopy_systems_section': '玻璃雨篷系统',
            'thermal_insulated_glass_applications_section': '隔热玻璃应用',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': '透明幕墙系统',
            'spider_glass_facade_section_title': '蜘蛛网玻璃幕墙',
            'glass_canopy_systems_section_title': '玻璃雨篷系统',
            'thermal_insulated_glass_applications_section_title': '隔热玻璃应用'
        },
        'hu': {
            // Page Title
            'page_title': 'Zade Alumínium',
            
            // Navigation
            'nav_home': 'Főoldal',
            'nav_services': 'Szolgáltatásaink',
            'nav_about': 'Rólunk',
            'nav_projects': 'Projektjeink',
            'nav_contact': 'Kapcsolat',
            
            // Hero Section
            'hero_title': 'Zade Alumínium Üvegezési Rendszerek',
            'hero_description': 'Átlátszó és tartós alumínium üvegezési megoldások modern építészethez. Innovatív megoldásokat kínálunk, amelyek átalakítják élettereit.',
            'btn_discover': 'Fedezze Fel Szolgáltatásainkat',
            'btn_about': 'Rólunk',
            
            // Services Section
            'services_title': 'Szolgáltatásaink',
            'services_subtitle': 'A Zade Alumínium és Üveg Design hosszú életű megoldásokat kínál melegséggel, eleganciával és esztétikával olyan terekhez, ahol a művészet találkozik a funkcionalitással.',
            'glass_projects': 'Üveg Projektek',
            'glass_projects_desc': 'Átlátszó és elegáns üveg megoldások modern építészethez',
            'aluminum_projects': 'Alumínium Projektek',
            'aluminum_projects_desc': 'Tartós és esztétikus alumínium tervezési megoldások',
            'btn_details': 'Részletek Megtekintése',
            
            // About Section
            'about_title': 'Rólunk',
            'about_subtitle': 'Vezető cég, amely esztétikát és tartósságot egyesít az üvegben és alumíniumban.',
            'mission_title': 'Küldetésünk',
            'mission_text1': 'Zade Alumínium Designként vezető cég vagyunk, amely esztétikus, tartós és innovatív megoldásokat kínál alumínium és üveg alkalmazásokban.',
            'mission_text2': 'Szakértő csapatunk funkcionális és elegáns terveket készít, amelyek az ügyfeleink igényeihez igazodnak, az iparág legújabb technológiáit használva.',
            'mission_text3': 'Ahhoz, hogy álmai élettereit valósággá alakítsuk, különbséget jelentünk az üveg eleganciájának és az alumínium erejének kombinálásával.',
            
            // Features
            'feature1_title': 'Úttörő Tervek',
            'feature1_desc': 'Kreatív megoldásokat kínálunk, amelyek a modern építészet határait feszegetik.',
            'feature2_title': 'Tapasztalat és Szakértelem',
            'feature2_desc': 'Szakértő személyzetünk a lehető legjobb módon életre kelti projekteit.',
            'feature3_title': 'Tartós Megoldások',
            'feature3_desc': 'Értéket teremtünk tartós, hosszú életű és elegáns tervekkel.',
            'feature4_title': 'Megbízható Minőség',
            'feature4_desc': 'Hosszú életű eredményeket biztosítunk kiváló minőségű anyagainkkal.',
            
            // Contact Section
            'contact_title': 'Lépjen Kapcsolatba Velünk',
            'contact_subtitle': 'Kapcsolatba léphet velünk olyan terekhez, amelyek esztétikát és technológiát egyesítő tervekkel rendelkeznek.',
            'contact_email': 'E-mail',
            'contact_phone': 'Cég Kapcsolatai',
            'contact_address': 'Cím',
            'contact_address_text': 'Mustafa Kemal, 3080. Sk. No:10, 34707 Ataşehir/İstanbul',
            'form_name': 'Az Ön Neve',
            'form_email': 'E-mail',
            'form_subject': 'Tárgy',
            'form_message': 'Az Ön Üzenete',
            'btn_send': 'Üzenet Küldése',
            
            // Footer
            'footer_about': 'Vezető cég, amely esztétikát és tartósságot egyesít az üvegben és alumíniumban.',
            'footer_services': 'Szolgáltatásaink',
            'footer_contact': 'Kapcsolat',
            'footer_copyright': '© 2024 Zade Alumínium. Minden jog fenntartva.',
            
            // Footer Quick Links
            'footer_quick_links': 'Gyors Hivatkozások',
            'footer_services_title': 'Szolgáltatásaink',
            
            // Footer Services List
            'service_transparent_facade': 'Átlátszó Homlokzat',
            'service_glass_curtain': 'Üveg Függöny Rendszerek',
            'service_glass_door': 'Üveg Ajtó',
            'service_plexiglass_railing': 'Plexiglas Korlát',
            'service_glass_canopy': 'Üveg Tető',
            'service_spider_facade': 'Spider Homlokzat',
            'service_transparent_elevator': 'Átlátszó Lift',
            'service_glass_facade': 'Üveg Homlokzat',
            'service_stair_glass_railing': 'Lépcső Üveg Korlát',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'Üveg Szolgáltatásaink',
            'cam_services_subtitle': 'Átfogó megoldásokat kínálunk minden típusú üveg projekthez',
            'cam_facade_systems': 'Üveg Homlokzati Rendszerek',
            'cam_facade_desc': 'Átlátszó és tartós üveg homlokzati megoldások modern épületekhez. Energiahatékonyságot és esztétikus tervezést kínálunk együtt.',
            'cam_door_systems': 'Üveg Ajtó Rendszerek',
            'cam_door_desc': 'Elegáns üveg ajtó megoldások alumínium keretekkel. Speciális tervek lakó- és kereskedelmi projektekhez.',
            'cam_railing_systems': 'Üveg Korlát Rendszerek',
            'cam_railing_desc': 'Üveg korlát megoldások, amelyek biztonságot és esztétikát egyesítenek. Speciális tervek lépcső- és erkély alkalmazásokhoz.',
            'cam_elevator_systems': 'Üveg Lift Rendszerek',
            'cam_elevator_desc': 'Átlátszó lift kabinok és üveg lift rendszerek. Vizuális gazdagságot adunk a modern épületekhez.',
            'cam_features_title': 'Üveg Projektjeink Jellemzői',
            'cam_features_subtitle': 'Miért válassza a Zade Alumíniumot?',
            'cam_transparency_title': 'Átlátszóság és Fény',
            'cam_transparency_desc': 'Kényelmes és világos környezeteket teremtünk, a természetes fényt maximális szintre hozva a belső terekbe.',
            'cam_energy_title': 'Energiahatékonyság',
            'cam_energy_desc': 'Környezetbarát megoldásokat kínálunk energia megtakarítással hőszigetelt üveg rendszerekkel.',
            'cam_aesthetic_title': 'Esztétikus Terv',
            'cam_aesthetic_desc': 'Szépítjük tereit stílusos és elegáns üveg tervekkel, amelyek megfelelnek a modern építészeti trendeknek.',
            'cam_security_title': 'Biztonság és Tartósság',
            'cam_security_desc': 'Biztonságos megoldások kiváló minőségű üveg anyagokkal és alkalmazásokkal, amelyek megfelelnek a biztonsági szabványoknak.',
            'cam_cta_title': 'Lépjen Kapcsolatba Velünk Üveg Projektjeihez',
            'cam_cta_desc': 'Konzultáljon szakértő csapatunkkal, hogy álmai üveg projektjét valósággá alakítsa. Személyre szabott megoldásokat kínálunk Önnek.',
            'btn_get_quote': 'Árajánlat Kérése',
            
            // Projects Section
            'projects_title': 'Projektjeink',
            'projects_subtitle': 'Sikeresen befejezett projektjeink példái',
            'projects_description': 'Több mint 12 év tapasztalattal Törökország vezető alumínium és üveg rendszerek gyártójaként, sikeresen fejeztünk be több mint 2.645 projektet.',
            'project_stats_title': 'Projekt Statisztikáink',
            'project_stats_subtitle': 'Sikerünk numerikus mutatói',
            'stats_completed_projects': '2.645+ Befejezett Projekt',
            'stats_years_experience': '12+ Év Tapasztalat',
            'stats_application_area': '550.000+ m² Alkalmazás',
            'stats_professional_team': '30+ Professzionális Csapat',
            'view_all_projects': 'Összes Projekt Megtekintése',
            'project_year': 'Év',
            'project_location': 'Helyszín',
            'project_area': 'Terület',
            
            // Work Process Section
            'work_process_title': 'Munkafolyamatunk',
            'work_process_subtitle': 'Szakmai lépések, amelyeket követünk, hogy életre keltjük projekteit',
            'step1_title': 'Első Találkozó',
            'step1_desc': 'Részletes megbeszéléseket tartunk, hogy megértsük az ügyfél igényeit és meghatározzuk a projekt hatókörét.',
            'step2_title': 'Tervezés és Megtervezés',
            'step2_desc': 'Részletes terveket készítünk és pontosan tervezzük meg a projekt minden lépését.',
            'step3_title': 'Árajánlat és Megállapodás',
            'step3_desc': 'Részletes árajánlatokat készítünk és egyértelmű megállapodásokat kötünk ügyfeleinkkel.',
            'step4_title': 'Gyártás',
            'step4_desc': 'Első osztályú anyagokkal készítünk kiváló minőségű rendszereket.',
            'step5_title': 'Telepítés',
            'step5_desc': 'Tapasztalt csapatunk pontossággal és szakértelemmel telepíti a rendszereket.',
            'step6_title': 'Ellenőrzés és Szállítás',
            'step6_desc': 'Végső ellenőrzéseket végzünk és a projektet a legmagasabb színvonalon szállítjuk.',
            
            // Glass System Options
            'transparent_facade_systems': 'Átlátszó Homlokzati Rendszerek',
            'spider_glass_facade': 'Spider Üveghomlokzat',
            'glass_canopy_systems': 'Üveg Tetőzet Rendszerek',
            'thermal_insulated_glass_applications': 'Hőszigetelt Üveg Alkalmazások',
            'glass_guillotine_systems': 'Üveg Guillotine Rendszerek',
            'sliding_glass_doors': 'Csúszó Üveg Ajtók',
            'folding_glass_doors': 'Hajtható Üveg Ajtók',
            'automatic_glass_doors': 'Automatikus Üveg Ajtók',
            'stair_glass_railing': 'Lépcső Üveg Korlát',
            'plexiglass_vertical_railing': 'Vertikális Plexiglas Korlát',
            'balcony_glass_railing': 'Erkély Üveg Korlát',
            'terrace_glass_railing': 'Terasz Üveg Korlát',
            'transparent_elevator': 'Átlátszó Lift',
            'glass_elevator_enclosure': 'Üveg Lift Kabin',
            'panoramic_elevator': 'Panoráma Lift',
            'glass_elevator_doors': 'Üveg Lift Ajtók',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'Üveg Homlokzati Rendszerek',
            'transparent_facade_systems_section': 'Átlátszó Homlokzati Rendszerek',
            'spider_glass_facade_section': 'Spider Üveghomlokzat',
            'glass_canopy_systems_section': 'Üveg Tetőzet Rendszerek',
            'thermal_insulated_glass_applications_section': 'Hőszigetelt Üveg Alkalmazások',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'Átlátszó Homlokzati Rendszerek',
            'spider_glass_facade_section_title': 'Spider Üveghomlokzat',
            'glass_canopy_systems_section_title': 'Üveg Tetőzet Rendszerek',
            'thermal_insulated_glass_applications_section_title': 'Hőszigetelt Üveg Alkalmazások'
        },
        
        'ar': {
            // Page Title
            'page_title': 'Zade ألمنيوم',
            
            // Navigation
            'nav_home': 'الصفحة الرئيسية',
            'nav_services': 'خدماتنا',
            'nav_about': 'من نحن',
            'nav_projects': 'مشاريعنا',
            'nav_contact': 'اتصل بنا',
            
            // Hero Section
            'hero_title': 'أنظمة زاد الألمنيوم والزجاج المقطعي',
            'hero_description': 'أنظمة ألمنيوم وزجاج شفافة ومتينة للهندسة المعمارية الحديثة. نقدم حلولاً مبتكرة تحول مساحات معيشتك.',
            'btn_discover': 'اكتشف خدماتنا',
            'btn_about': 'من نحن',
            
            // Services Section
            'services_title': 'خدماتنا',
            'services_subtitle': 'زاد الألمنيوم وتصميم الزجاج، نقدم حلولاً دائمة مع الدفء والأناقة والجمالية للمساحات التي يلتقي فيها الفن بالوظيفة.',
            'glass_projects': 'مشاريع الزجاج',
            'glass_projects_desc': 'حلول زجاجية شفافة وأنيقة للهندسة المعمارية الحديثة',
            'aluminum_projects': 'مشاريع الألمنيوم',
            'aluminum_projects_desc': 'حلول تصميم ألمنيوم متينة وجمالية',
            'btn_details': 'عرض التفاصيل',
            
            // About Section
            'about_title': 'من نحن',
            'about_subtitle': 'شركة رائدة تجمع بين الجمالية والمتانة في الزجاج والألمنيوم.',
            'mission_title': 'مهمتنا',
            'mission_text1': 'كشركة زاد ألمنيوم للتصميم، نحن شركة رائدة تقدم حلولاً جمالية ومتينة ومبتكرة في تطبيقات الألمنيوم والزجاج.',
            'mission_text2': 'فريقنا المتخصص يصمم تصاميم وظيفية وأنيقة تتكيف مع احتياجات عملائنا، مستخدمين أحدث التقنيات في الصناعة.',
            'mission_text3': 'لتحويل مساحات معيشتك الحلم إلى حقيقة، نحدث فرقاً من خلال الجمع بين أناقة الزجاج وقوة الألمنيوم.',
            
            // Features
            'feature1_title': 'تصاميم رائدة',
            'feature1_desc': 'نقدم حلولاً إبداعية تتحدى حدود الهندسة المعمارية الحديثة.',
            'feature2_title': 'الخبرة والاختصاص',
            'feature2_desc': 'موظفونا المتخصصون يجعلون مشاريعك حية بأفضل طريقة ممكنة.',
            'feature3_title': 'حلول دائمة',
            'feature3_desc': 'نخلق قيمة من خلال تصاميم متينة وطويلة الأمد وأنيقة.',
            'feature4_title': 'جودة موثوقة',
            'feature4_desc': 'نضمن نتائج طويلة الأمد بموادنا عالية الجودة.',
            
            // Contact Section
            'contact_title': 'تواصل معنا',
            'contact_subtitle': 'يمكنك التواصل معنا للمساحات التي تمتلك تصاميم تجمع بين الجمالية والتكنولوجيا.',
            'contact_email': 'البريد الإلكتروني',
            'contact_phone': 'اتصالات الشركة',
            'contact_address': 'العنوان',
            'contact_address_text': 'مصطفى كمال، 3080. سك. رقم:10، 34707 أتاشهير/إسطنبول',
            'form_name': 'اسمك',
            'form_email': 'البريد الإلكتروني',
            'form_subject': 'الموضوع',
            'form_message': 'رسالتك',
            'btn_send': 'إرسال الرسالة',
            
            // Footer
            'footer_about': 'شركة رائدة تجمع بين الجمالية والمتانة في الزجاج والألمنيوم.',
            'footer_services': 'خدماتنا',
            'footer_contact': 'اتصل بنا',
            'footer_copyright': '© 2024 زاد الألمنيوم. جميع الحقوق محفوظة.',
            
            // Footer Quick Links
            'footer_quick_links': 'روابط سريعة',
            'footer_services_title': 'خدماتنا',
            
            // Footer Services List
            'service_transparent_facade': 'واجهة شفافة',
            'service_glass_curtain': 'أنظمة ستائر زجاجية',
            'service_glass_door': 'باب زجاجي',
            'service_plexiglass_railing': 'درابزين بلاستيكي',
            'service_glass_canopy': 'مظلة زجاجية',
            'service_spider_facade': 'واجهة عنكبوتية',
            'service_transparent_elevator': 'مصعد شفاف',
            'service_glass_facade': 'واجهة زجاجية',
            'service_stair_glass_railing': 'درابزين درج زجاجي',
            
            // Cam Projeler Page Specific
            'cam_services_title': 'خدمات الزجاج',
            'cam_services_subtitle': 'نقدم حلولاً شاملة لجميع أنواع مشاريع الزجاج',
            'cam_facade_systems': 'أنظمة الواجهات الزجاجية',
            'cam_facade_desc': 'حلول واجهات زجاجية شفافة ومتينة للمباني الحديثة. نقدم كفاءة الطاقة والتصميم الجمالي معاً.',
            'cam_door_systems': 'أنظمة الأبواب الزجاجية',
            'cam_door_desc': 'حلول أبواب زجاجية أنيقة بإطارات ألمنيوم. تصاميم خاصة للمشاريع السكنية والتجارية.',
            'cam_railing_systems': 'أنظمة الدرابزين الزجاجي',
            'cam_railing_desc': 'حلول درابزين زجاجية تجمع بين الأمان والجمالية. تصاميم خاصة لتطبيقات السلالم والشرفات.',
            'cam_elevator_systems': 'أنظمة المصاعد الزجاجية',
            'cam_elevator_desc': 'حاويات مصاعد شفافة وأنظمة مصاعد زجاجية. نضيف ثراء بصري للمباني الحديثة.',
            'cam_features_title': 'مميزات مشاريع الزجاج',
            'cam_features_subtitle': 'لماذا تختار زاد الألمنيوم؟',
            'cam_transparency_title': 'الشفافية والضوء',
            'cam_transparency_desc': 'نخلق بيئات مريحة ومضيئة من خلال جلب الضوء الطبيعي إلى أقصى مستوى في المساحات الداخلية.',
            'cam_energy_title': 'كفاءة الطاقة',
            'cam_energy_desc': 'نقدم حلولاً صديقة للبيئة من خلال توفير الطاقة بأنظمة زجاجية معزولة حرارياً.',
            'cam_aesthetic_title': 'التصميم الجمالي',
            'cam_aesthetic_desc': 'نزين مساحاتك بتصاميم زجاجية أنيقة وعصرية تتوافق مع اتجاهات الهندسة المعمارية الحديثة.',
            'cam_security_title': 'الأمان والمتانة',
            'cam_security_desc': 'حلول آمنة بمواد زجاجية عالية الجودة وتطبيقات تتوافق مع معايير الأمان.',
            'cam_cta_title': 'تواصل معنا لمشاريع الزجاج',
            'cam_cta_desc': 'استشر فريقنا المتخصص لتحويل مشروع الزجاج الحلم إلى حقيقة. نقدم حلولاً مخصصة لك.',
            'btn_get_quote': 'طلب عرض سعر',
            
            // Glass System Options
            'transparent_facade_systems': 'أنظمة الواجهات الشفافة',
            'spider_glass_facade': 'واجهة زجاجية عنكبوتية',
            'glass_canopy_systems': 'أنظمة المظلات الزجاجية',
            'thermal_insulated_glass_applications': 'تطبيقات الزجاج العازل للحرارة',
            'glass_guillotine_systems': 'أنظمة النوافذ الزجاجية المائلة',
            'sliding_glass_doors': 'الأبواب الزجاجية المنزلقة',
            'folding_glass_doors': 'الأبواب الزجاجية القابلة للطي',
            'automatic_glass_doors': 'الأبواب الزجاجية الآلية',
            'stair_glass_railing': 'درابزين الدرج الزجاجي',
            'plexiglass_vertical_railing': 'درابزين عمودي من البلاستيك الشفاف',
            'balcony_glass_railing': 'درابزين الشرفة الزجاجي',
            'terrace_glass_railing': 'درابزين التراس الزجاجي',
            'transparent_elevator': 'المصعد الشفاف',
            'glass_elevator_enclosure': 'حاوية المصعد الزجاجية',
            'panoramic_elevator': 'المصعد البانورامي',
            'glass_elevator_doors': 'أبواب المصعد الزجاجية',
            
            // Glass Facade System Sections
            'glass_facade_systems_title': 'أنظمة الواجهات الزجاجية',
            'transparent_facade_systems_section': 'أنظمة الواجهات الشفافة',
            'spider_glass_facade_section': 'واجهة زجاجية عنكبوتية',
            'glass_canopy_systems_section': 'أنظمة المظلات الزجاجية',
            'thermal_insulated_glass_applications_section': 'تطبيقات الزجاج العازل للحرارة',
            
            // Glass Facade System Specific Sections
            'transparent_facade_systems_section_title': 'أنظمة الواجهات الشفافة',
            'spider_glass_facade_section_title': 'واجهة زجاجية عنكبوتية',
            'glass_canopy_systems_section_title': 'أنظمة المظلات الزجاجية',
            'thermal_insulated_glass_applications_section_title': 'تطبيقات الزجاج العازل للحرارة',
            'cam_door_systems': 'أنظمة الأبواب الزجاجية',
            'cam_door_desc': 'حلول أبواب زجاجية أنيقة بإطارات ألمنيوم. تصاميم خاصة للمشاريع السكنية والتجارية.',
            'cam_railing_systems': 'أنظمة الدرابزين الزجاجية',
            'cam_railing_desc': 'حلول درابزين زجاجية تجمع بين الأمان والجمالية. تصاميم خاصة لتطبيقات السلالم والشرفات.',
            'cam_elevator_systems': 'أنظمة المصاعد الزجاجية',
            'cam_elevator_desc': 'حاويات مصاعد شفافة وأنظمة مصاعد زجاجية. نضيف ثراء بصري للمباني الحديثة.',
            'cam_features_title': 'مميزات مشاريع الزجاج',
            'cam_features_subtitle': 'لماذا تختار زاد الألمنيوم؟',
            'cam_transparency_title': 'الشفافية والضوء',
            'cam_transparency_desc': 'نخلق بيئات مريحة ومضيئة بنقل الضوء الطبيعي إلى الحد الأقصى للمساحات الداخلية.',
            'cam_energy_title': 'كفاءة الطاقة',
            'cam_energy_desc': 'نقدم حلولاً صديقة للبيئة من خلال توفير الطاقة مع أنظمة الزجاج العازلة للحرارة.',
            'cam_aesthetic_title': 'التصميم الجمالي',
            'cam_aesthetic_desc': 'نحسن مساحاتك بتصاميم زجاجية أنيقة وأنيقة تتوافق مع اتجاهات الهندسة المعمارية الحديثة.',
            'cam_security_title': 'الأمان والمتانة',
            'cam_security_desc': 'حلول آمنة مع مواد زجاجية عالية الجودة وتطبيقات متوافقة مع معايير الأمان.',
            'cam_cta_title': 'تواصل معنا لمشاريع الزجاج',
            'cam_cta_desc': 'استشر فريقنا المتخصص لتحويل مشروع الزجاج الحلم إلى حقيقة. نقدم حلولاً مخصصة لك.',
            'btn_get_quote': 'احصل على عرض سعر',
            
            // Projects Section
            'projects_title': 'مشاريعنا',
            'projects_subtitle': 'أمثلة على المشاريع التي أكملناها بنجاح',
            'projects_description': 'مع أكثر من 12 عاماً من الخبرة كشركة رائدة في تصنيع أنظمة الألمنيوم والزجاج في تركيا، أكملنا بنجاح أكثر من 2,645 مشروع.',
            'project_stats_title': 'إحصائيات مشاريعنا',
            'project_stats_subtitle': 'المؤشرات الرقمية لنجاحنا',
            'stats_completed_projects': '2,645+ مشروع مكتمل',
            'stats_years_experience': '12+ عام خبرة',
            'stats_application_area': '550,000+ متر مربع تطبيق',
            'stats_professional_team': '30+ فريق متخصص',
            'view_all_projects': 'عرض جميع المشاريع',
            'project_year': 'السنة',
            'project_location': 'الموقع',
            'project_area': 'المساحة',
            
            // Work Process Section
            'work_process_title': 'عملية عملنا',
            'work_process_subtitle': 'الخطوات المهنية التي نتبعها لإحياء مشاريعكم',
            'step1_title': 'الاجتماع الأول',
            'step1_desc': 'نعقد اجتماعات مفصلة لفهم احتياجات العميل وتحديد نطاق المشروع.',
            'step2_title': 'التصميم والتخطيط',
            'step2_desc': 'ننشئ تصاميم مفصلة ونخطط كل خطوة من المشروع بدقة.',
            'step3_title': 'العرض والاتفاق',
            'step3_desc': 'نعد عروض أسعار مفصلة ونبرم اتفاقات واضحة مع عملائنا.',
            'step4_title': 'الإنتاج',
            'step4_desc': 'ننتج أنظمة عالية الجودة باستخدام مواد من الدرجة الأولى.',
            'step5_title': 'التركيب',
            'step5_desc': 'فريقنا ذو الخبرة يركب الأنظمة بدقة واحترافية.',
            'step6_title': 'الفحص والتسليم',
            'step6_desc': 'نقوم بفحوصات نهائية ونوصل المشروع وفق أعلى المعايير.',
        }
    };

    // Make translations globally accessible
    window.translations = translations;

    // Simple title management
    function setPageTitle(lang) {
        if (lang && translations[lang] && translations[lang].page_title) {
            // Check which page we're on and set appropriate title
            if (window.location.pathname.includes('cam-projeler.html')) {
                document.title = 'Zade - Cam Hizmetlerimiz';
            } else if (window.location.pathname.includes('aluminyum-projeler.html')) {
                document.title = 'Zade - Alüminyum Hizmetlerimiz';
            } else if (lang !== 'tr') {
                // For non-Turkish languages, use the generic page title
                document.title = translations[lang].page_title;
            } else {
                // For Turkish main page
                document.title = 'Zade Alüminyum Giyotin Cam Sistemleri';
            }
        }
    }



    // Function to update page content
    function updatePageContent(lang) {
        // Get translations for the selected language, fallback to English if not available
        let currentTranslations = translations[lang];
        if (!currentTranslations) {
            // For languages without full translations, use English as fallback
            currentTranslations = translations['en'];
            console.log(`Full translations not available for ${lang}, using English fallback`);
        }
        
        // Update page title
        setPageTitle(lang);
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks.length >= 5) {
            navLinks[0].textContent = currentTranslations.nav_home;
            
            // Check if this is a product detail page (has "Cam Projeler" or "Alüminyum Projeler")
            const secondLink = navLinks[1].textContent.trim();
            if (secondLink === 'Cam Projeler' || secondLink === 'Glass Projects' || secondLink === 'Projets de Verre') {
                // Product detail page navigation
                navLinks[1].textContent = currentTranslations.glass_projects;
                navLinks[2].textContent = currentTranslations.aluminum_projects;
                navLinks[3].textContent = currentTranslations.nav_contact;
            } else {
                // Main page navigation
                navLinks[1].textContent = currentTranslations.nav_services;
                navLinks[2].textContent = currentTranslations.nav_projects;
                navLinks[3].textContent = currentTranslations.nav_about;
                navLinks[4].textContent = currentTranslations.nav_contact;
            }
        }
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        
        // Check which page we're on and use specific translations
        if (window.location.pathname.includes('cam-projeler.html')) {
            if (heroTitle) heroTitle.textContent = currentTranslations.cam_hero_title || currentTranslations.hero_title;
            if (heroDescription) heroDescription.textContent = currentTranslations.cam_hero_description || currentTranslations.hero_description;
        } else if (window.location.pathname.includes('aluminyum-projeler.html')) {
            if (heroTitle) heroTitle.textContent = currentTranslations.aluminyum_hero_title || currentTranslations.hero_title;
            if (heroDescription) heroDescription.textContent = currentTranslations.hero_description;
        } else if (window.location.pathname.includes('spider-cam-cephe.html') || window.location.pathname.includes('cam-sacak-sistemleri.html') || window.location.pathname.includes('isi-yalitimli-cam-uygulamalari.html') || window.location.pathname.includes('cam-giyotin-sistemleri.html') || window.location.pathname.includes('surme-cam-kapilar.html') || window.location.pathname.includes('katlanir-cam-kapilar.html') || window.location.pathname.includes('otomatik-cam-kapilar.html') || window.location.pathname.includes('surme-aluminyum-kapilar.html') || window.location.pathname.includes('katlanir-aluminyum-kapilar.html') || window.location.pathname.includes('otomatik-aluminyum-kapilar.html') || window.location.pathname.includes('giris-kapilari.html') || window.location.pathname.includes('balkon-korkuluklari.html') || window.location.pathname.includes('merdiven-korkuluklari.html') || window.location.pathname.includes('teras-korkuluklari.html') || window.location.pathname.includes('ozel-tasarim-korkuluklar.html') || window.location.pathname.includes('isi-yalitimli-aluminyum-pencereler.html') || window.location.pathname.includes('ses-yalitimli-pencere-sistemleri.html') || window.location.pathname.includes('pvc-kapli-aluminyum-pencereler.html') || window.location.pathname.includes('ozel-olculu-pencere-uygulamalari.html') || window.location.pathname.includes('merdiven-cam-korkuluk.html') || window.location.pathname.includes('pleksi-dikme-korkuluk.html') || window.location.pathname.includes('balkon-cam-korkuluk.html') || window.location.pathname.includes('teras-cam-korkuluk.html')) {
            // Don't update hero title or description for Spider Cam Cephe, Cam Saçak Sistemleri, Isı Yalıtımlı Cam Uygulamaları, Cam Giyotin Sistemleri, Sürme Cam Kapılar, Katlanır Cam Kapılar, Otomatik Cam Kapılar, Sürme Alüminyum Kapılar, Katlanır Alüminyum Kapılar, Otomatik Alüminyum Kapılar, Giriş Kapıları, Balkon Korkulukları, Merdiven Korkulukları, and Teras Korkulukları pages - keep original HTML content
            // Skip updating both heroTitle and heroDescription
        } else {
            if (heroTitle) heroTitle.textContent = currentTranslations.hero_title;
            if (heroDescription) heroDescription.textContent = currentTranslations.hero_description;
        }
        
        // Update hero buttons with better error handling
        if (heroButtons && heroButtons.length >= 2) {
            try {
                heroButtons[0].textContent = currentTranslations.btn_discover || 'Hizmetlerimizi Keşfedin';
                heroButtons[1].textContent = currentTranslations.btn_about || 'Hakkımızda';
            } catch (error) {
                console.error('Error updating hero buttons:', error);
            }
        } else {
            // Try alternative selectors
            const btnPrimary = document.querySelector('.hero-buttons .btn-primary');
            const btnSecondary = document.querySelector('.hero-buttons .btn-secondary');
            
            if (btnPrimary) {
                btnPrimary.textContent = currentTranslations.btn_discover || 'Hizmetlerimizi Keşfedin';
            }
            if (btnSecondary) {
                btnSecondary.textContent = currentTranslations.btn_about || 'Hakkımızda';
            }
        }
        
        // Update services section
        const servicesTitle = document.querySelector('#products .section-header h2');
        const servicesSubtitle = document.querySelector('#products .section-header p');
        
        if (servicesTitle) servicesTitle.textContent = currentTranslations.services_title;
        if (servicesSubtitle) servicesSubtitle.textContent = currentTranslations.services_subtitle;
        
        // Update product cards
        const productCards = document.querySelectorAll('.product-card');
        if (productCards.length >= 2) {
            const glassCard = productCards[0];
            const aluminumCard = productCards[1];
            
            if (glassCard.querySelector('h3')) glassCard.querySelector('h3').textContent = currentTranslations.glass_projects;
            if (glassCard.querySelector('p')) glassCard.querySelector('p').textContent = currentTranslations.glass_projects_desc;
            if (glassCard.querySelector('.product-overlay span')) glassCard.querySelector('.product-overlay span').textContent = currentTranslations.btn_details;
            
            if (aluminumCard.querySelector('h3')) aluminumCard.querySelector('h3').textContent = currentTranslations.aluminum_projects;
            if (aluminumCard.querySelector('p')) aluminumCard.querySelector('p').textContent = currentTranslations.aluminum_projects_desc;
            if (aluminumCard.querySelector('.product-overlay span')) aluminumCard.querySelector('.product-overlay span').textContent = currentTranslations.btn_details;
        }
        
        // Update about section
        const aboutTitle = document.querySelector('#about .section-header h2');
        const aboutSubtitle = document.querySelector('#about .section-header p');
        const missionTitle = document.querySelector('#about h3');
        const missionTexts = document.querySelectorAll('#about .about-text p');
        
        if (aboutTitle) aboutTitle.textContent = currentTranslations.about_title;
        if (aboutSubtitle) aboutSubtitle.textContent = currentTranslations.about_subtitle;
        if (missionTitle) missionTitle.textContent = currentTranslations.mission_title;
        if (missionTexts.length >= 3) {
            missionTexts[0].textContent = currentTranslations.mission_text1;
            missionTexts[1].textContent = currentTranslations.mission_text2;
            missionTexts[2].textContent = currentTranslations.mission_text3;
        }
        
        // Update features
        const features = document.querySelectorAll('.feature');
        if (features.length >= 4) {
            if (features[0].querySelector('h4')) features[0].querySelector('h4').textContent = currentTranslations.feature1_title;
            if (features[0].querySelector('p')) features[0].querySelector('p').textContent = currentTranslations.feature1_desc;
            
            if (features[1].querySelector('h4')) features[1].querySelector('h4').textContent = currentTranslations.feature2_title;
            if (features[1].querySelector('p')) features[1].querySelector('p').textContent = currentTranslations.feature2_desc;
            
            if (features[2].querySelector('h4')) features[2].querySelector('h4').textContent = currentTranslations.feature3_title;
            if (features[2].querySelector('p')) features[2].querySelector('p').textContent = currentTranslations.feature3_desc;
            
            if (features[3].querySelector('h4')) features[3].querySelector('h4').textContent = currentTranslations.feature4_title;
            if (features[3].querySelector('p')) features[3].querySelector('p').textContent = currentTranslations.feature4_desc;
        }
        
        // Update work process section
        const workProcessTitle = document.querySelector('#work-process .section-header h2');
        const workProcessSubtitle = document.querySelector('#work-process .section-header p');
        
        if (workProcessTitle) workProcessTitle.textContent = currentTranslations.work_process_title || 'Çalışma Sürecimiz';
        if (workProcessSubtitle) workProcessSubtitle.textContent = currentTranslations.work_process_subtitle || 'Projelerinizi hayata geçirmek için izlediğimiz profesyonel adımlar';
        
        // Update work process steps
        const processSteps = document.querySelectorAll('.process-step');
        if (processSteps.length >= 6) {
            if (processSteps[0].querySelector('h3')) processSteps[0].querySelector('h3').textContent = currentTranslations.step1_title || 'İlk Görüşme';
            if (processSteps[0].querySelector('p')) processSteps[0].querySelector('p').textContent = currentTranslations.step1_desc || 'Müşteri ihtiyaçlarını anlamak için detaylı görüşme yapıyor, proje kapsamını belirliyoruz.';
            
            if (processSteps[1].querySelector('h3')) processSteps[1].querySelector('h3').textContent = currentTranslations.step2_title || 'Tasarım ve Planlama';
            if (processSteps[1].querySelector('p')) processSteps[1].querySelector('p').textContent = currentTranslations.step2_desc || 'Uzman ekibimiz projenizi analiz ederek en uygun tasarım ve teknik çözümleri hazırlıyor.';
            
            if (processSteps[2].querySelector('h3')) processSteps[2].querySelector('h3').textContent = currentTranslations.step3_title || 'Teklif ve Anlaşma';
            if (processSteps[2].querySelector('p')) processSteps[2].querySelector('p').textContent = currentTranslations.step3_desc || 'Detaylı proje teklifini sunuyor, anlaşma sonrası üretim sürecini başlatıyoruz.';
            
            if (processSteps[3].querySelector('h3')) processSteps[3].querySelector('h3').textContent = currentTranslations.step4_title || 'Üretim';
            if (processSteps[3].querySelector('p')) processSteps[3].querySelector('p').textContent = currentTranslations.step4_desc || 'Modern teknoloji ve kaliteli malzemelerle projenizi hassasiyetle üretiyoruz.';
            
            if (processSteps[4].querySelector('h3')) processSteps[4].querySelector('h3').textContent = currentTranslations.step5_title || 'Montaj';
            if (processSteps[4].querySelector('p')) processSteps[4].querySelector('p').textContent = currentTranslations.step5_desc || 'Uzman montaj ekibimiz projenizi güvenli ve profesyonel şekilde yerine monte ediyor.';
            
            if (processSteps[5].querySelector('h3')) processSteps[5].querySelector('h3').textContent = currentTranslations.step6_title || 'Kontrol ve Teslim';
            if (processSteps[5].querySelector('p')) processSteps[5].querySelector('p').textContent = currentTranslations.step6_desc || 'Son kontrolleri yaparak projenizi teslim ediyor, sonrasında destek hizmeti sunuyoruz.';
        }
        

        
        // Update contact section
        const contactTitle = document.querySelector('#contact .section-header h2');
        const contactSubtitle = document.querySelector('#contact .section-header p');
        const contactItems = document.querySelectorAll('.contact-item h4');
        const contactForm = document.querySelector('.contact-form');
        
        if (contactTitle) contactTitle.textContent = currentTranslations.contact_title;
        if (contactSubtitle) contactSubtitle.textContent = currentTranslations.contact_subtitle;
        if (contactItems.length >= 3) {
            contactItems[0].textContent = currentTranslations.contact_email;
            contactItems[1].textContent = currentTranslations.contact_phone;
            contactItems[2].textContent = currentTranslations.contact_address;
        }
        
        if (contactForm) {
            const inputs = contactForm.querySelectorAll('input, textarea');
            if (inputs.length >= 4) {
                inputs[0].placeholder = currentTranslations.form_name;
                inputs[1].placeholder = currentTranslations.form_email;
                inputs[2].placeholder = currentTranslations.form_subject;
                inputs[3].placeholder = currentTranslations.form_message;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.textContent = currentTranslations.btn_send;
        }
        
        // Update footer
        const footerSections = document.querySelectorAll('.footer-section h3, .footer-section h4');
        const footerAbout = document.querySelector('.footer-section p');
        const footerCopyright = document.querySelector('.footer-bottom p');
        
        // Update footer section titles with better fallbacks
        if (footerSections.length >= 3) {
            // Quick Links title
            if (footerSections[1]) {
                footerSections[1].textContent = currentTranslations.footer_quick_links || 
                    (currentTranslations.nav_home ? 'Quick Links' : 'Hızlı Bağlantılar');
            }
            // Services title
            if (footerSections[2]) {
                footerSections[2].textContent = currentTranslations.footer_services_title || 
                    (currentTranslations.nav_services ? 'Our Services' : 'Hizmetlerimiz');
            }
        }
        
        if (footerAbout) {
            footerAbout.textContent = currentTranslations.footer_about || 
                (currentTranslations.nav_about ? 'Aluminum - Quality aluminum solutions' : 'Alüminyum - Kaliteli alüminyum çözümleri');
        }
        if (footerCopyright) {
            footerCopyright.textContent = currentTranslations.footer_copyright || 
                (currentTranslations.nav_home ? '© 2024 Zade. All rights reserved.' : '© 2024 Zade. Tüm hakları saklıdır.');
        }
        
        // Update footer quick links
        const quickLinks = document.querySelectorAll('.footer-section:nth-child(2) ul li a');
        if (quickLinks.length >= 4) {
            quickLinks[0].textContent = currentTranslations.nav_home;
            quickLinks[1].textContent = currentTranslations.nav_about;
            quickLinks[2].textContent = currentTranslations.nav_services;
            quickLinks[3].textContent = currentTranslations.nav_contact;
        }
        
        // Update footer services list
        const servicesList = document.querySelectorAll('.footer-section:nth-child(3) ul li a');
        if (servicesList.length >= 9) {
            servicesList[0].textContent = currentTranslations.service_transparent_facade || 'Transparent Facade';
            servicesList[1].textContent = currentTranslations.service_glass_curtain || 'Glass Curtain Systems';
            servicesList[2].textContent = currentTranslations.service_glass_door || 'Glass Door';
            servicesList[3].textContent = currentTranslations.service_plexiglass_railing || 'Plexiglass Railing';
            servicesList[4].textContent = currentTranslations.service_glass_canopy || 'Glass Canopy';
            servicesList[5].textContent = currentTranslations.service_spider_facade || 'Spider Facade';
            servicesList[6].textContent = currentTranslations.service_transparent_elevator || 'Transparent Elevator';
            servicesList[7].textContent = currentTranslations.service_glass_facade || 'Glass Facade';
            servicesList[8].textContent = currentTranslations.service_stair_glass_railing || 'Stair Glass Railing';
        }
        
        // Update Cam Projeler page specific content
        const camServicesTitle = document.querySelector('#cam-hizmetler .section-header h2');
        const camServicesSubtitle = document.querySelector('#cam-hizmetler .section-header p');
        
        if (camServicesTitle) camServicesTitle.textContent = currentTranslations.cam_services_title || 'Cam Hizmetlerimiz';
        if (camServicesSubtitle) camServicesSubtitle.textContent = currentTranslations.cam_services_subtitle || 'Her türlü cam projesi için kapsamlı çözümler sunuyoruz';
        
        // Update Cam services cards
        const camServiceCards = document.querySelectorAll('#cam-hizmetler .system-card');
        if (camServiceCards.length >= 4) {
            // Facade systems
            if (camServiceCards[0].querySelector('h3')) camServiceCards[0].querySelector('h3').textContent = currentTranslations.cam_facade_systems || 'Cam Cephe Sistemleri';
            if (camServiceCards[0].querySelector('p')) camServiceCards[0].querySelector('p').textContent = currentTranslations.cam_facade_desc || 'Modern binalar için şeffaf ve dayanıklı cam cephe çözümleri. Enerji verimliliği ve estetik tasarımı bir arada sunuyoruz.';
            
            // Door systems
            if (camServiceCards[1].querySelector('h3')) camServiceCards[1].querySelector('h3').textContent = currentTranslations.cam_door_systems || 'Cam Kapı Sistemleri';
            if (camServiceCards[1].querySelector('p')) camServiceCards[1].querySelector('p').textContent = currentTranslations.cam_door_desc || 'Alüminyum çerçeveli zarif cam kapı çözümleri. Hem konut hem ticari projeler için özel tasarımlar.';
            
            // Railing systems
            if (camServiceCards[2].querySelector('h3')) camServiceCards[2].querySelector('h3').textContent = currentTranslations.cam_railing_systems || 'Cam Korkuluk Sistemleri';
            if (camServiceCards[2].querySelector('p')) camServiceCards[2].querySelector('p').textContent = currentTranslations.cam_railing_desc || 'Güvenlik ve estetiği birleştiren cam korkuluk çözümleri. Merdiven ve balkon uygulamaları için özel tasarımlar.';
            
            // Elevator systems
            if (camServiceCards[3].querySelector('h3')) camServiceCards[3].querySelector('h3').textContent = currentTranslations.cam_elevator_systems || 'Cam Asansör Sistemleri';
            if (camServiceCards[3].querySelector('p')) camServiceCards[3].querySelector('p').textContent = currentTranslations.cam_elevator_desc || 'Şeffaf asansör muhafazaları ve cam asansör sistemleri. Modern binalar için görsel zenginlik katıyoruz.';
        }
        
        // Update Cam features section
        const camFeaturesTitle = document.querySelector('.window-features .section-header h2');
        const camFeaturesSubtitle = document.querySelector('.window-features .section-header p');
        
        // Don't update section titles for merdiven-korkuluklari.html, teras-korkuluklari.html, ozel-tasarim-korkuluklar.html, and aluminyum-projeler.html pages
        if (!window.location.pathname.includes('merdiven-korkuluklari.html') && !window.location.pathname.includes('teras-korkuluklari.html') && !window.location.pathname.includes('ozel-tasarim-korkuluklar.html') && !window.location.pathname.includes('aluminyum-projeler.html')) {
            if (camFeaturesTitle) camFeaturesTitle.textContent = currentTranslations.cam_features_title || 'Cam Projelerimizin Özellikleri';
            if (camFeaturesSubtitle) camFeaturesSubtitle.textContent = currentTranslations.cam_features_subtitle || 'Neden Zade Alüminyum\'u tercih etmelisiniz?';
        }
        
        // Update Cam features items
        const camFeatureItems = document.querySelectorAll('.window-features .feature-item');
        if (camFeatureItems.length >= 4) {
            // Check if we're on the aluminyum-projeler.html page
            if (window.location.pathname.includes('aluminyum-projeler.html')) {
                // Aluminum-specific feature titles
                if (camFeatureItems[0].querySelector('h3')) camFeatureItems[0].querySelector('h3').textContent = 'Hafiflik ve Dayanıklılık';
                if (camFeatureItems[0].querySelector('p')) camFeatureItems[0].querySelector('p').textContent = 'Alüminyumun hafif yapısı ve yüksek dayanıklılığı ile uzun ömürlü, güvenli çözümler sunuyoruz.';
                
                if (camFeatureItems[1].querySelector('h3')) camFeatureItems[1].querySelector('h3').textContent = 'Isı ve Ses Yalıtımı';
                if (camFeatureItems[1].querySelector('p')) camFeatureItems[1].querySelector('p').textContent = 'Termal kesicili alüminyum sistemleri ile enerji verimliliği sağlayarak konforlu yaşam alanları yaratıyoruz.';
                
                if (camFeatureItems[2].querySelector('h3')) camFeatureItems[2].querySelector('h3').textContent = 'Modern Tasarım';
                if (camFeatureItems[2].querySelector('p')) camFeatureItems[2].querySelector('p').textContent = 'Çağdaş mimari anlayışına uygun, şık ve fonksiyonel alüminyum tasarımları ile mekanlarınızı değerli hale getiriyoruz.';
                
                if (camFeatureItems[3].querySelector('h3')) camFeatureItems[3].querySelector('h3').textContent = 'Korozyon Direnci';
                if (camFeatureItems[3].querySelector('p')) camFeatureItems[3].querySelector('p').textContent = 'Yüksek kaliteli alüminyum alaşımları ve koruyucu kaplamalar ile uzun yıllar boyunca dayanıklı çözümler.';
            } else {
                // Original glass-specific feature titles
                if (camFeatureItems[0].querySelector('h3')) camFeatureItems[0].querySelector('h3').textContent = currentTranslations.cam_transparency_title || 'Şeffaflık ve Işık';
                if (camFeatureItems[0].querySelector('p')) camFeatureItems[0].querySelector('p').textContent = currentTranslations.cam_transparency_desc || 'Doğal ışığı maksimum seviyede iç mekanlara taşıyarak ferah ve aydınlık ortamlar yaratıyoruz.';
                
                if (camFeatureItems[1].querySelector('h3')) camFeatureItems[1].querySelector('h3').textContent = currentTranslations.cam_energy_title || 'Enerji Verimliliği';
                if (camFeatureItems[1].querySelector('p')) camFeatureItems[1].querySelector('p').textContent = currentTranslations.cam_energy_desc || 'Isı yalıtımlı cam sistemleri ile enerji tasarrufu sağlayarak çevre dostu çözümler sunuyoruz.';
                
                if (camFeatureItems[2].querySelector('h3')) camFeatureItems[2].querySelector('h3').textContent = currentTranslations.cam_aesthetic_title || 'Estetik Tasarım';
                if (camFeatureItems[2].querySelector('p')) camFeatureItems[2].querySelector('p').textContent = currentTranslations.cam_aesthetic_desc || 'Modern mimari trendlerine uygun, şık ve zarif cam tasarımları ile mekanlarınızı güzelleştiriyoruz.';
                
                if (camFeatureItems[3].querySelector('h3')) camFeatureItems[3].querySelector('h3').textContent = currentTranslations.cam_security_title || 'Güvenlik ve Dayanıklılık';
                if (camFeatureItems[3].querySelector('p')) camFeatureItems[3].querySelector('p').textContent = currentTranslations.cam_security_desc || 'Yüksek kaliteli cam malzemeler ve güvenlik standartlarına uygun uygulamalar ile güvenli çözümler.';
            }
        }
        
        // Update CTA section
        const ctaTitle = document.querySelector('.cta-section .cta-content h2');
        const ctaDesc = document.querySelector('.cta-section .cta-content p');
        const ctaButtons = document.querySelectorAll('.cta-section .cta-buttons .btn');
        
        // Check if we're on the aluminyum-projeler.html page
        if (window.location.pathname.includes('aluminyum-projeler.html')) {
            // Aluminum-specific CTA text
            if (ctaTitle) ctaTitle.textContent = 'Alüminyum Projeleriniz İçin Bizimle İletişime Geçin';
            if (ctaDesc) ctaDesc.textContent = 'Hayalinizdeki alüminyum projesini gerçeğe dönüştürmek için uzman ekibimizle görüşün. Size özel çözümler sunuyoruz.';
        } else {
            // Original glass-specific CTA text
            if (ctaTitle) ctaTitle.textContent = currentTranslations.cam_cta_title || 'Cam Projeleriniz İçin Bizimle İletişime Geçin';
            if (ctaDesc) ctaDesc.textContent = currentTranslations.cam_cta_desc || 'Hayalinizdeki cam projesini gerçeğe dönüştürmek için uzman ekibimizle görüşün. Size özel çözümler sunuyoruz.';
        }
        
        if (ctaButtons.length >= 2) {
            ctaButtons[0].textContent = currentTranslations.btn_get_quote || 'Teklif Alın';
        }
    }

    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all options
            languageOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update current language and country display
            const selectedLang = option.getAttribute('data-lang');
            const selectedCountry = option.getAttribute('data-country');
            
            // Get the appropriate flag emoji
            let flagEmoji = countryToFlag[selectedCountry] || langToFlag[selectedLang] || '🌍';
            
            currentLang.textContent = flagEmoji;
            countryName.textContent = selectedCountry;
            
            // Update page content with selected language
            updatePageContent(selectedLang);
            
            // Ensure language is properly applied
            ensureLanguageApplied(selectedLang);
            
            // Store selected language in localStorage
            localStorage.setItem('selectedLanguage', selectedLang);
            localStorage.setItem('selectedCountry', selectedCountry);
            
            console.log('Language changed to:', selectedLang, 'Country:', selectedCountry);
        });
    });
    
    // Load saved language preference on page load with a small delay to ensure DOM is ready
    setTimeout(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        const savedCountry = localStorage.getItem('selectedCountry');
        
        if (savedLang && savedCountry) {
            const savedOption = document.querySelector(`[data-lang="${savedLang}"][data-country="${savedCountry}"]`);
            if (savedOption) {
                // Remove active class from all options
                languageOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to saved option
                savedOption.classList.add('active');
                
                // Update current language and country display
                let flagEmoji = countryToFlag[savedCountry] || langToFlag[savedLang] || '🌍';
                currentLang.textContent = flagEmoji;
                countryName.textContent = savedCountry;
                
                            // Update page content with saved language
            updatePageContent(savedLang);
            
            console.log('Restored saved language:', savedLang, 'Country:', savedCountry);
            } else {
                // If saved option not found, default to Turkish
                console.log('Saved language option not found, defaulting to Turkish');
                updatePageContent('tr');
            }
        } else {
            // No saved language, default to Turkish
            console.log('No saved language found, defaulting to Turkish');
            updatePageContent('tr');
        }
    }, 100);
});

// Additional initialization on window load to ensure everything is ready
window.addEventListener('load', () => {
            // Apply saved language on window load
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            updatePageContent(savedLang);
            console.log('Language applied on window load:', savedLang);
        }
});

// Add beforeunload event to ensure language is saved
window.addEventListener('beforeunload', () => {
    const currentLang = localStorage.getItem('selectedLanguage');
    if (currentLang) {
        // Force save the current language
        localStorage.setItem('selectedLanguage', currentLang);
        console.log('Language saved before unload:', currentLang);
    }
});



// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-3px)';
    backToTopBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
}); 

// Statistics counting animation
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const originalText = statNumber.textContent;
                
                // Extract the number and suffix
                const match = originalText.match(/(\d+(?:\.\d+)?)(\+?)/);
                if (!match) return;
                
                const number = parseFloat(match[1]);
                const suffix = match[2] || '';
                
                // Add animation class
                statNumber.classList.add('animate');
                
                // Start counting animation
                let current = 0;
                const increment = number / 50; // 50 steps for smooth animation
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    // Format the number based on original format
                    if (originalText.includes('.')) {
                        statNumber.textContent = current.toFixed(3) + suffix;
                    } else {
                        statNumber.textContent = Math.floor(current) + suffix;
                    }
                }, 40); // 40ms interval for smooth animation
                
                // Stop observing this element
                observer.unobserve(statNumber);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all stat numbers
    statNumbers.forEach(statNumber => {
        observer.observe(statNumber);
    });
}

// Initialize statistics animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStatistics();
});

// Also initialize on window load for pages that might load content dynamically
window.addEventListener('load', () => {
    animateStatistics();
});