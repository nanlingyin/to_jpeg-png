# to_jpeg-png | 图片格式转换器

<div align="center">

![Logo](ComfyUI_00174_.png)

**A fast and easy-to-use image format converter for Adobe Stock**

**专为 Adobe Stock 设计的快速图片格式转换工具**

[English](#english) | [中文](#chinese)

</div>

---

<a name="english"></a>
## 🌟 English

### 📖 Introduction

**to_jpeg-png** is a web-based image format converter specifically designed for Adobe Stock creators and photographers. It enables quick batch conversion of various image formats to JPEG or PNG without requiring any software installation. All processing is done locally in your browser, ensuring your images remain private and secure.

### ✨ Features

- 🖼️ **Multiple Format Support**: Supports JPG, PNG, GIF, BMP, WebP, and more
- 🚀 **Batch Processing**: Convert multiple images simultaneously
- 🎨 **Quality Control**: Adjustable JPEG compression quality (10%-100%)
- 📦 **Batch Download**: Download all converted images as a ZIP file
- 🔒 **Privacy First**: All processing happens locally in your browser
- 💫 **Drag & Drop**: Easy file upload via drag and drop
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎯 **No Installation**: Pure web-based application, no software required

### 🚀 Quick Start

#### Method 1: Direct Use
1. Open `index.html` in your browser
2. Drag and drop your images or click to select files
3. Choose output format (PNG or JPEG)
4. Adjust JPEG quality if needed
5. Click "Start Batch Conversion"
6. Download individual files or batch download as ZIP

#### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Then open http://localhost:8000 in your browser
```

### 📋 Usage Guide

#### Single File Upload
- Click the upload area
- Select one or more image files
- Click "Convert"

#### Batch Upload (Drag & Drop)
- Select multiple images in Windows File Explorer
- Drag them directly to the webpage
- Release to upload all files at once

#### Batch Download
- After conversion completes
- Click "Batch Download All Files"
- All images will be packaged into a single ZIP file

### 💻 Technical Stack

- **HTML5**: Canvas API for image processing
- **CSS3**: Modern UI with glassmorphism effects
- **JavaScript (ES6+)**: Core functionality
- **JSZip**: For batch file packaging

### 🎨 UI Features

- Beautiful anime-style design
- Glassmorphism (frosted glass) effects
- Custom background support
- Smooth animations and transitions
- Intuitive user interface

### 📁 Project Structure

```
to_jpeg-png/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with anime theme
├── script.js           # Core JavaScript functionality
├── 133535742_p0.png    # Background image
└── ComfyUI_00174_.png  # Favicon icon
```

### 🔧 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 📝 Notes

- Recommended for images under 50MB for optimal performance
- Batch processing speed depends on image size and quantity
- All processing is done client-side, no server upload required

### 📄 License

This project is open source and available for personal and commercial use.

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

<a name="chinese"></a>
## 🌟 中文

### 📖 项目简介

**to_jpeg-png** 是一款专为 Adobe Stock 创作者和摄影师设计的网页版图片格式转换工具。它能够快速批量转换各种图片格式为 JPEG 或 PNG，无需安装任何软件。所有处理都在浏览器本地完成，确保您的图片隐私和安全。

### ✨ 功能特点

- 🖼️ **多格式支持**：支持 JPG、PNG、GIF、BMP、WebP 等多种格式
- 🚀 **批量处理**：可同时转换多张图片
- 🎨 **质量控制**：可调节 JPEG 压缩质量（10%-100%）
- 📦 **批量下载**：一键打包下载所有转换后的图片
- 🔒 **隐私优先**：所有处理都在浏览器本地完成
- 💫 **拖拽上传**：支持拖拽文件快速上传
- 📱 **响应式设计**：支持桌面端和移动端
- 🎯 **无需安装**：纯网页应用，开箱即用

### 🚀 快速开始

#### 方式一：直接使用
1. 在浏览器中打开 `index.html` 文件
2. 拖拽图片到页面或点击选择文件
3. 选择输出格式（PNG 或 JPEG）
4. 如需要可调整 JPEG 质量
5. 点击"开始批量转换"
6. 单独下载或批量打包下载

#### 方式二：本地服务器（推荐）
```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000

# 然后在浏览器中打开 http://localhost:8000
```

### 📋 使用说明

#### 单文件上传
- 点击上传区域
- 选择一个或多个图片文件
- 点击转换

#### 批量上传（拖拽）
- 在 Windows 文件管理器中选中多个图片
- 直接拖拽到网页中
- 松开鼠标即可批量导入

#### 批量下载
- 转换完成后
- 点击"批量下载所有文件"按钮
- 所有图片将打包成一个 ZIP 文件

### 💻 技术栈

- **HTML5**：Canvas API 进行图片处理
- **CSS3**：现代化 UI 与毛玻璃效果
- **JavaScript (ES6+)**：核心功能实现
- **JSZip**：批量文件打包

### 🎨 界面特色

- 精美的二次元风格设计
- 毛玻璃（磨砂玻璃）特效
- 自定义背景图支持
- 流畅的动画过渡效果
- 直观的用户界面

### 📁 项目结构

```
to_jpeg-png/
├── index.html          # 主 HTML 文件
├── styles.css          # 二次元风格样式表
├── script.js           # 核心 JavaScript 功能
├── 133535742_p0.png    # 背景图片
└── ComfyUI_00174_.png  # 网站图标
```

### 🔧 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 📝 注意事项

- 建议单张图片大小不超过 50MB 以获得最佳性能
- 批量处理速度取决于图片大小和数量
- 所有处理均在客户端完成，无需上传到服务器

### 📄 开源协议

本项目为开源项目，可用于个人和商业用途。

### 🤝 贡献

欢迎提交问题报告、功能请求和代码贡献！

---

<div align="center">

**Made with ❤️ for Adobe Stock Creators**

**为 Adobe Stock 创作者用心打造**

</div>
