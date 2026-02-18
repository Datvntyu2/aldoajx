(function() {
    'use strict';
    
    const CONFIG = {
        apiBase: 'https://service.nhapma.com',
        endpoints: {
            step: '/step',
            continue: '/continue',
            countdown: '/countdown'
        },
        targetWidth: 170,
        targetHeight: 46,
        pollingInterval: 2000,
        maxPollAttempts: 30
    };
    
    let state = {
        giftCode: null,
        giftToken: null,
        isPolling: false,
        attempts: 0,
        debugMode: true
    };
    
    const logger = {
        log: (...args) => state.debugMode && console.log('🔧 [AutoCode]', ...args, '| Script by Datcn'),
        warn: (...args) => console.warn('⚠️ [AutoCode]', ...args, '| Script by Datcn'),
        error: (...args) => console.error('❌ [AutoCode]', ...args, '| Script by Datcn'),
        success: (...args) => console.log('✅ [AutoCode]', ...args, '| Script by Datcn')
    };
    
    logger.log('Script khởi động - Tìm nút 170×46 hoặc 170×54... [Script by Datcn]');
    
    /**
     * TÌM VÀ CLICK NÚT 170×46 HOẶC 170×54 - CLICK NGAY
     */
    function findAndClickButton() {
        const allElements = document.querySelectorAll('*');
        let target = null;
        let foundSize = '';
        
        for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            
            // Bỏ qua nếu không hiển thị
            if (rect.width === 0 || rect.height === 0) continue;
            
            // Check 170×46 (sai số 1px)
            const is170x46 = Math.abs(rect.width - 170) <= 1 && Math.abs(rect.height - 46) <= 1;
            // Check 170×54 (sai số 1px)
            const is170x54 = Math.abs(rect.width - 170) <= 1 && Math.abs(rect.height - 54) <= 1;
            
            if (is170x46 || is170x54) {
                target = el;
                foundSize = `${Math.round(rect.width)}×${Math.round(rect.height)}`;
                break; // Lấy cái đầu tiên
            }
        }
        
        if (!target) {
            logger.warn(`❌ Không tìm thấy nút 170×46 hoặc 170×54`);
            return false;
        }
        
        // CLICK NGAY KHÔNG ĐỢI
        target.click();
        logger.success(`✅ Click nút ${foundSize}! [Script by Datcn]`);
        
        // Highlight
        target.style.outline = '3px solid #00FF00';
        setTimeout(() => target.style.outline = '', 1500);
        
        return true;
    }
    
    /**
     * Hook XHR
     */
    function hookXHR() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url) {
            this._url = url;
            this._method = method;
            return originalOpen.apply(this, arguments);
        };
        
        XMLHttpRequest.prototype.send = function(body) {
            if (this._url && this._url.includes('/step')) {
                logger.log(`📡 API: ${this._method} ${this._url} [Script by Datcn]`);
                
                try {
                    const urlObj = new URL(this._url, window.location.origin);
                    state.giftCode = urlObj.searchParams.get('code') || state.giftCode;
                    state.giftToken = urlObj.searchParams.get('token') || state.giftToken;
                } catch(e) {}
                
                if (body && typeof body === 'string') {
                    try {
                        const params = new URLSearchParams(body);
                        state.giftCode = params.get('code') || state.giftCode;
                        state.giftToken = params.get('token') || state.giftToken;
                    } catch(e) {}
                }
                
                const originalOnReadyStateChange = this.onreadystatechange;
                this.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        try {
                            const response = JSON.parse(this.responseText);
                            if (response.success) {
                                if (response.token) state.giftToken = response.token;
                                if (state.giftCode && state.giftToken && !state.isPolling) {
                                    setTimeout(startPolling, 500);
                                }
                            }
                        } catch(e) {}
                    }
                    if (originalOnReadyStateChange) originalOnReadyStateChange.apply(this, arguments);
                };
            }
            return originalSend.apply(this, arguments);
        };
    }
    
    /**
     * Hook Fetch
     */
    function hookFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = async function(...args) {
            const [resource, options] = args;
            const url = typeof resource === 'string' ? resource : resource.url;
            
            if (url && url.includes('/step')) {
                const response = await originalFetch.apply(this, args);
                const clone = response.clone();
                
                try {
                    const data = await clone.json();
                    if (data.success) {
                        if (data.token) state.giftToken = data.token;
                        try {
                            const urlObj = new URL(url, window.location.origin);
                            state.giftCode = urlObj.searchParams.get('code') || state.giftCode;
                        } catch(e) {}
                        
                        if (state.giftCode && state.giftToken && !state.isPolling) {
                            setTimeout(startPolling, 500);
                        }
                    }
                } catch(e) {}
                
                return response;
            }
            return originalFetch.apply(this, args);
        };
    }
    
    /**
     * Polling lấy mã
     */
    function startPolling() {
        if (state.isPolling || !state.giftCode || !state.giftToken) return;
        
        state.isPolling = true;
        state.attempts = 0;
        
        logger.success(`🚀 BẮT ĐẦU POLLING [Script by Datcn]`);
        logger.log(`📦 Code: ${state.giftCode} | 🔑 Token: ${state.giftToken} [Script by Datcn]`);
        
        const poll = async () => {
            if (state.attempts >= CONFIG.maxPollAttempts) {
                logger.warn('Hết thời gian! [Script by Datcn]');
                state.isPolling = false;
                return;
            }
            
            state.attempts++;
            
            try {
                const response = await fetch(
                    `${CONFIG.apiBase}${CONFIG.endpoints.continue}`, 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `code=${encodeURIComponent(state.giftCode)}&token=${encodeURIComponent(state.giftToken)}`
                    }
                );
                
                const data = await response.json();
                
                if (data.success && data.code) {
                    logger.success(`🎉 MÃ: ${data.code} [Script by Datcn]`);
                    showResult(data.code);
                    state.isPolling = false;
                    return;
                }
                
                setTimeout(poll, CONFIG.pollingInterval);
            } catch (error) {
                setTimeout(poll, CONFIG.pollingInterval * 2);
            }
        };
        
        setTimeout(poll, 1000);
    }
    
    /**
     * Hiển thị kết quả
     */
    function showResult(code) {
        console.log('%c🎁 MÃ: ' + code + ' | Script by Datcn', 'color: #FF6600; font-size: 24px; font-weight: bold');
        
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a1a2e;
                color: white;
                padding: 30px;
                border-radius: 15px;
                border: 2px solid #FF6600;
                box-shadow: 0 20px 40px rgba(255, 102, 0, 0.3);
                z-index: 99999;
                text-align: center;
                min-width: 300px;
            ">
                <div style="font-size: 40px; margin-bottom: 10px;">🎁</div>
                <div style="font-size: 18px; color: #FF6600; margin-bottom: 15px;">MÃ CỦA BẠN</div>
                <div style="font-size: 12px; color: #888; margin-bottom: 10px; font-style: italic;">
                    Script by Datcn
                </div>
                <div style="
                    background: rgba(255, 102, 0, 0.1);
                    padding: 15px;
                    border-radius: 8px;
                    font-size: 28px;
                    letter-spacing: 3px;
                    font-weight: bold;
                    font-family: monospace;
                    margin-bottom: 15px;
                ">${code}</div>
                <button onclick="navigator.clipboard.writeText('${code}'); this.textContent='✅ Đã copy'" 
                    style="padding: 10px 20px; background: #FF6600; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    📋 Copy
                </button>
                <button onclick="this.parentNode.parentNode.remove()" 
                    style="padding: 10px 20px; background: transparent; color: #FF6600; border: 1px solid #FF6600; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                    Đóng
                </button>
                <div style="margin-top: 15px; font-size: 11px; color: #666;">
                    Powered by Datcn
                </div>
            </div>
        `;
        document.body.appendChild(div.firstElementChild);
        navigator.clipboard.writeText(code);
    }
    
    // KHỞI ĐỘNG
    hookXHR();
    hookFetch();
    
    // Tìm và click ngay sau 2 giây
    setTimeout(() => {
        if (!findAndClickButton()) {
            setTimeout(findAndClickButton, 3000); // Thử lại sau 3 giây
        }
    }, 2000);
    
    logger.success('✅ Script sẵn sàng - Tìm nút 170×46 hoặc 170×54 [Script by Datcn]');
    
    // Expose
    window.AUTO_FIND = findAndClickButton;
    
})();
