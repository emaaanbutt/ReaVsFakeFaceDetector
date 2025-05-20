# import os
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# import sys
# import numpy as np
# import cv2
# from tensorflow.keras.models import load_model

# # Load the trained model
# model = load_model("real-vs-fake-model.h5")

# # Read image bytes from stdin
# image_data = sys.stdin.buffer.read()

# # Convert bytes to NumPy array
# nparr = np.frombuffer(image_data, np.uint8)

# # Decode the image using OpenCV
# img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# # Handle image decode failure
# if img is None:
#     print("Error: Could not decode image")
#     sys.exit(1)

# # Resize to match model input
# img_resized = cv2.resize(img, (128, 128))
# img_resized = img_resized.astype('float32') / 255.0
# x = np.expand_dims(img_resized, axis=0)

# # Make prediction
# pred = model.predict(x)[0][0]

# # Output result
# print("real" if pred > 0.5 else "fake")


import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import cv2  # now that you've installed it

# Load the trained model
model = load_model("real-vs-fake-model.h5")

# Get the image path from command-line argument
img_path = sys.argv[1]

# Load and preprocess the image
img = image.load_img(img_path, target_size=(128, 128))
x = image.img_to_array(img) / 255.0
x = np.expand_dims(x, axis=0)

# Predict (disable verbose to avoid printing bar)
pred = model.predict(x, verbose=0)[0][0]

# # Print clean result
# if pred > 0.5:
#     print("real")
# else:
    print("fake")
label = "real" if pred > 0.5 else "fake"
confidence = pred if pred > 0.5 else 1 - pred
print(f"{label} ({confidence * 100:.2f}%)")
