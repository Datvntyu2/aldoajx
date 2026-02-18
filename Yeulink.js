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
            <div class="datcn-subtitle">YeuLink Auto Claim</div>
        </div>
        <div class="datcn-status" id="datcn-step1">
            <span class="datcn-status-icon">1</span>
            <strong>Đang tìm nút...</strong>
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
            <button class="datcn-copy" onclick="document.getElementById('datcn-copybtn').click()">📋 COPY MÃ</button>
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
        
        // Auto copy
        try {
            navigator.clipboard.writeText(code);
            log('📋 Auto copied!', 'success');
        } catch(e) {}
    }

    // Copy button handler
    window.datcnCopy = function() {
        const code = document.getElementById('datcn-code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            log('📋 Copied: ' + code, 'success');
            alert('✅ Đã copy: ' + code);
        });
    };

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
            
            // Hook request để lấy code
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

            // Hook response để lấy token
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

        // XHR hook
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

    // Auto click
    function autoClick() {
        setStatus(1);
        log('🔍 Tìm nút gift...', 'info');
        
        const tryClick = () => {
            const btns = [...document.querySelectorAll('button:not([disabled])')];
            const btn = btns.find(b => {
                const text = b.textContent.toLowerCase();
                const bg = getComputedStyle(b).backgroundColor;
                return text.includes('nhận') || text.includes('claim') || 
                       text.includes('gift') || text.includes('lấy') ||
                       text.includes('mã') || text.includes('code') ||
                       bg.includes('13, 148') || bg.includes('34, 197') || 
                       bg.includes('59, 130') || bg.includes('255, 140');
            });

            if (btn) {
                log(`🖱️ Đã click: "${btn.textContent.trim()}"`, 'bypass');
                btn.disabled = false;
                btn.style.pointerEvents = 'auto';
                btn.click();
                return true;
            }
            return false;
        };

        if (!tryClick()) {
            const obs = new MutationObserver(() => {
                if (tryClick()) obs.disconnect();
            });
            obs.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => obs.disconnect(), 5000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoClick);
    } else {
        autoClick();
    }

    function startPolling() {
        let attempts = 0;
        const maxAttempts = 20;

        const iv = setInterval(async () => {
            attempts++;
            
            try {
                const res = await fetch('https://yeulink.com/continue', {
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

            if (attempts >= maxAttempts) {
                clearInterval(iv);
                polling = false;
                log('⛔ Hết lần thử', 'error');
            }

        }, 1000);

        setTimeout(() => {
            if (polling) {
                clearInterval(iv);
                polling = false;
                log('⛔ Timeout', 'error');
            }
        }, 30000);
    }
})();
