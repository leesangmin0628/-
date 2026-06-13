/**
 * 감자튀김 공화국 공식 포털 - JavaScript
 * Republic of French Fries - Official Portal JavaScript
 * 
 * 기능:
 * - 모바일 메뉴 토글
 * - 탭 기능
 * - 검색 기능
 * - 폼 제출 처리
 * - 언어 선택
 * - 네비게이션 활성화
 * - 스크롤 이벤트 처리
 */

'use strict';

// ============================================================================
// 1. DOM 요소 캐싱
// ============================================================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const contactForm = document.getElementById('contactForm');
const languageSelector = document.getElementById('languageSelector');

// ============================================================================
// 2. 모바일 메뉴 토글 기능
// ============================================================================

/**
 * 모바일 메뉴 토글 함수
 * 메뉴 버튼 클릭 시 네비게이션 메뉴를 표시/숨김
 */
function toggleMenu() {
    navMenu.classList.toggle('active');
    
    // 접근성: aria-expanded 속성 업데이트
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
}

// 메뉴 토글 버튼 클릭 이벤트
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

/**
 * 메뉴 링크 클릭 시 메뉴 닫기
 * 모바일에서 메뉴 항목 선택 후 자동으로 메뉴를 닫음
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 메뉴 닫기
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        // 활성 링크 업데이트
        updateActiveLink(link);
    });
});

// ============================================================================
// 3. 네비게이션 활성 상태 관리
// ============================================================================

/**
 * 활성 링크 업데이트 함수
 * @param {HTMLElement} activeLink - 활성화할 링크 요소
 */
function updateActiveLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

/**
 * 스크롤 위치에 따라 활성 네비게이션 업데이트
 */
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (navLink) {
                updateActiveLink(navLink);
            }
        }
    });
}

// 스크롤 이벤트 리스너 (throttled)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateNavOnScroll);
});

// ============================================================================
// 4. 탭 기능
// ============================================================================

