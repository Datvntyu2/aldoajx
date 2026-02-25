(function() {
    'use strict';
    
    const API_COMPLETE = 'https://services.traffictot.com/api/campaign/completed-cooldown';
    
    const log = (msg, type = 'info') => {
        const styles = {
            info: 'background: linear-gradient(90deg, #FF6600, #FF9900); color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);',
            wait: 'background: linear-gradient(90deg, #FF8800, #FFAA33); color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);',
            done: 'background: linear-gradient(90deg, #00CC66, #00FF88); color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);',
            error: 'background: linear-gradient(90deg, #CC3300, #FF5500); color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);'
        };
        const icons = {
            info: '🔸',
            wait: '⏳',
            done: '✅',
            error: '❌'
        };
        console.log(`%c[datcn] ${icons[type]} ${msg}`, `${styles[type]} font-weight: bold; padding: 6px 12px; border-radius: 6px; font-family: 'Segoe UI', sans-serif; font-size: 13px;`);
    };
    
    // Hook fetch
    const originalFetch = window.fetch;
    window.fetch = async function(url, options = {}) {
        // Bắt request POST đến /api/campaign/get
        if (url.includes('/api/campaign/get') && options.method === 'POST') {
            log('Bắt được request GET', 'info');
            
            // Clone body trước khi gọi fetch (vì body chỉ đọc được 1 lần)
            let capturedPayload = null;
            if (options.body) {
                capturedPayload = typeof options.body === 'string' 
                    ? options.body 
                    : JSON.stringify(options.body);
            }
            
            try {
                // Gọi fetch gốc trước
                const response = await originalFetch.apply(this, arguments);
                
                // Sau khi có response, gọi complete ngay lập tức
                if (capturedPayload) {
                    completeTask(capturedPayload);
                }
                
                return response;
            } catch (error) {
                log('Fetch gốc lỗi: ' + error.message, 'error');
                throw error;
            }
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    // Complete task ngay lập tức
    async function completeTask(payloadString) {
        if (!payloadString) {
            log('Không có payload!', 'error');
            return;
        }
        
        log('Đang gửi complete...', 'wait');
        
        try {
            // Parse và cập nhật timestamp
            const payload = JSON.parse(payloadString);
            payload.timestamp = Date.now();
            
            const res = await fetch(API_COMPLETE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await res.json();
            
            if (data.success && data.code) {
                log('Mã: ' + data.code, 'done');
                showSuccess(data.code, data.message);
            } else {
                log('Lỗi: ' + (data.message || data.status || 'Unknown'), 'error');
            }
        } catch(e) {
            log('Lỗi: ' + e.message, 'error');
        }
    }
    
    // Hiển thị thành công
    function showSuccess(code, message) {
        // Xóa popup cũ nếu có
        const oldPopup = document.getElementById('datcn-popup');
        if (oldPopup) oldPopup.remove();
        
        const div = document.createElement('div');
        div.id = 'datcn-popup';
        div.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(145deg, #1a0a00, #2d1b0f);
                color: #FF6600;
                padding: 40px;
                border-radius: 20px;
                border: 3px solid #FF6600;
                box-shadow: 0 0 80px rgba(255, 102, 0, 0.6), inset 0 0 30px rgba(255, 102, 0, 0.1);
                z-index: 99999;
                text-align: center;
                min-width: 400px;
                font-family: 'Segoe UI', 'Courier New', monospace;
                animation: datcnPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
                <style>
                    @keyframes datcnPop {
                        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    }
                    @keyframes datcnGlow {
                        0%, 100% { box-shadow: 0 0 80px rgba(255, 102, 0, 0.6); }
                        50% { box-shadow: 0 0 100px rgba(255, 140, 0, 0.9); }
                    }
                </style>
                <div style="font-size: 60px; margin-bottom: 10px; animation: datcnGlow 2s infinite;">🎯</div>
                <div style="font-size: 14px; color: #FF9944; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 4px; font-weight: bold;">
                    [datcn] MISSION COMPLETE
                </div>
                <div style="font-size: 16px; color: #ffcc99; margin-bottom: 20px; font-weight: 500;">
                    ${message || 'Hoàn thành nhiệm vụ!'}
                </div>
                <div style="
                    background: linear-gradient(145deg, rgba(255, 102, 0, 0.2), rgba(255, 140, 0, 0.1));
                    border: 3px solid #FF6600;
                    border-radius: 15px;
                    padding: 25px;
                    font-size: 36px;
                    letter-spacing: 6px;
                    font-weight: bold;
                    color: #FF6600;
                    margin: 20px 0;
                    text-shadow: 0 0 20px rgba(255, 102, 0, 0.8);
                    font-family: 'Courier New', monospace;
                    animation: datcnGlow 1.5s infinite;
                ">${code}</div>
                <button id="datcn-copy-btn" style="
                    padding: 15px 50px;
                    background: linear-gradient(90deg, #FF6600, #FF9900);
                    color: #fff;
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 18px;
                    text-transform: uppercase;
                    transition: all 0.3s;
                    box-shadow: 0 5px 20px rgba(255, 102, 0, 0.4);
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(255, 102, 0, 0.6)'" 
                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(255, 102, 0, 0.4)'">
                    📋 COPY NGAY
                </button>
                <div style="margin-top: 20px; font-size: 11px; color: #aa6644;">
                    [datcn] auto-generated • ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;
        document.body.appendChild(div);
        
        // Thêm event listener cho button thay vì inline onclick
        document.getElementById('datcn-copy-btn').addEventListener('click', function() {
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '✅ ĐÃ COPY';
                this.style.background = 'linear-gradient(90deg, #00aa44, #00cc66)';
            }).catch(err => {
                log('Copy failed: ' + err, 'error');
            });
        });
        
        // Auto copy
        navigator.clipboard.writeText(code).then(() => {
            log('Đã auto-copy: ' + code, 'done');
        }).catch(() => {
            log('Auto-copy failed (có thể do permission)', 'error');
        });
    }
    
    log('Script sẵn sàng - Chờ request GET để instant complete...', 'info');
    
})();
