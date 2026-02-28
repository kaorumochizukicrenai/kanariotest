const app = {
    init: function() {
        this.navigate('login');
    },

    navigate: function(screenId) {
        this.toggleMenu(false);
        const main = document.getElementById('app-main');
        const header = document.getElementById('app-header');

        if (screenId === 'login') {
            header.style.display = 'none';
        } else {
            header.style.display = 'flex';
        }

        // 画面切り替えアニメーション（再描画による簡易的な再現）
        main.style.opacity = '0';
        setTimeout(() => {
            main.innerHTML = this.getScreenTemplate(screenId);
            main.style.opacity = '1';
        }, 50);

        this.currentScreen = screenId;
        window.scrollTo(0, 0);
    },

    toggleMenu: function(force) {
        const menu = document.getElementById('app-menu');
        if (force !== undefined) {
            menu.style.display = force ? 'block' : 'none';
        } else {
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    },

    logout: function() {
        if (confirm('ログアウトしますか？')) {
            this.navigate('login');
        }
    },

    getScreenTemplate: function(id) {
        const templates = {
            'login': `
                <div class="screen active">
                    <div style="text-align: center; margin-bottom: 40px; margin-top: 60px;">
                        <h1 style="color: var(--brand-main); font-size: 2.5rem;">KanaLio</h1>
                        <p style="color: var(--text-sub);">プロフェッショナル顧客管理システム</p>
                    </div>
                    <div class="card" style="padding: var(--space-large);">
                        <h2 style="text-align: center;">ログイン</h2>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">ログインID</label>
                            <input type="text" value="admin">
                        </div>
                        <div style="margin-bottom: var(--space-large);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">パスワード</label>
                            <input type="password" value="********">
                        </div>
                        <button class="btn" style="width: 100%; padding: var(--space-medium);" onclick="app.navigate('home')">ログイン</button>
                    </div>
                </div>
            `,
            'home': `
                <div class="screen active">
                    <h2>ホーム</h2>
                    <div class="card">
                        <h3>直近1週間の予約</h3>
                        <div style="font-size: 0.9rem;">
                            <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">2026/2/25 10:00～11:00 に予約が入りました</div>
                            <div style="padding: 10px 0;">2026/2/26 14:00～15:00 に予約が入りました</div>
                        </div>
                    </div>
                    <div class="card">
                        <h3>本日の予約</h3>
                        <div class="scroll-area">
                            <table>
                                <thead>
                                    <tr><th>時間</th><th>顧客名</th><th>施術内容</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>10:00</td><td>山田 太郎</td><td>カット</td></tr>
                                    <tr><td>13:00</td><td>佐藤 花子</td><td>カラー</td></tr>
                                    <tr><td>15:30</td><td>鈴木 一郎</td><td>パーマ</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: var(--space-large);">
                        <button class="btn" onclick="app.navigate('reservation-list')">予約管理</button>
                        <button class="btn" onclick="app.navigate('customer-list')">顧客管理</button>
                        <button class="btn" style="grid-column: span 2;" onclick="app.navigate('settings')">システム設定</button>
                    </div>
                </div>
            `,
            'reservation-list': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>予約管理</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('home')">戻る</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <div style="display: flex; gap: 5px;">
                            <button class="btn btn-secondary" style="padding: 4px 10px;">日</button>
                            <button class="btn" style="padding: 4px 10px;">週</button>
                            <button class="btn btn-secondary" style="padding: 4px 10px;">月</button>
                        </div>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn" style="background: var(--accent);" onclick="app.navigate('reservation-search')">検索</button>
                            <button class="btn" onclick="app.navigate('reservation-new')">新規登録</button>
                        </div>
                    </div>
                    <div class="card" style="height: 400px; background: #fafafa; display: flex; align-items: center; justify-content: center; border: 2px dashed var(--light-gray);">
                        <p style="color: var(--text-sub);">[ カレンダー表示エリア ]</p>
                    </div>
                </div>
            `,
            'reservation-search': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>予約検索</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('reservation-list')">戻る</button>
                    </div>
                    <div class="card">
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">キーワード</label>
                            <input type="text" placeholder="予約ID、顧客名、電話番号など">
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">支払い状態</label>
                            <select>
                                <option>すべて</option>
                                <option>未施術</option>
                                <option>支払い済み</option>
                                <option>請求中</option>
                            </select>
                        </div>
                        <button class="btn" style="width: 100%;">検索</button>
                    </div>
                    <div class="card" style="text-align: center; color: var(--text-sub); padding: var(--space-large);">
                        データが見つかりません
                    </div>
                </div>
            `,
            'customer-list': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>顧客管理</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('home')">戻る</button>
                    </div>
                    <div class="card">
                        <input type="text" placeholder="顧客名や電話番号で検索...">
                        <button class="btn" style="width: 100%; margin-top: 10px;">検索</button>
                    </div>
                    <div class="card" style="padding: 0;">
                        <table>
                            <thead>
                                <tr><th>名前</th><th>状態</th><th>最終来店日</th></tr>
                            </thead>
                            <tbody>
                                <tr onclick="app.navigate('customer-detail')" style="cursor:pointer">
                                    <td>山田 太郎<br><span style="font-size: 0.7rem; color: var(--text-sub);">090-1234-5678</span></td>
                                    <td><span style="background: var(--brand-sub); color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem;">済</span></td>
                                    <td>2026/02/20</td>
                                </tr>
                                <tr onclick="app.navigate('customer-detail')" style="cursor:pointer">
                                    <td>佐藤 花子<br><span style="font-size: 0.7rem; color: var(--text-sub);">080-8765-4321</span></td>
                                    <td><span style="background: var(--text-sub); color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem;">未</span></td>
                                    <td>2026/02/15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            'customer-detail': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>顧客詳細</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('customer-list')">戻る</button>
                    </div>
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <h3 style="margin-bottom: 5px;">山田 太郎</h3>
                                <p style="font-size: 0.9rem; color: var(--text-sub);">ID: C001 | 090-1234-5678</p>
                            </div>
                            <span style="background: var(--brand-sub); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem;">同意書締結済み</span>
                        </div>
                        <hr style="margin: var(--space-medium) 0; border: none; border-top: 1px solid #f0f0f0;">
                        <p style="font-size: 0.9rem;"><strong>住所:</strong> 東京都渋谷区道玄坂...</p>
                        <p style="font-size: 0.9rem;"><strong>生年月日:</strong> 1990/05/15</p>
                    </div>
                    <div class="card">
                        <h3>予約履歴</h3>
                        <div style="font-size: 0.9rem;">
                            <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between;">
                                <span>2026/02/20 10:00</span>
                                <span style="color: var(--brand-main);">カット</span>
                            </div>
                            <div style="padding: 10px 0; display: flex; justify-content: space-between;">
                                <span>2026/01/15 14:00</span>
                                <span style="color: var(--brand-main);">カラー</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn" onclick="alert('編集画面へ')">基本情報編集</button>
                        <button class="btn" onclick="app.navigate('counseling-sheet')">カウンセリング</button>
                        <button class="btn btn-secondary" style="grid-column: span 2; background: #ffefef; color: var(--error);" onclick="confirm('削除しますか？')">削除する</button>
                    </div>
                </div>
            `,
            'reservation-new': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>新規予約登録</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('reservation-list')">戻る</button>
                    </div>
                    <div class="card">
                        <div style="margin-bottom: var(--space-medium); display: flex; gap: 20px;">
                            <label><input type="radio" name="type" checked> 初利用</label>
                            <label><input type="radio" name="type"> 2回目以降</label>
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">名前</label>
                            <input type="text" placeholder="顧客名">
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">電話番号</label>
                            <input type="text" placeholder="090-0000-0000">
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">施術内容</label>
                            <select>
                                <option>カット (¥5,000, 1コマ)</option>
                                <option>カラー (¥8,000, 2コマ)</option>
                            </select>
                        </div>
                        <div style="margin-bottom: var(--space-large); display: flex; gap: 10px;">
                            <div style="flex: 1;">
                                <label style="font-size: 0.8rem; color: var(--text-sub);">予約日</label>
                                <input type="date">
                            </div>
                            <div style="flex: 1;">
                                <label style="font-size: 0.8rem; color: var(--text-sub);">予約時間</label>
                                <select><option>10:00</option><option>11:00</option></select>
                            </div>
                        </div>
                        <div style="background: #f9f9f9; padding: var(--space-medium); border-radius: 8px; margin-bottom: var(--space-large);">
                            <p style="display: flex; justify-content: space-between;"><span>概算料金:</span> <strong>¥5,000</strong></p>
                            <p style="display: flex; justify-content: space-between;"><span>終了予定:</span> <strong>11:00</strong></p>
                        </div>
                        <button class="btn" style="width: 100%;" onclick="if(confirm('予約を確定しますか？')) app.navigate('reservation-list')">予約を確定する</button>
                    </div>
                </div>
            `,
            'settings': `
                <div class="screen active">
                    <h2>設定</h2>
                    <div style="display: grid; gap: 15px;">
                        <button class="btn card" style="text-align: left; display: block;" onclick="app.navigate('settings-basic')">
                            <h3 style="margin: 0;">予約基本設定</h3>
                            <p style="font-size: 0.8rem; color: var(--text-sub); margin-top: 5px;">営業時間や単位時間の設定</p>
                        </button>
                        <button class="btn card" style="text-align: left; display: block; background: white;" onclick="alert('施術内容設定へ')">
                            <h3 style="margin: 0;">施術内容＆料金＆時間設定</h3>
                            <p style="font-size: 0.8rem; color: var(--text-sub); margin-top: 5px;">メニューマスタの管理</p>
                        </button>
                        <button class="btn card" style="text-align: left; display: block; background: white;" onclick="alert('同意書内容修正へ')">
                            <h3 style="margin: 0;">同意書内容修正</h3>
                            <p style="font-size: 0.8rem; color: var(--text-sub); margin-top: 5px;">同意書テンプレートの編集</p>
                        </button>
                        <button class="btn card" style="text-align: left; display: block; background: white;" onclick="alert('カウンセリング項目変更へ')">
                            <h3 style="margin: 0;">カウンセリング項目変更</h3>
                            <p style="font-size: 0.8rem; color: var(--text-sub); margin-top: 5px;">入力項目のカスタマイズ</p>
                        </button>
                    </div>
                </div>
            `,
            'settings-basic': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>基本設定</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('settings')">戻る</button>
                    </div>
                    <div class="card">
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">1コマの時間 (分)</label>
                            <input type="number" value="60">
                        </div>
                        <div style="margin-bottom: var(--space-medium); display: flex; gap: 10px;">
                            <div style="flex: 1;">
                                <label style="font-size: 0.8rem; color: var(--text-sub);">開店時間</label>
                                <input type="time" value="10:00">
                            </div>
                            <div style="flex: 1;">
                                <label style="font-size: 0.8rem; color: var(--text-sub);">閉店時間</label>
                                <input type="time" value="20:00">
                            </div>
                        </div>
                        <div style="margin-bottom: var(--space-large);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">休業日設定</label>
                            <div style="height: 100px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">[ カレンダー ]</div>
                        </div>
                        <button class="btn" style="width: 100%;" onclick="alert('設定を保存しました')">設定を保存する</button>
                    </div>
                </div>
            `,
            'counseling-sheet': `
                <div class="screen active">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-medium);">
                        <h2>カウンセリングシート</h2>
                        <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="app.navigate('customer-detail')">戻る</button>
                    </div>
                    <div style="background: #e8f5e9; color: #2e7d32; padding: 10px; border-radius: 8px; font-size: 0.8rem; margin-bottom: var(--space-medium); text-align: center;">
                        入力内容は自動的に保存されています
                    </div>
                    <div class="card">
                        <h3>基本情報</h3>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">名前</label>
                            <input type="text" value="山田 太郎">
                        </div>
                    </div>
                    <div class="card">
                        <h3>カウンセリング項目</h3>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">お悩み・気になること</label>
                            <textarea rows="4">肩こりがひどく、最近は頭痛もします。</textarea>
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">ご来店のきっかけ</label>
                            <select>
                                <option>Instagram</option>
                                <option>知人の紹介</option>
                                <option>HPを見て</option>
                            </select>
                        </div>
                    </div>
                </div>
            `,
            'profile': `
                <div class="screen active">
                    <h2>アカウント設定</h2>
                    <div class="card">
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">新しいログインID</label>
                            <input type="text" value="admin">
                        </div>
                        <div style="margin-bottom: var(--space-medium);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">新しいパスワード</label>
                            <input type="password">
                        </div>
                        <div style="margin-bottom: var(--space-large);">
                            <label style="font-size: 0.8rem; color: var(--text-sub);">パスワード確認</label>
                            <input type="password">
                        </div>
                        <button class="btn" style="width: 100%;" onclick="alert('ログイン情報を変更しました')">プロフィールを更新する</button>
                    </div>
                </div>
            `
        };
        return templates[id] || `<h2>画面が見つかりませんでした: ${id}</h2>`;
    }
};

window.onload = () => app.init();