/**
 * 탭 클릭 이벤트 처리
 * 탭 버튼 클릭 시 해당 콘텐츠 표시
 */
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // 같은 탭 그룹의 모든 버튼과 콘텐츠 찾기
        const tabGroup = button.closest('.tabs');
        const groupButtons = tabGroup.querySelectorAll('.tab-button');
        const groupContents = tabGroup.querySelectorAll('.tab-content');
        
        // 모든 탭 비활성화
        groupButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        groupContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // 선택된 탭 활성화
        button.classList.add('active');
        const activeContent = tabGroup.querySelector(`#${tabName}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // 접근성: 포커스 이동
        button.focus();
    });
});

// 키보드 네비게이션 (탭)
tabButtons.forEach(button => {
    button.addEventListener('keydown', (e) => {
        const tabGroup = button.closest('.tabs');
        const groupButtons = Array.from(tabGroup.querySelectorAll('.tab-button'));
        const currentIndex = groupButtons.indexOf(button);
        let targetButton = null;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetButton = groupButtons[currentIndex - 1] || groupButtons[groupButtons.length - 1];
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetButton = groupButtons[currentIndex + 1] || groupButtons[0];
        }
        
        if (targetButton) {
            targetButton.click();
        }
    });
});

// ============================================================================
// 5. 검색 기능
// ============================================================================

/**
 * 검색 함수
 * 검색어를 기반으로 페이지 내 콘텐츠 검색
 */
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 실제 구현에서는 서버에 검색 요청을 보내거나
    // 페이지 내 콘텐츠를 검색하는 로직을 추가할 수 있습니다.
    
    // 예시: 페이지 내 텍스트 검색
    const mainContent = document.querySelector('main');
    const text = mainContent.innerText.toLowerCase();
    
    if (text.includes(searchTerm)) {
        alert(`"${searchTerm}"에 대한 검색 결과를 찾았습니다.`);
        // 실제 구현: 검색 결과 페이지로 이동 또는 결과 표시
    } else {
        alert(`"${searchTerm}"에 대한 검색 결과가 없습니다.`);
    }
}

// 검색 버튼 클릭 이벤트
if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

// 검색 입력 필드 엔터 키 이벤트
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ============================================================================
// 6. 폼 제출 처리
// ============================================================================

/**
 * 폼 제출 이벤트 처리
 */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            category: formData.get('category'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // 폼 유효성 검사
        if (!validateContactForm(data)) {
            return;
        }
        
        // 실제 구현에서는 서버에 데이터를 전송합니다.
        // 예시: fetch API를 사용한 서버 전송
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showSuccessMessage('문의가 성공적으로 제출되었습니다.');
                contactForm.reset();
            } else {
                showErrorMessage('문의 제출에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
        });
        */
        
        // 데모용 처리
        console.log('문의 데이터:', data);
        showSuccessMessage('문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변하겠습니다.');
        contactForm.reset();
    });
}

/**
 * 폼 유효성 검사 함수
 * @param {Object} data - 폼 데이터
 * @returns {boolean} 유효성 검사 결과
 */
function validateContactForm(data) {
    // 이름 검사
    if (!data.name || data.name.trim() === '') {
        showErrorMessage('이름을 입력해주세요.');
        return false;
    }
    
    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showErrorMessage('유효한 이메일 주소를 입력해주세요.');
        return false;
    }
    
    // 문의 분류 검사
    if (!data.category || data.category === '') {
        showErrorMessage('문의 분류를 선택해주세요.');
        return false;
    }
    
    // 문의 내용 검사
    if (!data.message || data.message.trim() === '') {
        showErrorMessage('문의 내용을 입력해주세요.');
        return false;
    }
    
    // 최소 길이 검사
    if (data.message.trim().length < 10) {
        showErrorMessage('문의 내용은 최소 10자 이상이어야 합니다.');
        return false;
    }
    
    return true;
}

/**
 * 성공 메시지 표시
 * @param {string} message - 표시할 메시지
 */
function showSuccessMessage(message) {
    const alertBox = createAlertBox(message, 'success');
    document.body.insertBefore(alertBox, document.body.firstChild);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

/**
 * 오류 메시지 표시
 * @param {string} message - 표시할 메시지
 */
function showErrorMessage(message) {
    const alertBox = createAlertBox(message, 'error');
    document.body.insertBefore(alertBox, document.body.firstChild);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

/**
 * 알림 박스 생성
 * @param {string} message - 메시지 텍스트
 * @param {string} type - 알림 타입 ('success' 또는 'error')
 * @returns {HTMLElement} 생성된 알림 박스
 */
function createAlertBox(message, type) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 6px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    if (type === 'success') {
        alertBox.style.backgroundColor = '#4caf50';
        alertBox.style.color = '#ffffff';
    } else if (type === 'error') {
        alertBox.style.backgroundColor = '#f44336';
        alertBox.style.color = '#ffffff';
    }
    
    alertBox.textContent = message;
    
    // 애니메이션 정의
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    if (!document.querySelector('style[data-alert-animation]')) {
        style.setAttribute('data-alert-animation', 'true');
        document.head.appendChild(style);
    }
    
    return alertBox;
}

// ============================================================================
// 7. 언어 선택 기능
// ============================================================================

/**
 * 언어 선택 변경 이벤트
 */
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        
        // 언어 선택 저장 (localStorage)
        localStorage.setItem('selectedLanguage', selectedLanguage);
        
        // 실제 구현에서는 페이지를 해당 언어로 리로드하거나
        // 동적으로 콘텐츠를 변경할 수 있습니다.
        
        if (selectedLanguage === 'en') {
            // 영문 페이지로 이동 (예시)
            console.log('영문 버전으로 변경되었습니다.');
            // window.location.href = '/en/';
        } else if (selectedLanguage === 'ko') {
            console.log('한국어 버전으로 변경되었습니다.');
        }
    });
    
    // 저장된 언어 선택 복원
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        languageSelector.value = savedLanguage;
    }
}

// ============================================================================
// 8. 부드러운 스크롤 (앵커 링크)
// ============================================================================

/**
 * 부드러운 스크롤 처리
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // '#' 만 있는 경우는 처리하지 않음
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// 9. 초기화 함수
// ============================================================================

/**
 * 페이지 로드 시 초기화
 */
function initializePage() {
    // 초기 활성 링크 설정
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        updateActiveLink(firstNavLink);
    }
    
    // 접근성: 메뉴 토글 초기 상태
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    
    console.log('감자튀김 공화국 공식 포털이 로드되었습니다.');
}

// ============================================================================
// 10. 이벤트 리스너 등록
// ============================================================================

// 페이지 로드 완료 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// 윈도우 리사이즈 시 모바일 메뉴 닫기
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// ============================================================================
// 11. 유틸리티 함수
// ============================================================================

/**
 * 현재 시간 포맷팅
 * @returns {string} 포맷된 현재 시간
 */
function getCurrentTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return now.toLocaleDateString('ko-KR', options);
}

/**
 * 디바운스 함수 (이벤트 최적화)
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (밀리초)
 * @returns {Function} 디바운스된 함수
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 쓰로틀 함수 (이벤트 최적화)
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간 (밀리초)
 * @returns {Function} 쓰로틀된 함수
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================================
// 12. 개발자 콘솔 메시지
// ============================================================================

console.log('%c감자튀김 공화국 공식 포털', 'font-size: 20px; font-weight: bold; color: #001f4d;');
console.log('%cRepublic of French Fries - Official Portal', 'font-size: 14px; color: #d4a574;');
console.log('%c자유 · 혁신 · 번영', 'font-size: 12px; color: #666;');
console.log('');
console.log('이 웹사이트는 현대적이고 전문적인 정부 포털 사이트입니다.');
console.log('접근성과 사용자 경험을 최우선으로 설계되었습니다.');
