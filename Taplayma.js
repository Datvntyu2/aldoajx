javascript:(function(){
    // ===== UI STYLES =====
    const styles = `
        #datcn-bypass-ui {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 320px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 15px;
            padding: 20px;
            border: 2px solid #ff8c00;
            box-shadow: 0 0 30px rgba(255, 140, 0, 0.4), inset 0 0 20px rgba(255, 140, 0, 0.1);
            font-family: 'Segoe UI', sans-serif;
            color: #fff;
            z-index: 999999;
            animation: datcn-slide 0.5s ease;
        }
        @keyframes datcn-slide {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        #datcn-bypass-ui .datcn-header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px solid rgba(255, 140, 0, 0.3);
            padding-bottom: 10px;
        }
        #datcn-bypass-ui .datcn-title {
            font-size: 1.4em;
            font-weight: bold;
            background: linear-gradient(45deg, #ff8c00, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
        }
        #datcn-bypass-ui .datcn-subtitle {
            font-size: 0.75em;
            color: #ff8c00;
            opacity: 0.8;
            margin-top: 5px;
            letter-spacing: 2px;
        }
        #datcn-bypass-ui .datcn-status {
            margin: 10px 0;
            padding: 10px;
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            border-left: 3px solid #ff8c00;
            font-size: 0.85em;
            transition: all 0.3s;
        }
        #datcn-bypass-ui .datcn-status.active {
            background: rgba(255, 140, 0, 0.2);
            box-shadow: 0 0 10px rgba(255, 140, 0, 0.3);
        }
        #datcn-bypass-ui .datcn-status-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #333;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            margin-right: 8px;
            transition: all 0.3s;
        }
        #datcn-bypass-ui .datcn-status.active .datcn-status-icon {
            background: #ff8c00;
            box-shadow: 0 0 10px #ff8c00;
            animation: datcn-pulse 1s infinite;
        }
        @keyframes datcn-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        #datcn-bypass-ui .datcn-loader {
            height: 3px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            margin: 15px 0;
            overflow: hidden;
        }
        #datcn-bypass-ui .datcn-loader-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #ff8c00, #ff6b35);
            border-radius: 2px;
            transition: width 0.3s;
        }
        #datcn-bypass-ui .datcn-loader-bar.animate {
            animation: datcn-load 1.5s infinite;
        }
        @keyframes datcn-load {
            0% { width: 0%; margin-left: 0; }
            50% { width: 70%; }
            100% { width: 0%; margin-left: 100%; }
        }
        #datcn-bypass-ui .datcn-result {
            display: none;
            background: linear-gradient(135deg, rgba(255, 140, 0, 0.3), rgba(255, 107, 53, 0.3));
            border: 2px solid #ff8c00;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            margin-top: 15px;
            animation: datcn-glow 2s infinite alternate;
        }
        #datcn-bypass-ui .datcn-result.show {
            display: block;
            animation: datcn-pop 0.5s ease;
        }
        @keyframes datcn-glow {
            from { box-shadow: 0 0 10px rgba(255, 140, 0, 0.3); }
            to { box-shadow: 0 0 25px rgba(255, 140, 0, 0.6); }
        }
        @keyframes datcn-pop {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        #datcn-bypass-ui .datcn-result-label {
            color: #ffcc80;
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        #datcn-bypass-ui .datcn-code {
            font-size: 1.3em;
            font-weight: bold;
            color: #fff;
            text-shadow: 0 0 15px rgba(255, 140, 0, 0.8);
            word-break: break-all;
            letter-spacing: 1px;
        }
        #datcn-bypass-ui .datcn-copy {
            background: linear-gradient(45deg, #ff8c00, #ff6b35);
            border: none;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 10px;
            font-size: 0.85em;
            transition: all 0.3s;
        }
        #datcn-bypass-ui .datcn-copy:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 140, 0, 0.4);
        }
        #datcn-bypass-ui .datcn-log {
            margin-top: 15px;
            padding: 10px;
            background: rgba(0,0,0,0.4);
            border-radius: 8px;
            max-height: 120px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.75em;
            color: #aaa;
        }
        #datcn-bypass-ui .datcn-log-entry { margin-bottom: 4px; padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        #datcn-bypass-ui .datcn-log-entry.info { color: #fb923c; }
        #datcn-bypass-ui .datcn-log-entry.success { color: #4ade80; }
        #datcn-bypass-ui .datcn-log-entry.error { color: #f87171; }
        #datcn-bypass-ui .datcn-log-entry.bypass { color: #ff8c00; font-weight: bold; }
        #datcn-bypass-ui .datcn-footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid rgba(255, 140, 0, 0.2);
            font-size: 0.8em;
            color: #ff8c00;
            font-weight: bold;
            letter-spacing: 1px;
        }
        #datcn-bypass-ui .datcn-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 25px;
            height: 25px;
            background: rgba(255, 140, 0, 0.2);
            border: none;
            border-radius: 50%;
            color: #ff8c00;
            cursor: pointer;
            font-size: 16px;
            line-height: 1;
            transition: all 0.3s;
        }
        #datcn-bypass-ui .datcn-close:hover {
            background: #ff8c00;
            color: #fff;
        }
        #datcn-bypass-ui ::-webkit-scrollbar { width: 6px; }
        #datcn-bypass-ui ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        #datcn-bypass-ui ::-webkit-scrollbar-thumb { background: #ff8c00; border-radius: 3px; }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create UI
    const ui = document.createElement('div');
    ui.id = 'datcn-bypass-ui';
    ui.innerHTML = `
        <button class="datcn-close" onclick="this.parentElement.remove()">×</button>
        <div class="datcn-header">
            <div class="datcn-title">⚡ BYPASS</div>
            <div class="datcn-subtitle">Taplayma Auto Claim</div>
        </div>
        <div class="datcn-status" id="datcn-step1">
            <span class="datcn-status-icon">1</span>
            <strong>Đang tìm nút 170x54...</strong>
        </div>
        <div class="datcn-status" id="datcn-step2">
            <span class="datcn-status-icon">2</span>
            <strong>Đã click nút!</strong>
        </div>
        <div class="datcn-status" id="datcn-step3">
            <span class="datcn-status-icon">3</span>
            <strong>Đang bypass...</strong>
        </div>
        <div class="datcn-loader">
            <div class="datcn-loader-bar" id="datcn-loader"></div>
        </div>
        <div class="datcn-result" id="datcn-result">
            <div class="datcn-result-label">🎉 MÃ GIFT CODE</div>
            <div class="datcn-code" id="datcn-code">---</div>
            <button class="datcn-copy" id="datcn-copybtn">📋 COPY MÃ</button>
        </div>
        <div class="datcn-log" id="datcn-log"></div>
        <div class="datcn-footer">⚡ Bypass by DatCN ⚡</div>
    `;
    document.body.appendChild(ui);

    // Logger
    function log(msg, type='info') {
        const box = document.getElementById('datcn-log');
        const entry = document.createElement('div');
        entry.className = `datcn-log-entry ${type}`;
        const time = new Date().toLocaleTimeString('vi-VN', {hour12:false});
        entry.textContent = `[${time}] ${msg}`;
        box.appendChild(entry);
        box.scrollTop = box.scrollHeight;
        console.log(`%c[DatCN] ${msg}`, 'color: #ff8c00; font-weight: bold');
    }

    // Status updater
    function setStatus(step, active=true) {
        const el = document.getElementById(`datcn-step${step}`);
        const loader = document.getElementById('datcn-loader');
        if (active) {
            el.classList.add('active');
            loader.classList.add('animate');
        } else {
            el.classList.remove('active');
        }
    }

    // Show result
    function showResult(code) {
        document.getElementById('datcn-code').textContent = code;
        document.getElementById('datcn-result').classList.add('show');
        setStatus(3, false);
        log('✅ THÀNH CÔNG: ' + code, 'success');
    }

    // Copy function
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                log('📋 Đã copy: ' + text, 'success');
                showCopyNotification(text);
            }).catch(err => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                log('📋 Đã copy (fallback): ' + text, 'success');
                showCopyNotification(text);
            } else {
                log('❌ Không thể copy', 'error');
            }
        } catch (err) {
            log('❌ Lỗi copy: ' + err, 'error');
        }
        
        document.body.removeChild(textarea);
    }

    function showCopyNotification(text) {
        alert('✅ Đã copy mã: ' + text);
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff8c00, #ff6b35);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: bold;
            z-index: 1000000;
            animation: slideUp 0.3s ease;
            box-shadow: 0 0 20px rgba(255,140,0,0.5);
        `;
        notification.textContent = '✅ Đã copy: ' + text;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
        
        if (!document.querySelector('#datcn-animations')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'datcn-animations';
            animStyle.textContent = `
                @keyframes slideUp {
                    from { bottom: 0; opacity: 0; }
                    to { bottom: 20px; opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(animStyle);
        }
    }

    // Copy button handler
    document.getElementById('datcn-copybtn').addEventListener('click', function() {
        const code = document.getElementById('datcn-code').textContent;
        if (code && code !== '---') {
            copyToClipboard(code);
        }
    });

    // ===== BYPASS LOGIC =====
    log('Khởi động bypass by DatCN...', 'bypass');

    let giftCode = null;
    let giftToken = null;
    let polling = false;
    const origin = location.origin;
    const referer = location.href;

    function tryStart() {
        if (giftCode && giftToken && !polling) {
            polling = true;
            log(`✓ Đủ dữ liệu - Code: ${giftCode}, Token: ${giftToken}`, 'success');
            setStatus(3);
            startPolling();
        }
    }

    function hook(win) {
        const nativeFetch = win.fetch;
        
        win.fetch = async function(...args) {
            const [url, opt] = args;
            
            if (typeof url === 'string' && url.includes('/step') && opt?.body) {
                try {
                    if (opt.body instanceof FormData) {
                        giftCode = opt.body.get('code');
                    } else if (typeof opt.body === 'string') {
                        const p = new URLSearchParams(opt.body);
                        giftCode = p.get('code');
                    }
                    if (giftCode) {
                        log(`📤 Hook /step - Code: ${giftCode}`, 'info');
                        setStatus(2);
                    }
                } catch(e) {}
            }

            const response = await nativeFetch.apply(this, args);

            if (typeof url === 'string' && url.includes('/step')) {
                try {
                    const cloned = response.clone();
                    const data = await cloned.json();
                    
                    if (data?.success && data.token !== undefined) {
                        giftToken = String(data.token);
                        log(`📥 Response - Token: ${giftToken}`, 'info');
                        tryStart();
                    }
                } catch(e) {}
            }

            return response;
        };

        const xhrOpen = win.XMLHttpRequest.prototype.open;
        win.XMLHttpRequest.prototype.open = function(m, u) {
            this._url = u;
            return xhrOpen.apply(this, arguments);
        };

        const xhrSend = win.XMLHttpRequest.prototype.send;
        win.XMLHttpRequest.prototype.send = function(body) {
            if (this._url?.includes('/step') && body) {
                try {
                    if (body instanceof FormData) {
                        giftCode = body.get('code');
                    } else if (typeof body === 'string') {
                        const p = new URLSearchParams(body);
                        giftCode = p.get('code');
                    }
                    if (giftCode) {
                        log(`📤 XHR /step - Code: ${giftCode}`, 'info');
                        setStatus(2);
                    }
                } catch(e) {}
            }

            this.addEventListener('load', function() {
                if (this._url?.includes('/step')) {
                    try {
                        const data = JSON.parse(this.responseText);
                        if (data?.success && data.token !== undefined) {
                            giftToken = String(data.token);
                            log(`📥 XHR Response - Token: ${giftToken}`, 'info');
                            tryStart();
                        }
                    } catch(e) {}
                }
            });
            
            return xhrSend.apply(this, arguments);
        };
    }

    hook(window);

    // Hook iframe
    new MutationObserver(() => {
        document.querySelectorAll('iframe').forEach(f => {
            try { if (f.contentWindow) hook(f.contentWindow); } catch {}
        });
    }).observe(document.body, { childList: true, subtree: true });

    // Auto click - Tìm nút có kích thước 170x54
    function autoClick() {
        setStatus(1);
        log('🔍 Tìm nút 170x54...', 'info');
        
        const findAndClickButton = () => {
            // Tìm tất cả elements có thể là button
            const elements = [...document.querySelectorAll('button, a, div[role="button"], input[type="button"], input[type="submit"], .btn, .button')];
            
            // Tìm element có kích thước gần với 170x54
            const targetButton = elements.find(el => {
                const rect = el.getBoundingClientRect();
                const width = Math.round(rect.width);
                const height = Math.round(rect.height);
                
                // Cho phép sai số ±2px
                const matchWidth = Math.abs(width - 170) <= 2;
                const matchHeight = Math.abs(height - 54) <= 2;
                
                if (matchWidth && matchHeight) {
                    log(`📐 Tìm thấy element: ${el.tagName} - Kích thước: ${width}x${height}`, 'info');
                    return true;
                }
                return false;
            });

            if (targetButton) {
                const rect = targetButton.getBoundingClientRect();
                log(`🖱️ Đã tìm thấy nút 170x54 tại vị trí: ${Math.round(rect.left)},${Math.round(rect.top)}`, 'bypass');
                
                // Enable và click
                targetButton.disabled = false;
                targetButton.style.pointerEvents = 'auto';
                targetButton.click();
                
                // Click thêm bằng nhiều cách để đảm bảo
                setTimeout(() => {
                    targetButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    targetButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                    targetButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                }, 100);
                
                log('✅ Đã click nút 170x54', 'success');
                return true;
            }
            
            return false;
        };

        // Thử tìm và click ngay
        if (!findAndClickButton()) {
            log('⏳ Chưa tìm thấy nút 170x54, đang theo dõi DOM...', 'info');
            
            // Theo dõi DOM để tìm nút
            const observer = new MutationObserver((mutations) => {
                if (findAndClickButton()) {
                    observer.disconnect();
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
            
            // Timeout sau 10 giây
            setTimeout(() => {
                observer.disconnect();
                log('⚠️ Hết thời gian tìm nút 170x54', 'error');
            }, 10000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoClick);
    } else {
        autoClick();
    }

    function startPolling() {
        let attempts = 0;

        const iv = setInterval(async () => {
            attempts++;
            
            try {
                const res = await fetch('https://api.taplayma.com/continue', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'origin': origin,
                        'referer': referer
                    },
                    body: `code=${encodeURIComponent(giftCode)}&token=${encodeURIComponent(giftToken)}`
                });

                const data = await res.json();
                log(`📤 Continue #${attempts}: ${data.success ? 'OK' : 'WAIT'}`, 'info');

                if (data?.success && data.code) {
                    clearInterval(iv);
                    polling = false;
                    showResult(data.code);
                    return;
                }

                if (data?.message) log(`⏳ ${data.message}`, 'info');

            } catch(e) {
                log(`❌ Lỗi: ${e.message}`, 'error');
            }

        }, 1000);

        // Timeout 5 phút
        setTimeout(() => {
            if (polling) {
                clearInterval(iv);
                polling = false;
                log('⛔ Timeout sau 5 phút', 'error');
            }
        }, 300000);
    }
})();
