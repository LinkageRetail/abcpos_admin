# Quasar App

npm install -g vue-cli
npm install -g quasar-cli

# RUN dev mode
quasar dev

# mode list
quasar mode ls 

# cordova command
cd src-cordova
cordova requirements


# 开发
# 使用一个选定的Quasary主题(Android平台下):
$ quasar dev -m cordova -T android -t mat

# 使用特定的模拟器（--emulator，-e）
$ quasar dev -m cordova -T android -e iPhone-7

# Build 
$ quasar build -m cordova -T android -t mat

cordova run android

#Debug
注意：
为了能够在设备仿真器上或直接在手机上进行开发（包括Hot Module Reload），Quasar CLI遵循以下步骤：
检测您的机器的外部IP地址。如果检测到多个此类IP，则会要求您选择一个。如果您要使用手机进行开发，请选择可通过手机/平板电脑ping通的计算机的IP地址。
在你的机器上启动一个开发服务器。
暂时更改/src-cordova/config.xml中的<content/>标记指向之前检测到的IP。这允许应用程序连接到开发服务器
使用Cordova CLI临时更改config.xml构建原生APP。
Cordova CLI会检查手机/平板电脑是否连接到您的开发机器。如果是，它会在其上安装开发版应用程序。如果找不到，那么它启动一个模拟器并运行开发版应用程序。
最后，它恢复对/src-cordova/config.xml所做的临时更改。

如果出现Reason: no suitable image found.解决办法如下：
I ran into this issue with XCode 9. Nothing of the above worked out. This did the trick for me:
Project > Build Settings > Swift Compiler - Search Path: Setting "Import Paths" to $(PROJECT_DIR) (recursive)

ios :
buid:
sudo npm install -g ios-deploy --unsafe-perm=true

qrscanner plugin 要改代码 swift升级引起的

高版本android无法访问网络：
1. whiteist插件
2. config.xml加入如下内容：
    <platform name="android">
           <allow-intent href="market:*" />
           <splash src="res/screen/android/splash.png" />
           <config-file parent="/*" target="AndroidManifest.xml">
               <uses-permission android:name="android.permission.INTERNET" />
           </config-file>
         <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
           <activity android:usesCleartextTraffic="true" />
         </edit-config>
    </platform>
3. index.html的header中必须加 <meta http-equiv="Content-Security-Policy"
参考：https://github.com/apache/cordova-plugin-whitelist#content-security-policy

barcode scanner 插件在android下crash的解决办法：
platform/android.json中增加下面设置，将zxing的activity加入到AndroidMainifest.xml:
  "application": [
            {
              "xml": "<activity android:name=\"com.google.zxing.client.android.CaptureActivity\" ></activity>",
              "count": 1
            },
            ...
 

4. state数据同步到localstorage：
https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
