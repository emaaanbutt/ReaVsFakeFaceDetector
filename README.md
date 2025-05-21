# 🌸 Real vs Fake Face Detector 🔍🤖

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Server-Express-yellow)
![TensorFlow](https://img.shields.io/badge/Model-TensorFlow/Keras-orange)
![Status](https://img.shields.io/badge/Status-Working-brightgreen)
![License](https://img.shields.io/badge/License-MIT-pink)

A machine learning-powered web app that detects whether a face image is **Real** or **Fake (AI-generated)**.  
Built using a deep learning model served via a smooth Node.js + Express backend and styled with a simple frontend interface.  
This project is open to improvements and community contributions! 💫

---

## 🧠 How It Works

1. User uploads a face image through the browser.
2. The image is sent to the backend via AJAX (without page reload).
3. Node.js server passes the image buffer to a Python script.
4. A TensorFlow/Keras model processes the image and predicts `Real` or `Fake`.
5. The prediction is returned as JSON and displayed live on the page.

---

## 🗃️ Dataset Used

This model was trained using the **"140K Real and Fake Faces"** dataset from Kaggle.

📦 **Dataset**:  
🔗 [https://www.kaggle.com/datasets/xhlulu/140k-real-and-fake-faces](https://www.kaggle.com/datasets/xhlulu/140k-real-and-fake-faces)

> ⚠️ **Note**: This model performs best on images similar to the dataset (clean, centered, portrait-style images).  
Unseen fake styles or out-of-distribution faces may result in inaccurate predictions.

---

## 📦 Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | HTML, CSS, JavaScript (jQuery) |
| Backend      | Node.js, Express         |
| Machine Learning | TensorFlow, Keras, Python |
| Image Upload | Multer (memory storage)  |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/RealVsFakeFaceDetector.git
cd RealVsFakeFaceDetector
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Set Up Python Environment
Make sure Python is installed (>= 3.10), and install required packages:
```bash
pip install tensorflow numpy opencv-python
```

### 4. Start the Server
```bash
node server.js
```

### 5. Visit the App in Your Browser
```bash
http://localhost:4000
```

---

## 🎯 Prediction UI

Users can upload an image and get results displayed **live** under the form — without any page reloads!

Example output:
```
Prediction: Real (99.34%)
```

or

```
Prediction: Fake (78.23%)
```

---

## 📸 Screenshot


<img src="/preview/preview1.png" alt="Screenshot" height="350" width="500">
<img src="/preview/preview2.png" alt="Screenshot" height="350" width="500">
<img src="/preview/preview3.png" alt="Screenshot" height="350" width="500">

---

## ⚠️ Limitations

- 🚫 May misclassify **GAN types not seen during training**.
- 🧠 Trained on 140K images, mostly focused on a specific GAN type.
- 🖼️ Performance drops on heavily edited, noisy, or side-view face images.

---

## ✨ Future Improvements

- [ ] Add image preprocessing for better generalization.
- [ ] Enhance model with more GAN variety (StyleGAN2, etc.).
- [ ] Improve frontend with drag-and-drop uploads.

---

## ❤️ Acknowledgements

- Dataset: [140K Real and Fake Faces on Kaggle](https://www.kaggle.com/datasets/xhlulu/140k-real-and-fake-faces)
- TensorFlow / Keras
- Node.js & Express
- jQuery for seamless AJAX form handling

---

## 📜 License

This project is licensed under the **MIT License** — free for personal or academic use.  
Please give credit if you use it or build upon it 💖

---

## 💌 Connect With Me

Made with 💕 by **Eman**  
Instagram: [@parttime.nerd_](https://instagram.com/parttime.nerd_)  
GitHub: [github.com/emaaanbutt](https://github.com/emaaanbutt)

Feel free to open an issue or PR if you’d like to improve the project 🌱✨

---
