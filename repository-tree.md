# TradeWizeComponent Repository Tree Structure

```
.
├── .editorconfig
├── .gitattributes
├── .github
│   ├── actions
│   │   └── setup
│   │       └── action.yml
│   ├── ISSUE_TEMPLATE
│   │   ├── bug_report.yml
│   │   └── config.yml
│   └── workflows
│       └── ci.yml
├── .gitignore
├── .nvmrc
├── .vscode
│   └── .react
├── .watchmanconfig
├── .yarnrc.yml
├── android
│   ├── build.gradle
│   ├── gradle.properties
│   └── src
│       └── main
│           ├── AndroidManifest.xml
│           ├── AndroidManifestNew.xml
│           └── java
│               └── com
│                   └── tradewize
│                       ├── TradeWizeComponentModule.kt
│                       └── TradeWizeComponentPackage.kt
├── babel.config.js
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── example
│   ├── .watchmanconfig
│   ├── android
│   │   ├── app
│   │   │   ├── build.gradle
│   │   │   ├── debug.keystore
│   │   │   ├── proguard-rules.pro
│   │   │   └── src
│   │   │       ├── debug
│   │   │       │   └── AndroidManifest.xml
│   │   │       └── main
│   │   │           ├── AndroidManifest.xml
│   │   │           ├── java
│   │   │           │   └── tradewize
│   │   │           │       └── example
│   │   │           │           ├── MainActivity.kt
│   │   │           │           └── MainApplication.kt
│   │   │           └── res
│   │   │               ├── drawable
│   │   │               │   └── rn_edit_text_material.xml
│   │   │               ├── mipmap-hdpi
│   │   │               │   ├── ic_launcher_round.png
│   │   │               │   └── ic_launcher.png
│   │   │               ├── mipmap-mdpi
│   │   │               │   ├── ic_launcher_round.png
│   │   │               │   └── ic_launcher.png
│   │   │               ├── mipmap-xhdpi
│   │   │               │   ├── ic_launcher_round.png
│   │   │               │   └── ic_launcher.png
│   │   │               ├── mipmap-xxhdpi
│   │   │               │   ├── ic_launcher_round.png
│   │   │               │   └── ic_launcher.png
│   │   │               ├── mipmap-xxxhdpi
│   │   │               │   ├── ic_launcher_round.png
│   │   │               │   └── ic_launcher.png
│   │   │               └── values
│   │   │                   ├── strings.xml
│   │   │                   └── styles.xml
│   │   ├── build.gradle
│   │   ├── gradle
│   │   │   └── wrapper
│   │   │       ├── gradle-wrapper.jar
│   │   │       └── gradle-wrapper.properties
│   │   ├── gradle.properties
│   │   ├── gradlew
│   │   ├── gradlew.bat
│   │   └── settings.gradle
│   ├── app.json
│   ├── babel.config.js
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── index.js
│   ├── ios
│   │   ├── .DS_Store
│   │   ├── .xcode.env
│   │   ├── .xcode.env.local
│   │   ├── build
│   │   │   └── generated
│   │   │       └── ios
│   │   │           ├── RCTAppDependencyProvider.h
│   │   │           ├── RCTAppDependencyProvider.mm
│   │   │           ├── RCTModuleProviders.h
│   │   │           ├── RCTModuleProviders.mm
│   │   │           ├── RCTModulesConformingToProtocolsProvider.h
│   │   │           ├── RCTModulesConformingToProtocolsProvider.mm
│   │   │           ├── RCTThirdPartyComponentsProvider.h
│   │   │           ├── RCTThirdPartyComponentsProvider.mm
│   │   │           ├── RCTUnstableModulesRequiringMainQueueSetupProvider.h
│   │   │           ├── RCTUnstableModulesRequiringMainQueueSetupProvider.mm
│   │   │           ├── ReactAppDependencyProvider.podspec
│   │   │           └── ReactCodegen.podspec
│   │   ├── Podfile
│   │   ├── Podfile.lock
│   │   ├── TradeWizeComponentExample
│   │   │   ├── AppDelegate.swift
│   │   │   ├── Images.xcassets
│   │   │   │   ├── AppIcon.appiconset
│   │   │   │   │   └── Contents.json
│   │   │   │   └── Contents.json
│   │   │   ├── Info.plist
│   │   │   ├── LaunchScreen.storyboard
│   │   │   └── PrivacyInfo.xcprivacy
│   │   ├── TradeWizeComponentExample.xcodeproj
│   │   │   ├── project.pbxproj
│   │   │   ├── project.xcworkspace
│   │   │   │   └── xcshareddata
│   │   │   │       └── swiftpm
│   │   │   │           └── configuration
│   │   │   └── xcshareddata
│   │   │       └── xcschemes
│   │   │           └── TradeWizeComponentExample.xcscheme
│   │   └── TradeWizeComponentExample.xcworkspace
│   │       ├── contents.xcworkspacedata
│   │       ├── xcshareddata
│   │       │   └── swiftpm
│   │       │       └── configuration
│   │       └── xcuserdata
│   │           └── hmdev02.xcuserdatad
│   │               └── UserInterfaceState.xcuserstate
│   ├── jest.config.js
│   ├── metro.config.js
│   ├── package.json
│   ├── react-native.config.js
│   ├── README.md
│   └── src
│       └── App.tsx
├── ios
│   ├── TradeWizeComponent-Bridging-Header.h
│   ├── TradeWizeComponent.mm
│   └── TradeWizeComponent.swift
├── lefthook.yml
├── lib
│   ├── commonjs
│   │   ├── ButtonBase
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── ButtonSwitchToggle
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── CheckBox
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── Collaspe
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── Input
│   │   │   ├── FlatInput.js
│   │   │   ├── FlatInput.js.map
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── OutlinedInput.js
│   │   │   ├── OutlinedInput.js.map
│   │   │   └── README.md
│   │   ├── InputBase
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── RadioButton
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── ScrollTabView
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   └── TabView
│   │       ├── index.js
│   │       ├── index.js.map
│   │       └── README.md
│   ├── module
│   │   ├── ButtonBase
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── ButtonSwitchToggle
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── CheckBox
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── Collaspe
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── Input
│   │   │   ├── FlatInput.js
│   │   │   ├── FlatInput.js.map
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── OutlinedInput.js
│   │   │   ├── OutlinedInput.js.map
│   │   │   └── README.md
│   │   ├── InputBase
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── RadioButton
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   ├── ScrollTabView
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   └── README.md
│   │   └── TabView
│   │       ├── index.js
│   │       ├── index.js.map
│   │       └── README.md
│   └── typescript
│       └── src
│           ├── ButtonBase
│           │   └── index.d.ts
│           ├── ButtonSwitchToggle
│           │   └── index.d.ts
│           ├── CheckBox
│           │   └── index.d.ts
│           ├── Collaspe
│           │   └── index.d.ts
│           ├── index.d.ts
│           ├── Input
│           │   ├── FlatInput.d.ts
│           │   ├── index.d.ts
│           │   └── OutlinedInput.d.ts
│           ├── InputBase
│           │   └── index.d.ts
│           ├── RadioButton
│           │   └── index.d.ts
│           ├── ScrollTabView
│           │   └── index.d.ts
│           └── TabView
│               └── index.d.ts
├── LICENSE
├── package.json
├── README.md
├── src
│   ├── ButtonBase
│   │   ├── index.tsx
│   │   └── README.md
│   ├── ButtonSwitchToggle
│   │   ├── index.tsx
│   │   └── README.md
│   ├── CheckBox
│   │   ├── index.tsx
│   │   └── README.md
│   ├── Collaspe
│   │   ├── index.tsx
│   │   └── README.md
│   ├── index.tsx
│   ├── Input
│   │   ├── FlatInput.tsx
│   │   ├── index.tsx
│   │   ├── OutlinedInput.tsx
│   │   └── README.md
│   ├── InputBase
│   │   ├── index.tsx
│   │   └── README.md
│   ├── RadioButton
│   │   ├── index.tsx
│   │   └── README.md
│   ├── ScrollTabView
│   │   ├── index.tsx
│   │   └── README.md
│   └── TabView
│       ├── index.tsx
│       └── README.md
├── tradewize.podspec
├── tsconfig.build.json
├── tsconfig.json
├── turbo.json
└── yarn.lock

97 directories, 196 files
```

