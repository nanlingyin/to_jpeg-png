class ImageConverter {
    constructor() {
        this.files = [];
        this.convertedResults = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupDragAndDrop();
    }

    bindEvents() {
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const convertBtn = document.getElementById('convertBtn');
        const qualitySlider = document.getElementById('quality');
        const qualityValue = document.getElementById('qualityValue');
        const formatRadios = document.querySelectorAll('input[name="format"]');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const addMoreBtn = document.getElementById('addMoreBtn');
        const downloadAllBtn = document.getElementById('downloadAllBtn');

        // 文件选择事件
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFiles(e.target.files);
                // 清空input值，允许重复选择相同文件
                e.target.value = '';
            }
        });

        // 上传区域点击事件 - 修复：阻止事件冒泡到子元素
        uploadArea.addEventListener('click', (e) => {
            // 如果点击的不是input本身，才触发input点击
            if (e.target !== fileInput) {
                e.stopPropagation();
                fileInput.click();
            }
        });

        // 转换按钮事件
        convertBtn.addEventListener('click', () => {
            this.convertImages();
        });

        // 质量滑块事件
        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
        });

        // 格式选择事件
        formatRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.toggleQualitySelector(e.target.value === 'jpeg');
            });
        });

        // 清空所有文件
        clearAllBtn.addEventListener('click', () => {
            this.clearAllFiles();
        });

        // 添加更多文件
        addMoreBtn.addEventListener('click', () => {
            fileInput.click();
        });

        // 批量下载所有文件
        downloadAllBtn.addEventListener('click', () => {
            this.downloadAllFiles();
        });
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        const container = document.querySelector('.container');

        // 为整个容器设置拖拽监听，提高拖拽区域
        [uploadArea, container, document.body].forEach(element => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                element.addEventListener(eventName, this.preventDefaults, false);
            });
        });

        // 当文件拖拽进入页面时的视觉反馈
        ['dragenter', 'dragover'].forEach(eventName => {
            document.body.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
                document.body.classList.add('drag-active');
            }, false);
        });

        // 当文件拖拽离开页面时移除视觉反馈
        ['dragleave'].forEach(eventName => {
            document.body.addEventListener(eventName, (e) => {
                // 只有当真正离开页面时才移除样式
                if (e.clientX === 0 && e.clientY === 0) {
                    uploadArea.classList.remove('drag-over');
                    document.body.classList.remove('drag-active');
                }
            }, false);
        });

        // 处理文件拖拽放置
        ['drop'].forEach(eventName => {
            [uploadArea, container, document.body].forEach(element => {
                element.addEventListener(eventName, (e) => {
                    uploadArea.classList.remove('drag-over');
                    document.body.classList.remove('drag-active');
                    
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                        this.handleFiles(files, true); // 传入true表示是追加模式
                    }
                }, false);
            });
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFiles(fileList, append = false) {
        const newFiles = Array.from(fileList).filter(file => {
            return file.type.startsWith('image/');
        });

        if (newFiles.length === 0) {
            alert('请选择至少一个图片文件！');
            return;
        }

        // 如果是追加模式，将新文件添加到现有文件列表
        if (append && this.files.length > 0) {
            // 过滤掉重复的文件（基于文件名和大小）
            const filteredNewFiles = newFiles.filter(newFile => {
                return !this.files.some(existingFile => 
                    existingFile.name === newFile.name && 
                    existingFile.size === newFile.size
                );
            });
            
            this.files = [...this.files, ...filteredNewFiles];
            
            if (filteredNewFiles.length !== newFiles.length) {
                const duplicateCount = newFiles.length - filteredNewFiles.length;
                alert(`已过滤 ${duplicateCount} 个重复文件`);
            }
        } else {
            this.files = newFiles;
        }

        if (this.files.length === 0) {
            alert('没有新的文件被添加！');
            return;
        }

        this.showFileList();
        this.showConversionOptions();
        this.updateUploadAreaText();
    }

    showFileList() {
        const fileListArea = document.getElementById('fileListArea');
        const fileList = document.getElementById('fileList');
        const fileCount = document.getElementById('fileCount');
        
        fileListArea.style.display = 'block';
        fileListArea.classList.add('fade-in');
        
        fileCount.textContent = this.files.length;
        fileList.innerHTML = '';
        
        this.files.forEach((file, index) => {
            const fileItem = this.createFileItem(file, index);
            fileList.appendChild(fileItem);
        });
    }

    createFileItem(file, index) {
        const div = document.createElement('div');
        div.className = 'file-item';
        
        // 创建文件预览
        const previewUrl = URL.createObjectURL(file);
        const fileSize = this.formatFileSize(file.size);
        
        div.innerHTML = `
            <img src="${previewUrl}" alt="预览" class="file-preview">
            <div class="file-info">
                <h5 title="${file.name}">${file.name}</h5>
                <p>${fileSize}</p>
            </div>
            <button class="remove-file-btn" onclick="imageConverter.removeFile(${index})" title="移除文件">×</button>
        `;
        
        return div;
    }

    removeFile(index) {
        this.files.splice(index, 1);
        
        if (this.files.length === 0) {
            this.hideFileList();
            this.hideConversionOptions();
            this.resetUploadAreaText();
        } else {
            this.showFileList();
            this.updateUploadAreaText();
        }
    }

    clearAllFiles() {
        this.files = [];
        this.hideFileList();
        this.hideConversionOptions();
        this.hideResults();
        this.resetUploadAreaText();
    }

    hideFileList() {
        const fileListArea = document.getElementById('fileListArea');
        fileListArea.style.display = 'none';
    }

    hideConversionOptions() {
        const conversionOptions = document.getElementById('conversionOptions');
        conversionOptions.style.display = 'none';
    }

    hideResults() {
        const resultsArea = document.getElementById('resultsArea');
        resultsArea.style.display = 'none';
    }

    resetUploadAreaText() {
        const uploadArea = document.getElementById('uploadArea');
        const content = uploadArea.querySelector('.upload-content');
        content.innerHTML = `
            <svg class="upload-icon" viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <p>点击或拖拽图片文件到此处</p>
            <p class="upload-hint">支持JPG、PNG、GIF、BMP、WebP等格式，可同时选择多个文件</p>
        `;
    }

    updateUploadAreaText() {
        const uploadArea = document.getElementById('uploadArea');
        const content = uploadArea.querySelector('.upload-content');
        content.innerHTML = `
            <svg class="upload-icon" viewBox="0 0 24 24" width="64" height="64">
                <path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>
            </svg>
            <p>✅ 已选择 ${this.files.length} 个文件</p>
            <p class="upload-hint">💝 可以继续拖拽或点击添加更多文件</p>
        `;
    }

    showConversionOptions() {
        const conversionOptions = document.getElementById('conversionOptions');
        conversionOptions.style.display = 'block';
        conversionOptions.classList.add('fade-in');
    }

    toggleQualitySelector(show) {
        const qualitySelector = document.getElementById('qualitySelector');
        qualitySelector.style.display = show ? 'block' : 'none';
    }

    async convertImages() {
        const format = document.querySelector('input[name="format"]:checked').value;
        const quality = parseInt(document.getElementById('quality').value) / 100;
        
        this.showProgressBar();
        this.disableConvertButton();
        
        this.convertedResults = [];
        
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            this.updateProgress((i / this.files.length) * 100, `正在处理第 ${i + 1}/${this.files.length} 个文件: ${file.name}...`);
            
            try {
                const result = await this.convertSingleImage(file, format, quality);
                this.convertedResults.push(result);
            } catch (error) {
                console.error('转换失败:', error);
                this.convertedResults.push({
                    originalFile: file,
                    error: error.message
                });
            }
        }
        
        this.updateProgress(100, `批量转换完成！已处理 ${this.files.length} 个文件`);
        setTimeout(() => {
            this.hideProgressBar();
            this.showResults();
            this.enableConvertButton();
        }, 500);
    }

    async convertSingleImage(file, format, quality) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            img.onload = () => {
                // 设置画布尺寸
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                // 绘制图片到画布
                ctx.drawImage(img, 0, 0);

                // 转换为目标格式
                const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
                const qualityParam = format === 'jpeg' ? quality : undefined;

                canvas.toBlob((blob) => {
                    if (blob) {
                        const originalSize = file.size;
                        const newSize = blob.size;
                        const originalName = file.name;
                        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
                        const newName = `${nameWithoutExt}.${format}`;

                        resolve({
                            originalFile: file,
                            convertedBlob: blob,
                            originalName: originalName,
                            newName: newName,
                            originalSize: originalSize,
                            newSize: newSize,
                            format: format,
                            quality: format === 'jpeg' ? Math.round(quality * 100) : null
                        });
                    } else {
                        reject(new Error('转换失败'));
                    }
                }, mimeType, qualityParam);
            };

            img.onerror = () => {
                reject(new Error('图片加载失败'));
            };

            img.src = URL.createObjectURL(file);
        });
    }

    showProgressBar() {
        const progressBar = document.getElementById('progressBar');
        progressBar.style.display = 'block';
    }

    hideProgressBar() {
        const progressBar = document.getElementById('progressBar');
        progressBar.style.display = 'none';
    }

    updateProgress(percentage, text) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = text;
    }

    disableConvertButton() {
        const convertBtn = document.getElementById('convertBtn');
        convertBtn.disabled = true;
        convertBtn.textContent = '转换中...';
    }

    enableConvertButton() {
        const convertBtn = document.getElementById('convertBtn');
        convertBtn.disabled = false;
        convertBtn.textContent = '开始转换';
    }

    showResults() {
        const resultsArea = document.getElementById('resultsArea');
        const resultsList = document.getElementById('resultsList');
        const downloadAllBtn = document.getElementById('downloadAllBtn');
        
        resultsList.innerHTML = '';
        
        // 统计成功转换的文件数量
        const successfulResults = this.convertedResults.filter(result => !result.error);
        
        this.convertedResults.forEach((result, index) => {
            const resultItem = this.createResultItem(result, index);
            resultsList.appendChild(resultItem);
        });
        
        // 显示批量下载按钮（如果有成功转换的文件）
        if (successfulResults.length > 0) {
            downloadAllBtn.style.display = 'block';
            downloadAllBtn.textContent = `批量下载所有文件 (${successfulResults.length})`;
        }
        
        resultsArea.style.display = 'block';
        resultsArea.classList.add('fade-in');
    }

    createResultItem(result, index) {
        const div = document.createElement('div');
        div.className = 'result-item';

        if (result.error) {
            div.innerHTML = `
                <div class="result-info">
                    <div class="result-details">
                        <h4>${result.originalFile.name}</h4>
                        <p style="color: #dc3545;">转换失败: ${result.error}</p>
                    </div>
                </div>
            `;
        } else {
            const originalSizeKB = Math.round(result.originalSize / 1024);
            const newSizeKB = Math.round(result.newSize / 1024);
            const compressionRatio = ((result.originalSize - result.newSize) / result.originalSize * 100).toFixed(1);
            
            // 创建预览图片
            const previewUrl = URL.createObjectURL(result.convertedBlob);
            
            div.innerHTML = `
                <div class="result-info">
                    <img src="${previewUrl}" alt="预览" class="result-preview">
                    <div class="result-details">
                        <h4>${result.newName}</h4>
                        <p>原始大小: ${originalSizeKB} KB → 转换后: ${newSizeKB} KB</p>
                        <p>格式: ${result.format.toUpperCase()}${result.quality ? ` (质量: ${result.quality}%)` : ''}</p>
                        <p style="color: ${compressionRatio > 0 ? '#28a745' : '#dc3545'};">
                            ${compressionRatio > 0 ? '压缩' : '增大'}: ${Math.abs(compressionRatio)}%
                        </p>
                    </div>
                </div>
                <button class="download-btn" onclick="imageConverter.downloadFile(${index})">
                    下载
                </button>
            `;
        }

        return div;
    }

    downloadFile(index) {
        const result = this.convertedResults[index];
        if (result && result.convertedBlob) {
            const url = URL.createObjectURL(result.convertedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = result.newName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    async downloadAllFiles() {
        const successfulResults = this.convertedResults.filter(result => !result.error);
        
        if (successfulResults.length === 0) {
            alert('没有可下载的文件！');
            return;
        }
        
        // 显示打包进度
        this.showProgressBar();
        this.updateProgress(0, '正在打包文件...');
        
        try {
            // 使用JSZip打包所有文件
            const zip = new JSZip();
            
            successfulResults.forEach((result, index) => {
                // 将Blob添加到ZIP文件中
                zip.file(result.newName, result.convertedBlob);
                this.updateProgress(((index + 1) / successfulResults.length) * 100, 
                    `打包中 ${index + 1}/${successfulResults.length}...`);
            });
            
            // 生成ZIP文件
            this.updateProgress(100, '正在生成ZIP文件...');
            const zipBlob = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: {
                    level: 6
                }
            });
            
            // 下载ZIP文件
            const format = document.querySelector('input[name="format"]:checked').value;
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const fileName = `converted_images_${format}_${timestamp}.zip`;
            
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.updateProgress(100, '✨ 打包完成！');
            setTimeout(() => {
                this.hideProgressBar();
                alert(`成功下载 ${successfulResults.length} 个文件！`);
            }, 1000);
            
        } catch (error) {
            console.error('批量下载失败:', error);
            this.hideProgressBar();
            alert('批量下载失败，请尝试单个下载或重试！');
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// 初始化应用
const imageConverter = new ImageConverter();