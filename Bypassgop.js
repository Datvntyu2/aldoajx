(function() {
    'use strict';
    
    // Ngăn chạy lại nhiều lần
    if (window.datcnFinalScriptLoaded) return;
    window.datcnFinalScriptLoaded = true;
    
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    
    // Hàm tăng tốc độ timeout/interval lên 100 lần
    (function speedUpTimers() {
        console.log('%c[DatCN] Giám sát viên đang được triển khai... | Script by Datcn', 'color: #a955ff; font-weight: bold');
        
        const speedMultiplier = 100;
        
        const applySpeedHack = () => {
            window.setTimeout = (fn, delay) => originalSetTimeout(fn, delay / speedMultiplier);
            window.setInterval = (fn, delay) => originalSetInterval(fn, delay / speedMultiplier);
        };
        
        applySpeedHack();
        originalSetInterval(applySpeedHack, 100);
    })();
    
    // Hàm tạo thông báo UI
    function createNotification() {
        const notificationId = 'datcn-notification';
        
        // Kiểm tra nếu đã tồn tại
        if (document.getElementById(notificationId)) return;
        
        // Tạo container
        const container = document.createElement('div');
        container.id = notificationId;
        container.innerHTML = `
            <div class="datcn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.829 15.632l-1.98-1.144c-.23-.132-.383-.377-.383-.644v-2.288c0-1.851-1.202-3.436-2.92-3.992.052-.224.079-.456.079-.691 0-.968-.38-1.851-.989-2.497l-.001-.001c-.61-.647-1.488-1.03-2.45-1.03s-1.841.383-2.451 1.031c-.609.646-.989 1.529-.989 2.497 0 .235.027.467.079.691-1.718.556-2.92 2.141-2.92 3.992v2.288c0 .267-.153.512-.383.644l-1.98 1.144c-.293.17-.411.536-.296.861.115.324.418.536.759.536h14.9c.341 0 .644-.212.759-.536.115-.325-.003-.691-.296-.861zM12 22c1.105 0 2-.895 2-2h-4c0 1.105.895 2 2 2z"/>
                </svg>
            </div>
            <div class="datcn-content">
                <div class="datcn-title">DatCN Đã Kích Hoạt</div>
                <div class="datcn-message">Cảm ơn bạn đã sử dụng code by DatCN.</div>
                <div class="datcn-credit" style="font-size: 10px; color: #888; margin-top: 4px; font-style: italic;">Script by Datcn</div>
            </div>
            <div class="datcn-close" title="Đóng">&times;</div>
        `;
        
        // Tạo style
        const style = document.createElement('style');
        style.innerHTML = `
            #datcn-notification {
                position: fixed;
                top: 25px;
                right: 25px;
                background-color: rgba(30, 35, 50, 0.7);
                color: #e0e0e0;
                padding: 12px 18px;
                border-radius: 12px;
                z-index: 2147483647;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
                font-family: 'Segoe UI', 'Roboto', sans-serif;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                display: flex;
                align-items: center;
                gap: 15px;
                opacity: 0;
                transform: translateX(120%);
                transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            }
            #datcn-notification.visible {
                opacity: 1;
                transform: translateX(0);
            }
            .datcn-icon {
                width: 24px;
                height: 24px;
                color: #a955ff;
            }
            .datcn-content {
                display: flex;
                flex-direction: column;
            }
            .datcn-title {
                font-size: 15px;
                font-weight: 600;
                color: #ffffff;
            }
            .datcn-message {
                font-size: 13px;
                color: #c0c0c0;
            }
            .datcn-credit {
                font-size: 10px;
                color: #888;
                margin-top: 4px;
                font-style: italic;
            }
            .datcn-close {
                font-size: 24px;
                color: #aaa;
                cursor: pointer;
                padding: 0 5px;
                margin-left: 10px;
                font-weight: 300;
                transition: color 0.2s ease;
            }
            .datcn-close:hover {
                color: #fff;
            }
        `;
        
        // Thêm vào DOM
        document.head.appendChild(style);
        document.body.appendChild(container);
        
        // Hàm đóng thông báo
        const closeNotification = () => {
            container.classList.remove('visible');
            originalSetTimeout(() => {
                container.remove();
                style.remove();
            }, 600);
        };
        
        // Event listeners
        container.querySelector('.datcn-close').addEventListener('click', closeNotification);
        
        // Hiển thị sau 100ms
        originalSetTimeout(() => {
            container.classList.add('visible');
        }, 100);
        
        // Tự động đóng sau 5 giây
        originalSetTimeout(closeNotification, 5000);
        
        console.log('%c[DatCN] Thông báo đã được hiển thị. | Script by Datcn', 'color: #a955ff; font-weight: bold');
    }
    
    // Đợi DOM ready rồi tạo thông báo
    function init() {
        if (document.body) {
            createNotification();
        } else {
            originalSetTimeout(init, 100);
        }
    }
    
    init();
})();