## Repository Overview

This is a **React Native component library** called **TradeWizeComponent** that provides reusable UI components for React Native applications.

### Key Directories:

- **`src/`** - Source code for all React Native components
- **`lib/`** - Built/compiled versions of the components in different formats:
  - `commonjs/` - CommonJS format
  - `module/` - ES6 module format
  - `typescript/` - TypeScript declaration files
- **`example/`** - Example React Native app demonstrating the components
- **`android/`** - Android native module implementation
- **`ios/`** - iOS native module implementation

### Main Components:

1. **ButtonBase** - Base button component
2. **ButtonSwitchToggle** - Toggle switch button
3. **CheckBox** - Checkbox component
4. **Collaspe** - Collapsible component
5. **Input** - Input components (FlatInput, OutlinedInput)
6. **InputBase** - Base input component
7. **RadioButton** - Radio button component
8. **ScrollTabView** - Scrollable tab view
9. **TabView** - Tab view component

### Build System:

- Uses **Turbo** for monorepo management
- **TypeScript** for type safety
- **Babel** for JavaScript compilation
- **Yarn** for package management

### Platform Support:

- **iOS** - Native Swift/Objective-C implementation
- **Android** - Native Kotlin implementation
- **React Native** - Cross-platform JavaScript/TypeScript components

---

_Generated on: $(date)_
_Total: 97 directories, 196 files_
