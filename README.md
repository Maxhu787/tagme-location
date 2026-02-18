<div align=center>

<picture>
  <img alt="Tagme Logo" src="assets/readme-logo.png" width="280" style=margin-bottom:1rem />
</picture>

Tagme - 好友即時定位手機軟體

</div>

---

- 前端：React Native, Expo
- 後端：Supabase (資料庫 & auth), Supabase edge functions
- 其它：Maplibre (地圖套件)

一個用 React Native 打造的手機 app，加好友並開啟定位，即可看見好友即時定位，支援 Android 和 IOS。

## 功能

- 使用者註冊／登入 (Google 登入)
- 好友即時定位、隱形模式
- 個人檔案 (頭貼、自介、國家等)
- 加好友、好友申請通知

## 快速開始

### 1) git clone 並安裝依賴
```
npm install
```

### 2) 啟動 supabase
需先安裝 docker
```
supabase start
```

### 3) 啟動開發環境
需先安裝 Android Studio
```
npm run prebuild
npm run android
```

## Screenshots

> 開發畫面、supabase資料庫 <br/>
<img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/dev.png?raw=true" style="width: 300px;" /><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/supabase.png?raw=true" style="width: 300px; margin-left: 20px;"/>

> 個人檔案、編輯個人檔案畫面 <br/>
<img src="./screenshots/boarding.png" style="height: 300px; border-radius: 17px;" /><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/profile.png?raw=true" style="height: 300px; border-radius: 17px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/edit.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 17px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/field.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 17px;"/>

> 地圖、設定 <br/>
<img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/map.png?raw=true" style="height: 300px; border-radius: 17px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/zoomedout.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 200px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/settings.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 17px;"/>
    
> 加好友、好友申請通知、好友欄 <br/>
<img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/addfriend.png?raw=true" style="height: 300px; border-radius: 17px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/notif.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 17px;"/><img src="https://github.com/Maxhu787/tagme-location/blob/main/screenshots/bottomsheet.png?raw=true" style="height: 300px; margin-left: 12px; border-radius: 17px;"/>
    
For questions or feedback, you can contact me via social links on my website [g4o2.com](https://g4o2.com).<br/>
如有任何疑問或回饋，可以透過我的網站上的社群連結與我聯繫 [g4o2.com](https://g4o2.com)。<br/>
