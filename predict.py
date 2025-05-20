import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import sys
import cv2
import numpy as np
import contextlib
import io
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

@contextlib.contextmanager
def suppress_stdout_stderr():
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        yield

model = load_model("real-vs-fake-model.h5")

image_bytes = sys.stdin.buffer.read()
image_array = np.frombuffer(image_bytes, dtype=np.uint8)
img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

img = cv2.resize(img, (128, 128))
img = img.astype("float32") / 255.0
img = img_to_array(img)
img = np.expand_dims(img, axis=0)

with suppress_stdout_stderr():
    pred = model.predict(img)[0][0]


label = "Real" if pred > 0.5 else "Fake"
confidence = pred if pred > 0.5 else 1 - pred
print(f"{label} ({confidence * 100:.2f}%)")


